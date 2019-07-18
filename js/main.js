window.onload =() => {
  let width = window.innerWidth;
  let height = window.innerHeight;
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

  let rectangle = new THREE.BoxBufferGeometry(200, 400, 10, 10);
  let material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
  let mesh = new THREE.Mesh(rectangle, material);
  scene.add(mesh);

  renderer.render(scene, camera);
}