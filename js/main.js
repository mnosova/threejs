window.onload = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
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
        rotationX: 0,
        rotationY: 0.005,
        rotationZ: 0.032,
        positionX: 2,
        positionY: 0,
        positionZ: 0,
    };

    let toTop = {
        rotationX: 0,
        rotationY: 0.005,
        rotationZ: 0.032,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    };

    let toBottom = {
        rotationX: 0,
        rotationY: 0.005,
        rotationZ: 0.032,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    };

    let toLeft = {
        rotationX: 0,
        rotationY: 0.005,
        rotationZ: 0.032,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    };
    let toRight = {
        rotationX: 0,
        rotationY: 0.005,
        rotationZ: 0.032,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    };
     let direction = '';


    let gui = new dat.GUI();
    gui.add(rectangle, 'positionY').min(-5).max(5).step(0.1);
    gui.add(rectangle, 'positionX').min(-5).max(5).step(0.1);
    gui.add(rectangle, 'positionZ').min(-5).max(5).step(0.1);
    //gui.add(rectangle, 'rotationY').min(-0.2).max(0.2).step(0.001);
    // gui.add(rectangle, 'rotationX').min(-0.2).max(0.2).step(0.001);
    gui.add(rectangle, 'rotationZ').min(-0.2).max(0.2).step(0.001);

    let geometry = new THREE.BoxBufferGeometry(50, 100, 30, 5);
    let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});


    let mesh = new THREE.Mesh(geometry, material);
    mesh.rotationY = rectangle.rotationY;
    mesh.rotationX = rectangle.rotationX;
    scene.add(mesh);


    function loop() {

        if(direction===''){
            mesh.rotation.y += rectangle.rotationY;
            mesh.rotation.x = rectangle.rotationX;
            mesh.rotation.z += rectangle.rotationZ;
            mesh.position.x += rectangle.positionX;
            mesh.position.y += rectangle.positionY;
            mesh.position.z += rectangle.positionZ;
        }

        if (Math.round(mesh.position.x) === width/2 || direction==='left') {
            rectangle.positionX = width/2;
            direction='left';
        }
        if (Math.round(mesh.position.x) === -width/2 || direction==='right') {
            rectangle.positionX = -width/2;
            direction='right';
        }
        ///////////=////////////
        if (Math.round(mesh.position.y) === height/2 || direction==='top') {
            rectangle.positionY = height/2;
            direction='top';
        }
        if (Math.round(mesh.position.y) === -height/2 || direction==='bottom') {
            rectangle.positionY = -height/2;
            direction='bottom';
        }

        ///////////=////////////
        if(rectangle.positionX === width/2 ){
           // direction='left';
             mesh.rotation.y += -rectangle.rotationY;
             mesh.rotation.z += -rectangle.rotationZ;
            mesh.position.x -= 2;
            console.log(direction);

        } if(rectangle.positionX === -width/2 ){
           // direction='right';
            mesh.rotation.y += rectangle.rotationY;
            mesh.rotation.z += rectangle.rotationZ;
            mesh.position.x += 2;
            mesh.position.y += 2;
            console.log(direction);
        }
        ///////////=////////////

        if(rectangle.positionY === height/2 ){
            // direction='left';
            mesh.rotation.y += -rectangle.rotationY;
            mesh.rotation.z += -rectangle.rotationZ;
            mesh.position.y -= 2;
            console.log(direction);

        } if(rectangle.positionY === -height/2 ){
            // direction='right';
            mesh.rotation.y += rectangle.rotationY;
            mesh.rotation.z += rectangle.rotationZ;
            mesh.position.y += 2;
            console.log(direction);
        }

        renderer.render(scene, camera);
        requestAnimationFrame(function () {
            loop();
        })
    }

    loop();
};