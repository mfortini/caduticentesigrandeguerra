---
layout: page
title: Caduti di Corporeno
permalink: /caduti_di/Corporeno
---

<div class="row"><div class="col-md-12">
<ul class="list-group">
{% assign filtereddata = site.data.caduti | where: "Provenienza","Corporeno"%}
{% for member in filtereddata %}
<a href="/caduti/{{member.title | downcase}}">
<li class="list-group-item"><b>{{member.Cognome}} {{member.Nome}}</b>, nato a {{member.Luogo_nascita}} nel {{member.Data_nascita}}</li>
</a>
{% endfor %}
</ul>
</div>
</div>
