// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

// ── BACK TO TOP ──
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// Initialize EmailJS — paste your Public Key here
emailjs.init('3oHWqovNKmzVEHvQJ');

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.btn-submit');
  const original = btn.textContent;

  btn.textContent = 'SENDING...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  const templateParams = {
    name:    form.name.value,
    email:   form.email.value,
    phone:   form.phone.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  emailjs.send('service_kl9qwag', "template_k8wbxeu", templateParams)
    .then(() => {
      btn.textContent = '✓ MESSAGE SENT!';
      btn.style.opacity = '1';
      btn.style.background = 'rgba(40, 160, 80, 0.4)';
      btn.style.borderColor = 'rgba(80, 200, 100, 0.6)';
      form.reset();

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 3500);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      btn.textContent = '✗ FAILED – TRY AGAIN';
      btn.style.background = 'rgba(200, 50, 50, 0.4)';
      btn.disabled = false;

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
      }, 3000);
    });
}
