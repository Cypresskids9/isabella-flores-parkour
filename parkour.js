import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const objects = []; //list-array
let raycaster; //raygun

let moveForward = false;
let moveBackwards = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now(); //curent time
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let camera, scene, controls, renderer;

init();
animate();
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 15;

  controls = new PointerLockControls(camera, document.body);

  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  instructions.addEventListener("click", function () {
    controls.lock();
  });
  controls.addEventListener("lock", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });
  controls.addEventListener("unlock", function () {
    blocker.style.display = "block";
    instructions.style.display = "";
  });

  scene.add(controls.getObject());

  const onKeyDown = function (event) {
    switch (event.code) {
      case "KeyW":
        moveForward = true;
        break;
      case "KeyA":
        moveLeft = true;
        break;
      case "KeyS":
        moveBackwards = true;
        break;
      case "KeyD":
        moveRight = true;
        break;
      case "Space":
        if (canJump === true) velocity.y += 400;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function (event) {
    switch (event.code) {
      case "KeyW":
        moveForward = false;
        break;
      case "KeyA":
        moveLeft = false;
        break;
      case "KeyS":
        moveBackwards = false;
        break;
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const planeGeometry = new THREE.PlaneGeometry(87, 76, 64, 64);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xb3d9ff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotateX(-1.57);
  scene.add(plane);
  objects.push(plane);

  const boxGeo = new THREE.BoxGeometry(3,3,3);
  const boxMat = new THREE.MeshLambertMaterial({ color: 0xb3d9ff });
  const box1 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box1);
  objects.push(box1);
  box1.position.y = 10;

  const box2 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box2);
  objects.push(box2);
  box2.position.y = 15
  box2.position.x = 13
  box2.position.z = 28

  const box3 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box3);
  objects.push(box3);
  box3.position.y = 20
  box3.position.x = 16
  box3.position.z = 10

  const box4 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box4);
  objects.push(box4);
  box4.position.y = 25
  box4.position.x = -25
  box4.position.z =  16

  const box5 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box5);
  objects.push(box5);
  box5.position.y = 32
  box5.position.x = -32
  box5.position.z = -24

  const box6 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box6);
  objects.push(box6);
  box6.position.y = 38
  box6.position.x = 10
  box6.position.z = -32
  
  const box7 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box7);
  objects.push(box7);
  box7.position.y = 42
  box7.position.x = 18
  box7.position.z = 28

  const box8 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box8);
  objects.push(box8);
  box8.position.y = 49
  box8.position.x = 27
  box8.position.z = -50

  const box9 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box9);
  objects.push(box9);
  box9.position.y = 53
  box9.position.x = 42
  box9.position.z = 68

  const box10 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box10);
  objects.push(box10);
  box10.position.y = 56
  box10.position.x = 47
  box10.position.z = 73

  const box11 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box11);
  objects.push(box11);
  box11.position.y = 60
  box11.position.x = 50
  box11.position.z = -71

  const box12 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box12);
  objects.push(box12);
  box12.position.y = 64
  box12.position.x = 57
  box12.position.z = -78

  const box13 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box13);
  objects.push(box13);
  box13.position.y = 68
  box13.position.x = 60
  box13.position.z = 56

  const box14 = new THREE.Mesh(boxGeo,boxMat);
  scene.add(box14);
  objects.push(box14);
  box14.position.y = 72
  box14.position.x = 64
  box14.position.z = -71

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now();
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 1;

    const intersections = raycaster.intersectObjects(objects, false);
    const onObject = intersections.length > 0;
    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x *10.0* delta
    velocity.z -= velocity.z *10.0* delta
    velocity.y -= 9.8 *100.0* delta

    direction.z = Number(moveForward) - Number(moveBackwards)
    direction.x = Number(moveRight) - Number(moveLeft)
    direction.normalize()

    if (moveForward || moveBackwards)   velocity.z -= direction.z *400.0* delta 
    if (moveLeft || moveRight)   velocity.x -= direction.x *400.0* delta 

    if(onObject === true){
      velocity.y = Math.max(0,velocity.y)
      canJump = true
    }
  controls.moveRight(-velocity.x*delta)
  controls.moveForward(-velocity.z*delta)
  controls.getObject().position.y += (velocity.y*delta)
  if(controls.getObject().position.y < 0){
    velocity.y = 0
    controls.getObject().position.y = 10
    canJump = true
  }
  }
  prevTime = time;
  renderer.render(scene, camera);
}

