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

  // Must match the CSS transition duration on .gui-lightbox-media img/video
  // (opacity 0.35s) — the old content is only removed from the DOM after
  // it has actually finished fading out, otherwise the swap happens
  // mid-fade and reads as an instant, un-animated jump cut.
  const MEDIA_FADE_MS = 350;
  let swapTimeout = null;

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

    if (swapTimeout) {
      clearTimeout(swapTimeout);
      swapTimeout = null;
    }

    const renderMedia = () => {
      const node = mediaItems[currentIndex].cloneNode(true);
      mediaContainer.innerHTML = '';
      mediaContainer.appendChild(node);
      // Force a reflow so the browser registers the "not visible" starting
      // state before we add the class — otherwise both changes get
      // collapsed into one frame and the fade-in never plays.
      void node.offsetWidth;
      node.classList.add('is-visible');
    };

    const currentEl = mediaContainer.querySelector('img, video');
    if (!animate || !currentEl) {
      renderMedia();
      return;
    }

    currentEl.classList.remove('is-visible');
    swapTimeout = window.setTimeout(renderMedia, MEDIA_FADE_MS);
  }

  function open(triggerButton) {
    // First try: find template inside parent .single-item (project/seminar cards)
    let template = null;
    const card = triggerButton.closest('.single-item');
    if (card) {
      template = card.querySelector('template[data-gui-media]');
    }
    // Fallback: find template by matching data-gui-media attribute (homepage CV, etc.)
    if (!template) {
      const mediaId = triggerButton.getAttribute('data-gui-media');
      if (mediaId) {
        template = document.querySelector(`template[data-gui-media="${mediaId}"]`);
      }
    }
    if (!template) return;

    mediaItems = Array.from(template.content.children).map((node) => node.cloneNode(true));
    if (mediaItems.length === 0) return;

    if (!overlay) overlay = buildOverlay();
    overlay.querySelector('.gui-lightbox-title').textContent = triggerButton.dataset.guiTitle || '';

    lastFocusedTrigger = triggerButton;
    show(0, false);

    document.body.style.overflow = 'hidden';

    // Force a reflow before adding the class so the opacity/transform
    // transition actually plays on the very first open, not just on
    // subsequent ones.
    void overlay.offsetWidth;
    overlay.classList.add('is-open');

    overlay.querySelector('.gui-lightbox-close').focus();

    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    if (!overlay) return;
    if (swapTimeout) {
      clearTimeout(swapTimeout);
      swapTimeout = null;
    }
    overlay.classList.remove('is-open');
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