import * as THREE from '/build/three.module.js';
import { OrbitControls } from "/jsm/controls/OrbitControls";
import Stats from '/jsm/libs/stats.module';
import { GUI } from '/jsm/libs/dat.gui.module';
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000); //achter 0 staat nog iets
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
const boxGeometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();
const icosahedronGeometry = new THREE.IcosahedronGeometry();
// console.dir(geometry)
const material = new THREE.MeshBasicMaterial({ color: '#F38686', wireframe: true });
const cube = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5;
scene.add(cube);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -4;
scene.add(sphere);
const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
scene.add(icosahedron);
camera.position.z = 13;
const stats = Stats();
document.body.appendChild(stats.dom);
const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
const cubeRotationFolder = cubeFolder.addFolder("Rotation");
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01);
const cubePositionFolder = cubeFolder.addFolder("Position");
cubePositionFolder.add(cube.position, "x", -10, 10);
cubePositionFolder.add(cube.position, "y", -10, 10);
cubePositionFolder.add(cube.position, "z", -10, 10);
const cubeScaleFolder = cubeFolder.addFolder("Scale");
cubeScaleFolder.add(cube.scale, "x", -5, 5, 0.1).onFinishChange(() => console.dir(cube.geometry));
cubeScaleFolder.add(cube.scale, "y", -5, 5, 0.1);
cubeScaleFolder.add(cube.scale, "z", -5, 5, 0.1);
cubeFolder.add(cube, "visible", true);
cubeFolder.open();
const cubeData = {
    width: 2,
    height: 2,
    depth: 2,
    widthSegments: 2,
    heightSegments: 2,
    depthSegments: 2
};
const cubePropertiesFolder = cubeFolder.addFolder("Properties");
cubePropertiesFolder.add(cubeData, 'width', 5, 30).onChange(regenerateBoxGeometry).onFinishChange(() => console.dir(cube.geometry));
cubePropertiesFolder.add(cubeData, 'height', 2, 30).onChange(regenerateBoxGeometry);
cubePropertiesFolder.add(cubeData, 'depth', 2, 30).onChange(regenerateBoxGeometry);
cubePropertiesFolder.add(cubeData, 'widthSegments', 2, 30).onChange(regenerateBoxGeometry);
cubePropertiesFolder.add(cubeData, 'heightSegments', 2, 30).onChange(regenerateBoxGeometry);
cubePropertiesFolder.add(cubeData, 'depthSegments', 2, 30).onChange(regenerateBoxGeometry);
function regenerateBoxGeometry() {
    let newGeometry = new THREE.BoxGeometry(cubeData.width, cubeData.height, cubeData.depth, cubeData.widthSegments, cubeData.heightSegments, cubeData.depthSegments);
    cube.geometry.dispose();
    cube.geometry = newGeometry;
}
const sphereData = {
    radius: 2,
    widthSegments: 8,
    heightSegments: 6,
    phiStart: 0,
    phiLength: Math.PI * 3,
    thetaStart: 0,
    thetaLength: Math.PI
};
const sphereFolder = gui.addFolder("Sphere");
const spherePropertiesFolder = sphereFolder.addFolder("Properties");
spherePropertiesFolder.add(sphereData, 'radius', .2, 30).onChange(regenerateSphereGeometry);
spherePropertiesFolder.add(sphereData, 'widthSegments', 2, 32).onChange(regenerateSphereGeometry);
spherePropertiesFolder.add(sphereData, 'heightSegments', 2, 16).onChange(regenerateSphereGeometry);
spherePropertiesFolder.add(sphereData, 'phiStart', 0, Math.PI * 3).onChange(regenerateSphereGeometry);
spherePropertiesFolder.add(sphereData, 'phiLength', 0, Math.PI * 3).onChange(regenerateSphereGeometry);
spherePropertiesFolder.add(sphereData, 'thetaStart', 0, Math.PI).onChange(regenerateSphereGeometry);
spherePropertiesFolder.add(sphereData, 'thetaLength', 0, Math.PI).onChange(regenerateSphereGeometry);
function regenerateSphereGeometry() {
    let newGeometry = new THREE.SphereGeometry(sphereData.radius, sphereData.widthSegments, sphereData.heightSegments, sphereData.phiStart, sphereData.phiLength, sphereData.thetaStart, sphereData.thetaLength);
    sphere.geometry.dispose();
    sphere.geometry = newGeometry;
}
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10, 0.01);
cameraFolder.open();
var animate = function () {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // renderer()
    document.getElementById("debug1").innerText = "Matrix\n" + cube.matrix.elements.toString().replace(/,/g, "\n");
    controls.update();
    renderer.render(scene, camera);
};
animate();
