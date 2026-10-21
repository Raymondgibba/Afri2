/* ========================================
   Product cards + grids (used on Home, Shop, Product pages)
   ======================================== */
const selection = {};   // remembers the colour/size picked on each product

function getSelection(p) {
  if (!selection[p.id]) {
    const first = p.colors.find((c) => !c.soldOut) || p.colors[0];
    selection[p.id] = { color: first.key, size: 'M' };
  }
  return selection[p.id];
}

function createProductCard(p) {
  const sel = getSelection(p);
  const c = getColor(p, sel.color);
  const url = 'product.html?id=' + p.id;
  const el = document.createElement('article');
  el.className = 'product-card';
  el.dataset.productId = p.id;
  el.innerHTML = `
    <a class="product-card__image-wrap" href="${url}" aria-label="${escapeHtml(p.name)}">
      ${p.hasWordmark ? '<span class="product-card__badge">Wordmark</span>' : ''}
      ${c.soldOut ? '<span class="product-card__sold">Sold out</span>' : ''}
      <img class="product-card__image" src="${c.image}" alt="${escapeHtml(p.name)} — ${escapeHtml(c.label)}" loading="lazy">
    </a>
    <div class="product-card__body">
      <h3 class="product-card__name"><a href="${url}">${escapeHtml(p.name)}</a></h3>
      <p class="product-card__color">${escapeHtml(c.label)} · ${escapeHtml(p.type)}</p>
      <p class="product-card__price">${money(p.price)}</p>
      ${p.colors.length > 1 ? `<div class="product-card__swatches" role="group" aria-label="Colour">${p.colors.map((k) =>
        `<button class="product-card__swatch${k.key === sel.color ? ' is-active' : ''}${k.soldOut ? ' is-out' : ''}" data-swatch="${k.key}" aria-label="${escapeHtml(k.label)}" style="background-color:${k.hex}"></button>`).join('')}</div>` : ''}
      <div class="product-card__sizes" role="group" aria-label="Size">${SETTINGS.sizes.map((z) =>
        `<button class="${z === sel.size ? 'is-active' : ''}" data-size="${z}">${z}</button>`).join('')}</div>
      <div class="product-card__actions">
        <button class="product-card__buy" data-buy ${c.soldOut ? 'disabled' : ''}>Buy Now</button>
        <button class="product-card__add" data-add ${c.soldOut ? 'disabled' : ''}>Add to Cart</button>
      </div>
    </div>`;
  return el;
}

function renderGrid(target, products) {
  target.innerHTML = '';
  if (!products.length) { target.innerHTML = '<p class="empty-note">Nothing found.</p>'; return; }
  products.forEach((p) => target.appendChild(createProductCard(p)));
}

/* One listener handles every card on the page */
document.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  const p = getProduct(card.dataset.productId);
  const sel = getSelection(p);
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.dataset.swatch) { sel.color = btn.dataset.swatch; card.replaceWith(createProductCard(p)); }
  else if (btn.dataset.size) { sel.size = btn.dataset.size; card.replaceWith(createProductCard(p)); }
  else if (btn.hasAttribute('data-add')) {
    addToCart(p.id, sel.color, sel.size, 1);
    flashAdded(btn);
  } else if (btn.hasAttribute('data-buy')) {
    addToCart(p.id, sel.color, sel.size, 1);
    goTo('checkout.html');
  }
});

function flashAdded(btn) {
  if (btn.dataset.busy) return;
  const label = btn.textContent;
  btn.dataset.busy = '1';
  btn.textContent = 'Added ✓';
  btn.classList.add('is-added');
  setTimeout(() => { btn.textContent = label; btn.classList.remove('is-added'); delete btn.dataset.busy; }, 1500);
}
