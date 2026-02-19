---
layout: page
title: Ricerca
permalink: /ricerca/
js:
  - /js/lunr.min.js
  - /js/lunr.stemmer.support.min.js
  - /js/lunr.it.min.js
  - /js/cerca.js
---

<style>
  .search-box-wrapper {
    margin-bottom: 30px;
  }

  #search-box {
    font-size: 1.3em;
    height: 52px;
    border-radius: 6px;
    border: 2px solid #0056b3;
    padding: 8px 16px;
    box-shadow: 0 2px 6px rgba(0,86,179,0.1);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  #search-box:focus {
    border-color: #003d80;
    box-shadow: 0 2px 10px rgba(0,86,179,0.25);
    outline: none;
  }

  #search-info {
    color: #555;
    font-size: 1em;
    margin-bottom: 20px;
    min-height: 1.4em;
  }

  /* Card caduto — stesse classi usate in caduti_di e caduti_cognome */
  .caduto-card {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    background: white;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .caduto-card:hover,
  .caduto-card:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    text-decoration: none;
    color: inherit;
  }

  .caduto-card-header {
    background: #0056b3;
    padding: 15px;
    border-radius: 8px 8px 0 0;
  }

  .caduto-card-header h3 {
    margin: 0;
    font-size: 1.2em;
    color: white;
  }

  .caduto-card-body {
    padding: 15px;
  }

  .caduto-info-item {
    margin-bottom: 6px;
    padding-bottom: 6px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.95em;
  }

  .caduto-info-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .caduto-info-label {
    font-weight: 600;
    color: #495057;
    margin-right: 4px;
  }

  .caduto-info-value {
    color: #212529;
  }

  @media (max-width: 768px) {
    #search-box { font-size: 1.1em; height: 46px; }
  }
</style>

<div class="search-box-wrapper">
  <input
    type="search"
    id="search-box"
    class="form-control"
    placeholder="Cerca per cognome, nome, professione, reggimento…"
    autocomplete="off"
    autofocus
  >
</div>

<p id="search-info"></p>
<div id="search-results"></div>
