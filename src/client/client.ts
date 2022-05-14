import * as THREE from '/build/three.module.js'
import { OrbitControls } from "/jsm/controls/OrbitControls";

const scene: THREE.Scene = new THREE.Scene()
scene.background = new THREE.Color('#5FFBF1')
const camera1: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, 1 , 0.1, 200) //achter 0 staat nog iets
const camera2: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1, 5, 1, -1, 3) //achter 0 staat nog iets
const camera3: THREE.OrthographicCamera = new THREE.OrthographicCamera(-6, 6, 6, -6, 10) //achter 0 staat nog iets
const camera4: THREE.OrthographicCamera = new THREE.OrthographicCamera(-4, 4, 4, -4, 10) //achter 0 staat nog iets

const canvas1: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c1")
const canvas2: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c2")
const canvas3: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c3")
const canvas4: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c4")
const renderer1: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas1})
renderer1.setSize(300, 300)
const renderer2: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas2})
renderer2.setSize(300, 300)
const renderer3: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas3})
renderer3.setSize(300, 300)
const renderer4: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas4})
renderer4.setSize(300, 300)

// document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera1, renderer2.domElement)
const verticesOfCube = [
  -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
  -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
  2,1,0,    0,3,2,
  0,4,7,    7,3,0,
  0,1,5,    5,4,0,
  1,2,6,    6,5,1,
  2,3,7,    7,6,2,
  4,5,6,    6,7,4
];
const geometry: THREE.PolyhedronGeometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: '#F38686', wireframe: true})

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)
console.log(scene)

camera1.position.z = 13
camera2.position.z = 15
camera2.lookAt(new THREE.Vector3(0, 0 , 0))

camera3.position.z = 28
camera4.position.z = 28
camera4.lookAt(new THREE.Vector3(0, 0 , 0))

var animate = function () {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update()
  renderer1.render(scene, camera1)
  renderer2.render(scene, camera2)
  renderer3.render(scene, camera3)
  renderer4.render(scene, camera4)
};

animate();