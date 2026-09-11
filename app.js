/* ==========================================================================
   Gayatri Enterprise — Motion & Apple-Style Scroll System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Apple-Style Blur Reveal Animations & Grid Staggering
  initScrollAnimations();

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
  const gridContainers = document.querySelectorAll('.advantages-grid, .testimonials-grid, .comparison-grid, .maps-grid, .gallery-grid, .hero-stats-bar');
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
