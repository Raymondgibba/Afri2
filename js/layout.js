/* ========================================
   Shared layout — header, mobile menu, cart drawer, footer.
   Written once here so every page uses the same one.
   Each page sets <body data-page="..."> to highlight its link.
   ======================================== */
(function () {
  const page = document.body.dataset.page || '';
  const LINKS = [
    ['index.html', 'Home', 'home'], ['shop.html', 'Shop', 'shop'],
    ['story.html', 'Our Story', 'story'], ['contact.html', 'Contact', 'contact'],
  ];
  const list = (cls) => LINKS.map(([href, label, key]) =>
    `<li><a href="${href}" class="${cls}${key === page ? ' is-active' : ''}">${label}</a></li>`).join('');

  const social = Object.entries(SETTINGS.social).filter(([, url]) => url).map(([name, url]) =>
    `<a href="${url}" class="footer__social-link" target="_blank" rel="noopener" aria-label="${name}">${name[0].toUpperCase() + name.slice(1)}</a>`).join('');

  const top = `
  <header class="site-header" id="site-header">
    <nav class="nav container">
      <a href="index.html" class="nav__logo" aria-label="African Pride — home"><img src="images/logo.png" alt="African Pride" width="64" height="53"></a>
      <button class="nav__toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">
        <span class="nav__toggle-bar"></span><span class="nav__toggle-bar"></span><span class="nav__toggle-bar"></span>
      </button>
      <ul class="nav__links" id="nav-links">${list('nav__link')}</ul>
      <button class="nav__cart" id="cart-toggle" aria-label="Open cart">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <span class="nav__cart-count" id="cart-count">0</span>
      </button>
    </nav>
  </header>
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true"><ul class="mobile-menu__links">${list('mobile-menu__link')}</ul></div>
  <aside class="cart-drawer" id="cart-drawer" aria-hidden="true">
    <div class="cart-drawer__overlay" id="cart-overlay"></div>
    <div class="cart-drawer__panel">
      <div class="cart-drawer__header"><h2 class="cart-drawer__title">Your Cart</h2><button class="cart-drawer__close" id="cart-close" aria-label="Close cart">&times;</button></div>
      <ul class="cart-drawer__items" id="cart-items"></ul>
      <div class="cart-drawer__footer">
        <div class="cart-drawer__subtotal"><span>Subtotal</span><span id="cart-subtotal"></span></div>
        <a class="btn btn--primary btn--full" id="cart-checkout" href="checkout.html">Checkout</a>
        <p class="cart-drawer__note">Your order is confirmed with you on WhatsApp.</p>
      </div>
    </div>
  </aside>`;

  const bottom = `
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="index.html" class="footer__logo" aria-label="African Pride — home"><img src="images/logo-light.png" alt="African Pride" width="120" height="99"></a>
        <p class="footer__tagline">Rooted in Heritage</p>
      </div>
      <nav class="footer__nav"><ul class="footer__links">${list('footer__link')}<li><a href="checkout.html" class="footer__link">Checkout</a></li></ul></nav>
      <div class="footer__social">${social}</div>
    </div>
    <div class="footer__bottom container"><p>Crafted from Memory. Rooted in Heritage. &copy; 2026 African Pride.</p></div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', top);
  const main = document.querySelector('main');
  main.insertAdjacentHTML('afterend', bottom);
})();
