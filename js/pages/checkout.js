/* Checkout page — summary + details, then sends the order to WhatsApp */
let method = 'pickup';
let lastLink = '';
const fee = () => (method === 'delivery' ? SETTINGS.deliveryFee : 0);

function drawSummary() {
  const box = $('#summary');
  if (!cart.length) { box.innerHTML = '<p class="empty-note">Your cart is empty.</p>'; $('#place-order').disabled = true; return; }
  $('#place-order').disabled = false;
  box.innerHTML = cart.map((item, i) => {
    const { p, c } = cartLine(item);
    return `<div class="summary-item">
      <img src="${c.image}" alt="">
      <div><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(c.label)} · Size ${item.size}</span>
        <div class="cart-item__qty"><button class="cart-item__qty-btn" data-qty="-1" data-i="${i}" aria-label="Less">−</button><span class="cart-item__qty-value">${item.qty}</span><button class="cart-item__qty-btn" data-qty="1" data-i="${i}" aria-label="More">+</button></div></div>
      <strong>${money(p.price * item.qty)}</strong></div>`;
  }).join('') +
  (fee() ? `<div class="summary-row"><span>Delivery</span><span>${money(fee())}</span></div>` : '') +
  `<div class="summary-row summary-row--total"><span>Total</span><span>${money(cartSubtotal() + fee())}</span></div>`;
}

function drawMethod() {
  $$('#method button').forEach((b) => b.classList.toggle('is-active', b.dataset.method === method));
  $('#address-field').hidden = method !== 'delivery';
  $('#pickup-info').textContent = method === 'pickup'
    ? (SETTINGS.pickupAddress ? 'Pickup at: ' + SETTINGS.pickupAddress : 'We will tell you when and where to collect.') : '';
  drawSummary();
}

function showDone() {
  $('#checkout-main').innerHTML = `
    <div class="done">
      <p class="eyebrow">Almost done</p>
      <h1 class="page-title">Press send in WhatsApp</h1>
      <p>Your order message is ready. Once you send it, we confirm everything with you.</p>
      <div class="done__buttons"><a class="btn btn--primary" href="${lastLink}" target="_blank" rel="noopener">Open WhatsApp again</a><a class="btn btn--outline" href="shop.html">Continue shopping</a></div>
    </div>`;
}

function placeOrder() {
  const err = $('#form-error');
  err.textContent = '';
  const name = $('#f-name').value.trim(), phone = $('#f-phone').value.trim(), address = $('#f-address').value.trim();
  if (name.length < 2) return void (err.textContent = 'Please enter your name.');
  if (phone.replace(/\D/g, '').length < 7) return void (err.textContent = 'Please enter a valid phone number.');
  if (method === 'delivery' && address.length < 4) return void (err.textContent = 'Please enter your delivery address.');
  if (!SETTINGS.whatsapp) return void (err.textContent = 'The shop WhatsApp number is not set yet.');
  const lines = cart.map((i) => { const { p, c } = cartLine(i); return `${i.qty} x ${p.name} - ${c.label}, size ${i.size} (${money(p.price * i.qty)})`; });
  const note = $('#f-note').value.trim();
  const msg = `Hello African Pride, I would like to order:\n${lines.join('\n')}\n\nTotal: ${money(cartSubtotal() + fee())}` +
    (fee() ? ` (includes delivery ${money(fee())})` : '') +
    `\n${method === 'pickup' ? 'Pickup' : 'Delivery to: ' + address}\nPayment: ${$('#f-payment').value}\nName: ${name}\nPhone: ${phone}` + (note ? `\nNote: ${note}` : '');
  lastLink = whatsappLink(msg);
  window.open(lastLink, '_blank');
  cart = []; updateCartUI();
  showDone();
}

if (!cart.length) {
  $('#checkout-main').innerHTML = '<div class="done"><h1 class="page-title">Your cart is empty</h1><p>Add something you love first.</p><a class="btn btn--primary" href="shop.html">Shop the collection</a></div>';
} else {
  $('#f-payment').innerHTML = SETTINGS.payments.map((p) => `<option>${escapeHtml(p)}</option>`).join('');
  $('#method').addEventListener('click', (e) => { const b = e.target.closest('[data-method]'); if (b) { method = b.dataset.method; drawMethod(); } });
  $('#summary').addEventListener('click', (e) => { const b = e.target.closest('[data-qty]'); if (b) changeQty(+b.dataset.i, +b.dataset.qty); });
  document.addEventListener('cartchange', () => { if ($('#summary')) drawSummary(); });
  $('#place-order').addEventListener('click', placeOrder);
  drawMethod();
}
