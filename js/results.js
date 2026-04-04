(function () {
  var votes = {};
  var voterName = '';

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

    render();
    bindControls();
  }

  function render() {
    var buckets = { superlike: [], like: [], skip: [] };

    EXPERIENCES.forEach(function (exp) {
      var v = votes[exp.id] || 'skip';
      buckets[v].push(exp);
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

    experiences.forEach(function (exp) {
      list.appendChild(buildItem(exp, reaction));
    });
  }

  function buildItem(exp, reaction) {
    var div = document.createElement('div');
    div.className = 'result-item';
    div.dataset.id = exp.id;
    div.setAttribute('role', 'listitem');

    div.innerHTML =
      '<span class="result-item__emoji" aria-hidden="true">' + exp.emoji + '</span>' +
      '<div class="result-item__info">' +
        '<span class="result-item__name">' + exp.name + '</span>' +
        '<span class="badge badge--category">' + categoryLabel(exp.category) + '</span>' +
      '</div>' +
      '<button class="result-item__cycle btn-cycle btn-cycle--' + reaction + '"' +
        ' aria-label="Mudar voto de ' + exp.name + '">' +
        cycleIcon(reaction) +
      '</button>';

    div.querySelector('.btn-cycle').addEventListener('click', function (e) {
      e.stopPropagation();
      cycleVote(exp.id);
    });
    div.addEventListener('click', function () { cycleVote(exp.id); });

    return div;
  }

  function cycleVote(id) {
    var cur = votes[id] || 'skip';
    votes[id] = cur === 'superlike' ? 'like' : cur === 'like' ? 'skip' : 'superlike';
    sessionStorage.setItem('votes', JSON.stringify(votes));
    render();
  }

  function cycleIcon(reaction) {
    if (reaction === 'superlike') return '★';
    if (reaction === 'like') return '♥';
    return '✕';
  }

  function categoryLabel(c) {
    if (c === 'ride')     return 'Atração';
    if (c === 'parade')   return 'Desfile';
    if (c === 'fireworks') return 'Fogos';
    return 'Show';
  }

  function bindControls() {
    document.getElementById('back-btn').addEventListener('click', function () {
      // Reset index so vote screen starts from card 1 (votes are preserved)
      sessionStorage.setItem('currentCardIndex', '0');
      window.location.href = 'vote.html';
    });

    // Submit enabled in M4 — no-op for now
    document.getElementById('btn-submit').addEventListener('click', function () {
      // Handled in M4 via supabase.js
    });
  }

  init();
}());
