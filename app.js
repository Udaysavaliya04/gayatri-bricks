/* ==========================================================================
   Gayatri Enterprise — Application Motion & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Scroll Reveal Observer
  initScrollAnimations();

  // Dynamic Navbar Scroll Background
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.style.background = 'rgba(18, 20, 26, 0.95)';
        navbar.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.6)';
      } else {
        navbar.style.background = 'rgba(18, 20, 26, 0.85)';
        navbar.style.boxShadow = 'none';
      }
    });
  }
});

/* IntersectionObserver for Smooth Scroll Animations */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
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
  // Re-render icons after state change
  if (window.lucide) {
    lucide.createIcons();
  }
}
