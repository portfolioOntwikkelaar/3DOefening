import * as THREE from '/build/three.module.js';
import { OrbitControls } from "/jsm/controls/OrbitControls";
const scene = new THREE.Scene();
scene.background = new THREE.Color('#5FFBF1');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c1")
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
const verticesOfCube = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
];
const indicesOfFaces = [
    2, 1, 0, 0, 3, 2,
    0, 4, 7, 7, 3, 0,
    0, 1, 5, 5, 4, 0,
    1, 2, 6, 6, 5, 1,
    2, 3, 7, 7, 6, 2,
    4, 5, 6, 6, 7, 4
];
const geometry = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 6, 2);
const material = new THREE.MeshBasicMaterial({ color: '#F38686', wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
console.log(scene);
camera.position.z = 13;
var animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
};
animate();
