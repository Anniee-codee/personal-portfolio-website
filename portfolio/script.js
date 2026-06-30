/* =============================================================
   Features: Scroll effects, Reveal animations, Skill bars,
   Dark/Light mode, Form validation, Back to top
   ============================================================= */
/* -------------------------------------------------------------
   1. SCROLL PROGRESS BAR
   Updates the thin yellow bar at the top as user scrolls
   ------------------------------------------------------------- */
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', function () {
  const scrollTop = document.documentElement.scrollTop;
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / totalHeight) * 100;
  scrollProgress.style.width = progress + '%';
});


/* -------------------------------------------------------------
   2. NAVBAR — Shrink on scroll + Active link highlighting
   ------------------------------------------------------------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {

  // Add 'scrolled' class when user scrolls past 60px
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight the nav link matching the current visible section
  let currentSection = '';

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });

});


/* -------------------------------------------------------------
   3. HAMBURGER MENU — Mobile navigation toggle
   ------------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu when any nav link is clicked
navLinksContainer.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});


/* -------------------------------------------------------------
   4. REVEAL ON SCROLL — Fade elements in as they enter viewport
   Uses IntersectionObserver for performance (no scroll events)
   ------------------------------------------------------------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});


/* -------------------------------------------------------------
   5. SKILL BAR ANIMATION
   Fills each skill bar to its data-w percentage when visible
   ------------------------------------------------------------- */
const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.getAttribute('data-w');
      entry.target.style.width = targetWidth + '%';
      // Unobserve after animating — no need to re-trigger
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(function (bar) {
  skillObserver.observe(bar);
});


/* -------------------------------------------------------------
   6. BACK TO TOP BUTTON
   Shows after scrolling 400px, smooth scrolls to top on click
   ------------------------------------------------------------- */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* -------------------------------------------------------------
   7. HERO PARALLAX — Subtle movement on scroll for hero shapes
   ------------------------------------------------------------- */
const heroBgShape = document.querySelector('.hero-bg-shape');
const doodleElements = document.querySelectorAll('.doodle');

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;

  if (heroBgShape) {
    heroBgShape.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
  }

  doodleElements.forEach(function (doodle, index) {
    const direction = index % 2 === 0 ? 1 : -1;
    doodle.style.transform = 'translateY(' + (scrollY * 0.06 * direction) + 'px)';
  });
});


/* -------------------------------------------------------------
   8. MOUSE GLOW EFFECT — Subtle yellow glow follows cursor in hero
   ------------------------------------------------------------- */
const heroSection = document.querySelector('.hero');

if (heroSection) {
  const glowElement = document.createElement('div');

  glowElement.style.position = 'absolute';
  glowElement.style.width = '300px';
  glowElement.style.height = '300px';
  glowElement.style.borderRadius = '50%';
  glowElement.style.background = 'radial-gradient(circle, rgba(244,176,0,0.08) 0%, transparent 70%)';
  glowElement.style.pointerEvents = 'none';
  glowElement.style.transform = 'translate(-50%, -50%)';
  glowElement.style.zIndex = '0';
  glowElement.style.opacity = '0';
  glowElement.style.transition = 'opacity 0.3s ease';

  heroSection.appendChild(glowElement);

  heroSection.addEventListener('mousemove', function (e) {
    const rect = heroSection.getBoundingClientRect();
    glowElement.style.left = (e.clientX - rect.left) + 'px';
    glowElement.style.top = (e.clientY - rect.top) + 'px';
    glowElement.style.opacity = '1';
  });

  heroSection.addEventListener('mouseleave', function () {
    glowElement.style.opacity = '0';
  });
}


/* -------------------------------------------------------------
   9. DARK / LIGHT MODE TOGGLE
   Saves user preference in localStorage so it persists on refresh
   ------------------------------------------------------------- */
const themeToggleBtn = document.getElementById('themeToggle');
const themeIconSpan = document.querySelector('.theme-icon');

