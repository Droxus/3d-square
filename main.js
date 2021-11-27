import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ canvas });
const color = 0xffffff;
const intesity = 1;
const light = new THREE.DirectionalLight(color, intesity);
light.position.set(-1, 2, 4);
scene.add(light);
var meshs = [];
var NumberOfmeshs = (Math.random() + 0.1) * 10;
const geometry = new THREE.OctahedronGeometry(0.7);
camera.position.x = NumberOfmeshs;
camera.position.z = NumberOfmeshs * 1.75 + 2;
for (let i = 0; i < NumberOfmeshs; i++) {
  let mesh = makeMesh(geometry, 0x00ffff, i * 2);
  meshs.push(mesh);
}
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)
controls.update()
controls.listenToKeyEvents(window)
function resizeCanvas(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render(time) {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  time *= 0.001;
  for (const mesh of meshs) {
    mesh.rotation.x = time;
    mesh.rotation.y = time;
  }
  renderer.render(scene, camera);
  resizeCanvas(renderer);
  requestAnimationFrame(render);
}

function makeMesh(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  mesh.position.x = x;
  return mesh;
}

// requestAnimationFrame(render);
render(0)