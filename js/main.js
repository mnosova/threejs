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

    function getRandomRotate(min,max){
        //только положительное значение
        //от 0 до 0.1 Y
        //от 0 до 0.05 Z
        //от 0 до ... X

    }
    //пропорции элемента
    let element = {
        width: 50,
        height: 100,
        depth: 30,
    };

    let steps = {
        rotationY: 0.005,
        rotationZ: 0.032,
        rotationX: 0,
        positionX: 2,
        positionY: 2
    };

    let geometry = new THREE.BoxBufferGeometry(element.width, element.height, element.depth);
    let material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});

    //настройки позиций

    let direct = [
        'left',
        'right',
        'top',
        'bottom',
        'bottom'

    ];
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
        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = `mesh_${i}`;
        mesh.position.x = getRandomItem(startX);
        mesh.position.y = getRandomItem(startY);
        mesh.direction = getRandomItem(direct);
        // mesh.rotation.x = Math.random();
        // mesh.rotation.y = Math.random();
        // mesh.rotation.z = Math.random();
        elements.push(mesh);

        scene.add(mesh);
    }


    function loop() {
        for (let i = 0; i <= elements.length - 1; i++) {
            //касание правой
            if (elements[i].position.x >= window.innerWidth / 2) {
                elements[i].position.x = (window.innerWidth / 2) - 3;
                elements[i].direction = 'left';
            }
            //касание левой
            if (elements[i].position.x <= -window.innerWidth / 2 ) {
                elements[i].position.x = (-window.innerWidth / 2) + 3;
                elements[i].direction = 'right';
            }
            //касание низа
            if (elements[i].position.y >= window.innerHeight / 2 ) {
                elements[i].position.y = (window.innerHeight / 2) - 3;
                elements[i].direction = 'top';
            }
            //касание верха
            if (elements[i].position.y <= -window.innerHeight / 2) {
                elements[i].position.y = (-window.innerHeight / 2) + 3;
                elements[i].direction = 'bottom';
            }

            //касание правой
            if (elements[i].direction === 'left') {
                elements[i].rotation.y += -steps.rotationY;
                elements[i].rotation.z += -steps.rotationZ;
                elements[i].position.x -= steps.positionX;
                elements[i].position.y -= steps.positionY;
                //касание левой
            }
            if (elements[i].direction === 'right') {
                elements[i].rotation.y += -steps.rotationY;
                elements[i].rotation.z += -steps.rotationZ;
                elements[i].position.x += steps.positionX;
                elements[i].position.y += steps.positionY;
            }
            //касание верха
            if (elements[i].direction === 'top') {
                elements[i].rotation.y += -steps.rotationY;
                elements[i].rotation.z += -steps.rotationZ;
                elements[i].position.x += steps.positionX;
                elements[i].position.y -= steps.positionY;
                //касание низа
            }
            if (elements[i].direction === 'bottom') {
                elements[i].rotation.y += -steps.rotationY;
                elements[i].rotation.z += -steps.rotationZ;
                elements[i].position.x += -steps.positionX;
                elements[i].position.y += steps.positionY;
            }

        }

        renderer.render(scene, camera);
        requestAnimationFrame(function () {
            loop();
        })
    }

    loop();
};
