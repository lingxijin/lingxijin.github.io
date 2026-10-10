---
layout: page
title: Outdoors
permalink: /outdoors/
nav: true
nav_order: 7
---

<div class="outdoors-gallery">

{% assign outdoor_posts = site.outdoors | sort: "date" | reverse %}

{% for item in outdoor_posts %}

<a class="outdoors-card" href="{{ item.url | relative_url }}">

  <img
    src="{{ item.cover | relative_url }}"
    alt="{{ item.title }}"
  >

  <div class="outdoors-info">
    <div class="outdoors-title">{{ item.title }}</div>

    {% if item.location %}
      <div class="outdoors-location">{{ item.location }}</div>
    {% endif %}
  </div>

</a>

{% endfor %}

</div>

<style>
.outdoors-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.outdoors-card {
  display: block;
  color: inherit;
  text-decoration: none !important;
}

.outdoors-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  border-radius: 8px;
  transition: transform 0.25s ease;
}

.outdoors-card:hover img {
  transform: scale(1.02);
}

.outdoors-info {
  margin-top: 8px;
}

.outdoors-title {
  font-size: 0.95rem;
  font-weight: 500;
}

.outdoors-location {
  margin-top: 2px;
  font-size: 0.8rem;
  color: var(--global-text-color-light);
}

@media (max-width: 768px) {
  .outdoors-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .outdoors-gallery {
    grid-template-columns: 1fr;
  }
}
</style>
