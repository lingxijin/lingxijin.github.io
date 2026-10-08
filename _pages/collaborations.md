---
layout: page
title: collaborations
permalink: /collaborations/
description: Research Collaboration Network
nav: true
nav_order: 3
---

<div class="collab-intro">
  <p>
    A visualization of my research collaborations across countries, regions, and institutions.
  </p>
</div>


<!-- =====================================================
     GLOBAL COLLABORATION
     ===================================================== -->

<section class="collab-section">

  <div class="collab-heading-row">

    <div class="collab-heading">
      <h2>Global Collaboration</h2>
      <p>Countries and regions connected through my collaborative research.</p>
    </div>

    <button
      class="collab-reset"
      data-network="country-network"
      type="button">
      Reset view
    </button>

  </div>

  <div class="collab-hint">
    Drag nodes · Scroll to zoom · Click a node to focus
  </div>

  <div
    id="country-network"
    class="collab-network"
    aria-label="Global research collaboration network">
  </div>

</section>


<!-- =====================================================
     INSTITUTIONAL COLLABORATION
     ===================================================== -->

<section class="collab-section">

  <div class="collab-heading-row">

    <div class="collab-heading">
      <h2>Institutional Collaboration</h2>
      <p>Institutions connected through joint research.</p>
    </div>

    <button
      class="collab-reset"
      data-network="institution-network"
      type="button">
      Reset view
    </button>

  </div>

  <div class="collab-hint">
    Drag nodes · Scroll to zoom · Click a node to focus
  </div>

  <div
    id="institution-network"
    class="collab-network"
    aria-label="Institutional research collaboration network">
  </div>

</section>



<style>

/* =========================================================
   Collaboration page
   ========================================================= */

.collab-intro {
  max-width: 720px;
  margin-bottom: 3rem;
}

.collab-intro p {
  margin: 0;
  color: var(--global-text-color-light);
  font-size: 0.98rem;
  line-height: 1.7;
}


/* Section */

.collab-section {
  margin-bottom: 5rem;
}

.collab-heading-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.collab-heading h2 {
  margin: 0 0 0.35rem 0;
  font-size: 1.45rem;
  font-weight: 600;
}

.collab-heading p {
  margin: 0;
  color: var(--global-text-color-light);
  font-size: 0.9rem;
  line-height: 1.55;
}

.collab-hint {
  margin: 0.8rem 0 1rem;
  color: var(--global-text-color-light);
  font-size: 0.76rem;
  opacity: 0.65;
}


/* Network */

.collab-network {
  position: relative;

  width: 100%;
  height: 520px;

  overflow: hidden;

  border-top: 1px solid rgba(190, 165, 225, 0.14);
  border-bottom: 1px solid rgba(190, 165, 225, 0.14);
}

.collab-network svg {
  display: block;

  width: 100%;
  height: 100%;

  cursor: grab;

  touch-action: none;
}

.collab-network svg:active {
  cursor: grabbing;
}


/* Background */

.collab-background {
  fill: transparent;
}


/* Links */

.collab-link {
  stroke: rgba(199, 177, 226, 0.30);
  stroke-width: 1.3;
  stroke-linecap: round;

  transition:
    stroke 0.2s ease,
    opacity 0.2s ease,
    stroke-width 0.2s ease;
}

.collab-link.active {
  stroke: rgba(225, 207, 247, 0.92);
  stroke-width: 2.1;
}


/* Nodes */

.collab-node {
  cursor: grab;
  outline: none;

  transition: opacity 0.2s ease;
}

.collab-node:active {
  cursor: grabbing;
}

.collab-node circle {
  fill: rgba(190, 165, 225, 0.20);

  stroke: rgba(216, 198, 239, 0.72);
  stroke-width: 1.35;

  transition:
    fill 0.2s ease,
    stroke 0.2s ease,
    stroke-width 0.2s ease;
}


/* Center Lingxi Jin */

.collab-center-node circle {
  fill: rgba(190, 160, 232, 0.40);

  stroke: rgba(237, 222, 253, 0.98);
  stroke-width: 1.8;
}


/* Hover / selected */

.collab-node:hover circle,
.collab-node.active circle {
  fill: rgba(199, 171, 237, 0.52);

  stroke: rgba(244, 233, 255, 1);
  stroke-width: 1.9;
}


/* Labels */

.collab-label {
  fill: var(--global-text-color);

  font-family: inherit;
  font-size: 11.5px;
  font-weight: 400;

  text-anchor: middle;

  pointer-events: none;
  user-select: none;
}

.collab-center-node .collab-label {
  font-size: 13px;
  font-weight: 600;
}


/* Focus mode */

.collab-network.has-selection
.collab-node:not(.active):not(.collab-center-node) {
  opacity: 0.18;
}

.collab-network.has-selection
.collab-link:not(.active) {
  opacity: 0.08;
}


/* Tooltip */

.collab-tooltip {
  position: absolute;

  z-index: 30;

  display: none;

  max-width: 280px;

  padding: 0.62rem 0.8rem;

  border: 1px solid rgba(195, 170, 225, 0.30);
  border-radius: 7px;

  background: rgba(30, 26, 37, 0.96);

  color: #f4eefb;

  font-size: 0.8rem;
  line-height: 1.45;

  pointer-events: none;

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.collab-tooltip.is-visible {
  display: block;
}

.collab-tooltip strong {
  display: block;

  margin-bottom: 2px;

  color: #ffffff;
  font-size: 0.83rem;
  font-weight: 600;
}

.collab-tooltip span {
  color: rgba(240, 231, 250, 0.72);
}


/* Reset button */

.collab-reset {
  flex-shrink: 0;

  padding: 0.35rem 0.72rem;

  border: 1px solid rgba(190, 165, 225, 0.28);
  border-radius: 6px;

  background: rgba(190, 165, 225, 0.07);

  color: var(--global-text-color-light);

  font-family: inherit;
  font-size: 0.76rem;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.collab-reset:hover {
  background: rgba(190, 165, 225, 0.15);

  border-color: rgba(211, 190, 239, 0.48);

  color: var(--global-text-color);
}


/* Light mode */

html:not([data-theme="dark"])
.collab-node circle {
  fill: rgba(165, 130, 205, 0.14);

  stroke: rgba(116, 81, 155, 0.50);
}

html:not([data-theme="dark"])
.collab-center-node circle {
  fill: rgba(165, 130, 205, 0.26);

  stroke: rgba(116, 81, 155, 0.78);
}

html:not([data-theme="dark"])
.collab-link {
  stroke: rgba(116, 81, 155, 0.24);
}

html:not([data-theme="dark"])
.collab-tooltip {
  background: rgba(255, 255, 255, 0.98);

  color: #302738;

  border-color: rgba(116, 81, 155, 0.22);
}

html:not([data-theme="dark"])
.collab-tooltip strong {
  color: #241d2b;
}

html:not([data-theme="dark"])
.collab-tooltip span {
  color: #706679;
}


/* Mobile */

@media (max-width: 600px) {

  .collab-network {
    height: 440px;
  }

  .collab-heading-row {
    align-items: flex-start;
  }

  .collab-label {
    font-size: 9.5px;
  }

  .collab-center-node .collab-label {
    font-size: 11px;
  }

  .collab-section {
    margin-bottom: 4rem;
  }

}

</style>


<script
  defer
  src="{{ '/assets/js/collaborations.js' | relative_url | bust_file_cache }}">
</script>
