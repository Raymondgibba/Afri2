/* ========================================
   Small shared helpers
   ======================================== */

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

function $(selector, scope = document) {
  return scope.querySelector(selector);
}

function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

function escapeHtml(t) {
  return String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function money(amount) {
  return SETTINGS.currency + ' ' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function whatsappLink(text) {
  return 'https://wa.me/' + SETTINGS.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
}
