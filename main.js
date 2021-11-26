import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js"
const canvas = document.getElementById('canvas')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({canvas})



const geometry = new THREE.TorusGeometry(.7)

renderer.render(scene, camera)
function render (time) {
    time *= 0.001
    for (const cube of cubes) {
    cube.rotation.x = time
    cube.rotation.y = time 
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}


const color = 0xFFFFFF
const intesity = 1
const light = new THREE.DirectionalLight(color, intesity)
light.position.set(-1, 2, 4)
scene.add(light)

function makeCubick(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color: color})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
cube.position.x = x
return cube
}

var cubes = []

var NumberOfCubes = (Math.random() + 0.1) * 10
for (let i=0; i<NumberOfCubes; i++) {
let cube = makeCubick(geometry, 0x00FFFF, i*2)
cubes.push(cube)
}
requestAnimationFrame(render)
camera.position.x = NumberOfCubes 
camera.position.z = (NumberOfCubes * 1.75) + 2