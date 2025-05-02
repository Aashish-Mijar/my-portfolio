export default class GalleryFilter {
  constructor() {
    // DOM elements
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.galleryItems = document.querySelectorAll('.gallery-item');
    
    // Initialize
    this.init();
  }
  
  init() {
    // Add event listeners to filter buttons
    this.filterButtons.forEach(button => {
      button.addEventListener('click', this.filterGallery.bind(this));
    });
  }
  
  filterGallery(e) {
    // Get filter value
    const filter = e.target.getAttribute('data-filter');
    
    // Update active button
    this.filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Filter gallery items
    this.galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || filter === category) {
        // Show item with animation
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        // Hide item with animation
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }
}