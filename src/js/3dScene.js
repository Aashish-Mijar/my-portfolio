import * as THREE from 'three';

export default class Scene3D {
  constructor(container) {
    // Setup
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Camera position
    this.camera.position.z = 15;
    
    // Renderer setup
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
    
    // Lights
    this.addLights();
    
    // Initialize objects
    this.stars = [];
    this.photos = [];
    this.photoGroup = new THREE.Group();
    this.scene.add(this.photoGroup);
    
    // Create objects
    this.createStars();
    this.createPhotos();
    
    // Events
    window.addEventListener('resize', this.onWindowResize.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('wheel', this.onScroll.bind(this));
    
    // Animation
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2(0, 0);
    this.scrollSpeed = 0;
    this.targetRotation = 0;
    
    // Start animation loop
    this.animate();
  }
  
  addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x4E7BFF, 1, 100);
    pointLight1.position.set(5, 5, 5);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x4ECDC4, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    this.scene.add(pointLight2);
  }
  
  createStars() {
    const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const starMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x4E7BFF,
      shininess: 100
    });
    
    // Create 200 stars
    for (let i = 0; i < 200; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial.clone());
      
      // Random position in a sphere
      const radius = Math.random() * 20 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      star.position.x = radius * Math.sin(phi) * Math.cos(theta);
      star.position.y = radius * Math.sin(phi) * Math.sin(theta);
      star.position.z = radius * Math.cos(phi);
      
      // Random scale
      const scale = Math.random() * 2 + 1;
      star.scale.set(scale, scale, scale);
      
      // Store initial position for animation
      star.userData.initialPosition = star.position.clone();
      star.userData.speed = Math.random() * 0.02 + 0.01;
      star.userData.offset = Math.random() * Math.PI * 2;
      
      this.stars.push(star);
      this.scene.add(star);
    }
  }
  
//  createPhotos() {
//   const images = [
//     'Img_3D/img1.jpeg',
//     'Img_3D/img2.jpeg',
//     'Img_3D/img3.jpeg',
//     'Img_3D/img4.jpeg',
//     'Img_3D/img5.jpeg',
//     'Img_3D/img6.jpeg',
//     'Img_3D/img7.jpeg',
//     'Img_3D/img8.jpeg',
//     'Img_3D/img9.jpeg'
//   ];

//   const textureLoader = new THREE.TextureLoader();
//   this.photoGroup = new THREE.Group();
//   this.photos = [];

//   // Configuration
//   const config = {
//     photoWidth: 4,
//     photoHeight: 3,
//     circleRadius: 8,
//     rotationSpeed: 0.005
//   };

//   images.forEach((url, index) => {
//     textureLoader.load(url, (texture) => {
//       // Improve texture quality
//       texture.anisotropy = 16;
      
//       const material = new THREE.MeshPhongMaterial({
//         map: texture,
//         side: THREE.DoubleSide,
//         specular: 0x111111,
//         shininess: 30
//       });

//       const photo = new THREE.Mesh(
//         new THREE.PlaneGeometry(config.photoWidth, config.photoHeight), 
//         material
//       );
      
//       // Position photos in a circle
//       const angle = (index / images.length) * Math.PI * 2;
//       photo.position.x = Math.cos(angle) * config.circleRadius;
//       photo.position.z = Math.sin(angle) * config.circleRadius;
      
//       // Rotate photos to face center with slight downward tilt
//       photo.rotation.y = -angle;
//       photo.rotation.x = -0.2;
      
//       this.photos.push(photo);
//       this.photoGroup.add(photo);
      
//       // Start rotation when all photos are loaded
//       if (this.photos.length === images.length) {
//         this.scene.add(this.photoGroup);
//         this.startRotation(config);
//       }
//     }, undefined, (error) => {
//       console.error('Error loading texture:', error);
//     });
//   });
// }

// startRotation(config) {
//   const animate = () => {
//     requestAnimationFrame(animate);
//     this.photoGroup.rotation.y += config.rotationSpeed;
//   };
//   animate();
// }


  createPhotos() {
    const images = [
      'Img_3D/img1.jpeg',
      'Img_3D/img2.jpeg',
      'Img_3D/img3.jpeg',
      'Img_3D/img4.jpeg',
      'Img_3D/img5.jpeg',
      'Img_3D/img6.jpeg' // Need at least 6 images for cube faces
    ];
  
    const textureLoader = new THREE.TextureLoader();
    this.cubeGroup = new THREE.Group();
    const cubeSize = 8; // Size of the cube
  
    // Create materials for each face
    const materials = images.map(url => {
      return new THREE.MeshBasicMaterial({
        map: textureLoader.load(url),
        side: THREE.DoubleSide
      });
    });
  
    // Create cube geometry
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    
    // Create cube mesh
    this.photoCube = new THREE.Mesh(geometry, materials);
    this.cubeGroup.add(this.photoCube);
    this.scene.add(this.cubeGroup);
  
    // Set initial rotation and position
    this.cubeGroup.position.y = 2; // Raise slightly
    this.rotationSpeed = 0.005;
  
    // Animation loop
    this.animateCube = () => {
      this.cubeGroup.rotation.x += this.rotationSpeed;
      this.cubeGroup.rotation.y += this.rotationSpeed * 0.7;
      requestAnimationFrame(this.animateCube);
    };
    this.animateCube();
  }




  onScroll(event) {
    // Update scroll speed based on wheel delta
    this.scrollSpeed += event.deltaY * 0.0001;
  }
  
  onWindowResize() {
    // Update camera
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    // Update renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    const elapsedTime = this.clock.getElapsedTime();
    
    // Animate stars
    this.stars.forEach(star => {
      const initialPos = star.userData.initialPosition;
      const speed = star.userData.speed;
      const offset = star.userData.offset;
      
      // Oscillate stars around their initial position
      star.position.x = initialPos.x + Math.sin(elapsedTime * speed + offset) * 0.5;
      star.position.y = initialPos.y + Math.cos(elapsedTime * speed + offset) * 0.5;
      
      // Pulse star brightness
      star.material.emissiveIntensity = 0.5 + Math.sin(elapsedTime * speed * 2 + offset) * 0.3;
    });
    
    // Apply scroll momentum
    this.targetRotation += this.scrollSpeed;
    this.photoGroup.rotation.y = THREE.MathUtils.lerp(
      this.photoGroup.rotation.y,
      this.targetRotation,
      0.1
    );
    
    // Add friction to scroll speed
    this.scrollSpeed *= 0.95;
    
    // Subtle camera movement based on mouse position
    this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouse.y * 1 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
    
    // Render
    this.renderer.render(this.scene, this.camera);
  }
  
  // Clean up resources
  dispose() {
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('wheel', this.onScroll.bind(this));
    
    // Dispose geometries and materials
    this.stars.forEach(star => {
      star.geometry.dispose();
      star.material.dispose();
    });
    
    this.photos.forEach(photo => {
      photo.geometry.dispose();
      photo.material.dispose();
      if (photo.material.map) {
        photo.material.map.dispose();
      }
    });
    
    // Remove from DOM
    this.container.removeChild(this.renderer.domElement);
    
    // Dispose renderer
    this.renderer.dispose();
  }
}