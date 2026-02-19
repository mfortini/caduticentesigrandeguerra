---
layout: page
title: "Professioni dei caduti"
permalink: /professioni/
---

<div class="container" role="main">
  <div class="row">
    <div class="col-md-12">
      <div class="page-intro">
        <p>
          Le professioni dei <strong>{{ site.data.caduti | size }} caduti centesi</strong> sono uno spaccato della società
          rurale e operaia del territorio di Cento nei primi anni del Novecento. Agricoltori, operai, muratori e
          fornaciai formavano la maggioranza assoluta di chi partì per il fronte.
        </p>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-8">
      {% assign by_prof = site.data.caduti | group_by_exp: "m", "m.Professione | downcase" | sort: "size" | reverse %}
      <table class="prof-table">
        <thead>
          <tr>
            <th>Professione</th>
            <th>N.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {% for group in by_prof %}
          {% if group.name != "" %}
          {% assign sample = group.items | first %}
          {% assign prof_page = site.pages | where_exp: "p", "p.professioni_valori contains sample.Professione" | first %}
          <tr>
            <td>
              {% if prof_page %}<a href="{{ prof_page.permalink }}">{{ group.name | capitalize }}</a>
              {% else %}{{ group.name | capitalize }}{% endif %}
            </td>
            <td><strong>{{ group.size }}</strong></td>
            <td><span class="prof-bar" style="width:{{ group.size | times: 2 }}px"></span></td>
          </tr>
          {% endif %}
          {% endfor %}
        </tbody>
      </table>
    </div>
  </div>
</div>
