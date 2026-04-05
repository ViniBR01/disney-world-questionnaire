(function () {
  var idx = 0;
  var votes = {};
  var total = EXPERIENCES.length;
  var photoIndex = 0;  // resets to 0 on each new card
  var voting = false;  // prevents double-vote while card animates out
  var navOpen = false;

  var stack = document.getElementById('card-stack');
  var progressBar = document.getElementById('progress-bar');
  var progressText = document.getElementById('progress-text');
  var navPanel = document.getElementById('nav-panel');
  var navBackdrop = document.getElementById('nav-backdrop');
  var tutSlide = 1;

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    idx = parseInt(sessionStorage.getItem('currentCardIndex') || '0', 10);
    try { votes = JSON.parse(sessionStorage.getItem('votes') || '{}'); } catch (_e) { votes = {}; }

    if (idx >= total) {
      window.location.href = 'results.html';
      return;
    }

    updateProgress();
    renderCards();
    bindVoteButtons();
    initTutorial();
  }

  function updateProgress() {
    var pct = Math.round((idx / total) * 100);
    progressBar.style.width = pct + '%';
    progressText.textContent = (idx + 1) + ' / ' + total;
  }

  // ── Card rendering ────────────────────────────────────────────────────────
  function renderCards() {
    photoIndex = 0;
    stack.innerHTML = '';
    if (idx + 1 < total) {
      stack.appendChild(buildCard(EXPERIENCES[idx + 1], true));
    }
    var current = buildCard(EXPERIENCES[idx], false);
    stack.appendChild(current);
    bindPhotoNav(current, EXPERIENCES[idx]);
  }

  function buildCard(exp, isNext) {
    var div = document.createElement('div');
    div.className = 'card' + (isNext ? ' card--next' : ' card--current');
    div.dataset.id = exp.id;

    var photos = exp.photos || [];
    var photoCount = photos.length;
    var hasPhotos = photoCount > 0;
    var subcat = SUBCATEGORIES[exp.subcategory] || SUBCATEGORIES.show;

    // Photo strip
    var stripHtml = '';
    photos.forEach(function (photo, i) {
      var onerrorAttr = i === 0
        ? ' onerror="this.closest(\'.card__img-wrap\').classList.add(\'card__img-wrap--error\')"'
        : '';
      stripHtml +=
        '<img class="card__img" src="' + photo + '" alt="' + exp.name + '"' +
        ' loading="' + (i === 0 ? 'eager' : 'lazy') + '"' + onerrorAttr + '>';
    });

    // Dot indicators
    var dotsHtml = '';
    if (photoCount > 1) {
      dotsHtml = '<div class="photo-dots" aria-hidden="true">';
      for (var i = 0; i < photoCount; i++) {
        dotsHtml += '<span class="photo-dot' + (i === 0 ? ' photo-dot--active' : '') + '"></span>';
      }
      dotsHtml += '</div>';
    }

    // Arrow buttons
    var arrowsHtml = photoCount > 1
      ? '<button class="photo-nav photo-nav--prev photo-nav--hidden" aria-label="Foto anterior" tabindex="-1">&#8249;</button>' +
        '<button class="photo-nav photo-nav--next" aria-label="Próxima foto" tabindex="-1">&#8250;</button>'
      : '';

    // Stats rows
    var statsHtml =
      '<div class="card__stats">' +
        '<div class="card__stat">' +
          '<span class="card__stat-icon">⏱</span>' +
          '<span class="card__stat-label">Duração</span>' +
          '<span class="card__stat-value">' + (exp.duration || '—') + '</span>' +
        '</div>';
    if (exp.speed) {
      statsHtml +=
        '<div class="card__stat card__stat--speed">' +
          '<span class="card__stat-icon">⚡</span>' +
          '<span class="card__stat-label">Vel. Máxima</span>' +
          '<span class="card__stat-value">' + exp.speed + '</span>' +
        '</div>';
    }
    statsHtml += '</div>';

    div.innerHTML =
      '<div class="card__img-wrap' + (!hasPhotos ? ' card__img-wrap--error' : '') + '">' +
        '<div class="photo-strip">' + stripHtml + '</div>' +
        dotsHtml + arrowsHtml +
        '<div class="card__img-fallback" aria-hidden="true">' + exp.emoji + '</div>' +
        '<div class="card__info">' +
          '<div class="card__category-bar">' +
            '<span class="catbar__badge" style="background:' + subcat.bg + ';color:' + subcat.fg + '">' +
              subcat.icon + '\u00a0' + subcat.label +
            '</span>' +
            '<span class="catbar__year">' + exp.year + '</span>' +
          '</div>' +
          '<h2 class="card__name">' + exp.name + '</h2>' +
          statsHtml +
          '<p class="card__desc">' + exp.description + '</p>' +
        '</div>' +
      '</div>';

    return div;
  }

  // ── Photo navigation ──────────────────────────────────────────────────────
  function bindPhotoNav(card, exp) {
    var photos = exp.photos || [];
    var photoCount = photos.length;
    if (photoCount <= 1) return;

    var wrap  = card.querySelector('.card__img-wrap');
    var strip = card.querySelector('.photo-strip');
    var prev  = card.querySelector('.photo-nav--prev');
    var next  = card.querySelector('.photo-nav--next');
    if (!wrap || !strip) return;

    var dragStartX = 0;
    var dragDelta  = 0;
    var dragging   = false;

    function setStrip(delta, animate) {
      strip.style.transition = animate ? 'transform 0.28s ease' : 'none';
      strip.style.transform  = 'translateX(calc(' + (-photoIndex * 100) + '% + ' + delta + 'px))';
    }

    function goTo(newIndex) {
      photoIndex = newIndex;
      setStrip(0, true);
      refreshDots(card, photoCount);
      refreshArrows(card, photoCount);
    }

    function onStart(x) {
      if (voting) return;
      dragging = true;
      dragStartX = x;
      dragDelta = 0;
      strip.style.transition = 'none';
    }

    function onMove(x) {
      if (!dragging) return;
      dragDelta = x - dragStartX;
      // Elastic resistance at edges
      var atStart = photoIndex === 0 && dragDelta > 0;
      var atEnd   = photoIndex === photoCount - 1 && dragDelta < 0;
      if (atStart || atEnd) dragDelta *= 0.25;
      setStrip(dragDelta, false);
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      var THRESHOLD = 50;
      if (dragDelta < -THRESHOLD && photoIndex < photoCount - 1) {
        goTo(photoIndex + 1);
      } else if (dragDelta > THRESHOLD && photoIndex > 0) {
        goTo(photoIndex - 1);
      } else {
        setStrip(0, true); // snap back
      }
    }

    // Touch events on the image area only
    wrap.addEventListener('touchstart', function (e) {
      onStart(e.touches[0].clientX);
    }, { passive: true });

    wrap.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      e.preventDefault();
      onMove(e.touches[0].clientX);
    }, { passive: false });

    wrap.addEventListener('touchend', onEnd);

    // Mouse events (desktop)
    wrap.addEventListener('mousedown', function (e) {
      onStart(e.clientX);
      function onMouseMove(ev) { onMove(ev.clientX); }
      function onMouseUp() {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        onEnd();
      }
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // Arrow buttons
    prev.addEventListener('click', function (e) {
      e.stopPropagation();
      if (photoIndex > 0) goTo(photoIndex - 1);
    });

    next.addEventListener('click', function (e) {
      e.stopPropagation();
      if (photoIndex < photoCount - 1) goTo(photoIndex + 1);
    });
  }

  function refreshDots(card) {
    card.querySelectorAll('.photo-dot').forEach(function (dot, i) {
      dot.classList.toggle('photo-dot--active', i === photoIndex);
    });
  }

  function refreshArrows(card, photoCount) {
    var p = card.querySelector('.photo-nav--prev');
    var n = card.querySelector('.photo-nav--next');
    if (p) p.classList.toggle('photo-nav--hidden', photoIndex === 0);
    if (n) n.classList.toggle('photo-nav--hidden', photoIndex === photoCount - 1);
  }

  // ── Vote (buttons only) ───────────────────────────────────────────────────
  function animateOut(card, direction, callback) {
    var tx  = direction === 'left' ? '-150%' : (direction === 'right' ? '150%' : '0');
    var ty  = direction === 'up' ? '-150%' : '0';
    var rot = direction === 'left' ? '-20deg' : (direction === 'right' ? '20deg' : '0');
    card.style.transition = 'transform 0.32s ease';
    card.style.transform  = 'translateX(' + tx + ') translateY(' + ty + ') rotate(' + rot + ')';
    setTimeout(callback, 320);
  }

  function saveVote(id, reaction) {
    votes[id] = reaction;
    sessionStorage.setItem('votes', JSON.stringify(votes));
  }

  function advanceAfterVote() {
    voting = false;
    if (navOpen) closeNav();
    idx++;
    sessionStorage.setItem('currentCardIndex', String(idx));
    if (idx >= total) {
      window.location.href = 'results.html';
    } else {
      updateProgress();
      renderCards();
    }
  }

  function bindVoteButtons() {
    document.getElementById('btn-skip').addEventListener('click', function () {
      var card = stack.querySelector('.card--current');
      if (!card || voting) return;
      voting = true;
      saveVote(EXPERIENCES[idx].id, 'skip');
      animateOut(card, 'left', advanceAfterVote);
    });

    document.getElementById('btn-like').addEventListener('click', function () {
      var card = stack.querySelector('.card--current');
      if (!card || voting) return;
      voting = true;
      saveVote(EXPERIENCES[idx].id, 'like');
      animateOut(card, 'right', advanceAfterVote);
    });

    document.getElementById('btn-superlike').addEventListener('click', function () {
      var card = stack.querySelector('.card--current');
      if (!card || voting) return;
      voting = true;
      saveVote(EXPERIENCES[idx].id, 'superlike');
      animateOut(card, 'up', advanceAfterVote);
    });

    document.getElementById('back-btn').addEventListener('click', function () {
      window.location.href = 'index.html';
    });

    // Progress bar + toggle open the nav panel
    document.getElementById('progress-bar-wrap').addEventListener('click', function () {
      if (!navOpen) openNav();
    });
    document.getElementById('progress-text').addEventListener('click', function () {
      if (!navOpen) openNav();
    });
    document.getElementById('nav-toggle').addEventListener('click', function () {
      if (navOpen) closeNav(); else openNav();
    });
    document.getElementById('nav-close').addEventListener('click', closeNav);
    navBackdrop.addEventListener('click', closeNav);
  }

  // ── Tutorial ──────────────────────────────────────────────────────────────
  function initTutorial() {
    if (localStorage.getItem('mkTutorialSeen')) return;
    var overlay = document.getElementById('tutorial-overlay');
    overlay.hidden = false;

    document.getElementById('tut-next').addEventListener('click', advanceTutorial);
    document.getElementById('tutorial-backdrop').addEventListener('click', dismissTutorial);
  }

  function advanceTutorial() {
    if (tutSlide === 1) {
      document.getElementById('tut-slide-1').hidden = true;
      document.getElementById('tut-slide-2').hidden = false;
      document.getElementById('tut-dot-1').classList.remove('tut-dot--active');
      document.getElementById('tut-dot-2').classList.add('tut-dot--active');
      document.getElementById('tut-title').textContent = 'Como avaliar';
      document.getElementById('tut-next').textContent = 'Começar! →';
      tutSlide = 2;
    } else {
      dismissTutorial();
    }
  }

  function dismissTutorial() {
    localStorage.setItem('mkTutorialSeen', '1');
    document.getElementById('tutorial-overlay').hidden = true;
  }

  // ── Navigation panel ──────────────────────────────────────────────────────
  function openNav() {
    var header  = document.querySelector('.vote-header');
    var actions = document.querySelector('.vote-actions');
    var hH = header.offsetHeight;
    var aH = actions.offsetHeight;

    // Position: below header, leaving ~80px of card visible above vote buttons
    navPanel.style.top = hH + 'px';
    navPanel.style.maxHeight = (window.innerHeight - hH - aH - 80) + 'px';
    navBackdrop.style.top = hH + 'px';
    navBackdrop.style.bottom = aH + 'px';

    buildNavList();
    navPanel.hidden = false;
    navBackdrop.hidden = false;
    document.getElementById('nav-toggle').setAttribute('aria-expanded', 'true');
    navOpen = true;

    // Scroll current item into view
    var current = navPanel.querySelector('.nav-item--current');
    if (current) current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function closeNav() {
    navPanel.hidden = true;
    navBackdrop.hidden = true;
    document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');
    navOpen = false;
  }

  function buildNavList() {
    var list = document.getElementById('nav-list');
    list.innerHTML = '';

    EXPERIENCES.forEach(function (exp, i) {
      var div = document.createElement('div');
      div.className = 'nav-item' + (i === idx ? ' nav-item--current' : '');
      div.setAttribute('role', 'listitem');

      var v = votes[exp.id];
      var vIcon  = v === 'superlike' ? '★' : v === 'like' ? '♥' : v === 'skip' ? '✕' : '';
      var vClass = v ? 'nav-vote nav-vote--' + v : 'nav-vote';
      var subcat = SUBCATEGORIES[exp.subcategory] || SUBCATEGORIES.show;

      div.innerHTML =
        '<span class="nav-item__num">' + (i + 1) + '</span>' +
        '<span class="nav-item__dot" style="background:' + subcat.bg + '" aria-hidden="true"></span>' +
        '<span class="nav-item__name">' + exp.name + '</span>' +
        '<span class="' + vClass + '" aria-hidden="true">' + vIcon + '</span>';

      if (i !== idx) {
        div.addEventListener('click', function () {
          idx = i;
          photoIndex = 0;
          sessionStorage.setItem('currentCardIndex', String(idx));
          updateProgress();
          renderCards();
          closeNav();
        });
      }

      list.appendChild(div);
    });
  }

  init();
}());
