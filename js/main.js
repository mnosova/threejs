window.onload = () => {
    // let width = window.innerWidth;
    // let height = window.innerHeight;
    let width = 1200;
    let height = 660;
    console.log(width);
    console.log(height);


    let canvas = document.getElementById('canvas');

    canvas.style.width = `${width}`;
    canvas.style.height = `${height}`;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 1000);

    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);


    let rectangle = {
        rotationY: 0.005,
        rotationZ: 0.032,
        positionX: 2,
        positionY: 2
    };
    let steps ={
        rotationY: 0.005,
        rotationZ: 0.032,
        positionX: 2,
        positionY: 2
    };

    // let toTop = {
    //     rotationY: 0.005,
    //     rotationZ: 0.032,
    //     positionX: 2,
    //     positionY: 0
    // };

    // let toBottom = {
    //     rotationY: 0.005,
    //     rotationZ: 0.032,
    //     positionX: 2,
    //     positionY: 0
    // };
    //
    // let toLeft = {
    //     rotationY: 0.005,
    //     rotationZ: 0.032,
    //     positionX: 2,
    //     positionY: 0,
    // };
    // let toRight = {
    //     rotationY: 0.005,
    //     rotationZ: 0.032,
    //     positionX: 0,
    //     positionY: 0,
    // };
     let direction = '';


    let geometry = new THREE.BoxBufferGeometry(50, 100, 30, 5);
    let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});


    let mesh = new THREE.Mesh(geometry, material);
    mesh.rotationY = rectangle.rotationY;
    mesh.rotationX = rectangle.rotationX;
    scene.add(mesh);


    function loop() {
        //начальное вращение
        if(direction===''){
            mesh.rotation.y += rectangle.rotationY;
            mesh.rotation.z += rectangle.rotationZ;
            mesh.position.x += rectangle.positionX;
            mesh.position.y += rectangle.positionY;
        }
        //касание правой
        if (Math.round(mesh.position.x) === width/2 || direction==='left') {
            rectangle.positionX = width/2;
            direction='left';
        }
        //касание левой
        if (Math.round(mesh.position.x) === -width/2 || direction==='right') {
            rectangle.positionX = -width/2;
            direction='right';
        }
        //касание низа
        if (Math.round(mesh.position.y) === height/2 || direction==='top') {
            rectangle.positionY = height/2;
            direction='top';
        }
        //касание верха
        if (Math.round(mesh.position.y) === -height/2 || direction==='bottom') {
            rectangle.positionY = -height/2;
            direction='bottom';
        }

        //касание правой
        if(rectangle.positionX === width/2 ){
            mesh.rotation.y += -rectangle.rotationY;
            mesh.rotation.z += -rectangle.rotationZ;
            mesh.position.x -= steps.positionX;
            mesh.position.y -= steps.positionY;
            console.log(direction);
        //касание левой
        } if(rectangle.positionX === -width/2 ){
            mesh.rotation.y += -rectangle.rotationY;
            mesh.rotation.z += -rectangle.rotationZ;
            mesh.position.x +=   steps.positionX;
            mesh.position.y +=  steps.positionY;
            console.log(mesh.position.x);
            console.log(mesh.position.y);
            console.log(direction);
        }
        //касание верха
        if(rectangle.positionY === height/2 ){
            mesh.rotation.y += -rectangle.rotationY;
            mesh.rotation.z += -rectangle.rotationZ;
            mesh.position.x +=  steps.positionX;
            mesh.position.y -=  steps.positionY*2;
            console.log(mesh.position.x);
            console.log(mesh.position.y);
            console.log(direction);
        //касание низа
        } if(rectangle.positionY === -height/2 ){
            mesh.rotation.y += -rectangle.rotationY;
            mesh.rotation.z += -rectangle.rotationZ;
            mesh.position.x += -steps.positionX;
            mesh.position.y += steps.positionY*2;
            console.log(direction);
        }

        renderer.render(scene, camera);
        requestAnimationFrame(function () {
            loop();
        })
    }

    loop();
};