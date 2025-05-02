import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default class Animations {
  constructor() {
    this.initLoader();
    this.initHeroAnimations();
    this.initScrollAnimations();
    this.initSkillBars();
  }
  
  initLoader() {
    const loader = document.querySelector('.loader');
    const progressFill = document.querySelector('.progress-fill');
    
    // Animate the progress bar
    gsap.to(progressFill, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        // Fade out the loader
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            loader.style.display = 'none';
            // Start page animations
            this.animateHeroElements();
          }
        });
      }
    });
  }
  
  initHeroAnimations() {
    // Prepare hero elements for animation
    gsap.set('.hero-title, .hero-subtitle, .hero-description, .hero-cta', { 
      y: 50, 
      opacity: 0 
    });
  }
  
  animateHeroElements() {
    // Animate hero elements
    const heroElements = [
      '.hero-title',
      '.hero-subtitle',
      '.hero-description',
      '.hero-cta'
    ];
    
    gsap.timeline()
      .to('.navbar', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
      .to(heroElements, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out'
      });
  }
  
  initScrollAnimations() {
    // Common animation for section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      });
    });
    
    // About section animations
    this.animateAboutSection();
    
    // Experience timeline animations
    this.animateExperienceTimeline();
    
    // Gallery items animations
    this.animateGalleryItems();
    
    // Contact section animations
    this.animateContactSection();
  }
  
  animateAboutSection() {
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImage && aboutText) {
      gsap.from(aboutImage, {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from(aboutText, {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }
  
  initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      
      gsap.set(bar, { width: 0 });
      
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        width: width,
        duration: 1.5,
        ease: 'power2.out'
      });
    });
  }
  
  animateExperienceTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      const isEven = index % 2 === 0;
      const xOffset = isEven ? 50 : -50;
      
      // Adjust for mobile layout
      const xValue = window.innerWidth <= 1024 ? 50 : xOffset;
      
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: xValue,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      });
    });
  }
  
  animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });
  }
  
  animateContactSection() {
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo && contactForm) {
      gsap.from(contactInfo, {
        scrollTrigger: {
          trigger: '.contact-container',
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from(contactForm, {
        scrollTrigger: {
          trigger: '.contact-container',
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }
}