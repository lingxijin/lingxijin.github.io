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

/* =========================================================
   Network canvas
   ========================================================= */

.collab-network {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;

  margin-top: 0.5rem;

  border-top: 1px solid rgba(180, 150, 220, 0.10);
  border-bottom: 1px solid rgba(180, 150, 220, 0.10);
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

.collab-background {
  fill: transparent;
}


/* =========================================================
   Links
   ========================================================= */

.collab-link {
  stroke: rgba(164, 126, 205, 0.30);
  stroke-width: 1.5;
  stroke-linecap: round;

  transition:
    stroke 0.2s ease,
    opacity 0.2s ease,
    stroke-width 0.2s ease;
}

.collab-link.active {
  stroke: rgba(143, 97, 196, 0.78);
  stroke-width: 2.4;
}


/* =========================================================
   Nodes
   ========================================================= */

.collab-node {
  cursor: grab;
  outline: none;
  transition:
    opacity 0.2s ease,
    filter 0.2s ease;
}

.collab-node:active {
  cursor: grabbing;
}

.collab-node circle {
  fill: rgba(180, 145, 220, 0.17);

  stroke: rgba(160, 115, 205, 0.60);
  stroke-width: 1.5;

  transition:
    fill 0.2s ease,
    stroke 0.2s ease,
    stroke-width 0.2s ease,
    filter 0.2s ease;
}


/* Center node */

.collab-center-node circle {
  fill: rgba(172, 129, 218, 0.30);

  stroke: rgba(137, 88, 190, 0.82);
  stroke-width: 2;

  filter:
    drop-shadow(
      0 0 10px rgba(165, 120, 215, 0.18)
    );
}


/* Hover */

.collab-node:hover circle,
.collab-node.active circle {
  fill: rgba(177, 135, 223, 0.34);

  stroke: rgba(132, 80, 187, 0.92);
  stroke-width: 2;

  filter:
    drop-shadow(
      0 0 8px rgba(160, 115, 210, 0.20)
    );
}


/* =========================================================
   Labels
   ========================================================= */

.collab-label {
  fill: var(--global-text-color);

  font-family: inherit;
  font-size: 12.5px;
  font-weight: 450;

  text-anchor: middle;

  pointer-events: none;
  user-select: none;
}

.collab-center-node .collab-label {
  font-size: 14px;
  font-weight: 600;
}


/* =========================================================
   Selection
   ========================================================= */

.collab-network.has-selection
.collab-node:not(.active):not(.collab-center-node) {
  opacity: 0.18;
}

.collab-network.has-selection
.collab-link:not(.active) {
  opacity: 0.08;
}


/* =========================================================
   Tooltip
   ========================================================= */

.collab-tooltip {
  position: absolute;
  z-index: 30;

  display: none;

  max-width: 280px;

  padding: 0.7rem 0.85rem;

  border: 1px solid rgba(178, 140, 215, 0.22);
  border-radius: 9px;

  background: rgba(30, 27, 36, 0.94);

  color: #f7f2fb;

  font-size: 0.8rem;
  line-height: 1.45;

  pointer-events: none;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.12);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.collab-tooltip.is-visible {
  display: block;
}

.collab-tooltip strong {
  display: block;
  margin-bottom: 3px;

  font-size: 0.84rem;
  font-weight: 600;
}

.collab-tooltip span {
  color: rgba(240, 232, 248, 0.72);
}


/* =========================================================
   Reset button
   ========================================================= */

.collab-reset {
  flex-shrink: 0;

  padding: 0.3rem 0.62rem;

  border: 1px solid rgba(175, 140, 210, 0.18);
  border-radius: 6px;

  background: transparent;

  color: var(--global-text-color-light);

  font-family: inherit;
  font-size: 0.72rem;

  opacity: 0.72;

  cursor: pointer;

  transition:
    opacity 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.collab-reset:hover {
  opacity: 1;

  background: rgba(175, 140, 210, 0.07);

  border-color: rgba(175, 140, 210, 0.30);
}


/* =========================================================
   Light mode
   ========================================================= */

html:not([data-theme="dark"])
.collab-node circle {
  fill: rgba(171, 132, 211, 0.12);
  stroke: rgba(128, 83, 171, 0.48);
}

html:not([data-theme="dark"])
.collab-center-node circle {
  fill: rgba(171, 132, 211, 0.22);
  stroke: rgba(117, 67, 166, 0.72);
}

html:not([data-theme="dark"])
.collab-link {
  stroke: rgba(126, 87, 168, 0.25);
}

html:not([data-theme="dark"])
.collab-tooltip {
  background: rgba(255, 255, 255, 0.97);
  color: #302738;
}

html:not([data-theme="dark"])
.collab-tooltip span {
  color: #746b7b;
}


/* =========================================================
   Mobile
   ========================================================= */

@media (max-width: 600px) {

  .collab-network {
    height: 430px;
  }

  .collab-label {
    font-size: 10px;
  }

  .collab-center-node .collab-label {
    font-size: 12px;
  }

}
