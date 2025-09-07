/* Enhanced Main JavaScript with Dark Mode and Mobile Improvements */

class EnhancedClimaxHosiery {
  constructor() {
    this.init();
    this.initNewDarkMode();
    this.initMobileScrollEnhancements();
    this.initResponsiveScaling();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollAnimations();
    this.setupHeaderScrollEffect();
    this.setupMobileMenu();
    this.setupProductFilters();
    this.setupContactForm();
    this.setupGallery();
    this.animateStats();
    this.setupYarnAnimation();
  }

  // New Dark Mode Implementation - "One-Click Night Shift"
  initNewDarkMode() {
    this.darkModeToggle = this.createDarkModeToggle();
    this.loadDarkModePreference();
    this.setupDarkModeListeners();
  }

  createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '<span class="toggle-icon">☾</span>';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.title = 'Toggle dark mode';
    document.body.appendChild(toggle);
    return toggle;
  }

  loadDarkModePreference() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  setupDarkModeListeners() {
    this.darkModeToggle.addEventListener('click', () => {
      this.darkModeToggle.classList.add('switching');
      setTimeout(() => {
        this.darkModeToggle.classList.remove('switching');
      }, 280);
      this.toggleDarkMode();
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          this.enableDarkMode();
        } else {
          this.disableDarkMode();
        }
      }
    });
  }

  toggleDarkMode() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    this.darkModeToggle.innerHTML = '<span class="toggle-icon">🌞</span>';
    this.darkModeToggle.title = 'Switch to light mode';
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    this.darkModeToggle.innerHTML = '<span class="toggle-icon">☾</span>';
    this.darkModeToggle.title = 'Switch to dark mode';
    localStorage.setItem('theme', 'light');
  }

  // Enhanced Mobile Scroll
  initMobileScrollEnhancements() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (this.isMobile) {
      this.setupMobileScrollBehavior();
      this.setupTouchScrollOptimization();
    }
  }

  setupMobileScrollBehavior() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          this.smoothScrollToElement(targetElement);
        }
      });
    });
  }

  smoothScrollToElement(element) {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
    const targetPosition = element.offsetTop - headerHeight;
    
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      this.customSmoothScroll(targetPosition);
    }
  }

  customSmoothScroll(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  setupTouchScrollOptimization() {
    let isScrolling = false;
    
    window.addEventListener('touchstart', () => {
      isScrolling = true;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isScrolling = false;
    }, { passive: true });

    if (this.isIOS) {
      document.body.addEventListener('touchmove', (e) => {
        if (!isScrolling) {
          e.preventDefault();
        }
      }, { passive: false });
    }
  }

  // Responsive Scaling
  initResponsiveScaling() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    this.setupViewportTracking();
    this.calculateOptimalScaling();
    this.applyResponsiveScaling();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.updateViewport();
        this.calculateOptimalScaling();
        this.applyResponsiveScaling();
      }, 150);
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.updateViewport();
        this.calculateOptimalScaling();
        this.applyResponsiveScaling();
      }, 300);
    });
  }

  setupViewportTracking() {
    if ('visualViewport' in window) {
      window.visualViewport.addEventListener('resize', () => {
        this.updateViewport();
        this.calculateOptimalScaling();
      });
    }
  }

  updateViewport() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight
    };
  }

  calculateOptimalScaling() {
    const { width } = this.viewport;
    
    let scaleFactor = 1;
    if (width <= 480) {
      scaleFactor = 0.85;
    } else if (width <= 768) {
      scaleFactor = 0.9;
    } else if (width <= 1024) {
      scaleFactor = 0.95;
    }
    
    this.scalingConfig = { scaleFactor };
  }

  applyResponsiveScaling() {
    const { scaleFactor } = this.scalingConfig;
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);
  }

  // Enhanced Mobile Menu with Scroll
  setupMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (!mobileBtn || !nav) return;

    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileBtn.innerHTML = isOpen ? '✕' : '☰';
      
      // Add scroll functionality when menu is open
      if (isOpen) {
        this.enableMobileMenuScroll(nav);
      }
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileBtn.contains(e.target)) {
        nav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.innerHTML = '☰';
      }
    });
  }

  enableMobileMenuScroll(nav) {
    // Ensure the nav has proper scroll behavior
    nav.style.maxHeight = '60vh';
    nav.style.overflowY = 'auto';
    nav.style.webkitOverflowScrolling = 'touch';
  }

  // Rest of the original methods remain the same
  setupEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      link.addEventListener('click', e => {
        if (!e.ctrlKey && !e.metaKey) {
          this.showPageTransition();
        }
      });
    });
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
      observer.observe(el);
    });
  }

  setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    });
  }

  setupProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!filterBtns.length || !productCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        productCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.classList.remove('visible');
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span class="loader"></span> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        this.showSuccessMessage('Thank you! Your message has been sent successfully.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });

    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearFieldError(field));
    });
  }

  validateField(field) {
    const isValid = field.checkValidity();
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (!isValid) {
      field.style.borderColor = '#ef4444';
      if (!errorElement) {
        const error = document.createElement('span');
        error.className = 'field-error';
        error.style.color = '#ef4444';
        error.style.fontSize = '.875rem';
        error.textContent = field.validationMessage;
        field.parentNode.appendChild(error);
      }
    } else {
      this.clearFieldError(field);
    }
  }

  clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setupGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img')?.src;
        if (imgSrc) {
          this.openLightbox(imgSrc);
        }
      });
    });
  }

  openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
    `;

    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: var(--border-radius);
    `;

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
      document.body.removeChild(lightbox);
    });

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        document.body.removeChild(lightbox);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateStat = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateStat);
        } else {
          stat.textContent = target.toLocaleString() + '+';
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateStat();
            observer.disconnect();
          }
        });
      });

      observer.observe(stat);
    });
  }

  setupYarnAnimation() {
    const yarnContainer = document.querySelector('.yarn-animation');
    if (!yarnContainer) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 300 300');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M150,50 Q250,100 150,150 Q50,200 150,250 Q250,200 150,150');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'var(--primary-red)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('opacity', '0.6');

    const animateTag = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
    animateTag.setAttribute('attributeName', 'transform');
    animateTag.setAttribute('type', 'rotate');
    animateTag.setAttribute('values', '0 150 150; 360 150 150');
    animateTag.setAttribute('dur', '20s');
    animateTag.setAttribute('repeatCount', 'indefinite');

    path.appendChild(animateTag);
    svg.appendChild(path);
    yarnContainer.appendChild(svg);
  }

  showPageTransition() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--primary-red);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: 1.2rem;
      transition: opacity 0.3s ease;
    `;
    overlay.innerHTML = '<span class="loader"></span>';
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 300);
    }, 800);
  }

  showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: var(--spacing-3) var(--spacing-4);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      transform: translateX(400px);
      transition: var(--transition);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
  window.climaxHosiery = new EnhancedClimaxHosiery();
  window.climaxHosiery.setActiveNavLink();
});

// Listen for splash completion
document.addEventListener('splashComplete', () => {
  if (window.climaxHosiery) {
    window.climaxHosiery.setupScrollAnimations();
    window.climaxHosiery.animateStats();
  }
});