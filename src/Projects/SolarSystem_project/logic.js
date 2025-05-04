// Import Three.js library (make sure to include it in your HTML file)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a function to generate celestial bodies
function createCelestialBody(radius, color, position) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const body = new THREE.Mesh(geometry, material);
    body.position.set(position.x, position.y, position.z);
    return body;
}

// Create the sun
const sun = createCelestialBody(6, 0xffff00, { x: 0, y: 0, z: 0 });
scene.add(sun);

// Create Earth and its orbit
const earthOrbit = new THREE.Object3D();
scene.add(earthOrbit);
const earth = createCelestialBody(1, 0x0000ff, { x: 15, y: 0, z: 0 });
earthOrbit.add(earth);

// Create Moon and its orbit
const moonOrbit = new THREE.Object3D();
earth.add(moonOrbit);
const moon = createCelestialBody(0.3, 0xcccccc, { x: 2, y: 0, z: 0 });
moonOrbit.add(moon);

// Create Mars and its orbit
const marsOrbit = new THREE.Object3D();
scene.add(marsOrbit);
const mars = createCelestialBody(1, 0xff0000, { x: 22, y: 0, z: 0 });
marsOrbit.add(mars);

// Create Jupiter and its orbit
const jupiterOrbit = new THREE.Object3D();
scene.add(jupiterOrbit);
const jupiter = createCelestialBody(2, 0xffa500, { x: 30, y: 0, z: 0 });
jupiterOrbit.add(jupiter);

// Position camera
camera.position.z = 50;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate planets and moons
    earthOrbit.rotation.y += 0.01;
    moonOrbit.rotation.y += 0.03;
    marsOrbit.rotation.y += 0.008;
    jupiterOrbit.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});