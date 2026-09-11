/* ==========================================================================
   Gayatri Enterprise — Application Motion & Interactions
   ========================================================================== */

let selectedThickness = 9; // Default 9-inch main wall

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Scroll Reveal Observer
  initScrollAnimations();
  
  // Initialize Calculator defaults
  updateCalculator();

  // Dynamic Navbar Scroll Background
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(18, 20, 26, 0.95)';
      navbar.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.background = 'rgba(18, 20, 26, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  });
  
  // Close custom dropdown & mobile menu on outside click
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('thicknessDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }

    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('mobileNavToggle');
    if (navLinks && navLinks.classList.contains('open')) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileNav();
      }
    }
  });
});

/* Mobile Navigation Handlers */
function toggleMobileNav() {
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.getElementById('menuIcon');
  if (!navLinks) return;
  
  const isOpen = navLinks.classList.toggle('open');
  if (menuIcon) {
    menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
  }
}

function closeMobileNav() {
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.getElementById('menuIcon');
  if (navLinks && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    if (menuIcon) {
      menuIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    }
  }
}

/* Custom Dropdown Handlers */
function toggleThicknessDropdown() {
  const dropdown = document.getElementById('thicknessDropdown');
  if (dropdown) {
    dropdown.classList.toggle('open');
  }
}

function chooseThickness(val, text) {
  selectedThickness = val;
  
  // Update trigger text
  const textSpan = document.getElementById('selectedThicknessText');
  if (textSpan) textSpan.innerText = text;
  
  // Update active state in menu
  const opt9 = document.getElementById('opt9');
  const opt4 = document.getElementById('opt4');
  
  if (val === 9) {
    opt9?.classList.add('active');
    opt4?.classList.remove('active');
  } else {
    opt4?.classList.add('active');
    opt9?.classList.remove('active');
  }
  
  // Close menu
  document.getElementById('thicknessDropdown')?.classList.remove('open');
  
  // Recalculate
  updateCalculator();
}

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

/* Calculator Logic */
function updateCalculator() {
  const lengthInput = document.getElementById('wallLength');
  const heightInput = document.getElementById('wallHeight');
  
  if (!lengthInput || !heightInput) return;
  
  const length = parseInt(lengthInput.value) || 50;
  const height = parseInt(heightInput.value) || 10;
  
  document.getElementById('lenVal').innerText = `${length} ft`;
  document.getElementById('heightVal').innerText = `${height} ft`;
  
  // Total Wall Surface Area
  const area = length * height;
  
  // Brick multiplier (9-inch wall = 9 bricks/sq.ft, 4.5-inch wall = 4.5 bricks/sq.ft)
  const multiplier = selectedThickness === 9 ? 9 : 4.5;
  const totalBricks = Math.ceil(area * multiplier);
  
  // Mortar bags saved (approx 1 bag saved per 320 bricks vs uneven clay bricks)
  const mortarBagsSaved = Math.ceil(totalBricks / 320);
  
  // Financial Savings
  const brickPriceSaving = totalBricks * 3.0; // ₹3 saving per fly ash brick
  const plasterSaving = area * 8; // ₹8 per sq.ft plaster saving
  const totalNetSavings = Math.round(brickPriceSaving + plasterSaving);

  // Render to DOM
  document.getElementById('resArea').innerText = `${area.toLocaleString()} sq.ft`;
  document.getElementById('resBricks').innerText = `${totalBricks.toLocaleString()} Units`;
  document.getElementById('resMortar').innerText = `${mortarBagsSaved} Bags`;
  document.getElementById('resSavings').innerText = `₹ ${totalNetSavings.toLocaleString('en-IN')}`;
}

/* FAQ Accordion Toggle */
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  // Re-open clicked item if it was closed
  if (!isOpen) item.classList.add('open');
  // Re-render icons after state change
  lucide.createIcons();
}


