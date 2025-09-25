---
layout: page
title: projects
permalink: /projects/
description: Research projects.
nav: true
nav_order: 6
# 注意：这里把中文逗号换成了英文逗号；同时建议把年份当作字符串更稳妥
display_categories: ["2025", "2024", "2022", "2020"]
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% if categorized_projects and categorized_projects.size > 0 %}
  <a id="cat-{{ category | slugify }}" href="#cat-{{ category | slugify }}">
    <h2 class="category">{{ category }}</h2>
  </a>

  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  {# 如果希望 importance 越大越靠前，改用下面这行并注释掉上一行 #}
  {# {% assign sorted_projects = categorized_projects | sort: "importance" | reverse %} #}

  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
      {% for project in sorted_projects %}
        {% include projects_horizontal.liquid %}
      {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% else %}
  <!-- 没有此分类的项目时的友好提示（可删除） -->
  <a id="cat-{{ category | slugify }}" href="#cat-{{ category | slugify }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  <p class="text-muted">No projects found in {{ category }}.</p>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->
{% assign sorted_projects = site.projects | sort: "importance" %}
{# 若希望 importance 倒序： {% assign sorted_projects = site.projects | sort: "importance" | reverse %} #}

<!-- Generate cards for each project -->
{% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
      {% for project in sorted_projects %}
        {% include projects_horizontal.liquid %}
      {% endfor %}
    </div>
  </div>
{% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
{% endif %}
</div>
