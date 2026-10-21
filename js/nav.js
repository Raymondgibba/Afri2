/* ========================================
   Navigation — sticky header, mobile menu, Escape key
   ======================================== */
function initNav() {
  const header = $('#site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = $('#nav-toggle');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    toggle.classList.toggle('is-active', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeCart(); setMenu(false); } });
}
