(function () {
  var form = document.getElementById('name-form');
  var nameInput = document.getElementById('voter-name');

  if (!form || !nameInput) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    sessionStorage.setItem('voterName', name);
    window.location.href = 'vote.html';
  });
}());
