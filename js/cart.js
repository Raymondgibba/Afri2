/* ========================================
   Cart — saved in the browser, shared by every page
   ======================================== */
const CART_KEY = 'ap_cart';
let cart = [];
try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch (e) { cart = []; }

const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} };
const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const getColor = (p, key) => p.colors.find((c) => c.key === key);

function cartLine(item) {
  const p = getProduct(item.id);
  const c = p && getColor(p, item.color);
  return c ? { p, c } : null;
}
const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
const cartSubtotal = () => cart.reduce((s, i) => { const l = cartLine(i); return s + (l ? l.p.price * i.qty : 0); }, 0);

function addToCart(id, color, size, qty = 1) {
  const found = cart.find((i) => i.id === id && i.color === color && i.size === size);
  if (found) found.qty = Math.min(10, found.qty + qty);
  else cart.push({ id, color, size, qty });
  updateCartUI(true);
}

function changeQty(index, delta) {
  const item = cart[index];
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI(bump = false) {
  cart = cart.filter(cartLine);
  saveCart();
  const countEl = $('#cart-count');
  const n = cartCount();
  countEl.textContent = n;
  countEl.classList.toggle('is-visible', n > 0);
  if (bump) { countEl.classList.remove('is-bumped'); void countEl.offsetWidth; countEl.classList.add('is-bumped'); }

  $('#cart-subtotal').textContent = money(cartSubtotal());
  $('#cart-checkout').classList.toggle('is-disabled', !cart.length);
  $('#cart-items').innerHTML = cart.length ? cart.map((item, i) => {
    const { p, c } = cartLine(item);
    return `<li class="cart-item">
      <img class="cart-item__image" src="${c.image}" alt="${escapeHtml(p.name)} — ${escapeHtml(c.label)}">
      <div class="cart-item__details">
        <span class="cart-item__name">${escapeHtml(p.name)}</span>
        <span class="cart-item__variant">${escapeHtml(c.label)} · Size ${item.size}</span>
        <span class="cart-item__price">${money(p.price)}</span>
        <div class="cart-item__qty">
          <button class="cart-item__qty-btn" data-qty="-1" data-i="${i}" aria-label="Decrease quantity">−</button>
          <span class="cart-item__qty-value">${item.qty}</span>
          <button class="cart-item__qty-btn" data-qty="1" data-i="${i}" aria-label="Increase quantity">+</button>
        </div>
      </div></li>`;
  }).join('') : '<li class="cart-drawer__empty">Your cart is empty.</li>';
  document.dispatchEvent(new CustomEvent('cartchange'));
}

function openCart() { const d = $('#cart-drawer'); d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeCart() { const d = $('#cart-drawer'); d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

function initCart() {
  $('#cart-toggle').addEventListener('click', openCart);
  $('#cart-close').addEventListener('click', closeCart);
  $('#cart-overlay').addEventListener('click', closeCart);
  $('#cart-items').addEventListener('click', (e) => {
    const b = e.target.closest('[data-qty]');
    if (b) changeQty(+b.dataset.i, +b.dataset.qty);
  });
  $('#cart-checkout').addEventListener('click', (e) => { if (!cart.length) e.preventDefault(); });
  updateCartUI();
}
