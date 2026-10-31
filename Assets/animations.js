/* ===== Screen navigation + hearts + envelope ===== */
(function () {
  const screens = ['screen1', 'screen2', 'screen3', 'screen4'];
  let currentScreen = 0;

  const backBtn = document.getElementById('backBtn');

  function showScreen(index) {
    if (index < 0 || index >= screens.length) return;
    document.getElementById(screens[currentScreen]).classList.remove('active');
    currentScreen = index;
    document.getElementById(screens[currentScreen]).classList.add('active');
    backBtn.hidden = currentScreen === 0;
  }

  document.querySelectorAll('[data-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = screens.indexOf(btn.dataset.next);
      if (target !== -1) showScreen(target);
    });
  });

  backBtn.addEventListener('click', function () {
    showScreen(currentScreen - 1);
  });

  /* ===== Floating hearts ===== */
  const heartsLayer = document.getElementById('heartsLayer');
  const heartEmojis = ['💗', '💕', '❤️', '🌸', '💖'];
  function spawnHeart() {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (12 + Math.random() * 16) + 'px';
    heart.style.animationDuration = (9 + Math.random() * 8) + 's';
    heartsLayer.appendChild(heart);
    setTimeout(function () { heart.remove(); }, 18000);
  }
  setInterval(spawnHeart, 900);
  for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);

  /* ===== Envelope open ===== */
  const envelope = document.getElementById('envelope');
  const envelopeWrap = document.getElementById('envelopeWrap');
  const letterCard = document.getElementById('letterCard');

  function openEnvelope() {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    setTimeout(function () {
      envelopeWrap.classList.add('hidden');
      letterCard.classList.add('show');
      letterCard.setAttribute('aria-hidden', 'false');
      if (window.heartBurst) window.heartBurst();
    }, 900);
  }

  envelope.addEventListener('click', openEnvelope);
  envelope.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });
})();