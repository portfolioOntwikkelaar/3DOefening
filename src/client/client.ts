import * as THREE from '/build/three.module.js'
import { OrbitControls } from "/jsm/controls/OrbitControls";
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module';

const scene: THREE.Scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
const light = new THREE.PointLight(0xffffff, 3);
light.position.set(10,10,10);
scene.add(light);
// const light2 = new THREE.PointLight(0xffffff, 3);
// light2.position.set(-10,-10,-10);
// scene.add(light2);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000) //achter 0 staat nog iets

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.screenSpacePanning = true

// const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry()
// const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry()
// const icosahedronGeometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry()
const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(3.6, 1.8)
// const torusKnotGeometry: THREE.TorusKnotGeometry = new THREE.TorusKnotGeometry()
// console.dir(geometry)
const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial()

// const texture = new THREE.TextureLoader().load("img/grid2.jpeg");
const texture = new THREE.TextureLoader().load("img/worldColour.5400x2700.jpg");
material.map = texture
// const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/pz_50.png", "img/py_50.png", "img/nz_50.png"])
const envTexture = new THREE.CubeTextureLoader().load(["img/px_eso0932a.jpg", "img/nx_eso0932a.jpg", "img/py_eso0932a.jpg", "img/ny_eso0932a.jpg", "img/pz_eso0932a.jpg", "img/nz_eso0932a.jpg"])
envTexture.mapping =THREE.CubeReflectionMapping
// envTexture.mapping =THREE.CubeRefractionMapping

material.envMap = envTexture
// const material: THREE.MeshNormalMaterial = new THREE.MeshNormalMaterial()
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: '#F38686', wireframe: true})

// const matcapTexture = new THREE.TextureLoader().load("img/matcap-opal.png")
// const matcapTexture = new THREE.TextureLoader().load("img/matcap-gold.png")
// const matcapTexture = new THREE.TextureLoader().load("img/matcap-green.png")
// const matcapTexture = new THREE.TextureLoader().load("img/matcap-red.png")
// material.transparent = true
// material.opacity = 0.25
// material.matcap = matcapTexture
// const specularTexture = new THREE.TextureLoader().load("img/grayscale-test.png")
const specularTexture = new THREE.TextureLoader().load("img/earthSpecular.jpg")
material.specularMap = specularTexture
// const cube: THREE.Mesh = new THREE.Mesh(boxGeometry, material)
// cube.position.x = 5
// scene.add(cube)
// const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, material)
// sphere.position.x = -4
// scene.add(sphere)
const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, material)
// plane.position.x = -3
scene.add(plane)
// const torus: THREE.Mesh = new THREE.Mesh(torusKnotGeometry, material)
// torus.position.x = 2
// scene.add(torus)
// const icosahedron: THREE.Mesh = new THREE.Mesh(icosahedronGeometry, material)
// scene.add(icosahedron)

camera.position.z = 3
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer()
}


const stats = Stats()
document.body.appendChild(stats.dom)

const options = {
  side: {
    "FrontSide": THREE.FrontSide,
    "BackSide": THREE.BackSide,
    "DoubleSide": THREE.DoubleSide,
  },
  combine: {
    "MultiplyOperation": THREE.MultiplyOperation,
    "MixOperation": THREE.MixOperation,
    "AddOperation": THREE.AddOperation
  },
}

const gui = new GUI()
const materialFolder = gui.addFolder("THREE.Material")
materialFolder.add(material, 'transparent')
materialFolder.add(material, 'opacity', 0, 1, 0.01)
materialFolder.add(material, 'depthTest')
materialFolder.add(material, 'depthWrite')
materialFolder.add(material, 'alphaTest', 0, 1, 0.01).onChange(() => updateMaterial())
materialFolder.add(material, 'visible')
materialFolder.add(material, 'side', options.side).onChange(() => updateMaterial())
materialFolder.open()



const data = {
  color: material.color.getHex(),
  emissive: material.emissive.getHex(),
  specular: material.specular.getHex()
};

const meshBasicMaterialFolder = gui.addFolder('THREE.MeshMatcapMaterial');
meshBasicMaterialFolder.addColor(data, 'color').onChange(() => {material.color.setHex(Number(data.color.toString().replace('#', '0px')))});
meshBasicMaterialFolder.addColor(data, 'emissive').onChange(()=> {
  material.emissive.setHex(Number(data.emissive.toString().replace('#', '0xffff')))
})
meshBasicMaterialFolder.addColor(data, 'specular').onChange(()=> {
  material.emissive.setHex(Number(data.specular.toString().replace('#', '0xffff')))
})
meshBasicMaterialFolder.add(material, 'shininess', 0, 1024);
meshBasicMaterialFolder.add(material, 'combine', options.combine).onChange(()=> updateMaterial())
meshBasicMaterialFolder.add(material, 'wireframe');
meshBasicMaterialFolder.add(material, "reflectivity", 0, 1);
meshBasicMaterialFolder.add(material, "refractionRatio", 0, 1);
// meshBasicMaterialFolder.add(material, 'wireframeLinewidth', 0, 10);


meshBasicMaterialFolder.open()


material.side = THREE.FrontSide

