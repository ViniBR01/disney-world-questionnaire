(function () {
  var votes = {};
  var voterName = '';
  var currentEditId = null;
  var submitting = false;

  // Action-sheet photo state
  var asPhotoIndex = 0;
  var asPhotoCount = 0;
  var asDragStartX = 0;
  var asDragging = false;
  var asDragDelta = 0;

  // ── DOM refs ──────────────────────────────────────────────────────────────
  var backdrop      = document.getElementById('action-sheet-backdrop');
  var asEmoji       = document.getElementById('as-emoji');
  var asTitle       = document.getElementById('as-title');
  var asSuperlike   = document.getElementById('as-superlike');
  var asLike        = document.getElementById('as-like');
  var asSkip        = document.getElementById('as-skip');
  var asCancel      = document.getElementById('as-cancel');
  var asPhotos      = document.getElementById('as-photos');
  var asPhotoStrip  = document.getElementById('as-photo-strip');
  var asPhotoDots   = document.getElementById('as-photo-dots');
  var asPhotoPrev   = document.getElementById('as-photo-prev');
  var asPhotoNext   = document.getElementById('as-photo-next');
  var asPhotoFallback = document.getElementById('as-photo-fallback');
  var submitBtn     = document.getElementById('btn-submit');
  var submitNote    = document.getElementById('submit-note');
  var submitError   = document.getElementById('submit-error');

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    try { votes = JSON.parse(sessionStorage.getItem('votes') || '{}'); } catch (_e) { votes = {}; }
    voterName = sessionStorage.getItem('voterName') || '';

    if (Object.keys(votes).length === 0) {
      window.location.href = 'vote.html';
      return;
    }

    var greeting = document.getElementById('voter-greeting');
    greeting.textContent = voterName
      ? 'Olá, ' + voterName + '! Confira suas escolhas abaixo.'
      : 'Confira suas escolhas abaixo.';

    if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-disabled');
      submitNote.hidden = true;
    }

    render();
    bindControls();
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function render() {
    var buckets = { superlike: [], like: [], skip: [] };
    EXPERIENCES.forEach(function (exp) {
      buckets[votes[exp.id] || 'skip'].push(exp);
    });
    renderSection('section-superlike', 'empty-superlike', 'count-superlike', buckets.superlike, 'superlike');
    renderSection('section-like',      'empty-like',      'count-like',      buckets.like,      'like');
    renderSection('section-skip',      'empty-skip',      'count-skip',      buckets.skip,      'skip');
  }

  function renderSection(listId, emptyId, countId, experiences, reaction) {
    var list  = document.getElementById(listId);
    var empty = document.getElementById(emptyId);
    var count = document.getElementById(countId);
    list.innerHTML = '';
    count.textContent = experiences.length;
    empty.hidden = experiences.length > 0;
    experiences.forEach(function (exp) { list.appendChild(buildItem(exp, reaction)); });
  }

  function buildItem(exp, reaction) {
    var div = document.createElement('div');
    div.className = 'result-item';
    div.dataset.id = exp.id;
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', exp.name + ' — toque para alterar avaliação');

    div.innerHTML =
      '<span class="result-item__emoji" aria-hidden="true">' + exp.emoji + '</span>' +
      '<div class="result-item__info">' +
        '<span class="result-item__name">' + exp.name + '</span>' +
        '<span class="badge badge--category">' + categoryLabel(exp) + '</span>' +
      '</div>' +
      '<span class="vote-indicator vote-indicator--' + reaction + '" aria-hidden="true">' +
        voteIcon(reaction) +
      '</span>';

    div.addEventListener('click', function () { openSheet(exp.id); });
    div.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSheet(exp.id); }
    });

    return div;
  }

  // ── Action sheet ──────────────────────────────────────────────────────────
  function openSheet(id) {
    var exp = EXPERIENCES.find(function (e) { return e.id === id; });
    if (!exp) return;
    currentEditId = id;
    var reaction = votes[id] || 'skip';

    // Populate photo gallery
    populateAsPhotos(exp);

    asEmoji.textContent = exp.emoji;
    asTitle.textContent = exp.name;

    [asSuperlike, asLike, asSkip].forEach(function (btn) {
      btn.classList.remove('action-sheet__option--active');
    });
    ({ superlike: asSuperlike, like: asLike, skip: asSkip })[reaction]
      .classList.add('action-sheet__option--active');

    backdrop.hidden = false;
    backdrop.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    asSuperlike.focus();
  }

  function populateAsPhotos(exp) {
    var photos = exp.photos || [];
    asPhotoIndex = 0;
    asPhotoCount = photos.length;

    // Build photo strip
    asPhotoStrip.innerHTML = '';
    photos.forEach(function (src) {
      var img = document.createElement('img');
      img.src = src;
      img.alt = exp.name;
      img.loading = 'lazy';
      asPhotoStrip.appendChild(img);
    });

    // Reset strip position
    asPhotoStrip.style.transition = 'none';
    asPhotoStrip.style.transform = 'translateX(0)';

    // Dots
    asPhotoDots.innerHTML = '';
    if (asPhotoCount > 1) {
      for (var i = 0; i < asPhotoCount; i++) {
        var dot = document.createElement('span');
        dot.className = 'photo-dot' + (i === 0 ? ' photo-dot--active' : '');
        asPhotoDots.appendChild(dot);
      }
    }

    // Fallback emoji when no photos
    asPhotoFallback.textContent = exp.emoji;
    asPhotoFallback.style.display = asPhotoCount === 0 ? 'flex' : 'none';

    // Show/hide photo section
    asPhotos.hidden = false;
    refreshAsArrows();
  }

  function setAsStrip(delta, animate) {
    asPhotoStrip.style.transition = animate ? 'transform 0.28s ease' : 'none';
    asPhotoStrip.style.transform = 'translateX(calc(' + (-asPhotoIndex * 100) + '% + ' + delta + 'px))';
  }

  function goAsTo(newIndex) {
    asPhotoIndex = newIndex;
    setAsStrip(0, true);
    refreshAsDots();
    refreshAsArrows();
  }

  function refreshAsDots() {
    var dots = asPhotoDots.querySelectorAll('.photo-dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('photo-dot--active', i === asPhotoIndex);
    });
  }

  function refreshAsArrows() {
    asPhotoPrev.classList.toggle('photo-nav--hidden', asPhotoIndex === 0 || asPhotoCount <= 1);
    asPhotoNext.classList.toggle('photo-nav--hidden', asPhotoIndex === asPhotoCount - 1 || asPhotoCount <= 1);
  }

  function closeSheet() {
    backdrop.hidden = true;
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentEditId = null;
  }

  function setVote(reaction) {
    if (!currentEditId) return;
    votes[currentEditId] = reaction;
    sessionStorage.setItem('votes', JSON.stringify(votes));
    closeSheet();
    render();
  }

  // ── Controls ──────────────────────────────────────────────────────────────
  function bindControls() {
    // Vote options
    asSuperlike.addEventListener('click', function () { setVote('superlike'); });
    asLike.addEventListener('click',      function () { setVote('like'); });
    asSkip.addEventListener('click',      function () { setVote('skip'); });
    asCancel.addEventListener('click', closeSheet);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeSheet();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !backdrop.hidden) closeSheet();
    });

    // Photo arrow buttons
    asPhotoPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      if (asPhotoIndex > 0) goAsTo(asPhotoIndex - 1);
    });

    asPhotoNext.addEventListener('click', function (e) {
      e.stopPropagation();
      if (asPhotoIndex < asPhotoCount - 1) goAsTo(asPhotoIndex + 1);
    });

    // Photo swipe — touch
    asPhotos.addEventListener('touchstart', function (e) {
      if (asPhotoCount <= 1) return;
      asDragging = true;
      asDragStartX = e.touches[0].clientX;
      asDragDelta = 0;
      asPhotoStrip.style.transition = 'none';
    }, { passive: true });

    asPhotos.addEventListener('touchmove', function (e) {
      if (!asDragging) return;
      e.preventDefault();
      asDragDelta = e.touches[0].clientX - asDragStartX;
      var atStart = asPhotoIndex === 0 && asDragDelta > 0;
      var atEnd   = asPhotoIndex === asPhotoCount - 1 && asDragDelta < 0;
      setAsStrip(atStart || atEnd ? asDragDelta * 0.25 : asDragDelta, false);
    }, { passive: false });

    asPhotos.addEventListener('touchend', function () {
      if (!asDragging) return;
      asDragging = false;
      var THRESHOLD = 50;
      if (asDragDelta < -THRESHOLD && asPhotoIndex < asPhotoCount - 1) {
        goAsTo(asPhotoIndex + 1);
      } else if (asDragDelta > THRESHOLD && asPhotoIndex > 0) {
        goAsTo(asPhotoIndex - 1);
      } else {
        setAsStrip(0, true);
      }
    });

    // Photo swipe — mouse
    asPhotos.addEventListener('mousedown', function (e) {
      if (asPhotoCount <= 1) return;
      asDragging = true;
      asDragStartX = e.clientX;
      asDragDelta = 0;
      asPhotoStrip.style.transition = 'none';
      function onMouseMove(ev) {
        if (!asDragging) return;
        asDragDelta = ev.clientX - asDragStartX;
        var atStart = asPhotoIndex === 0 && asDragDelta > 0;
        var atEnd   = asPhotoIndex === asPhotoCount - 1 && asDragDelta < 0;
        setAsStrip(atStart || atEnd ? asDragDelta * 0.25 : asDragDelta, false);
      }
      function onMouseUp() {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        if (!asDragging) return;
        asDragging = false;
        var THRESHOLD = 50;
        if (asDragDelta < -THRESHOLD && asPhotoIndex < asPhotoCount - 1) {
          goAsTo(asPhotoIndex + 1);
        } else if (asDragDelta > THRESHOLD && asPhotoIndex > 0) {
          goAsTo(asPhotoIndex - 1);
        } else {
          setAsStrip(0, true);
        }
      }
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // Back + submit
    document.getElementById('back-btn').addEventListener('click', function () {
      sessionStorage.setItem('currentCardIndex', '0');
      window.location.href = 'vote.html';
    });

    submitBtn.addEventListener('click', handleSubmit);
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  function handleSubmit() {
    if (submitting) return;
    submitError.hidden = true;
    submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    window.submitVotes(
      voterName || null,
      votes,
      function () { window.location.href = 'thanks.html'; },
      function () {
        submitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Respostas';
        submitError.hidden = false;
      }
    );
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function voteIcon(r) {
    if (r === 'superlike') return '★';
    if (r === 'like') return '♥';
    return '✕';
  }

  function categoryLabel(exp) {
    var sub = SUBCATEGORIES[exp.subcategory];
    return sub ? sub.label : 'Atração';
  }

  init();
}());
