---
layout: page
title: Monte Barro from Lecco, Italy
date: 2026-10-10
location: Lecco, Lombardy, Italy
activity: Hiking
cover: /assets/img/outdoors/monte-barro-cover.jpg
---

<div class="outdoor-meta">
  <span>🥾 Hiking</span>
  <span>📍 Lecco, Lombardy, Italy</span>
</div>

<div class="activity-stats">
  <div class="stat">
    <span class="stat-label">Moving Time</span>
    <strong>3:22:19</strong>
  </div>

  <div class="stat">
    <span class="stat-label">Distance</span>
    <strong>6.0 mi</strong>
  </div>

  <div class="stat">
    <span class="stat-label">Average Speed</span>
    <strong>1.8 mph</strong>
  </div>

  <div class="stat">
    <span class="stat-label">Elevation Gain</span>
    <strong>2,350 ft</strong>
  </div>
</div>

{% include figure.liquid
  path="assets/img/outdoors/monte-barro-route.jpg"
  class="img-fluid rounded z-depth-1 mt-4"
  alt="Monte Barro hiking route from Lecco"
  loading="eager"
%}

## Monte Barro

A hike to Monte Barro with students from Politecnico di Milano. Long climb, fresh air, good company—and apparently nature is quite effective at resetting the brain.

{% include figure.liquid
  path="assets/img/outdoors/view.jpg"
  class="img-fluid rounded z-depth-1 mt-4"
  alt="View from the Monte Barro hike"
  loading="lazy"
%}

{% include figure.liquid
  path="assets/img/outdoors/shanding.jpg"
  class="img-fluid rounded z-depth-1 mt-4"
  alt="At the summit of Monte Barro"
  caption="At the summit of Monte Barro."
  loading="lazy"
%}

{% include figure.liquid
  path="assets/img/outdoors/xiaogou.jpg"
  class="img-fluid rounded z-depth-1 mt-4"
  alt="Dog at the summit of Monte Barro"
  caption="Met this impressive climber at the summit—apparently four legs are a hiking advantage."
  loading="lazy"
%}

<style>
.outdoor-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 1.5rem;
  color: var(--global-text-color-light);
  font-size: 0.9rem;
}

.activity-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin: 2rem 0;
}

.stat {
  padding: 18px;
  border: 1px solid var(--global-divider-color);
  border-radius: 8px;
}

.stat-label {
  display: block;
  margin-bottom: 5px;
  color: var(--global-text-color-light);
  font-size: 0.8rem;
}

.stat strong {
  font-size: 1.1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .activity-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