// Apply saved preference on page load
const savedTheme = localStorage.getItem('portfolioTheme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIconSpan.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', function () {
  const isDarkMode = document.body.classList.toggle('dark-mode');

  // Update the icon based on current mode
  if (isDarkMode) {
    themeIconSpan.textContent = '☀️';
    localStorage.setItem('portfolioTheme', 'dark');
  } else {
    themeIconSpan.textContent = '🌙';
    localStorage.setItem('portfolioTheme', 'light');
  }
});


/* -------------------------------------------------------------
   10. CONTACT FORM VALIDATION
   Validates all fields with inline error messages and visual cues
   Rules:
     - Name: required, minimum 2 characters
     - Email: required, must match proper email format
     - Message: required, minimum 20 characters
   ------------------------------------------------------------- */
const contactForm = document.getElementById('contactForm');

// Helper: show an error message below a field
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const existingError = input.parentElement.querySelector('.field-error');

  // Remove old error if present
  if (existingError) {
    existingError.remove();
  }

  // Create and insert error message
  const errorEl = document.createElement('span');
  errorEl.classList.add('field-error');
  errorEl.textContent = message;
  errorEl.style.color = '#e24b4a';
  errorEl.style.fontSize = '12px';
  errorEl.style.marginTop = '4px';
  errorEl.style.display = 'block';
  errorEl.style.fontWeight = '500';

  input.parentElement.appendChild(errorEl);
  input.style.borderColor = '#e24b4a';
}

// Helper: mark a field as valid (green border + remove error)
function showSuccess(inputId) {
  const input = document.getElementById(inputId);
  const existingError = input.parentElement.querySelector('.field-error');

  if (existingError) {
    existingError.remove();
  }

  input.style.borderColor = '#3b7d34';
}

// Helper: clear all validation states
function clearValidation() {
  ['name', 'email', 'message'].forEach(function (id) {
    const input = document.getElementById(id);
    if (input) {
      input.style.borderColor = '';
      const error = input.parentElement.querySelector('.field-error');
      if (error) error.remove();
    }
  });
}

// Helper: validate email format using regex
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Live validation — validate each field as user types
document.getElementById('name').addEventListener('input', function () {
  const value = this.value.trim();
  if (value.length >= 2) {
    showSuccess('name');
  }
});

document.getElementById('email').addEventListener('input', function () {
  const value = this.value.trim();
  if (isValidEmail(value)) {
    showSuccess('email');
  }
});

document.getElementById('message').addEventListener('input', function () {
  const value = this.value.trim();
  if (value.length >= 20) {
    showSuccess('message');
  }
});

// Main form submission handler
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameValue = document.getElementById('name').value.trim();
    const emailValue = document.getElementById('email').value.trim();
    const messageValue = document.getElementById('message').value.trim();
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Clear previous validation states before re-validating
    clearValidation();

    let isFormValid = true;

    // Validate name
    if (nameValue === '') {
      showError('name', '⚠ Please enter your name.');
      isFormValid = false;
    } else if (nameValue.length < 2) {
      showError('name', '⚠ Name must be at least 2 characters.');
      isFormValid = false;
    } else {
      showSuccess('name');
    }

    // Validate email
    if (emailValue === '') {
      showError('email', '⚠ Please enter your email address.');
      isFormValid = false;
    } else if (!isValidEmail(emailValue)) {
      showError('email', '⚠ Please enter a valid email (e.g. name@example.com).');
      isFormValid = false;
    } else {
      showSuccess('email');
    }

    // Validate message
    if (messageValue === '') {
      showError('message', '⚠ Please enter a message.');
      isFormValid = false;
    } else if (messageValue.length < 20) {
      showError('message', '⚠ Message must be at least 20 characters.');
      isFormValid = false;
    } else {
      showSuccess('message');
    }

    // If all fields pass — show success state
    if (isFormValid) {
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = '#3b7d34';
      submitBtn.style.color = '#fff';

      // Reset form and button after 3 seconds
      setTimeout(function () {
        contactForm.reset();
        clearValidation();
        submitBtn.textContent = 'Send Message ↗';
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 3000);
    }

  });
}
