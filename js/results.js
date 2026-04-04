(function () {
  var votes = {};
  var voterName = '';
  var currentEditId = null;
  var submitting = false;

  // ── DOM refs ──────────────────────────────────────────────────────────────
  var backdrop    = document.getElementById('action-sheet-backdrop');
  var asEmoji     = document.getElementById('as-emoji');
  var asTitle     = document.getElementById('as-title');
  var asSuperlike = document.getElementById('as-superlike');
  var asLike      = document.getElementById('as-like');
  var asSkip      = document.getElementById('as-skip');
  var asCancel    = document.getElementById('as-cancel');
  var submitBtn   = document.getElementById('btn-submit');
  var submitNote  = document.getElementById('submit-note');
  var submitError = document.getElementById('submit-error');

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

    // Enable submit if Supabase is configured
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
        '<span class="badge badge--category">' + categoryLabel(exp.category) + '</span>' +
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
      function () {
        window.location.href = 'thanks.html';
      },
      function () {
        submitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Respostas';
        submitError.hidden = false;
      }
    );
  }

  // ── Controls ──────────────────────────────────────────────────────────────
  function bindControls() {
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

    document.getElementById('back-btn').addEventListener('click', function () {
      sessionStorage.setItem('currentCardIndex', '0');
      window.location.href = 'vote.html';
    });

    submitBtn.addEventListener('click', handleSubmit);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function voteIcon(r) {
    if (r === 'superlike') return '★';
    if (r === 'like') return '♥';
    return '✕';
  }

  function categoryLabel(c) {
    if (c === 'ride')      return 'Atração';
    if (c === 'parade')    return 'Desfile';
    if (c === 'fireworks') return 'Fogos';
    return 'Show';
  }

  init();
}());
