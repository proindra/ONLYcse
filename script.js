// ============================================
// THEME MANAGEMENT
// ============================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.setAttribute('title', 'Switch to Light Mode');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('title', 'Switch to Dark Mode');
  }
}

initializeTheme();

// ============================================
// TOAST NOTIFICATION
// ============================================

const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================
// HAMBURGER MENU
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// RIPPLE EFFECT
// ============================================

document.querySelectorAll('.btn, .btn-primary-sm').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left - 5) + 'px';
    ripple.style.top = (e.clientY - rect.top - 5) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================
// NAVBAR ACTIVE STATE & SCROLL EFFECT
// ============================================

const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });

  navbar.style.boxShadow = pageYOffset > 50
    ? '0 10px 30px rgba(0, 0, 0, 0.2)'
    : 'var(--shadow-md)';
});

// ============================================
// FEATURE CARDS HOVER EFFECT
// ============================================

document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-12px) rotateX(5deg)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) rotateX(0deg)';
  });
});

// ============================================
// BUTTON INTERACTIONS (toast instead of alert)
// ============================================

document.querySelectorAll('.learning-card .btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    showToast('Learning path coming soon!');
  });
});

document.querySelectorAll('.contest-item .btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const name = this.closest('.contest-item').querySelector('h3').textContent;
    showToast(`Registered for: ${name}`);
  });
});

document.querySelectorAll('.event-card .btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const name = this.closest('.event-card').querySelector('h3').textContent;
    showToast(`Details for "${name}" coming soon!`);
  });
});



document.querySelector('.auth-btn').addEventListener('click', e => {
  e.preventDefault();
  showToast('Sign in page coming soon!');
});

const heroPrimaryBtn = document.querySelector('.hero-buttons .btn-primary');
const heroSecondaryBtn = document.querySelector('.hero-buttons .btn-secondary');

if (heroPrimaryBtn) {
  heroPrimaryBtn.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('opportunities').scrollIntoView({ behavior: 'smooth' });
  });
}



// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const revealElements = document.querySelectorAll('.feature-card, .learning-card, .event-card, .contest-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================

function animateCounter(element) {
  const target = parseInt(element.textContent.replace(/\D/g, ''));
  const increment = target / (2000 / 16);
  let current = 0;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = element.textContent.replace(/\d+/, target);
      clearInterval(counter);
    } else {
      element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item h4').forEach(stat => statsObserver.observe(stat));

// ============================================
// PAGE LOAD ANIMATION
// ============================================

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
