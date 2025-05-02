export default class ContactForm {
  constructor() {
    // DOM elements
    this.form = document.getElementById('contactForm');
    
    // Initialize
    if (this.form) {
      this.init();
    }
  }
  
  init() {
    // Add submit event listener
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Add input event listeners
    const formInputs = this.form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('input', this.validateInput.bind(this));
      input.addEventListener('blur', this.validateInput.bind(this));
    });
  }
  
  validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Basic validation
    let isValid = true;
    let errorMessage = '';
    
    if (value === '') {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (input.type === 'email' && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
    
    // Update UI
    this.updateInputValidation(input, isValid, errorMessage);
    
    return isValid;
  }
  
  updateInputValidation(input, isValid, errorMessage) {
    // Find or create error element
    let errorElement = input.parentElement.querySelector('.error-message');
    
    if (!isValid) {
      input.classList.add('invalid');
      
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentElement.appendChild(errorElement);
      }
      
      errorElement.textContent = errorMessage;
    } else {
      input.classList.remove('invalid');
      
      if (errorElement) {
        errorElement.remove();
      }
    }
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  validateForm() {
    const formInputs = this.form.querySelectorAll('input, textarea');
    let formIsValid = true;
    
    formInputs.forEach(input => {
      const event = { target: input };
      const inputIsValid = this.validateInput(event);
      
      if (!inputIsValid) {
        formIsValid = false;
      }
    });
    
    return formIsValid;
  }

  
  handleSubmit(e) {
    e.preventDefault();
  
    // Validate form
    if (!this.validateForm()) return;
  
    this.setFormLoading(true);
  
    // Using Formspree endpoint
    const formData = new FormData(this.form);
    
    fetch('https://formspree.io/f/xzzrdqqd', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      // Success! Reset form and show message
      this.form.reset(); // This clears all form fields
      this.showFormMessage('Thank you! Your message has been sent.', 'success');
      
      // Optional: Clear any validation errors
      this.form.querySelectorAll('.invalid').forEach(el => {
        el.classList.remove('invalid');
      });
      this.form.querySelectorAll('.error-message').forEach(el => {
        el.remove();
      });
    })
    .catch(error => {
      this.showFormMessage('Failed to send message. Please try again.', 'error');
    })
    .finally(() => {
      this.setFormLoading(false);
    });
  }
    
    // In a real application, you would send the data to a server:
  
    // const data = {
    //   name: "John Doe",
    //   email: "john@example.com",
    //   subject: "Portfolio Feedback",
    //   message: "This is a test message.",
    // };
    
    // fetch('http://localhost:5173/submit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       // Log error details for better debugging
    //       return response.json().then(err => {
    //         console.error('Server responded with an error:', err);
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then(responseData => {
    //     console.log('Success:', responseData);
    //     alert('Thank you for your message! It has been sent successfully.');
    //     // Reset the form if needed
    //     // Example: document.querySelector('form').reset();
    //   })
    //   .catch(error => {
    //     console.error('Fetch error:', error);
    //     alert('An error occurred while sending your message. Please try again later.');
    //   });
    
  
  setFormLoading(isLoading) {
    const submitButton = this.form.querySelector('button[type="submit"]');
    
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';
    } else {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send Message';
    }
  }
  
  showFormMessage(message, type) {
    // Find or create message element
    let messageElement = this.form.querySelector('.form-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      this.form.appendChild(messageElement);
    }
    
    // Set message
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      messageElement.style.opacity = '0';
      setTimeout(() => {
        messageElement.remove();
      }, 300);
    }, 5000);
  }
}