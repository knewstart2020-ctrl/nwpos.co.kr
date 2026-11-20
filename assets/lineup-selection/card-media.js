(() => {
  const intro = document.querySelector('#filmIntro');
  const videos = Array.from(document.querySelectorAll('#track video[data-src]'));
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const visible = new Set();

  function update(video) {
    if (motion.matches || document.hidden || !intro.hidden || !visible.has(video)) {
      video.pause();
      if (motion.matches && video.hasAttribute('src')) {
        video.removeAttribute('src');
        video.load();
      }
      return;
    }
    if (!video.hasAttribute('src')) video.src = video.dataset.src;
    if (video.paused) video.play().catch(() => {});
  }
  const refresh = () => videos.forEach(update);
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.intersectionRatio >= 0.15) visible.add(entry.target);
      else visible.delete(entry.target);
      update(entry.target);
    }
  }, { threshold: [0, 0.15] });
  videos.forEach(video => observer.observe(video));
  new MutationObserver(refresh).observe(intro, { attributes: true, attributeFilter: ['hidden'] });
  motion.addEventListener('change', refresh);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('pageshow', refresh);
})();
