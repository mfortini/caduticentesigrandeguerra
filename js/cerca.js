(function () {
  'use strict';

  var store = {};
  var idx = null;
  var debounceTimer = null;

  // ── Costruzione indice Lunr ────────────────────────────────────────────────

  function buildIndex(data) {
    idx = lunr(function () {
      this.use(lunr.it);
      this.ref('id');
      this.field('cognome',        { boost: 10 });
      this.field('nome',           { boost: 8  });
      this.field('provenienza',    { boost: 3  });
      this.field('professione',    { boost: 3  });
      this.field('corpo',          { boost: 3  });
      this.field('causa_morte_norm', { boost: 2 });
      this.field('luogo_morte',    { boost: 2  });
      this.field('teatro',         { boost: 2  });
      this.field('testo');

      data.forEach(function (doc) {
        store[doc.id] = doc;
        this.add(doc);
      }, this);
    });
  }

  // ── Rendering risultati ────────────────────────────────────────────────────

  function formatData(dataStr) {
    if (!dataStr) return '';
    var p = dataStr.split('-');
    if (p.length < 3) return dataStr;
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  function renderCard(item) {
    var dataStr = formatData(item.data_morte);
    var anno    = item.data_nascita ? Math.round(item.data_nascita) : '';

    var body = '';
    if (item.provenienza)
      body += '<div class="caduto-info-item"><span class="caduto-info-label">Provenienza:</span> <span class="caduto-info-value">' + item.provenienza + '</span></div>';
    if (anno)
      body += '<div class="caduto-info-item"><span class="caduto-info-label">Nascita:</span> <span class="caduto-info-value">' + anno + '</span></div>';
    if (dataStr)
      body += '<div class="caduto-info-item"><span class="caduto-info-label">Morte:</span> <span class="caduto-info-value">il ' + dataStr + '</span></div>';
    if (item.professione)
      body += '<div class="caduto-info-item"><span class="caduto-info-label">Professione:</span> <span class="caduto-info-value">' + item.professione + '</span></div>';
    if (item.causa_morte_norm)
      body += '<div class="caduto-info-item"><span class="caduto-info-label">Causa:</span> <span class="caduto-info-value">' + item.causa_morte_norm + '</span></div>';

    return '<div class="col-sm-6 col-md-4">' +
      '<a href="' + item.url + '" class="caduto-card">' +
        '<div class="caduto-card-header"><h3>' + item.cognome + ' ' + item.nome + '</h3></div>' +
        '<div class="caduto-card-body">' + body + '</div>' +
      '</a>' +
    '</div>';
  }

  function displayResults(results) {
    var info      = document.getElementById('search-info');
    var container = document.getElementById('search-results');

    if (!results || results.length === 0) {
      info.textContent = 'Nessun risultato trovato.';
      container.innerHTML = '';
      return;
    }

    var n = results.length;
    info.textContent = n + ' risultat' + (n === 1 ? 'o' : 'i') + ' trovati.';

    var html = '<div class="row">';
    results.forEach(function (r) {
      var item = store[r.ref];
      if (item) html += renderCard(item);
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // ── Ricerca ────────────────────────────────────────────────────────────────

  function doSearch(query) {
    var info      = document.getElementById('search-info');
    var container = document.getElementById('search-results');

    query = (query || '').trim();

    if (query.length < 2) {
      info.textContent = '';
      container.innerHTML = '';
      return;
    }

    if (!idx) {
      info.textContent = 'Indice in caricamento, riprova tra un momento…';
      return;
    }

    // Aggiunge wildcard a ogni termine per supportare la ricerca per prefisso.
    // Es. "Alber Tomas" → "Alber* Tomas*"
    var wildcardQuery = query.split(/\s+/)
      .filter(Boolean)
      .map(function (t) { return t + '*'; })
      .join(' ');

    var results;
    try {
      results = idx.search(wildcardQuery);
      // Se non trova nulla con wildcard, tenta ricerca esatta
      if (results.length === 0) {
        results = idx.search(query);
      }
    } catch (e) {
      try { results = idx.search(query); } catch (e2) { results = []; }
    }

    displayResults(results);

    // Aggiorna URL senza ricaricare la pagina
    if (window.history && window.history.replaceState) {
      var newUrl = window.location.pathname + '?q=' + encodeURIComponent(query);
      window.history.replaceState(null, '', newUrl);
    }
  }

  // ── Inizializzazione ───────────────────────────────────────────────────────

  function init() {
    var box  = document.getElementById('search-box');
    var info = document.getElementById('search-info');

    if (!box) return;

    // Carica l'indice JSON
    info.textContent = 'Caricamento indice…';
    fetch('/search_caduti.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        buildIndex(data);
        info.textContent = '';

        // Legge parametro ?q= dall'URL
        var params = new URLSearchParams(window.location.search);
        var q = params.get('q') || params.get('query');
        if (q) {
          box.value = q;
          doSearch(q);
        }
      })
      .catch(function () {
        info.textContent = 'Errore nel caricamento dei dati. Ricarica la pagina.';
      });

    // Ricerca con debounce sull'input
    box.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { doSearch(box.value); }, 300);
    });

    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        clearTimeout(debounceTimer);
        doSearch(box.value);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
