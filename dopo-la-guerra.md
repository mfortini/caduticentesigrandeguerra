---
layout: page
title: "Morti dopo la guerra (1919–1929)"
permalink: /dopo-la-guerra/
---


<div class="container" role="main">
  <div class="row">
    <div class="col-md-12">
      {% assign filtereddata = site.data.caduti | where_exp: "m", "m.Data_morte > '1918-12-31'" | sort: "Data_morte" %}
      <div class="page-intro">
        <p>
          Non tutti i caduti centesi morirono sul campo di battaglia. <strong>{{ filtereddata | size }} soldati</strong>
          persero la vita tra il 1919 e il 1929, anni dopo la fine ufficiale della guerra, per le conseguenze dirette
          del conflitto: tubercolosi contratta nelle trincee, ferite mai rimarginate, malattie da prigionia.
          L'ultimo morì nel 1929, undici anni dopo l'Armistizio.
        </p>
      </div>
    </div>
  </div>

  <div class="row caduto-cards-row">
    {% for member in filtereddata %}
    <div class="col-sm-6 col-md-4">
      <a href="/caduti/{{ member.title | downcase | replace: ' ','-' }}/index.html" class="caduto-card h-100 d-flex flex-column">
        <div class="caduto-card-header flex-shrink-0">
          <h3>{{ member.Cognome }} {{ member.Nome }}</h3>
        </div>
        <div class="caduto-card-body flex-grow-1">
          {% assign dataMorte = member.Data_morte | split: '-' %}
          <div class="caduto-info-item">
            <span class="caduto-info-label">Morte:</span>
            <span class="caduto-info-value">
              {% if dataMorte[2] == "11" %}l'{% else %}il {% endif %}{{ dataMorte[2] }}/{{ dataMorte[1] }}/{{ dataMorte[0] }}
              ({{ dataMorte[0] }} — {{ dataMorte[0] | minus: 1918 }} anni dopo la fine della guerra)
            </span>
          </div>
          {% if member.Causa_morte != blank %}
          <div class="caduto-info-item">
            <span class="caduto-info-label">Causa:</span>
            <span class="caduto-info-value">{{ member.Causa_morte }}</span>
          </div>
          {% endif %}
          {% if member.Morto_in != blank %}
          <div class="caduto-info-item">
            <span class="caduto-info-label">Contesto:</span>
            <span class="caduto-info-value">{{ member.Morto_in }}</span>
          </div>
          {% endif %}
          {% if member.Corpo != blank %}
          <div class="caduto-info-item">
            <span class="caduto-info-label">Corpo:</span>
            <span class="caduto-info-value">{{ member.Corpo }}</span>
          </div>
          {% endif %}
        </div>
      </a>
    </div>
    {% endfor %}
  </div>
</div>
