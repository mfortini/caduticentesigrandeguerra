---
layout: page
title: "Professioni dei caduti"
permalink: /professioni/
---

<style>
  .page-intro { background:#f8f9fa; padding:15px 20px; border-radius:8px; margin-bottom:30px; border-left:4px solid #0056b3; font-size:1.1em; }
  .prof-table { width:100%; margin-top:20px; }
  .prof-table th { background:#0056b3; color:white; padding:10px 14px; text-align:left; }
  .prof-table td { padding:8px 14px; border-bottom:1px solid #dee2e6; }
  .prof-table tr:last-child td { border-bottom:none; }
  .prof-table tr:nth-child(even) { background:#f8f9fa; }
  .prof-bar { display:inline-block; background:#0056b3; height:12px; border-radius:3px; vertical-align:middle; margin-right:6px; }
</style>

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
          <tr>
            <td>{{ group.name | capitalize }}</td>
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
