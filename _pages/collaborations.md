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

<div class="collab-toolbar">

  <div class="collab-view-switch">

    <button
      type="button"
      class="collab-view-btn active"
      data-view="countries"
      aria-pressed="true">
      Countries
    </button>

    <button
      type="button"
      class="collab-view-btn"
      data-view="institutions"
      aria-pressed="false">
      Institutions
    </button>

  </div>

  <button
    type="button"
    class="collab-reset"
    id="collab-reset">
    Reset view
  </button>

</div>

<div class="collab-hint">
  Drag nodes · Scroll to zoom · Drag the canvas to move · Click a node to explore
</div>

<div class="collab-stage">

  <div
    id="collaboration-network"
    class="collab-network"
    aria-label="Interactive research collaboration network">
  </div>

  <aside
    id="collab-detail"
    class="collab-detail"
    aria-live="polite">

    <div class="collab-detail-eyebrow">
      Research Network
    </div>

    <h3 id="collab-detail-title">
      Lingxi Jin
    </h3>

    <div
      id="collab-detail-meta"
      class="collab-detail-meta">
      Global collaboration
    </div>

    <p id="collab-detail-description">
      Select a country, region, or institution in the network to explore the collaboration.
    </p>

    <div
      id="collab-detail-list"
      class="collab-detail-list">
    </div>

  </aside>

</div>


<style>

/* =========================================================
   INTRO
   ========================================================= */

.collab-intro {
  max-width: 760px;
  margin-bottom: 2.7rem;
}

.collab-intro p {
  margin: 0;
  color: var(--global-text-color-light);
  font-size: 0.98rem;
  line-height: 1.7;
}


/* =========================================================
   TOOLBAR
   ========================================================= */

.collab-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 1rem;

  margin-bottom: 0.55rem;
}


/* =========================================================
   SWITCH
   ========================================================= */

.collab-view-switch {
  display: inline-flex;

  padding: 3px;

  border:
    1px solid rgba(166, 150, 190, 0.18);

  border-radius: 8px;

  background:
    rgba(255, 255, 255, 0.018);
}


.collab-view-btn {
  appearance: none;

  padding:
    0.4rem
    0.85rem;

  border: 0;

  border-radius: 6px;

  background: transparent;

  color:
    var(--global-text-color-light);

  font-family: inherit;
  font-size: 0.77rem;

  cursor: pointer;

  transition:
    background 0.18s ease,
    color 0.18s ease;
}


.collab-view-btn.active {
  color: #f7f5fa;

  background:
    rgba(139, 103, 188, 0.50);
}


.collab-view-btn:hover {
  color:
    var(--global-text-color);
}


/* =========================================================
   RESET
   ========================================================= */

.collab-reset {
  appearance: none;

  padding:
    0.36rem
    0.68rem;

  border:
    1px solid rgba(166, 150, 190, 0.18);

  border-radius: 7px;

  background: transparent;

  color:
    var(--global-text-color-light);

  font-family: inherit;
  font-size: 0.72rem;

  opacity: 0.72;

  cursor: pointer;

  transition:
    opacity 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}


.collab-reset:hover {
  opacity: 1;

  background:
    rgba(255, 255, 255, 0.025);

  border-color:
    rgba(166, 150, 190, 0.32);
}


/* =========================================================
   HINT
   ========================================================= */

.collab-hint {
  margin-bottom: 0.85rem;

  color:
    var(--global-text-color-light);

  font-size: 0.72rem;

  opacity: 0.55;
}


/* =========================================================
   STAGE
   ========================================================= */

.collab-stage {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    250px;

  gap: 1rem;

  align-items: stretch;
}


/* =========================================================
   NETWORK PANEL
   ========================================================= */

.collab-network {
  position: relative;

  width: 100%;
  height: 510px;

  min-width: 0;

  overflow: hidden;

  border:
    1px solid rgba(151, 143, 174, 0.15);

  border-radius: 10px;

  background:
    radial-gradient(
      circle at 20% 25%,
      rgba(255, 255, 255, 0.025),
      transparent 34%
    ),
    radial-gradient(
      circle at 75% 70%,
      rgba(255, 255, 255, 0.018),
      transparent 30%
    ),
    rgba(255, 255, 255, 0.008);
}


