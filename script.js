// ===== FLOATING DECORATIONS =====
const decorContainer = document.getElementById("decor");
const decorEmojis = ["🧸", "🌸", "🎁", "🌷", "💖", "🌹", "🎀"];

function createFloatingItem() {
  const item = document.createElement("span");
  item.className = "float-item";
  item.textContent = decorEmojis[Math.floor(Math.random() * decorEmojis.length)];
  item.style.left = Math.random() * 100 + "%";
  item.style.fontSize = 18 + Math.random() * 20 + "px";
  item.style.animationDuration = 8 + Math.random() * 8 + "s";
  item.style.animationDelay = Math.random() * 4 + "s";
  decorContainer.appendChild(item);
  setTimeout(() => item.remove(), 16000);
}

setInterval(createFloatingItem, 900);
for (let i = 0; i < 6; i++) setTimeout(createFloatingItem, i * 200);

// ===== SCREEN ELEMENTS =====
const welcomeScreen = document.getElementById("welcomeScreen");
const linesScreen = document.getElementById("linesScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const letterScreen = document.getElementById("letterScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const envelopeWrap = document.getElementById("envelopeWrap");
const linesBox = document.getElementById("linesBox");
const progressDots = document.querySelectorAll(".dot");

// ===== THE 8 ROMANTIC LINES (4 pages × 2 lines) =====
const linePages = [
  [
    "Some people search their whole life",
    "for a reason to smile. I found mine in you. 🌸",
  ],
  [
    "You walked into my life quietly,",
    "and somehow became my favorite part of every day. 💕",
  ],
  [
    "Your laugh is my favorite sound,",
    "your happiness, my favorite mission. 🧸",
  ],
  [
    "And today, on your special day,",
    "I just want you to know — you are so deeply loved. 💖",
  ],
];

let currentPage = 0;

// ===== SHOW A PAGE OF LINES =====
function showLines(pageIndex) {
  const lines = linePages[pageIndex];
  linesBox.innerHTML = "";

  lines.forEach((text) => {
    const p = document.createElement("p");
    p.className = "line-text";
    p.textContent = text;
    linesBox.appendChild(p);
  });

  // Update progress dots
  progressDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === pageIndex);
  });

  // Change button text on last page
  if (pageIndex === linePages.length - 1) {
    nextBtn.textContent = "Open Your Gift 🎁";
  } else {
    nextBtn.textContent = "Next 💕";
  }
}

// ===== SCREEN SWITCH HELPER =====
function switchScreen(fromScreen, toScreen) {
  fromScreen.classList.remove("active");
  toScreen.classList.add("active");
  window.scrollTo(0, 0);
}

// ===== SCREEN 1 → SCREEN 2 =====
startBtn.addEventListener("click", () => {
  switchScreen(welcomeScreen, linesScreen);
  currentPage = 0;
  showLines(0);
});

// ===== SCREEN 2 → NEXT LINES OR ENVELOPE =====
// ===== SCREEN 2 → NEXT LINES OR GALLERY =====
const galleryScreen = document.getElementById("galleryScreen");

nextBtn.addEventListener("click", () => {
  currentPage++;
  if (currentPage < linePages.length) {
    showLines(currentPage);
  } else {
    // All line pages done → go to photo gallery
    switchScreen(linesScreen, galleryScreen);
    showPhoto(0);
  }
});
// ===== SCREEN 3 → SCREEN 4 (LETTER) =====
function openLetter() {
  envelopeWrap.classList.add("opening");
  setTimeout(() => {
    switchScreen(envelopeScreen, letterScreen);
  }, 800);
}

envelopeWrap.addEventListener("click", openLetter);
envelopeWrap.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openLetter();
  }
});


// ===== PHOTO GALLERY =====
const galleryPhoto = document.getElementById("galleryPhoto");
const photoCaption = document.getElementById("photoCaption");
const prevPhotoBtn = document.getElementById("prevPhoto");
const nextPhotoBtn = document.getElementById("nextPhoto");
const photoDots = document.getElementById("photoDots");

// ⚠️ EDIT THIS — your photos + captions
// File paths are relative to index.html
const photos = [
  {
    src: "photo1.jpg",
    caption: "The day I knew you were special 💕",
  },
  {
    src: "photo2.jpg",
    caption: "That smile I'd do anything for 😊",
  },
  {
    src: "photo3.jpg",
    caption: "My favorite person, my favorite place 🧸",
  },
  {
    src: "photo4.jpg",
    caption: "Every moment with you feels like a gift 🎁",
  },
];

let currentPhoto = 0;

// Build photo progress dots
photos.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot" + (i === 0 ? " active" : "");
  photoDots.appendChild(dot);
});
const photoDotEls = photoDots.querySelectorAll(".dot");

// Show a photo by index
function showPhoto(index) {
  const photo = photos[index];
  galleryPhoto.src = photo.src;
  galleryPhoto.alt = photo.caption;
  photoCaption.textContent = photo.caption;

  // Restart fade animation
  galleryPhoto.style.animation = "none";
  void galleryPhoto.offsetWidth;
  galleryPhoto.style.animation = "photoFadeIn 0.6s ease";

  // Update dots
  photoDotEls.forEach((d, i) => d.classList.toggle("active", i === index));

  // Update buttons
  prevPhotoBtn.disabled = index === 0;
  nextPhotoBtn.textContent =
    index === photos.length - 1 ? "One Last Thing 💌" : "Next 💕";
}

// Prev / Next handlers
prevPhotoBtn.addEventListener("click", () => {
  if (currentPhoto > 0) {
    currentPhoto--;
    showPhoto(currentPhoto);
  }
});

nextPhotoBtn.addEventListener("click", () => {
  if (currentPhoto < photos.length - 1) {
    currentPhoto++;
    showPhoto(currentPhoto);
  } else {
    // Last photo → go to envelope
    switchScreen(galleryScreen, envelopeScreen);
  }
});

// ===== SWIPE SUPPORT (mobile) =====
let touchStartX = 0;
let touchEndX = 0;

galleryScreen.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

galleryScreen.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0 && currentPhoto < photos.length - 1) {
    // Swipe left → next
    currentPhoto++;
    showPhoto(currentPhoto);
  } else if (diff < 0 && currentPhoto > 0) {
    // Swipe right → prev
    currentPhoto--;
    showPhoto(currentPhoto);
  }
});
// ===== LETTER → FINAL MOON SCREEN =====
const finalScreen = document.getElementById("finalScreen");
const finalBtn = document.getElementById("finalBtn");

finalBtn.addEventListener("click", () => {
  switchScreen(letterScreen, finalScreen);
});
