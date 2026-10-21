/* ========================================
   Animations
   - scroll reveals (fade/slide in as sections appear)
   - smooth fade between pages
   All the visual motion is in css/animations.css
   ======================================== */
const REVEAL = [
  ['.page-head .container > *', 0.1], ['.section__header', 0], ['.product-card', 0.12],
  ['.story__visual', 0], ['.story__content > *', 0.12], ['.feature', 0.14], ['.step', 0.12],
  ['.lookbook__item', 0.14], ['.info-card', 0.14], ['.cta-band .container > *', 0.1],
  ['.product-page__gallery', 0], ['.product-page__info > *', 0.07], ['.checkout__col', 0.14], ['.footer__inner > *', 0.1],
];

function initReveal() {
  const items = [];
  REVEAL.forEach(([selector, step]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--delay', (i % 4) * step + 's');
      items.push(el);
    });
  });
  const show = (el) => {
    el.classList.add('is-revealed');
    // hand control back so hover effects work normally afterwards
    setTimeout(() => { el.removeAttribute('data-reveal'); el.classList.remove('is-revealed'); el.style.removeProperty('--delay'); }, 1500);
  };
  if (!('IntersectionObserver' in window)) { items.forEach(show); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  items.forEach((el) => io.observe(el));
}

/* Fade the page out before opening another page */
function goTo(url) {
  document.body.classList.add('is-leaving');
  setTimeout(() => { window.location.href = url; }, 260);
}

function initPageTransitions() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    goTo(href);
  });
  window.addEventListener('pageshow', () => document.body.classList.remove('is-leaving'));
}
