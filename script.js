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
