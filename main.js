// Escena
const scene = new THREE.Scene();

// Cámera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(50, 50, 50);
scene.add(light);

// função que cria os circulos/donuts
function crearDonut(x, color) {
  const geo = new THREE.TorusGeometry(10, 0.1, 16, 100);
  const mat = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = x;
  scene.add(mesh);
  return mesh;
}

const donut1 = crearDonut(-25, 0xE7DDFF);
const donut2 = crearDonut(25, 0xE2EAF4);
const donut3 = crearDonut(0, 0xFFFFFF);

// Variables de control
let velocidade = 0.01;

// Animación
function animate() {
  requestAnimationFrame(animate);

  donut1.rotation.x += velocidade;
  donut1.rotation.y += velocidade;

  donut2.rotation.x -= velocidade;
  donut2.rotation.y -= velocidade;

  donut3.rotation.x += velocidade;
  donut3.rotation.y -= velocidade;

  cube.rotation.x += velocidade;
  cube.rotation.y += velocidade;

  renderer.render(scene, camera);
}
animate();

// Ajuste de janela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// botões de controles
document.getElementById('colorDonut').addEventListener('click', () => {
  donut1.material.color.set(Math.random() * 0xffffff);
  donut2.material.color.set(Math.random() * 0xffffff);
  donut3.material.color.set(Math.random() * 0xffffff);
});

document.getElementById('velocidad').addEventListener('click', () => {
  velocidade = velocidade === 0.01 ? 0.05 : 0.01;
});

const sliderGrosura = document.getElementById('grosuraDonut');

sliderGrosura.addEventListener('input', () => {
  const nuevoRadio = parseFloat(sliderGrosura.value);

  // Actualizamos la geometría de los donuts
  donut1.geometry.dispose(); // liberamos memoria de geometría anterior
  donut1.geometry = new THREE.TorusGeometry(10, nuevoRadio, 16, 100);

  donut2.geometry.dispose();
  donut2.geometry = new THREE.TorusGeometry(10, nuevoRadio, 16, 100);

  donut3.geometry.dispose();
  donut3.geometry = new THREE.TorusGeometry(10, nuevoRadio, 16, 100);
});