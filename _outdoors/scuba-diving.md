---
layout: page
title: Scuba Diving
date: 2024-12-30
location: Philippines
activity: Scuba Diving
cover: /assets/img/outdoors/scuba diving cover.jpg
---

<div class="outdoor-meta">
  <span>🤿 Scuba Diving</span>
  <span>📍 Philippines</span>
</div>

<div class="activity-stats">
  <div class="stat">
    <span class="stat-label">Total Dives</span>
    <strong>10</strong>
  </div>

  <div class="stat">
    <span class="stat-label">Total Dive Time</span>
    <strong>5 h 55 min</strong>
  </div>

  <div class="stat">
    <span class="stat-label">Max Depth</span>
    <strong>30 m</strong>
  </div>

  <div class="stat">
    <span class="stat-label">Deepest Dive</span>
    <strong>~34 min</strong>
  </div>
</div>

{% include figure.liquid
  path="assets/img/outdoors/fundive.jpg"
  class="img-fluid rounded z-depth-1 mt-4"
  alt="Scuba diving in the Philippines"
  loading="eager"
%}

AOW fun diving turned out to be something I really enjoyed. Ten dives and 5 hours 55 minutes underwater so far, with my deepest dive reaching 30 meters for about 34 minutes on December 30, 2024. Next goal: 100 dives.

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
