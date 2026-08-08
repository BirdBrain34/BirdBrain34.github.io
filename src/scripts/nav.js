// Must match the CSS transition duration for `.w-nav-menu.is-visible` in styles.css.
const NAV_CLOSE_DELAY_MS = 250;
const NAV_OPEN_DELAY_MS = 10;

export function setupNav() {
  const navButton = document.querySelector('.navbar-icon-button');
  const navMenu = document.querySelector('.w-nav-menu');

  if (!navButton || !navMenu) return;

  const toggleNav = () => {
    const isOpen = navMenu.classList.contains('is-open');

    navMenu.classList.toggle('is-visible', !isOpen);
    // Respect prefers-reduced-motion: toggle both classes in the same tick
    // instead of staggering them with setTimeout.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navMenu.classList.toggle('is-open', !isOpen);
      return;
    }
    setTimeout(
      () => {
        navMenu.classList.toggle('is-open', !isOpen);
      },
      isOpen ? NAV_CLOSE_DELAY_MS : NAV_OPEN_DELAY_MS
    );
  };

  navButton.addEventListener('click', toggleNav);
  return () => navButton.removeEventListener('click', toggleNav);
}