// ============================================================
// rkz_qlf — script.js
// 100% client-side. No backend required for GitHub Pages.
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

// -------- Animated stat counters (hero) --------
const statEls = document.querySelectorAll('.stat-num');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el){
  const target = parseInt(el.dataset.count, 10) || 0;
  if (prefersReducedMotion) {
    el.textContent = target.toLocaleString('fr-FR');
    return;
  }
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('fr-FR');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

statEls.forEach(el => statsObserver.observe(el));

// -------- Active tab highlighting (mobile bottom bar) --------
const tabs = document.querySelectorAll('.tab');
const sections = ['accueil', 'reseaux', 'galerie', 'vip']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function setActiveTab(id){
  tabs.forEach(t => t.classList.toggle('is-active', t.dataset.tab === id));
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActiveTab(entry.target.id);
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach(sec => sectionObserver.observe(sec));

// -------- Waitlist form --------
// This is a fully static site: there is no backend to store emails.
// By default this just confirms the submission locally so the button
// isn't dead on click. To actually collect emails, connect the form
// to a free form-backend service (see README.md) and set FORM_ENDPOINT
// below to that URL — the code will then POST to it automatically.
const FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxxx'

const form = document.getElementById('waitlist-form');
const note = document.getElementById('waitlist-note');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();

  if (!email || !form.checkValidity()) {
    note.textContent = "Entre une adresse e-mail valide.";
    note.className = 'waitlist-note is-error';
    return;
  }

  if (!FORM_ENDPOINT) {
    // No backend connected yet — just confirm locally.
    note.textContent = "Inscription enregistrée ✓ (connecte un service de formulaire pour la recevoir réellement — voir le README)";
    note.className = 'waitlist-note is-success';
    form.reset();
    return;
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      note.textContent = "Merci ! Tu es sur la liste VIP.";
      note.className = 'waitlist-note is-success';
      form.reset();
    } else {
      throw new Error('Request failed');
    }
  } catch (err) {
    note.textContent = "Une erreur est survenue, réessaie plus tard.";
    note.className = 'waitlist-note is-error';
  }
});
