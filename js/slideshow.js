/* ========================================
   Hero slideshow
   - auto-advances every 5 seconds
   - arrows, dots, keyboard and swipe
   - pauses while the mouse is over it
   To add a photo: add another <img class="slideshow__slide">
   in index.html — the dots build themselves.
   ======================================== */

function initSlideshow() {
  const root = $('#hero-slideshow');
  if (!root) return;

  const slides = $$('.slideshow__slide', root);
  const dotsWrap = $('.slideshow__dots', root);
  const INTERVAL = 5000;
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slideshow__dot';
    dot.setAttribute('aria-label', `Photo ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === index));
    dots.forEach((d, n) => d.classList.toggle('is-active', n === index));
  }

  function start() { timer = setInterval(() => goTo(index + 1), INTERVAL); }
  function stop()  { clearInterval(timer); }
  function restart() { stop(); start(); }

  $('.slideshow__btn--prev', root).addEventListener('click', () => { goTo(index - 1); restart(); });
  $('.slideshow__btn--next', root).addEventListener('click', () => { goTo(index + 1); restart(); });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  // swipe on phones
  let startX = 0;
  root.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stop(); }, { passive: true });
  root.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    start();
  });

  goTo(0);
  start();
}
