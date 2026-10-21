/* Product page — opened as product.html?id=collar-tee */
const root = $('#product-root');
const product = getProduct(new URLSearchParams(location.search).get('id'));
let qty = 1;

function drawProduct() {
  const p = product;
  const sel = getSelection(p);
  const c = getColor(p, sel.color);
  root.innerHTML = `
    <div class="product-page__gallery">
      <div class="product-page__main">
        ${c.soldOut ? '<span class="product-card__sold">Sold out</span>' : ''}
        <img src="${c.image}" alt="${escapeHtml(p.name)} — ${escapeHtml(c.label)}">
      </div>
      ${p.colors.length > 1 ? `<div class="product-page__thumbs">${p.colors.map((k) =>
        `<button class="${k.key === sel.color ? 'is-active' : ''}" data-color="${k.key}" aria-label="${escapeHtml(k.label)}"><img src="${k.image}" alt=""></button>`).join('')}</div>` : ''}
    </div>
    <div class="product-page__info">
      <h1 class="product-page__title">${escapeHtml(p.name)}</h1>
      <p class="product-page__price">${money(p.price)}</p>
      <p class="product-page__about">${escapeHtml(p.about)}</p>
      <p class="field-label">Colour — ${escapeHtml(c.label)}</p>
      <div class="product-card__swatches">${p.colors.map((k) =>
        `<button class="product-card__swatch${k.key === sel.color ? ' is-active' : ''}${k.soldOut ? ' is-out' : ''}" data-color="${k.key}" aria-label="${escapeHtml(k.label)}" style="background-color:${k.hex}"></button>`).join('')}</div>
      <p class="field-label">Size</p>
      <div class="product-card__sizes">${SETTINGS.sizes.map((z) => `<button class="${z === sel.size ? 'is-active' : ''}" data-size="${z}">${z}</button>`).join('')}</div>
      <p class="field-label">Quantity</p>
      <div class="qty"><button data-q="-1" aria-label="Less">−</button><span>${qty}</span><button data-q="1" aria-label="More">+</button></div>
      <div class="product-page__buttons">
        <button class="btn btn--primary" data-buy ${c.soldOut ? 'disabled' : ''}>Buy Now</button>
        <button class="btn btn--outline" data-add ${c.soldOut ? 'disabled' : ''}>Add to Cart</button>
      </div>
      <div class="accordion">
        <details open><summary>Details</summary><p>${p.category === 'tee' ? 'Heavyweight 260 GSM cotton. ' : ''}Sizes ${SETTINGS.sizes[0]} to ${SETTINGS.sizes[SETTINGS.sizes.length - 1]}.</p></details>
        <details><summary>How ordering works</summary><p>Add to cart, then check out. Your order opens in WhatsApp as a ready message and we confirm it with you.</p></details>
        <details><summary>Pickup &amp; delivery</summary><p>Collect your order or have it delivered. We confirm the details with you on WhatsApp.</p></details>
      </div>
    </div>`;
}

if (!product) {
  root.innerHTML = '<div class="product-page__info"><h1 class="product-page__title">Product not found</h1><p><a class="btn btn--primary" href="shop.html">Back to the shop</a></p></div>';
} else {
  document.title = product.name + ' | African Pride';
  $('#crumb-name').textContent = product.name;
  drawProduct();
  root.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const sel = getSelection(product);
    if (b.dataset.color) { sel.color = b.dataset.color; drawProduct(); }
    else if (b.dataset.size) { sel.size = b.dataset.size; drawProduct(); }
    else if (b.dataset.q) { qty = Math.max(1, Math.min(10, qty + +b.dataset.q)); drawProduct(); }
    else if (b.hasAttribute('data-add')) { addToCart(product.id, sel.color, sel.size, qty); flashAdded(b); }
    else if (b.hasAttribute('data-buy')) { addToCart(product.id, sel.color, sel.size, qty); goTo('checkout.html'); }
  });
  renderGrid($('#related-grid'), PRODUCTS.filter((p) => p.id !== product.id));
}
