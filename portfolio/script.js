/* ===========================
   SCROLL PROGRESS BAR
   =========================== */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

/* ===========================
   NAVBAR: SCROLL + ACTIVE LINKS
   =========================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ===========================
   HAMBURGER MENU
   =========================== */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ===========================
   REVEAL ON SCROLL
   =========================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ===========================
   SKILL BAR ANIMATION
   =========================== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-w');
      entry.target.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(bar => skillObserver.observe(bar));

/* ===========================
   BACK TO TOP
   =========================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   CONTACT FORM
   =========================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      btn.textContent = 'Please fill all fields';
      btn.style.background = '#e24b4a';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Send Message ↗';
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
      return;
    }

    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#3B6D11';
    btn.style.color = '#fff';
    contactForm.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message ↗';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });
}

/* ===========================
   PARALLAX HERO SHAPES
   =========================== */
const heroBgShape = document.querySelector('.hero-bg-shape');
const doodles = document.querySelectorAll('.doodle');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroBgShape) {
    heroBgShape.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
  doodles.forEach((d, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    d.style.transform = `translateY(${scrollY * 0.06 * dir}px) rotate(${scrollY * 0.02}deg)`;
  });
});

/* ===========================
   MOUSE GLOW EFFECT (Hero only)
   =========================== */
const hero = document.querySelector('.hero');
if (hero) {
  let glow = document.createElement('div');
  glow.style.cssText = `
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(244,176,0,0.08) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: opacity 0.3s;
  `;
  hero.appendChild(glow);

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top = (e.clientY - rect.top) + 'px';
    glow.style.opacity = '1';
  });
  hero.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

/* ===========================
   FLOATING TAGS RESET ON LOAD
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = el.classList.contains('delay-1') ? '0.15s'
      : el.classList.contains('delay-2') ? '0.3s' : '0s';
  });
});
