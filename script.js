const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobile-nav');

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    mobileNav.classList.toggle('is-open', !isOpen);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      mobileNav.classList.remove('is-open');
    });
  });
}

document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));

const comparison = document.querySelector('[data-before-after]');
const comparisonRange = comparison?.querySelector('.before-after__range');

if (comparison && comparisonRange) {
  const updateComparison = () => comparison.style.setProperty('--split', `${comparisonRange.value}%`);
  comparisonRange.addEventListener('input', updateComparison);
  updateComparison();
}
