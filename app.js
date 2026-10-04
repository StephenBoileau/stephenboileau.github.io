// Keep descriptions expanded on larger screens, with a native disclosure on phones.
const phoneLayout = window.matchMedia('(max-width: 560px)');
function setProjectDetailLayout() {
  document.querySelectorAll('.card-details').forEach(details => {
    details.open = !phoneLayout.matches;
  });
}
setProjectDetailLayout();
phoneLayout.addEventListener('change', setProjectDetailLayout);

// A quiet starfield: distant stars drift and scroll more slowly than near stars.
const starCanvas = document.createElement('canvas');
starCanvas.className = 'starfield';
starCanvas.setAttribute('aria-hidden', 'true');
document.body.prepend(starCanvas);
const starContext = starCanvas.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (starContext) {
  let width = 0;
  let height = 0;
  let stars = [];
  let drift = 0;
  let lastTime = 0;
  let animationFrame = 0;
  const wrap = (value, range) => ((value % range) + range) % range;

  function resizeStars() {
    width = window.innerWidth;
    height = window.innerHeight;
    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    starCanvas.width = Math.round(width * scale);
    starCanvas.height = Math.round(height * scale);
    starContext.setTransform(scale, 0, 0, scale, 0, 0);
    // Stable positions on resize, without adding a dependency or image asset.
    let seed = 78;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const count = 2 * Math.min(140, Math.max(40, Math.round(width * height / 11000)));
    stars = Array.from({ length: count }, (_, index) => {
      const depth = index % 3;
      return {
        x: random() * width,
        y: random() * height,
        radius: [0.6, 0.85, 1.1][depth],
        opacity: [0.28, 0.43, 0.6][depth],
        speed: [0.35, 0.65, 1][depth],
        parallax: [0.035, 0.08, 0.15][depth]
      };
    });
    drawStars();
  }

  function drawStars() {
    starContext.clearRect(0, 0, width, height);
    const scroll = reducedMotion.matches ? 0 : window.scrollY;
    const travel = reducedMotion.matches ? 0 : drift;
    for (const star of stars) {
      const x = wrap(star.x + travel * star.speed * 0.22, width);
      const y = wrap(star.y - travel * star.speed - scroll * star.parallax, height);
      starContext.fillStyle = `rgba(176, 211, 243, ${star.opacity})`;
      starContext.beginPath();
      starContext.arc(x, y, star.radius, 0, Math.PI * 2);
      starContext.fill();
    }
  }

  function animateStars(time) {
    if (lastTime) drift += Math.min((time - lastTime) / 1000, 0.05) * 10.5;
    lastTime = time;
    drawStars();
    animationFrame = requestAnimationFrame(animateStars);
  }

  function syncStarAnimation() {
    cancelAnimationFrame(animationFrame);
    lastTime = 0;
    drawStars();
    if (!reducedMotion.matches && !document.hidden) {
      animationFrame = requestAnimationFrame(animateStars);
    }
  }

  window.addEventListener('resize', resizeStars);
  document.addEventListener('visibilitychange', syncStarAnimation);
  reducedMotion.addEventListener('change', syncStarAnimation);
  resizeStars();
  syncStarAnimation();
}

document.querySelectorAll('.video-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('.media');
    container?.classList.add('is-playing');
    button.closest('.support-card')?.classList.add('is-playing');
    if (button.dataset.src) {
      const video = document.createElement('video');
      video.src = button.dataset.src;
      video.poster = button.querySelector('img').src;
      video.controls = true;
      video.playsInline = true;
      video.autoplay = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', `${button.dataset.title} video`);
      button.replaceWith(video);
      video.play().catch(() => {}); // Native controls remain available if autoplay is blocked.
      return;
    }
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1`;
    frame.title = `${button.dataset.title} video`;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    button.replaceWith(frame);
    frame.focus();
  });
});
