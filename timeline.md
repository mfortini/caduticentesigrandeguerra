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
/*        "media": {
//          "url": "//www.flickr.com/photos/tm_10001/2310475988/",
//          "caption": "Whitney Houston performing on her My Love is Your Love Tour in Hamburg.",
//          "credit": "flickr/<a href='http://www.flickr.com/photos/tm_10001/'>tm_10001</a>"
        },
 */
        "text": {
          "headline": "Caduti Centesi<br>della Grande Guerra",
          "text": ""
        }
    },
    "events": [
    {% assign filtereddata = site.data.caduti | where_exp:"member", "member.Data_morte" | sort: "Data_morte" %}
    {% assign cadutoMinDataMorte = filtereddata | first %}
    {% assign cadutoMinDataMorte = filtereddata | last %}
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
          {% capture member_text %}<p><small>Nato a {{member.Luogo_nascita}}{%if member.Data_nascita %} nel {{member.Data_nascita | round}}{% endif %}{% if member.Data_morte %},<br>morto {%if dataMorte[2] == "11" %}l'{%else%}il {%endif%}{{dataMorte[2]}}/{{dataMorte[1]}}/{{dataMorte[0]}}{% endif %}</small></p>{% endcapture %}
          {% assign member_text = member_text | xml_escape %}
          "text": decodeHTML("{{member_text}}")
        }
      },
      {% endfor %}
    ]
};

console.log(date_morte['events'][0]);

</script>

 <div id="timeline-embed" style="width: 100%; height: 600px"></div>

  <script>
        var timeline_options={ hash_bookmark: true, language: "it", timenav_height_percentage: 50 };
        window.timeline = new TL.Timeline('timeline-embed', date_morte, timeline_options);
  </script>
