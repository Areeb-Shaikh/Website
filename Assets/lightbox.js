/* ===== Lightbox + heart burst ===== */
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');

  window.openLightbox = function (src) {
    lightboxImg.src = src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(function () { lightboxImg.src = ''; }, 400);
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
  });

  window.heartBurst = function () {
    const emojis = ['💗', '💕', '❤️', '💖'];
    for (let i = 0; i < 12; i++) {
      const h = document.createElement('span');
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.position = 'fixed';
      h.style.left = (window.innerWidth / 2) + 'px';
      h.style.top = (window.innerHeight / 2) + 'px';
      h.style.fontSize = (14 + Math.random() * 18) + 'px';
      h.style.pointerEvents = 'none';
      h.style.zIndex = '90';
      h.style.transition = 'transform 0.9s ease-out, opacity 0.9s ease-out';

      document.body.appendChild(h);

      const angle = Math.random() * Math.PI * 2;
      const dist = 90 + Math.random() * 150;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      requestAnimationFrame(function () {
        h.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(1.4)';
        h.style.opacity = '0';
      });

      setTimeout(function () { h.remove(); }, 1000);
    }
  };
})();