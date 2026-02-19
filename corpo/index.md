---
layout: page
title: "Caduti per corpo militare"
permalink: /corpo/
---

<style>
  .corpo-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:16px; margin-top:24px; }
  .corpo-card { border:1px solid #dee2e6; border-radius:8px; padding:16px; background:white; text-decoration:none; color:inherit; display:block; transition:transform 0.2s, box-shadow 0.2s; }
  .corpo-card:hover { transform:translateY(-2px); box-shadow:0 4px 8px rgba(0,0,0,0.12); text-decoration:none; color:inherit; }
  .corpo-nome { font-size:1.1em; font-weight:600; color:#0056b3; margin-bottom:6px; }
  .corpo-count { font-size:0.95em; color:#6c757d; }
  .page-intro { background:#f8f9fa; padding:15px 20px; border-radius:8px; margin-bottom:30px; border-left:4px solid #0056b3; }
</style>

<div class="container" role="main">
  <div class="row">
    <div class="col-md-12">
      <div class="page-intro">
        Distribuzione dei {{ site.data.caduti | size }} caduti centesi per corpo militare di appartenenza.
      </div>
      <div class="corpo-grid">

        {% assign corpi_pagine = site.pages | where_exp: "p", "p.url contains '/corpo/'" | where_exp: "p", "p.url != '/corpo/'" | sort: "title" %}
        {% for p in corpi_pagine %}
          {% assign filtereddata = site.data.caduti | where_exp: "m", "p.corpi_valori contains m.Corpo" %}
          {% if filtereddata.size > 0 %}
          <a href="{{ p.permalink }}" class="corpo-card">
            <div class="corpo-nome">{{ p.title }}</div>
            <div class="corpo-count">{{ filtereddata.size }} caduti</div>
          </a>
          {% endif %}
        {% endfor %}

      </div>
    </div>
  </div>
</div>
