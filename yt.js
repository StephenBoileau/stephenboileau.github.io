// Click-to-load YouTube embeds — shared across pages.
// Shows a lightweight thumbnail until tapped, so the page doesn't load a full
// YouTube player per video up front. On tap, the YouTube IFrame API is used to
// start playback immediately (a plain autoplay iframe needs a second tap on phones).
(function () {
  var PLAY_SVG =
    '<svg class="yt-play" viewBox="0 0 68 48" aria-hidden="true">' +
    '<path fill="#f00" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/>' +
    '<path fill="#fff" d="M45 24 27 14v20z"/>' +
    '</svg>';
  var ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  var apiPromise = null;

  function loadApi() {
    if (!apiPromise) {
      apiPromise = new Promise(function (resolve, reject) {
        if (window.YT && window.YT.Player) return resolve();
        var prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
          if (prev) prev();
          resolve();
        };
        var s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    return apiPromise;
  }

  // Fallback if the API can't load: a plain autoplaying embed.
  function plainIframe(el, id, title) {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&playsinline=1&rel=0';
    f.title = title;
    f.allow = ALLOW;
    f.allowFullscreen = true;
    el.replaceWith(f);
  }

  function play(el) {
    var id = el.getAttribute('data-id');
    var title = el.textContent.trim();
    el.classList.add('yt-loading');
    loadApi().then(function () {
      var holder = document.createElement('div');
      el.replaceWith(holder);
      new YT.Player(holder, {
        videoId: id,
        width: '100%',
        height: '100%',
        playerVars: { autoplay: 1, playsinline: 1, rel: 0 },
        events: {
          onReady: function (e) {
            e.target.getIframe().title = title;
            e.target.playVideo();
          }
        }
      });
    }, function () {
      plainIframe(el, id, title);
    });
  }

  var links = document.querySelectorAll('a.yt[data-id]');
  for (var i = 0; i < links.length; i++) {
    var el = links[i];
    el.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + el.getAttribute('data-id') + '/hqdefault.jpg)';
    el.insertAdjacentHTML('beforeend', PLAY_SVG);
    el.addEventListener('pointerover', loadApi, { once: true, passive: true });
    el.addEventListener('touchstart', loadApi, { once: true, passive: true });
    el.addEventListener('click', function (e) {
      e.preventDefault();
      play(this);
    });
  }
})();
