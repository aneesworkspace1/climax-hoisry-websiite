/* Enhanced Splash Screen - 3 Second Duration with Diagonal Bar Animation */

class NewSplashScreen {
  constructor() {
    this.splashElement = null;
    this.logoElement = null;
    this.panelLeft = null;
    this.panelRight = null;
    this.bars = [];
    this.isAnimating = false;
    this.hasShown = false;
    
    // Show splash screen on every page reload/first visit
    this.shouldShow = true;
    
    this.init();
  }
  
  init() {
    if (!this.shouldShow) {
      return;
    }
    
    this.createSplashHTML();
    this.bindEvents();
    this.startAnimation();
  }
  
  createSplashHTML() {
    // Create splash screen container
    this.splashElement = document.createElement('div');
    this.splashElement.className = 'new-splash-screen';
    this.splashElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #ffffff;
      z-index: 10000;
      overflow: hidden;
    `;
    
    // Create split panels
    this.panelLeft = document.createElement('div');
    this.panelLeft.className = 'split-panel-left';
    this.panelLeft.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background: #ffffff;
      z-index: 10001;
      transition: transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    this.panelRight = document.createElement('div');
    this.panelRight.className = 'split-panel-right';
    this.panelRight.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      background: #ffffff;
      z-index: 10001;
      transition: transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    // Create logo element
    this.logoElement = document.createElement('img');
    this.logoElement.className = 'splash-logo-new';
    this.logoElement.src = './assets/images/logo.png';
    this.logoElement.alt = 'Climax Hosiery';
    this.logoElement.loading = 'eager';
    this.logoElement.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: auto;
      opacity: 0;
      z-index: 10002;
      transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    // Create diagonal bars for the enhanced animation
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement('div');
      bar.className = `diagonal-bar bar-${i + 1}`;
      bar.style.cssText = `
        position: absolute;
        width: 200vw;
        height: 50vh;
        background: #000000;
        transform: rotate(-45deg) translateX(200vw);
        transform-origin: center;
        z-index: 10003;
        transition: transform 300ms cubic-bezier(0.42, 0, 0.58, 1);
      `;
      
      // Position bars with proper spacing for diagonal sweep
      const topOffset = -30 + (i * 50);
      bar.style.top = `${topOffset}vh`;
      bar.style.right = '-75vw';
      
      this.bars.push(bar);
    }
    
    // Assemble splash screen
    this.splashElement.appendChild(this.panelLeft);
    this.splashElement.appendChild(this.panelRight);
    this.splashElement.appendChild(this.logoElement);
    this.bars.forEach(bar => this.splashElement.appendChild(bar));
    
    // Add to DOM
    document.body.appendChild(this.splashElement);
    document.body.classList.add('splash-active');
  }
  
  bindEvents() {
    // Skip animation on click/tap
    this.splashElement.addEventListener('click', () => {
      if (this.isAnimating) {
        this.skipAnimation();
      }
    });
    
    // Skip on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isAnimating) {
        this.skipAnimation();
      }
    });
  }
  
  startAnimation() {
    this.isAnimating = true;
    
    // FRAME 1: Blank White (0-200ms) - already set
    
    // FRAME 2: Split Transition & Logo Reveal (200-600ms)
    setTimeout(() => {
      this.panelLeft.style.transform = 'translateX(-100%)';
      this.panelRight.style.transform = 'translateX(100%)';
      this.logoElement.style.opacity = '1';
    }, 200);
    
    // FRAME 3: Logo Hold (600-900ms) - logo is visible
    
    // FRAME 4: Zoom & Fade (900-1300ms)
    setTimeout(() => {
      this.logoElement.style.transition = 'all 400ms cubic-bezier(0.55, 0.085, 0.68, 0.53)';
      this.logoElement.style.transform = 'translate(-50%, -50%) scale(12)';
      this.logoElement.style.opacity = '0';
    }, 900);
    
    // FRAME 5: Background Cross-Fade (1300-1500ms)
    setTimeout(() => {
      this.splashElement.style.transition = 'background-color 200ms linear';
      this.splashElement.style.backgroundColor = '#000000';
    }, 1300);
    
    // FRAME 6: Bar-1 Sweep (1500-1650ms) - First diagonal bar
    setTimeout(() => {
      this.bars[0].style.transitionDelay = '0ms';
      this.bars[0].style.transform = 'rotate(-45deg) translateX(0)';
    }, 1500);
    
    // FRAME 7: Bar-2 + Bar-3 Join (1650-1800ms) - Remaining bars with stagger
    setTimeout(() => {
      this.bars[1].style.transitionDelay = '50ms';
      this.bars[1].style.transform = 'rotate(-45deg) translateX(0)';
      
      setTimeout(() => {
        this.bars[2].style.transitionDelay = '0ms';
        this.bars[2].style.transform = 'rotate(-45deg) translateX(0)';
      }, 75);
    }, 1650);
    
    // FRAME 8: Bars Slide Off & Reveal Homepage (1800-3000ms)
    setTimeout(() => {
      this.bars.forEach((bar, index) => {
        setTimeout(() => {
          bar.style.transitionDelay = `${(2 - index) * 50}ms`;
          bar.style.transform = 'rotate(-45deg) translateX(-200vw)';
        }, (2 - index) * 100);
      });
    }, 1800);
    
    // Complete animation (3000ms - 3 seconds total)
    setTimeout(() => {
      this.completeAnimation();
    }, 3000);
  }
  
  skipAnimation() {
    if (!this.isAnimating) return;
    this.completeAnimation();
  }
  
  completeAnimation() {
    this.isAnimating = false;
    
    // Remove splash screen
    if (this.splashElement) {
      this.splashElement.style.opacity = '0';
      this.splashElement.style.transition = 'opacity 200ms ease';
      document.body.classList.remove('splash-active');
      
      // Clean up DOM after transition
      setTimeout(() => {
        if (this.splashElement && this.splashElement.parentNode) {
          this.splashElement.parentNode.removeChild(this.splashElement);
        }
      }, 200);
    }
    
    // Trigger any post-splash initialization
    this.onSplashComplete();
  }
  
  onSplashComplete() {
    // Dispatch custom event for other scripts to listen to
    const event = new CustomEvent('splashComplete', {
      detail: { timestamp: Date.now() }
    });
    document.dispatchEvent(event);
    
    // Initialize main site animations
    if (window.climaxHosiery && typeof window.climaxHosiery.setupScrollAnimations === 'function') {
      window.climaxHosiery.setupScrollAnimations();
    }
  }
}

// Initialize splash screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Show splash on homepage every time (reload or first visit)
  const isHomepage = window.location.pathname === '/' || 
                    window.location.pathname === '/index.html' ||
                    window.location.pathname.endsWith('/') ||
                    window.location.pathname === '';
  
  if (isHomepage && !window.splashDisabled) {
    window.newSplashScreen = new NewSplashScreen();
  }
});

// Export for potential external use
window.NewSplashScreen = NewSplashScreen;