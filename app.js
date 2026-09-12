/* ==========================================================================
   Gayatri Enterprise — Motion & Apple-Style Scroll System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Reset scroll to top on page reload unless an anchor hash is explicitly provided
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  // Initialize Apple-Style Blur Reveal Animations & Grid Staggering
  initScrollAnimations();

  // Initialize Mobile Hamburger Menu Drawer Toggle
  initMobileMenu();


  // Initialize Trendy Scroll Counter Animation
  initCounterAnimations();


  // Initialize Smooth Parallax Image Scroll Effect
  initParallax();


  // Dynamic Navbar Glass Elevation
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }
});

/* Apple-Style Blur Reveal & Staggered Scroll Animations */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  // Auto-add staggered transition delays for grid cards
  const gridContainers = document.querySelectorAll('.about-facts-grid, .why-grid, .advantages-grid, .applications-grid, .testimonials-grid, .comparison-grid, .maps-grid, .gallery-grid, .hero-stats-bar');
  gridContainers.forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, idx) => {
      child.style.transitionDelay = `${idx * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Trigger once cleanly
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* FAQ Accordion Toggle */
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  // Re-open clicked item if it was closed
  if (!isOpen) item.classList.add('open');
  // Re-render lucide icons after state change
  if (window.lucide) {
    lucide.createIcons();
  }
}


/* Parallax Scroll Effect for Images */
function initParallax() {
  const parallaxTargets = document.querySelectorAll('.hero-visual-img, .gallery-slot-img, .parallax-img, [data-parallax]');
  if (!parallaxTargets.length) return;

  let ticking = false;

  function updateParallax() {
    const windowHeight = window.innerHeight;

    parallaxTargets.forEach(img => {
      const container = img.closest('.hero-visual-frame, .gallery-slot, .feature-visual-frame, .about-visual-card') || img.parentElement || img;
      const rect = container.getBoundingClientRect();

      if (rect.top < windowHeight && rect.bottom > 0) {
        const centerOffset = (rect.top + rect.height / 2) - (windowHeight / 2);
        const speed = parseFloat(img.dataset.parallaxSpeed) || 0.12;
        const translateY = Math.round(centerOffset * speed * -1);
        img.style.transform = `scale(1.12) translateY(${translateY}px)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateParallax, { passive: true });

  // Initial trigger
  updateParallax();
}


/* Trendy Animated Number Counter */
function initCounterAnimations() {
  const counterElements = document.querySelectorAll('.stat-block-num, .about-fact-val, [data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  counterElements.forEach(el => {
    // Parse target number, prefix, and suffix
    const htmlText = el.innerHTML.trim();
    // Extract raw text for number matching
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    const rawText = tempDiv.textContent.trim();

    const numMatch = rawText.match(/([0-9,]+)/);
    if (numMatch) {
      const numStr = numMatch[1].replace(/,/g, '');
      const targetVal = parseInt(numStr, 10);
      if (!isNaN(targetVal)) {
        el.dataset.targetVal = targetVal;
        el.dataset.hasComma = numMatch[1].includes(',');

        // Handle innerHTML structure (e.g. 600<span>+</span>)
        if (el.querySelector('span')) {
          const spanHtml = el.querySelector('span').outerHTML;
          el.dataset.suffixHtml = spanHtml;
          el.dataset.baseNum = numMatch[1];
        } else {
          const parts = rawText.split(numMatch[1]);
          el.dataset.prefix = parts[0] || '';
          el.dataset.suffix = parts[1] || '';
        }
        observer.observe(el);
      }
    }
  });
}

function animateCounter(el) {
  const target = parseInt(el.dataset.targetVal, 10);
  if (isNaN(target)) return;

  const hasComma = el.dataset.hasComma === 'true';
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const suffixHtml = el.dataset.suffixHtml || '';

  const duration = 2200; // 2.2 seconds smooth exponential count
  const startTime = performance.now();

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const current = Math.floor(eased * target);

    let formatted = hasComma ? current.toLocaleString('en-US') : current.toString();

    if (suffixHtml) {
      el.innerHTML = `${formatted}${suffixHtml}`;
    } else {
      el.innerHTML = `${prefix}${formatted}${suffix}`;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const finalFormatted = hasComma ? target.toLocaleString('en-US') : target.toString();
      if (suffixHtml) {
        el.innerHTML = `${finalFormatted}${suffixHtml}`;
      } else {
        el.innerHTML = `${prefix}${finalFormatted}${suffix}`;
      }
    }
  }

  requestAnimationFrame(update);
}


/* Mobile Hamburger Menu Drawer Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggleBtn.classList.contains('open');
    if (isOpen) {
      toggleBtn.classList.remove('open');
      drawer.classList.remove('open');
    } else {
      toggleBtn.classList.add('open');
      drawer.classList.add('open');
    }
  });

  // Close drawer when clicking any link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      drawer.classList.remove('open');
    });
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleBtn.classList.remove('open');
      drawer.classList.remove('open');
    }
  });
}
