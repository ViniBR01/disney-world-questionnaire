(function () {
  var idx = 0;
  var votes = {};
  var total = EXPERIENCES.length;
  var photoIndex = 0;  // resets to 0 on each new card
  var voting = false;  // prevents double-vote while card animates out

  var stack = document.getElementById('card-stack');
  var progressBar = document.getElementById('progress-bar');
  var progressText = document.getElementById('progress-text');

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

    var thrillBadge = exp.thrill
      ? '<span class="badge badge--' + exp.thrill + '">' + thrillLabel(exp.thrill) + '</span>'
      : '';

    // Photo strip — each image takes 100% of the wrap width
    var stripHtml = '';
    photos.forEach(function (photo, i) {
      var onerrorAttr = i === 0
        ? ' onerror="this.closest(\'.card__img-wrap\').classList.add(\'card__img-wrap--error\')"'
        : '';
      stripHtml +=
        '<img class="card__img" src="' + photo + '" alt="' + exp.name + '"' +
        ' loading="' + (i === 0 ? 'eager' : 'lazy') + '"' + onerrorAttr + '>';
    });

    // Dot indicators — pill shape for active dot
    var dotsHtml = '';
    if (photoCount > 1) {
      dotsHtml = '<div class="photo-dots" aria-hidden="true">';
      for (var i = 0; i < photoCount; i++) {
        dotsHtml += '<span class="photo-dot' + (i === 0 ? ' photo-dot--active' : '') + '"></span>';
      }
      dotsHtml += '</div>';
    }

    // Arrow buttons — prev starts hidden (first photo)
    var arrowsHtml = '';
    if (photoCount > 1) {
      arrowsHtml =
        '<button class="photo-nav photo-nav--prev photo-nav--hidden" aria-label="Foto anterior" tabindex="-1">&#8249;</button>' +
        '<button class="photo-nav photo-nav--next" aria-label="Próxima foto" tabindex="-1">&#8250;</button>';
    }

    div.innerHTML =
      '<div class="card__img-wrap' + (!hasPhotos ? ' card__img-wrap--error' : '') + '">' +
        '<div class="photo-strip">' + stripHtml + '</div>' +
        dotsHtml +
        arrowsHtml +
        '<div class="card__img-fallback" aria-hidden="true">' + exp.emoji + '</div>' +
      '</div>' +
      '<div class="card__body">' +
        '<div class="card__badges">' + thrillBadge +
          '<span class="badge badge--category">' + categoryLabel(exp.category) + '</span>' +
        '</div>' +
        '<h2 class="card__name">' + exp.name + '</h2>' +
        '<p class="card__desc">' + exp.description + '</p>' +
        '<div class="card__tip">' +
          '<span aria-hidden="true">💡</span>' +
          '<p>' + exp.tip + '</p>' +
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
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function thrillLabel(t) {
    if (t === 'calm') return 'Tranquilo';
    if (t === 'moderate') return 'Moderado';
    return 'Radical';
  }

  function categoryLabel(c) {
    if (c === 'ride')      return 'Atração';
    if (c === 'parade')    return 'Desfile';
    if (c === 'fireworks') return 'Fogos';
    return 'Show';
  }

  init();
}());
