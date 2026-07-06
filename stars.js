// Toony star field parallax — shared across all pages
(function () {
  var layers = [
    { el: document.getElementById('stars-far'),     speed: 0.10, tile: 460 },
    { el: document.getElementById('stars-mid'),     speed: 0.22, tile: 580 },
    { el: document.getElementById('stars-near'),    speed: 0.40, tile: 700 },
    { el: document.getElementById('stars-twinkle'), speed: 0.40, tile: 900 }
  ];
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ticking = false;

  function update() {
    ticking = false;
    if (reduced.matches) return;
    var y = window.scrollY || window.pageYOffset;
    for (var i = 0; i < layers.length; i++) {
      var offset = -((y * layers[i].speed) % layers[i].tile);
      layers[i].el.style.transform = 'translate3d(0,' + offset + 'px,0)';
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
})();
