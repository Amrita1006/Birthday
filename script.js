window.onload = function () {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });
};

document.getElementById('confetti-btn').addEventListener('click', () => {
  confetti({
    particleCount: 400,
    spread: 100,
    origin: { y: 0.5 }
  });

  document.getElementById('candles').style.display = 'none';
  document.getElementById('intro').style.display = 'none';
  document.getElementById('mainContent').classList.remove('hidden');

  const app = document.getElementById('typewriter-text');
  const typewriter = new Typewriter(app, {
    loop: false,
    delay: 45
  });

  typewriter
    .pauseFor(300)
    .typeString("Hope your day is as amazing as you are 💖")
    .pauseFor(300)
    .typeString("<br>Enjoy the memories, love, and laughter 🎂✨")
    .start();
});

document.getElementById('memory-btn').addEventListener('click', () => {
  document.getElementById('gallerysection').classList.remove('hidden');
  document.getElementById('mainContent').style.display = 'none';
  showSlide(current);
});

// GLOBALS
let slides, current = 0, playing = true, timer = null;
let bgMusic;

window.addEventListener("DOMContentLoaded", () => {
  slides = document.querySelectorAll('.slide');
  bgMusic = document.getElementById('backgroundMusic');

  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const toggleBtn = document.getElementById('toggle-play');

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      playing = !playing;
      toggleBtn.textContent = playing ? 'Pause' : 'Play';
      if (playing) showSlide(current);
      else clearTimeout(timer);
    });
  }
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    const vid = slide.querySelector('video');
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  });

  clearTimeout(timer);

  const slide = slides[index];
  slide.classList.add('active');

  const isLast = index === slides.length - 1;
  const video = slide.querySelector('video');

  if (video) {
    if (bgMusic) bgMusic.pause();
    video.muted = false;
    video.play();

    video.onended = () => {
      if (isLast) {
        showBlessing();
      } else {
        current++;
        showSlide(current);
      }
    };
  } else {
    if (bgMusic) bgMusic.play();
    timer = setTimeout(() => {
      if (isLast) {
        showBlessing();
      } else {
        current++;
        showSlide(current);
      }
    }, 5000);
  }
}

function nextSlide() {
  if (current < slides.length - 1) {
    current++;
    showSlide(current);
  }
}

function prevSlide() {
  if (current > 0) {
    current--;
    showSlide(current);
  }
}

function showBlessing() {
  document.getElementById('gallerysection').classList.add('hidden');
  document.getElementById('blessingMessage').classList.remove('hidden');
}
