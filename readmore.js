// Collapsible project descriptions — mobile only.
// Adds a "Read more" toggle after each .desc. The clamp and fade only apply
// under the mobile breakpoint in CSS; on desktop the toggle is hidden and the
// full text always shows.
(function () {
  var descs = document.querySelectorAll('.desc');

  function noTransition(el) {
    return parseFloat(getComputedStyle(el).transitionDuration) === 0;
  }

  function expand(desc, btn) {
    desc.classList.add('open');
    desc.style.maxHeight = desc.scrollHeight + 'px';
    btn.setAttribute('aria-expanded', 'true');
    btn.firstChild.nodeValue = 'Show less';
    // Release the fixed height once open so the text can reflow freely.
    if (noTransition(desc)) desc.style.maxHeight = 'none';
  }

  function collapse(desc, btn) {
    // Animate from the current pixel height back to the CSS clamp.
    desc.style.maxHeight = desc.scrollHeight + 'px';
    void desc.offsetHeight;
    desc.classList.remove('open');
    desc.style.maxHeight = '';
    btn.setAttribute('aria-expanded', 'false');
    btn.firstChild.nodeValue = 'Read more';

    // If the card's top has scrolled off screen, bring it back into view.
    var card = desc.closest('.project, .section');
    if (card && card.getBoundingClientRect().top < 0) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  for (var i = 0; i < descs.length; i++) {
    (function (desc, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'read-more';
      btn.appendChild(document.createTextNode('Read more'));
      btn.setAttribute('aria-expanded', 'false');
      if (!desc.id) desc.id = 'desc-' + i;
      btn.setAttribute('aria-controls', desc.id);

      desc.classList.add('collapsible');
      desc.parentNode.insertBefore(btn, desc.nextSibling);

      btn.addEventListener('click', function () {
        if (desc.classList.contains('open')) collapse(desc, btn);
        else expand(desc, btn);
      });

      desc.addEventListener('transitionend', function (e) {
        if (e.target === desc && e.propertyName === 'max-height' && desc.classList.contains('open')) {
          desc.style.maxHeight = 'none';
        }
      });
    })(descs[i], i);
  }
})();
