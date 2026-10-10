---
layout: page
title: Camping
location: South Korea
activity: Camping
cover: /assets/img/outdoors/campingcover.jpg
---

<div class="outdoor-meta">
  <span>🏕️ Camping</span>
  <span>📍 South Korea</span>
</div>

<div class="outdoor-photo-row">
  <img src="{{ '/assets/img/outdoors/camping_1.jpg' | relative_url }}" alt="Camping in South Korea" loading="eager">
  <img src="{{ '/assets/img/outdoors/camping2.jpg' | relative_url }}" alt="Camping setup in South Korea" loading="lazy">
</div>

<p class="outdoor-note">
  I love camping, even though it somehow takes nearly four hours to set up the tent and arrange everything. It is exhausting—but once it is all done, the rest makes it worth it.
</p>

<div class="outdoor-photo-row">
  <img src="{{ '/assets/img/outdoors/dog1.jpg' | relative_url }}" alt="Roxy enjoying camping" loading="lazy">
  <img src="{{ '/assets/img/outdoors/dog2.jpg' | relative_url }}" alt="Roxy outdoors while camping" loading="lazy">
</div>

<p class="outdoor-note">
  Roxy might love camping even more than I do. He gets to spend the whole day outdoors, which is pretty much his ideal life.
</p>

<style>
.outdoor-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 1.5rem;
  color: var(--global-text-color-light);
  font-size: 0.9rem;
}

.outdoor-photo-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 1.5rem 0;
}

.outdoor-photo-row img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}

.outdoor-note {
  margin: 1.2rem 0 2rem;
  line-height: 1.7;
}

@media (max-width: 650px) {
  .outdoor-photo-row {
    grid-template-columns: 1fr;
  }
}
</style>
