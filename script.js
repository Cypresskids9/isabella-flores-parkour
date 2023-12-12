import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

const geometry1 = new THREE.BoxGeometry(1,2,1);
const material1 = new THREE.MeshLambertMaterial({color: 0xaddfe6});
const cube = new THREE.Mesh(geometry1,material1);
scene.add(cube); 

const light = new THREE.PointLight(0xffffff, 50);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//------------------------------------------------------------------------------------------------------------------------------

const geometry2 = new THREE.BoxGeometry(1,2,1);
const material2 = new THREE.MeshLambertMaterial({color: 0xaddfe6});
const cube1 = new THREE.Mesh(geometry2,material2);
scene.add(cube1); 

//------------------------------------------------------------------------------------------------------------------------------

camera.position.z = 5

cube.position.x = -5;
cube1.position.x = 5;

function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.1
    cube.rotation.y += 0.1

    cube1.rotation.x += 0.1
    cube1.rotation.y += 0.1
    renderer.render(scene,camera);
}
animate();