---
layout: page
title: Date di morte
permalink: /date_di_morte/
---

<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">

<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline-min.js"></script>

<script>
function decodeHTML(encoded)
{
        var elem = document.createElement('textarea');
        elem.innerHTML = encoded;
        var decoded = elem.value;

        return decoded;
}

var date_morte=
{
    "title": {
        "text": {
          "headline": "Caduti Centesi<br>della Grande Guerra",
          "text": "<p>Cronologia delle date di morte dei caduti centesi. In evidenza: l'ingresso dell'Italia in guerra (24 maggio 1915) e l'Armistizio (4 novembre 1918).</p>"
        }
    },
    "eras": [
      {
        "start_date": { "year": "1915", "month": "5", "day": "24" },
        "end_date":   { "year": "1918", "month": "11", "day": "4" },
        "text": { "headline": "Italia in guerra" }
      }
    ],
    "events": [
      {
        "start_date": { "year": "1915", "month": "5", "day": "24" },
        "text": {
          "headline": "🇮🇹 L'Italia entra in guerra",
          "text": "<p>Il 24 maggio 1915 l'Italia dichiara guerra all'Austria-Ungheria ed entra nel primo conflitto mondiale.</p>"
        }
      },
      {
        "start_date": { "year": "1918", "month": "11", "day": "4" },
        "text": {
          "headline": "🕊️ Armistizio di Villa Giusti",
          "text": "<p>Il 4 novembre 1918 entra in vigore l'armistizio con l'Austria-Ungheria. Fine della guerra per l'Italia.</p>"
        }
      },
    {% assign filtereddata = site.data.caduti | where_exp:"member", "member.Data_morte" | sort: "Data_morte" %}
    {% for member in filtereddata %}
    {% assign dataMorte = member.Data_morte | split: '-' %}
      {
        "start_date": {
          "month": "{{dataMorte[1] | plus:0}}",
          "day": "{{dataMorte[2] | plus:0}}",
          "year": "{{dataMorte[0]}}"
        },
        "text": {
          "headline": '<a href="/caduti/{{member.title | downcase}}">{{member.Cognome}} {{member.Nome}}</a>',
          {% capture member_text %}<p><small>Nato a {{member.Luogo_nascita}}{%if member.Data_nascita %} nel {{member.Data_nascita | round}}{% endif %}{% if member.Data_morte %},<br>morto {%if dataMorte[2] == "11" %}l'{%else%}il {%endif%}{{dataMorte[2]}}/{{dataMorte[1]}}/{{dataMorte[0]}}{% endif %}{%if member.Causa_morte_norm %}<br>Causa: {{member.Causa_morte_norm}}{% endif %}</small></p>{% endcapture %}
          {% assign member_text = member_text | xml_escape %}
          "text": decodeHTML("{{member_text}}")
        }
      },
      {% endfor %}
    ]
};

</script>

<div id="timeline-embed" style="width: 100%; height: 650px"></div>

  <script>
        var timeline_options={
          hash_bookmark: true,
          language: "it",
          timenav_height_percentage: 40,
          initial_zoom: 1
        };
        window.timeline = new TL.Timeline('timeline-embed', date_morte, timeline_options);
  </script>
