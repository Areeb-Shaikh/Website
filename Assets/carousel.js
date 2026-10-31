/* ===== 3D Carousel Ring ===== */
(function () {
  const ring = document.getElementById('carouselRing');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const photos = [
    'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg',
    'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg', 'photo10.jpg'
  ];

  const total = photos.length;
  const angleStep = 360 / total;
  let current = 0;

  function getRadius() {
    return window.innerWidth <= 560 ? 240 : 340;
  }

  const cards = [];

  photos.forEach(function (src, i) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.dataset.index = i;

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Memory ' + (i + 1);
    img.loading = 'lazy';
    card.appendChild(img);

    card.addEventListener('click', function () {
      if (i === current) {
        if (window.openLightbox) window.openLightbox(src);
      } else {
        goTo(i);
      }
    });

    ring.appendChild(card);
    cards.push(card);
  });

  photos.forEach(function (_, i) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () { goTo(i); });
    dotsContainer.appendChild(dot);
  });
  const dots = Array.prototype.slice.call(dotsContainer.children);

  function layout() {
    const radius = getRadius();
    cards.forEach(function (card, i) {
      const angle = i * angleStep;
      card.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + radius + 'px)';
    });
  }

  function update() {
    const rotation = -current * angleStep;
    ring.style.transform = 'rotateY(' + rotation + 'deg)';
    cards.forEach(function (card, i) {
      card.classList.toggle('front', i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = ((index % total) + total) % total;
    update();
    if (window.heartBurst) window.heartBurst();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  document.addEventListener('keydown', function (e) {
    const s3 = document.getElementById('screen3');
    if (!s3 || !s3.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  /* ===== Swipe / drag ===== */
  const stage = document.querySelector('.carousel-stage');
  let startX = null, startY = null, tracking = false;

  function start(x, y) { startX = x; startY = y; tracking = true; }
  function end(x, y) {
    if (!tracking || startX === null) return;
    tracking = false;
    const dx = x - startX;
    const dy = y - startY;
    startX = startY = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else prev();
    }
  }

  stage.addEventListener('touchstart', function (e) {
    const t = e.changedTouches[0];
    start(t.clientX, t.clientY);
  }, { passive: true });

  stage.addEventListener('touchend', function (e) {
    const t = e.changedTouches[0];
    end(t.clientX, t.clientY);
  }, { passive: true });

  stage.addEventListener('touchcancel', function () {
    tracking = false; startX = startY = null;
  }, { passive: true });

  stage.addEventListener('mousedown', function (e) {
    e.preventDefault();
    start(e.clientX, e.clientY);
  });
  window.addEventListener('mouseup', function (e) {
    end(e.clientX, e.clientY);
  });

  window.addEventListener('resize', function () {
    layout();
    update();
  });

  layout();
  update();
})();