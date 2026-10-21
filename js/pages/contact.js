/* Contact page */
const chat = $('#chat-link');
if (SETTINGS.whatsapp) {
  chat.href = whatsappLink('Hello African Pride, I have a question.');
  chat.target = '_blank'; chat.rel = 'noopener';
} else {
  chat.addEventListener('click', (e) => { e.preventDefault(); chat.textContent = 'WhatsApp number coming soon'; });
}
$('#pickup-text').textContent = SETTINGS.pickupAddress ? 'Pickup: ' + SETTINGS.pickupAddress + '. ' : '';
