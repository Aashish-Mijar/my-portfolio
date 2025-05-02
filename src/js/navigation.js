export default class Navigation {
  constructor() {
    // DOM elements
    this.navbar = document.querySelector('.navbar');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navLinks = document.querySelector('.nav-links');
    this.navItems = document.querySelectorAll('.nav-links a');
    
    // Scroll position
    this.lastScrollTop = 0;
    
    // Initialize
    this.init();
  }
  
  init() {
    // Add event listeners
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.menuToggle.addEventListener('click', this.toggleMenu.bind(this));
    this.navItems.forEach(item => {
      item.addEventListener('click', this.handleNavItemClick.bind(this));
    });
    
    // Set initial active state
    this.setActiveNavItem();
    
    // Check scroll position on initialization
    this.handleScroll();
  }
  
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add or remove 'scrolled' class based on scroll position
    if (scrollTop > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
    
    // Detect scroll direction for hiding/showing navbar
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      // Scrolling down
      this.navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      this.navbar.style.transform = 'translateY(0)';
    }
    
    this.lastScrollTop = scrollTop;
    
    // Update active nav item on scroll
    this.setActiveNavItem();
  }
  
  toggleMenu() {
    this.navLinks.classList.toggle('active');
    this.menuToggle.classList.toggle('active');
    
    // Animate menu toggle bars
    const bars = this.menuToggle.querySelectorAll('.bar');
    if (this.menuToggle.classList.contains('active')) {
      bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  }
  
  handleNavItemClick(e) {
    // Close mobile menu if open
    if (this.navLinks.classList.contains('active')) {
      this.toggleMenu();
    }
    
    // Get the href attribute
    const targetId = e.currentTarget.getAttribute('href');
    
    // If it's an anchor link, smoothly scroll to the target
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate position with navbar offset
        const navbarHeight = this.navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
  
  setActiveNavItem() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Get current scroll position
    const scrollPosition = window.scrollY + this.navbar.offsetHeight + 50;
    
    // Find the current section
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all nav items
        this.navItems.forEach(item => {
          item.classList.remove('active');
        });
        
        // Add active class to current section's nav item
        const currentId = section.getAttribute('id');
        const currentNavItem = document.querySelector(`.nav-links a[href="#${currentId}"]`);
        
        if (currentNavItem) {
          currentNavItem.classList.add('active');
        }
      }
    });
  }
}