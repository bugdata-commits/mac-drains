const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobile-nav');

if (menuButton && mobileNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    mobileNav.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    mobileNav.classList.toggle('is-open', opening);
  });

  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));


const requestForm = document.querySelector('#service-request-form');
if (requestForm) {
  const status = document.querySelector('#request-status');
  const whatsappLink = document.querySelector('#whatsapp-request-link');
  const prepareButton = document.querySelector('#prepare-request');
  const preferredDate = requestForm.elements.preferredDate;

  if (preferredDate) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    preferredDate.min = today.toISOString().slice(0, 10);
  }

  const prepareRequest = (event) => {
    event.preventDefault();
    if (!requestForm.reportValidity()) return;

    const values = new FormData(requestForm);
    const dateValue = values.get('preferredDate');
    const dateText = dateValue
      ? new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(`${dateValue}T00:00:00`))
      : 'No preferred date';
    const message = [
      'Hello Mac Drains, I would like to request a service or callback.',
      `Name: ${values.get('name')}`,
      `Phone: ${values.get('phone')}`,
      `Service: ${values.get('service')}`,
      `Town/suburb: ${values.get('location')}`,
      `Preferred date: ${dateText}`,
      `What is happening: ${values.get('message')}`,
      'I understand this is a request, not a confirmed appointment.'
    ].join('\n');

    whatsappLink.href = `https://wa.me/263772809297?text=${encodeURIComponent(message)}`;
    status.hidden = false;
    whatsappLink.focus({ preventScroll: true });
  };

  prepareButton?.addEventListener('click', prepareRequest);
  requestForm.addEventListener('submit', prepareRequest);
}
