// Thin Supabase REST client — no SDK dependency
// Requires window.SUPABASE_URL and window.SUPABASE_ANON_KEY to be set (via js/env.js)
(function () {
  function submitVotes(voterName, votes, onSuccess, onError) {
    var url = window.SUPABASE_URL;
    var key = window.SUPABASE_ANON_KEY;

    if (!url || !key) {
      onError(new Error('Supabase não configurado.'));
      return;
    }

    var payload = {
      voter_name: voterName || null,
      votes: votes
    };

    fetch(url + '/rest/v1/responses', {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        onSuccess();
      })
      .catch(onError);
  }

  window.submitVotes = submitVotes;
}());