function updateMaterial() {
  material.side = Number(material.side)
  material.combine = Number(material.combine)
  material.needsUpdate = true
}
// const cubeFolder = gui.addFolder("Cube")
// const cubeRotationFolder = cubeFolder.addFolder("Rotation")
// cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
// cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
// cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01)
// const cubePositionFolder = cubeFolder.addFolder("Position")
// cubePositionFolder.add(cube.position, "x", -10, 10)
// cubePositionFolder.add(cube.position, "y", -10, 10)
// cubePositionFolder.add(cube.position, "z", -10, 10)
// const cubeScaleFolder = cubeFolder.addFolder("Scale")
// cubeScaleFolder.add(cube.scale, "x", -5, 5, 0.1).onFinishChange(()=> console.dir(cube.geometry))
// cubeScaleFolder.add(cube.scale, "y", -5, 5, 0.1)
// cubeScaleFolder.add(cube.scale, "z", -5, 5, 0.1)
// cubeFolder.add(cube, "visible", true)
// cubeFolder.open()

// const cubeData = {
//   width: 2,
//   height: 2,
//   depth: 2,
//   widthSegments: 2,
//   heightSegments: 2,
//   depthSegments: 2
// };
// const cubePropertiesFolder = cubeFolder.addFolder("Properties")
// cubePropertiesFolder.add(cubeData, 'width', 5, 30).onChange(regenerateBoxGeometry).onFinishChange(()=> console.dir(cube.geometry));
// cubePropertiesFolder.add(cubeData, 'height', 2, 30).onChange(regenerateBoxGeometry);
// cubePropertiesFolder.add(cubeData, 'depth', 2, 30).onChange(regenerateBoxGeometry);
// cubePropertiesFolder.add(cubeData, 'widthSegments', 2, 30).onChange(regenerateBoxGeometry);
// cubePropertiesFolder.add(cubeData, 'heightSegments', 2, 30).onChange(regenerateBoxGeometry);
// cubePropertiesFolder.add(cubeData, 'depthSegments', 2, 30).onChange(regenerateBoxGeometry);

// function regenerateBoxGeometry() {
//   let newGeometry = new THREE.BoxGeometry(
//     cubeData.width, cubeData.height, cubeData.depth, cubeData.widthSegments, cubeData.heightSegments, cubeData.depthSegments
//   )
//   cube.geometry.dispose()
//   cube.geometry = newGeometry
// }
// const sphereData = {
//   radius: 2,
//   widthSegments: 8,
//   heightSegments: 6,
//   phiStart: 0,
//   phiLength: Math.PI * 3,
//   thetaStart: 0,
//   thetaLength: Math.PI

// }
// const sphereFolder = gui.addFolder("Sphere")
// const spherePropertiesFolder = sphereFolder.addFolder("Properties")
// spherePropertiesFolder.add(sphereData, 'radius', .2, 30).onChange(regenerateSphereGeometry);
// spherePropertiesFolder.add(sphereData, 'widthSegments', 2, 32).onChange(regenerateSphereGeometry);
// spherePropertiesFolder.add(sphereData, 'heightSegments', 2, 16).onChange(regenerateSphereGeometry);
// spherePropertiesFolder.add(sphereData, 'phiStart', 0, Math.PI * 3).onChange(regenerateSphereGeometry);
// spherePropertiesFolder.add(sphereData, 'phiLength', 0, Math.PI * 3).onChange(regenerateSphereGeometry);
// spherePropertiesFolder.add(sphereData, 'thetaStart', 0, Math.PI).onChange(regenerateSphereGeometry);
// spherePropertiesFolder.add(sphereData, 'thetaLength', 0, Math.PI).onChange(regenerateSphereGeometry);

// function regenerateSphereGeometry() {
//   let newGeometry = new THREE.SphereGeometry(
//     sphereData.radius, sphereData.widthSegments, sphereData.heightSegments, sphereData.phiStart, sphereData.phiLength, sphereData.thetaStart, sphereData.thetaLength
//   )
//   sphere.geometry.dispose()
//   sphere.geometry = newGeometry
// }
// const icosahedronData = {
//   radius: 2,
//   detail: 0
  

// }
// const icosahedronFolder = gui.addFolder("Icosahedron")
// const icosahedronPropertiesFolder = icosahedronFolder.addFolder("Properties")
// icosahedronPropertiesFolder.add(icosahedronData, 'radius', .2, 10).onChange(regenerateIcosahedronGeometry);
// icosahedronPropertiesFolder.add(icosahedronData, 'detail', 0, 5).step(1).onChange(regenerateIcosahedronGeometry);


// function regenerateIcosahedronGeometry() {
//   let newGeometry = new THREE.IcosahedronGeometry(
//     icosahedronData.radius, icosahedronData.detail
//   )
//   icosahedron.geometry.dispose()
//   icosahedron.geometry = newGeometry
// }

const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, "z", 0, 10, 0.01)
cameraFolder.open()

var animate = function () {
  requestAnimationFrame(animate)

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // renderer()
  // document.getElementById("debug1").innerText = "Matrix\n" + cube.matrix.elements.toString().replace(/,/g, "\n",)
  controls.update()
  renderer.render(scene, camera)
};

animate(); 