/* decorative background texture */

.collab-network::before {
  content: "";

  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: 0.18;

  background-image:
    radial-gradient(
      circle,
      rgba(180, 182, 195, 0.45) 1px,
      transparent 1.5px
    );

  background-size:
    92px 92px;

  background-position:
    22px 31px;
}


.collab-network svg {
  position: relative;
  z-index: 1;

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
   LINKS
   ========================================================= */

.collab-link {
  fill: none;

  stroke:
    rgba(168, 173, 185, 0.24);

  stroke-width: 1.4;

  stroke-linecap: round;

  transition:
    opacity 0.22s ease,
    stroke 0.22s ease,
    stroke-width 0.22s ease;
}


.collab-link.active {
  stroke:
    rgba(220, 221, 226, 0.62);

  stroke-width: 2.1;
}


/* =========================================================
   NODE BASE
   ========================================================= */

.collab-node {
  cursor: grab;

  outline: none;

  transition:
    opacity 0.22s ease;
}


.collab-node:active {
  cursor: grabbing;
}


.collab-halo {
  fill: transparent;

  transition:
    fill 0.2s ease;
}


.collab-circle {
  stroke-width: 1.7;

  transition:
    fill 0.2s ease,
    stroke 0.2s ease,
    stroke-width 0.2s ease;
}


/* =========================================================
   CENTER
   ========================================================= */

.collab-center-node .collab-halo {
  fill:
    rgba(232, 226, 216, 0.06);
}


.collab-center-node .collab-circle {
  fill:
    rgba(232, 226, 216, 0.17);

  stroke:
    #e8e2d8;

  stroke-width: 2;
}


.collab-center-node:hover .collab-halo,
.collab-center-node.active .collab-halo {
  fill:
    rgba(232, 226, 216, 0.10);
}


/* =========================================================
   SOUTH KOREA — MUTED BLUE
   ========================================================= */

.tone-korea .collab-circle {
  fill:
    rgba(111, 143, 175, 0.17);

  stroke:
    #6f8faf;
}


.tone-korea:hover .collab-circle,
.tone-korea.active .collab-circle {
  fill:
    rgba(111, 143, 175, 0.30);

  stroke:
    #91b0cf;
}


.tone-korea:hover .collab-halo,
.tone-korea.active .collab-halo {
  fill:
    rgba(111, 143, 175, 0.09);
}


/* =========================================================
   UNITED STATES — TERRACOTTA
   ========================================================= */

.tone-us .collab-circle {
  fill:
    rgba(180, 123, 104, 0.17);

  stroke:
    #b47b68;
}


.tone-us:hover .collab-circle,
.tone-us.active .collab-circle {
  fill:
    rgba(180, 123, 104, 0.31);

  stroke:
    #d49680;
}


.tone-us:hover .collab-halo,
.tone-us.active .collab-halo {
  fill:
    rgba(180, 123, 104, 0.09);
}


/* =========================================================
   JAPAN — SAGE
   ========================================================= */

.tone-japan .collab-circle {
  fill:
    rgba(127, 155, 133, 0.17);

  stroke:
    #7f9b85;
}


.tone-japan:hover .collab-circle,
.tone-japan.active .collab-circle {
  fill:
    rgba(127, 155, 133, 0.31);

  stroke:
    #9ebaa4;
}


.tone-japan:hover .collab-halo,
.tone-japan.active .collab-halo {
  fill:
    rgba(127, 155, 133, 0.09);
}


/* =========================================================
   HONG KONG SAR, CHINA — AMBER
   ========================================================= */

.tone-hk .collab-circle {
  fill:
    rgba(178, 154, 104, 0.17);

  stroke:
    #b29a68;
}


.tone-hk:hover .collab-circle,
.tone-hk.active .collab-circle {
  fill:
    rgba(178, 154, 104, 0.31);

  stroke:
    #d1b777;
}


.tone-hk:hover .collab-halo,
.tone-hk.active .collab-halo {
  fill:
    rgba(178, 154, 104, 0.09);
}


/* =========================================================
   ITALY — MUTED TEAL
   ========================================================= */

.tone-italy .collab-circle {
  fill:
    rgba(111, 150, 147, 0.17);

  stroke:
    #6f9693;
}


.tone-italy:hover .collab-circle,
.tone-italy.active .collab-circle {
  fill:
    rgba(111, 150, 147, 0.31);

  stroke:
    #8eb5b1;
}


.tone-italy:hover .collab-halo,
.tone-italy.active .collab-halo {
  fill:
    rgba(111, 150, 147, 0.09);
}


/* =========================================================
   LABEL
   ========================================================= */

.collab-label {
  fill:
    #e9e8ec;

  font-family: inherit;

  font-size: 11.5px;

  font-weight: 450;

  text-anchor: middle;

  pointer-events: none;

  user-select: none;
}


.collab-center-node .collab-label {
  fill: #f6f3ef;

  font-size: 13.5px;

  font-weight: 600;
}


/* =========================================================
   FOCUS MODE
   ========================================================= */

.collab-network.has-selection
.collab-node:not(.active):not(.collab-center-node) {
  opacity: 0.16;
}


.collab-network.has-selection
.collab-link:not(.active) {
  opacity: 0.06;
}


/* =========================================================
   DETAIL PANEL
   ========================================================= */

.collab-detail {
  align-self: stretch;

  padding:
    1.35rem
    1.2rem;

  border:
    1px solid rgba(151, 143, 174, 0.15);

  border-radius: 10px;

  background:
    rgba(255, 255, 255, 0.018);
}


.collab-detail-eyebrow {
  margin-bottom: 0.75rem;

  color:
    #a49ab3;

  font-size: 0.66rem;

  font-weight: 600;

  letter-spacing: 0.11em;

  text-transform: uppercase;
}


.collab-detail h3 {
  margin:
    0
    0
    0.4rem;

  color:
    var(--global-text-color);

  font-size: 1.14rem;

  font-weight: 600;

  line-height: 1.4;
}


.collab-detail-meta {
  margin-bottom: 0.9rem;

  color:
    var(--global-text-color-light);

  font-size: 0.78rem;

  line-height: 1.5;
}


.collab-detail p {
  margin:
    0
    0
    1.1rem;

  color:
    var(--global-text-color-light);

  font-size: 0.79rem;

  line-height: 1.65;
}


/* =========================================================
   DETAIL LIST
   ========================================================= */

.collab-detail-list {
  padding-top: 0.9rem;

  border-top:
    1px solid rgba(151, 143, 174, 0.10);
}


.collab-detail-list-title {
  margin-bottom: 0.65rem;

  color:
    #9e96aa;

  font-size: 0.64rem;

  font-weight: 600;

  letter-spacing: 0.09em;

  text-transform: uppercase;
}


.collab-detail-item {
  display: flex;

  align-items: flex-start;

  gap: 0.55rem;

  margin-bottom: 0.55rem;

  color:
    var(--global-text-color);

  font-size: 0.75rem;

  line-height: 1.45;
}


.collab-detail-dot {
  flex: 0 0 auto;

  width: 8px;
  height: 8px;

  margin-top: 0.28rem;

  border-radius: 50%;
}


.collab-detail-dot.tone-korea {
  background: #6f8faf;
}

.collab-detail-dot.tone-us {
  background: #b47b68;
}

.collab-detail-dot.tone-japan {
  background: #7f9b85;
}

.collab-detail-dot.tone-hk {
  background: #b29a68;
}

.collab-detail-dot.tone-italy {
  background: #6f9693;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 760px) {

  .collab-stage {
    grid-template-columns: 1fr;
  }

  .collab-network {
    height: 440px;
  }

  .collab-detail {
    padding:
      1rem
      0;

    border: 0;

    border-top:
      1px solid rgba(151, 143, 174, 0.12);

    border-radius: 0;

    background: transparent;
  }

  .collab-label {
    font-size: 9.5px;
  }

  .collab-center-node .collab-label {
    font-size: 11.5px;
  }

}

</style>


<script
  defer
  src="{{ '/assets/js/collaborations.js' | relative_url | bust_file_cache }}">
</script>
