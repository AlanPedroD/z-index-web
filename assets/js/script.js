/* ---- HEADER SCROLL ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---- FADE-UP OBSERVER ---- */
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

/* ---- FAQ ---- */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---- FILTER MODELOS ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.modelo-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const show = filter === 'todos' || card.dataset.category === filter;
      card.style.display = show ? 'block' : 'none';
    });
  });
});

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, suffix) {
  let current = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.innerHTML = Math.floor(current) + '<em>' + suffix + '</em>';
    if (current >= target) clearInterval(timer);
  }, 30);
}
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const cards = document.querySelectorAll('.metric-card');
      animateCounter(cards[0].querySelector('.metric-value'), 50, '+');
      animateCounter(cards[1].querySelector('.metric-value'), 100, '%');
      animateCounter(cards[2].querySelector('.metric-value'), 7, 'd');
      animateCounter(cards[3].querySelector('.metric-value'), SEO, 'x');
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const metricsEl = document.querySelector('.metrics-grid');
if (metricsEl) statsObs.observe(metricsEl);
