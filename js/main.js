window.onload = () => {
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //базовые переменные
    let canvas = document.getElementById('canvas');
    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 1000);
    let scene = new THREE.Scene();

    //свет
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(50);
    scene.add(dirLight);
    camera.lookAt(scene.position);

    // вспомогательные функции
    function getRandomItem(array = []) {
        if (!Array.isArray(array) || !array.length) {
            return [];
        }
        let positon = 0;
        const rand = Math.floor(Math.random() * array.length);
        positon = array[rand];
        array.splice(rand, 1);
        if (positon) {
            return positon;
        }
        if (!array.length) {
            return positon;
        }
        return positon;
    }

    function getRandomAmount(min,max){
        return Math.random() * (max - min);
    }

    //настройки позиций
    let direct = [
        'left',
        'right',
        'top',
        'bottom',
        'bottom'

    ];

    let element = {
        width: getRandomAmount(20,60),
        height: getRandomAmount(60,120),
        depth: getRandomAmount(15,40),
    };

    let startX = [
        -element.width * 3,
        -element.width * 2.5,
        -element.width,
        element.width,
        element.width * 2.5,
        element.width * 3
    ];

    let startY = [
        -element.height * 3,
        -element.height * 2.5,
        -element.height,
        element.height,
        element.height * 2.5,
        element.height * 3
    ];

    //вывод элеменов
    let number = 5;
    let elements = [];

    for (let i = 1; i <= number; i++) {
        let material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide});
        let geometry = new THREE.BoxBufferGeometry( getRandomAmount(40,120), getRandomAmount(120,220), getRandomAmount(30,80));
        let mesh = new THREE.Mesh(geometry, material);
        material.color= {r:Math.random(),g:Math.random(),b:Math.random()};
        mesh.name = `mesh_${i}`;
        mesh.position.x = getRandomItem(startX);
        mesh.position.y = getRandomItem(startY);
        mesh.direction = getRandomItem(direct);
        elements.push(mesh);
        scene.add(mesh);
    }


    function loop() {
        for (let i = 0; i <= elements.length - 1; i++) {
            //на касание правой
            if (elements[i].position.x >= window.innerWidth / 2) {
                elements[i].position.x = (window.innerWidth / 2) - 3;
                elements[i].direction = 'left';
            }
            //на касание левой
            if (elements[i].position.x <= -window.innerWidth / 2 ) {
                elements[i].position.x = (-window.innerWidth / 2) + 3;
                elements[i].direction = 'right';
            }
            //на касание низа
            if (elements[i].position.y >= window.innerHeight / 2 ) {
                elements[i].position.y = (window.innerHeight / 2) - 3;
                elements[i].direction = 'top';
            }
            //на касание верха
            if (elements[i].position.y <= -window.innerHeight / 2) {
                elements[i].position.y = (-window.innerHeight / 2) + 3;
                elements[i].direction = 'bottom';
            }

            //после касания правой
            if (elements[i].direction === 'left') {
                elements[i].rotation.y += -getRandomAmount(0,0.1);
                elements[i].rotation.z += -getRandomAmount(0,0.05);
                elements[i].rotation.x += -getRandomAmount(0,0.002);
                elements[i].position.x -= getRandomAmount(0,3);
                elements[i].position.y -= getRandomAmount(0,2.5);
            }
            //после касания левой
            if (elements[i].direction === 'right') {
                elements[i].rotation.y += -getRandomAmount(0,0.1);
                elements[i].rotation.z += -getRandomAmount(0,0.05);
                elements[i].rotation.x += -getRandomAmount(0,0.002);
                elements[i].position.x += getRandomAmount(0,3);
                elements[i].position.y += getRandomAmount(0,2.5);
            }
            //после касания верха
            if (elements[i].direction === 'top') {
                elements[i].rotation.y += -getRandomAmount(0,0.1);
                elements[i].rotation.z += -getRandomAmount(0,0.05);
                elements[i].rotation.x += -getRandomAmount(0,0.002);
                elements[i].position.x += getRandomAmount(0,3);
                elements[i].position.y -= getRandomAmount(0,2.5);

            }
            //после касания низа
            if (elements[i].direction === 'bottom') {
                elements[i].rotation.y += -getRandomAmount(0,0.1);
                elements[i].rotation.z += -getRandomAmount(0,0.05);
                elements[i].rotation.x += -getRandomAmount(0,0.002);
                elements[i].position.x += -getRandomAmount(0,2.5);
                elements[i].position.y += getRandomAmount(0,3);
            }

        }

        renderer.render(scene, camera);
        requestAnimationFrame(function () {
            loop();
        })
    }

    loop();
};
