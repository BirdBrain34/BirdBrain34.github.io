// Powers the "View GUI" button on project cards: opens a modal showing
// that project's screenshots (and/or a video) in a simple carousel.
//
// Data source: each Project card that has screenshots/video renders a
// hidden <template data-gui-media> containing the actual <img>/<video>
// elements (see Project.astro). This script clones that template's
// content into the modal rather than passing data through attributes,
// so no JSON-in-HTML escaping is needed and the media stays co-located
// with its card in the markup.

function initGuiLightbox() {
  let overlay = null;
  let mediaItems = [];
  let currentIndex = 0;
  let lastFocusedTrigger = null;

  function buildOverlay() {
    const el = document.createElement('div');
    el.className = 'gui-lightbox-overlay';
    el.innerHTML = `
      <div class="gui-lightbox-panel" role="dialog" aria-modal="true">
        <div class="gui-lightbox-header">
          <div class="gui-lightbox-title"></div>
          <button type="button" class="gui-lightbox-close" aria-label="Close">&times;</button>
        </div>
        <div class="gui-lightbox-media"></div>
        <div class="gui-lightbox-nav">
          <button type="button" class="gui-lightbox-prev" aria-label="Previous">&#8249;</button>
          <div class="gui-lightbox-counter"></div>
          <button type="button" class="gui-lightbox-next" aria-label="Next">&#8250;</button>
        </div>
      </div>
    `;
    document.body.appendChild(el);

    el.addEventListener('click', (e) => {
      if (e.target === el) close();
    });
    el.querySelector('.gui-lightbox-close').addEventListener('click', close);
    el.querySelector('.gui-lightbox-prev').addEventListener('click', () => show(currentIndex - 1));
    el.querySelector('.gui-lightbox-next').addEventListener('click', () => show(currentIndex + 1));

    return el;
  }

  function show(index, animate = true) {
    if (mediaItems.length === 0) return;
    currentIndex = (index + mediaItems.length) % mediaItems.length;

    const mediaContainer = overlay.querySelector('.gui-lightbox-media');
    const counter = overlay.querySelector('.gui-lightbox-counter');
    const nav = overlay.querySelector('.gui-lightbox-nav');

    if (mediaItems.length > 1) {
      counter.textContent = `${currentIndex + 1} / ${mediaItems.length}`;
      nav.style.display = 'flex';
    } else {
      nav.style.display = 'none';
    }

    if (!animate) {
      mediaContainer.innerHTML = '';
      mediaContainer.appendChild(mediaItems[currentIndex].cloneNode(true));
      return;
    }

    // Fade out, swap content, fade in
    mediaContainer.style.opacity = '0';
    mediaContainer.style.transition = 'opacity 0.2s ease';

    requestAnimationFrame(() => {
      mediaContainer.innerHTML = '';
      mediaContainer.appendChild(mediaItems[currentIndex].cloneNode(true));
      // Force reflow so the browser picks up the new content before fading in
      mediaContainer.offsetHeight;
      mediaContainer.style.opacity = '1';
    });
  }

  function open(triggerButton) {
    const card = triggerButton.closest('.single-item');
    const template = card && card.querySelector('template[data-gui-media]');
    if (!template) return;

    mediaItems = Array.from(template.content.children).map((node) => node.cloneNode(true));
    if (mediaItems.length === 0) return;

    if (!overlay) overlay = buildOverlay();
    overlay.querySelector('.gui-lightbox-title').textContent = triggerButton.dataset.guiTitle || '';

    lastFocusedTrigger = triggerButton;
    show(0, false);

    document.body.style.overflow = 'hidden';

    // Reliable open animation: set initial closed state, force reflow, then animate in
    const panel = overlay.querySelector('.gui-lightbox-panel');
    overlay.style.opacity = '0';
    overlay.style.background = 'rgba(10, 10, 12, 0)';
    overlay.style.backdropFilter = 'blur(0px)';
    overlay.style.webkitBackdropFilter = 'blur(0px)';
    overlay.style.pointerEvents = 'auto';
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(20px) scale(0.96)';

    // Force the browser to commit those styles before transitioning
    overlay.offsetHeight;

    overlay.style.transition = 'opacity 0.25s ease, background 0.25s ease, backdrop-filter 0.25s ease, -webkit-backdrop-filter 0.25s ease';
    panel.style.transition = 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

    overlay.style.opacity = '1';
    overlay.style.background = 'rgba(10, 10, 12, 0.82)';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.webkitBackdropFilter = 'blur(4px)';
    panel.style.opacity = '1';
    panel.style.transform = 'translateY(0) scale(1)';

    overlay.querySelector('.gui-lightbox-close').focus();

    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    if (!overlay) return;
    overlay.style.transition = '';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  }

  function onDocumentClick(e) {
    const trigger = e.target.closest('[data-gui-trigger]');
    if (trigger) open(trigger);
  }

  document.addEventListener('click', onDocumentClick);

  return () => {
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onKeydown);
    if (overlay) close();
  };
}

let cleanup = null;

function setup() {
  if (cleanup) cleanup();
  cleanup = initGuiLightbox();
}

setup();
document.addEventListener('astro:page-load', setup);