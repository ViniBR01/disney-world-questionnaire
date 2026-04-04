(function () {
  var idx = 0;
  var votes = {};
  var total = EXPERIENCES.length;
  var dragging = false;
  var startX = 0, startY = 0, currentX = 0, currentY = 0;

  var stack = document.getElementById('card-stack');
  var progressBar = document.getElementById('progress-bar');
  var progressText = document.getElementById('progress-text');

  function init() {
    idx = parseInt(sessionStorage.getItem('currentCardIndex') || '0', 10);
    try { votes = JSON.parse(sessionStorage.getItem('votes') || '{}'); } catch (_e) { votes = {}; }

    if (idx >= total) {
      window.location.href = 'results.html';
      return;
    }

    updateProgress();
    renderCards();
    bindButtons();
  }

  function updateProgress() {
    var pct = Math.round((idx / total) * 100);
    progressBar.style.width = pct + '%';
    progressText.textContent = (idx + 1) + ' / ' + total;
  }

  function renderCards() {
    stack.innerHTML = '';
    if (idx + 1 < total) {
      stack.appendChild(buildCard(EXPERIENCES[idx + 1], true));
    }
    var current = buildCard(EXPERIENCES[idx], false);
    stack.appendChild(current);
    bindSwipe(current, EXPERIENCES[idx]);
  }

  function thrillLabel(t) {
    if (t === 'calm') return 'Tranquilo';
    if (t === 'moderate') return 'Moderado';
    return 'Radical';
  }

  function categoryLabel(c) {
    if (c === 'ride') return 'Atração';
    if (c === 'parade') return 'Desfile';
    if (c === 'fireworks') return 'Fogos';
    return 'Show';
  }

  function buildCard(exp, isNext) {
    var div = document.createElement('div');
    div.className = 'card' + (isNext ? ' card--next' : ' card--current');
    div.dataset.id = exp.id;

    var thrillBadge = exp.thrill
      ? '<span class="badge badge--' + exp.thrill + '">' + thrillLabel(exp.thrill) + '</span>'
      : '';

    var photo = exp.photos && exp.photos.length > 0 ? exp.photos[0] : '';
    var hasPhoto = !!photo;
    var imgTag = hasPhoto
      ? '<img class="card__img" src="' + photo + '" alt="' + exp.name +
          '" loading="lazy" onerror="document.getElementById(\'imgwrap-' + exp.id + '\').classList.add(\'card__img-wrap--error\')">'
      : '';

    div.innerHTML =
      '<div class="card__img-wrap' + (hasPhoto ? '' : ' card__img-wrap--error') + '" id="imgwrap-' + exp.id + '">' +
        imgTag +
        '<div class="card__img-fallback" aria-hidden="true">' + exp.emoji + '</div>' +
      '</div>' +
      '<div class="swipe-hint swipe-hint--skip" aria-hidden="true">Pular</div>' +
      '<div class="swipe-hint swipe-hint--like" aria-hidden="true">Curtir</div>' +
      '<div class="swipe-hint swipe-hint--superlike" aria-hidden="true">Imperdível!</div>' +
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

  function showHints(card, dx, dy) {
    var THRESHOLD = 40;
    var skipHint = card.querySelector('.swipe-hint--skip');
    var likeHint = card.querySelector('.swipe-hint--like');
    var superHint = card.querySelector('.swipe-hint--superlike');

    var showSuper = dy < -THRESHOLD && Math.abs(dy) > Math.abs(dx);
    var showLike = !showSuper && dx > THRESHOLD;
    var showSkip = !showSuper && dx < -THRESHOLD;

    skipHint.classList.toggle('swipe-hint--visible', showSkip);
    likeHint.classList.toggle('swipe-hint--visible', showLike);
    superHint.classList.toggle('swipe-hint--visible', showSuper);
  }

  function clearHints(card) {
    card.querySelectorAll('.swipe-hint').forEach(function (el) {
      el.classList.remove('swipe-hint--visible');
    });
  }

  function bindSwipe(card, exp) {
    function onStart(x, y) {
      startX = x; startY = y;
      currentX = x; currentY = y;
      dragging = true;
      card.style.transition = 'none';
    }

    function onMove(x, y) {
      if (!dragging) return;
      currentX = x; currentY = y;
      var dx = currentX - startX;
      var dy = currentY - startY;
      card.style.transform =
        'translateX(' + dx + 'px) translateY(' + (dy * 0.3) + 'px) rotate(' + (dx * 0.04) + 'deg)';
      showHints(card, dx, dy);
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      var dx = currentX - startX;
      var dy = currentY - startY;
      var THRESHOLD = 80;
      card.style.transition = '';
      clearHints(card);

      if (dy < -THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
        animateOut(card, 'up', function () { recordVote(exp.id, 'superlike'); });
      } else if (dx > THRESHOLD) {
        animateOut(card, 'right', function () { recordVote(exp.id, 'like'); });
      } else if (dx < -THRESHOLD) {
        animateOut(card, 'left', function () { recordVote(exp.id, 'skip'); });
      } else {
        card.style.transform = '';
      }
    }

    // Touch
    card.addEventListener('touchstart', function (e) {
      onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    card.addEventListener('touchmove', function (e) {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    card.addEventListener('touchend', onEnd);

    // Mouse (desktop)
    card.addEventListener('mousedown', function (e) {
      onStart(e.clientX, e.clientY);
      function onMouseMove(ev) { onMove(ev.clientX, ev.clientY); }
      function onMouseUp() {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        onEnd();
      }
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }

  function animateOut(card, direction, callback) {
    var tx = direction === 'left' ? '-150%' : (direction === 'right' ? '150%' : '0');
    var ty = direction === 'up' ? '-150%' : '0';
    var rot = direction === 'left' ? '-20deg' : (direction === 'right' ? '20deg' : '0');
    card.style.transition = 'transform 0.32s ease';
    card.style.transform = 'translateX(' + tx + ') translateY(' + ty + ') rotate(' + rot + ')';
    setTimeout(callback, 320);
  }

  function saveVote(id, reaction) {
    votes[id] = reaction;
    sessionStorage.setItem('votes', JSON.stringify(votes));
  }

  function advanceAfterVote() {
    idx++;
    sessionStorage.setItem('currentCardIndex', String(idx));
    if (idx >= total) {
      window.location.href = 'results.html';
    } else {
      updateProgress();
      renderCards();
    }
  }

  function recordVote(id, reaction) {
    saveVote(id, reaction);
    advanceAfterVote();
  }

  function bindButtons() {
    document.getElementById('btn-skip').addEventListener('click', function () {
      var card = stack.querySelector('.card--current');
      if (!card || dragging) return;
      saveVote(EXPERIENCES[idx].id, 'skip');
      animateOut(card, 'left', advanceAfterVote);
    });

    document.getElementById('btn-like').addEventListener('click', function () {
      var card = stack.querySelector('.card--current');
      if (!card || dragging) return;
      saveVote(EXPERIENCES[idx].id, 'like');
      animateOut(card, 'right', advanceAfterVote);
    });

    document.getElementById('btn-superlike').addEventListener('click', function () {
      var card = stack.querySelector('.card--current');
      if (!card || dragging) return;
      saveVote(EXPERIENCES[idx].id, 'superlike');
      animateOut(card, 'up', advanceAfterVote);
    });

    document.getElementById('back-btn').addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }

  init();
}());
