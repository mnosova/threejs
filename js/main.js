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
        positon=array[rand];
        array.splice(rand, 1);
        if(positon){
            return positon;
        }
        if (!array.length) {
            return positon;
        }
        return positon;
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

    // let start = {
    //     positionX: getRandomItem(startX),
    //     positionY: getRandomItem(startY),
    //     direction : getRandomItem(direct)
    //
    // };

    // let number = 5;
    //let d= [];
    let mesh_1;
    let mesh_2;
    let mesh_3;
    let mesh_4;
    let mesh_5;
    // for(let i=1; i<=number;i++){
        mesh_1 = new THREE.Mesh(geometry, material);
        mesh_1.name = getRandomItem(direct);
        mesh_1.position.x = getRandomItem(startX);
        mesh_1.position.y = getRandomItem(startY);
        //d.push('direction_'+i, getRandomItem(direct));
    mesh_2 = new THREE.Mesh(geometry, material);
    mesh_2.name = getRandomItem(direct);
    mesh_2.position.x = getRandomItem(startX);
    mesh_2.position.y = getRandomItem(startY);

    mesh_3 = new THREE.Mesh(geometry, material);
    mesh_3.name = getRandomItem(direct);
    mesh_3.position.x = getRandomItem(startX);
    mesh_3.position.y = getRandomItem(startY);

    mesh_4 = new THREE.Mesh(geometry, material);
    mesh_4.name = getRandomItem(direct);
    mesh_4.position.x = getRandomItem(startX);
    mesh_4.position.y = getRandomItem(startY);

    mesh_5 = new THREE.Mesh(geometry, material);
    mesh_5.name = getRandomItem(direct);
    mesh_5.position.x = getRandomItem(startX);
    mesh_5.position.y = getRandomItem(startY);




    // }

    scene.add(mesh_1);
    scene.add(mesh_2);
    scene.add(mesh_3);
    scene.add(mesh_4);
    scene.add(mesh_4);




    // let mesh = new THREE.Mesh(geometry, material);
    // mesh.position.x = start.positionX;
    // mesh.position.y = start.positionY;
    // mesh.name = `mesh_1`;
    //let direction = start.direction;
    // scene.add(mesh.na(`mesh_1`));

    // let mesh2 = new THREE.Mesh(geometry, material);
    // mesh.position.x = start.positionX;
    // mesh.position.y = start.positionY;
    //let direction2 = start.direction;

    //scene.add(mesh2);
    


    function loop() {
        //касание правой
        // if (Math.round(mesh.position.x) >= window.innerWidth / 2 || mesh.name === 'left') {
        //     mesh.position.x = (window.innerWidth / 2)-3;
        //     mesh.name = 'left';
        // }
        // //касание левой
        // if (Math.round(mesh.position.x) <= -window.innerWidth / 2 || mesh.name === 'right') {
        //     mesh.position.x = (-window.innerWidth / 2)+3;
        //     mesh.name = 'right';
        // }
        // //касание низа
        // if (Math.round(mesh.position.y) >= window.innerHeight / 2 || mesh.name === 'top') {
        //     mesh.position.y = (window.innerHeight / 2) -3;
        //     mesh.name = 'top';
        // }
        // //касание верха
        // if (Math.round(mesh.position.y) <= -window.innerHeight / 2 || mesh.name === 'bottom') {
        //     mesh.position.y = (-window.innerHeight / 2)+3;
        //     mesh.name = 'bottom';
        // }
        //
        // //касание правой
        // if (mesh.position.x === (window.innerWidth / 2)-3 || mesh.name === 'left') {
        //     mesh.rotation.y += -steps.rotationY;
        //     mesh.rotation.z += -steps.rotationZ;
        //     mesh.position.x -= steps.positionX;
        //     mesh.position.y -= steps.positionY;
        //     //касание левой
        // }
        // if (mesh.position.x === (-window.innerWidth / 2)+3 || mesh.name === 'right') {
        //     mesh.rotation.y += -steps.rotationY;
        //     mesh.rotation.z += -steps.rotationZ;
        //     mesh.position.x += steps.positionX;
        //     mesh.position.y += steps.positionY;
        // }
        // //касание верха
        // if (mesh.position.y ===(window.innerHeight / 2) -3 || mesh.name === 'top') {
        //     mesh.rotation.y += -steps.rotationY;
        //     mesh.rotation.z += -steps.rotationZ;
        //     mesh.position.x += steps.positionX;
        //     mesh.position.y -= steps.positionY * 2;
        //     //касание низа
        // }
        // if (mesh.position.y === (-window.innerHeight / 2)+3 || mesh.name === 'bottom') {
        //     mesh.rotation.y += -steps.rotationY;
        //     mesh.rotation.z += -steps.rotationZ;
        //     mesh.position.x += -steps.positionX;
        //     mesh.position.y += steps.positionY * 2;
        // }
        console.log(mesh);


        ///////////////////////////

        //касание правой
        // if (Math.round(mesh.position.x) >= window.innerWidth / 2 || direction === 'left') {
        //     start.positionX = window.innerWidth / 2;
        //     direction = 'left';
        // }
        // //касание левой
        // if (Math.round(mesh.position.x) <= -window.innerWidth / 2 || direction === 'right') {
        //     start.positionX = -window.innerWidth / 2;
        //     direction = 'right';
        // }
        // //касание низа
        // if (Math.round(mesh.position.y) >= window.innerHeight / 2 || direction === 'top') {
        //     start.positionY = window.innerHeight / 2;
        //     direction = 'top';
        // }
        // //касание верха
        // if (Math.round(mesh.position.y) <= -window.innerHeight / 2 || direction === 'bottom') {
        //     start.positionY = -window.innerHeight / 2;
        //     direction = 'bottom';
        // }
        //
        // //касание правой
        // if (start.positionX === window.innerWidth / 2) {
        //     mesh.rotation.y += -steps.rotationY;
        //     mesh.rotation.z += -steps.rotationZ;
        //     mesh.position.x -= steps.positionX;
        //     mesh.position.y -= steps.positionY;
        //     //касание левой
        // }
        // if (start.positionX === -window.innerWidth / 2) {
        //     mesh.rotation.y += -steps.rotationY;
        //     mesh.rotation.z += -steps.rotationZ;
        //     mesh.position.x += steps.positionX;
        //     mesh.position.y += steps.positionY;
        // }
        // //касание верха
        // if (start.positionY === window.innerHeight / 2) {
        //     mesh.rotation.y += -steps.rotationY;
        //     mesh.rotation.z += -steps.rotationZ;
        //     mesh.position.x += steps.positionX;
        //     mesh.position.y -= steps.positionY * 2;
        //     //касание низа
        // }
        // if (start.positionY === -window.innerHeight / 2) {
        //     mesh.rotation.y += -steps.rotationY;
        //     mesh.rotation.z += -steps.rotationZ;
        //     mesh.position.x += -steps.positionX;
        //     mesh.position.y += steps.positionY * 2;
        // }

        renderer.render(scene, camera);
        requestAnimationFrame(function () {
            loop();
        })
    }

    loop();
};
