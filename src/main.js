import '../style.css';
import Scene3D from './js/3dScene.js';
import Animations from './js/animations.js';
import Navigation from './js/navigation.js';
import GalleryFilter from './js/galleryFilter.js';
import ContactForm from './js/contactForm.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initializePortfolio();
});

function initializePortfolio() {
  // Initialize 3D scene
  const heroCanvasContainer = document.getElementById('hero-canvas-container');
  if (heroCanvasContainer) {
    const scene = new Scene3D(heroCanvasContainer);
  }
  
  // Initialize animations
  const animations = new Animations();
  
  // Initialize navigation
  const navigation = new Navigation();
  
  // Initialize gallery filter
  const galleryFilter = new GalleryFilter();
  
  // Initialize contact form
  const contactForm = new ContactForm();
}