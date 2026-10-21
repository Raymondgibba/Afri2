/* Shop page — filter chips + search */
let category = 'all';
let query = '';

function drawShop() {
  const list = PRODUCTS.filter((p) =>
    (category === 'all' || p.category === category) &&
    (!query || (p.name + ' ' + p.type).toLowerCase().includes(query)));
  renderGrid($('#shop-grid'), list);
  $('#shop-count').textContent = list.length + (list.length === 1 ? ' piece' : ' pieces');
}

$('#shop-filters').addEventListener('click', (e) => {
  const b = e.target.closest('[data-cat]');
  if (!b) return;
  category = b.dataset.cat;
  $$('#shop-filters [data-cat]').forEach((x) => x.classList.toggle('is-active', x === b));
  drawShop();
});
$('#shop-search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); drawShop(); });
drawShop();
