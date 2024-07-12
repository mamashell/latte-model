import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xffffff)); // hex for white

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // enable damping

const loader = new GLTFLoader();

let uno;
loader.load(
    './cafe_latte_with_art.glb', // Replace with the path to your model
    function (gltf) {
        uno = gltf.scene;
        scene.add(uno);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

camera.position.z = 4;

const ambientLight = new THREE.AmbientLight(0xffffff); // white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light at full intensity
directionalLight.position.set(5, 5, 5).normalize(); // Position the light
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls with damping
    renderer.render(scene, camera);
  }
  
  animate();