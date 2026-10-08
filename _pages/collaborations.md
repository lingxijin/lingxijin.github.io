---
layout: page
title: collaborations
permalink: /collaborations/
description: A visualization of my research collaborations across countries, regions, and institutions
nav: true
nav_order: 3
---

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
   COLOR SYSTEM — LIGHT MODE
   ========================================================= */

:root {

  --collab-bg: #ffffff;
  --collab-panel: #ffffff;

  --collab-border: rgba(31, 35, 42, 0.14);

  --collab-text: #20242a;
  --collab-text-strong: #111418;
  --collab-text-secondary: #414750;
  --collab-text-muted: #5f6670;

  --collab-link: rgba(63, 69, 78, 0.34);
  --collab-link-active: rgba(34, 38, 44, 0.82);

  --collab-center-fill: rgba(90, 82, 72, 0.12);
  --collab-center-stroke: #615a52;

}


/* =========================================================
   COLOR SYSTEM — DARK MODE
   ========================================================= */

html[data-theme="dark"] {

  --collab-bg: rgba(255, 255, 255, 0.018);
  --collab-panel: rgba(255, 255, 255, 0.028);

  --collab-border: rgba(220, 216, 228, 0.18);

  --collab-text: #f1eff4;
  --collab-text-strong: #ffffff;
  --collab-text-secondary: #ded9e2;
  --collab-text-muted: #c5becb;

  --collab-link: rgba(205, 202, 212, 0.34);
  --collab-link-active: rgba(246, 243, 248, 0.88);

  --collab-center-fill: rgba(239, 232, 221, 0.24);
  --collab-center-stroke: #eee7dc;

}


/* =========================================================
   INTRO
   ========================================================= */

.collab-intro {
  max-width: 760px;
  margin-bottom: 2.7rem;
}

.collab-intro p {
  margin: 0;

  color: var(--global-text-color);

  font-size: 0.98rem;
  line-height: 1.7;
}


/* =========================================================
   TOOLBAR
   ========================================================= */

.collab-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  margin-bottom: 0.55rem;
}


/* =========================================================
   VIEW SWITCH
   ========================================================= */

.collab-view-switch {
  display: inline-flex;

  padding: 3px;

  border: 1px solid var(--collab-border);
  border-radius: 8px;

  background: var(--collab-panel);
}


.collab-view-btn {
  appearance: none;

  padding: 0.45rem 0.92rem;

  border: 0;
  border-radius: 6px;

  background: transparent;

  color: var(--collab-text-secondary);

  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 500;

  cursor: pointer;

  transition:
    background 0.18s ease,
    color 0.18s ease;
}


.collab-view-btn:hover {
  color: var(--collab-text-strong);
}


.collab-view-btn.active {
  color: #ffffff;

  background: rgba(139, 103, 188, 0.72);
}


/* =========================================================
   RESET
   ========================================================= */

.collab-reset {
  appearance: none;

  padding: 0.4rem 0.72rem;

  border: 1px solid var(--collab-border);
  border-radius: 7px;

  background: var(--collab-panel);

  color: var(--collab-text-secondary);

  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 500;

  cursor: pointer;

  transition:
    color 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease;
}


.collab-reset:hover {
  color: var(--collab-text-strong);

  border-color: rgba(135, 104, 170, 0.38);
}


/* =========================================================
   HINT
   ========================================================= */

.collab-hint {
  margin-bottom: 0.85rem;

  color: var(--collab-text-secondary);

  font-size: 0.79rem;
  font-weight: 450;
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

  border: 1px solid var(--collab-border);
  border-radius: 10px;

  background: var(--collab-bg);
}


/* subtle visual texture */

.collab-network::before {
  content: "";

  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: 0.16;

  background-image:
    radial-gradient(
      circle,
      rgba(90, 96, 108, 0.30) 1px,
      transparent 1.5px
    );

  background-size: 92px 92px;
  background-position: 22px 31px;
}


html[data-theme="dark"] .collab-network::before {
  opacity: 0.12;

  background-image:
    radial-gradient(
      circle,
      rgba(220, 216, 230, 0.40) 1px,
      transparent 1.5px
    );
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

  stroke: var(--collab-link);

  stroke-width: 1.8;
  stroke-linecap: round;

  transition:
    opacity 0.22s ease,
    stroke 0.22s ease,
    stroke-width 0.22s ease;
}


.collab-link.active {
  stroke: var(--collab-link-active);

  stroke-width: 2.7;
}


/* =========================================================
   NODE BASE
   ========================================================= */

.collab-node {
  cursor: grab;

  outline: none;

  transition: opacity 0.22s ease;
}


.collab-node:active {
  cursor: grabbing;
}


.collab-halo {
  fill: transparent;

  transition: fill 0.2s ease;
}


.collab-circle {
  stroke-width: 2;

  transition:
    fill 0.2s ease,
    stroke 0.2s ease,
    stroke-width 0.2s ease;
}


/* =========================================================
   CENTER — LINGXI JIN
   ========================================================= */

.collab-center-node .collab-halo {
  fill: rgba(120, 112, 102, 0.07);
}


html[data-theme="dark"]
.collab-center-node .collab-halo {
  fill: rgba(239, 232, 221, 0.10);
}


.collab-center-node .collab-circle {
  fill: var(--collab-center-fill);

  stroke: var(--collab-center-stroke);

  stroke-width: 2.4;
}


.collab-center-node:hover .collab-halo,
.collab-center-node.active .collab-halo {
  fill: rgba(130, 120, 108, 0.13);
}


html[data-theme="dark"]
.collab-center-node:hover .collab-halo,
html[data-theme="dark"]
.collab-center-node.active .collab-halo {
  fill: rgba(239, 232, 221, 0.16);
}


/* =========================================================
   SOUTH KOREA — BLUE
   ========================================================= */

.tone-korea .collab-circle {
  fill: rgba(74, 111, 148, 0.18);

  stroke: #4a6f94;
}


.tone-korea:hover .collab-circle,
.tone-korea.active .collab-circle {
  fill: rgba(74, 111, 148, 0.34);

  stroke: #365d85;

  stroke-width: 2.5;
}


.tone-korea:hover .collab-halo,
.tone-korea.active .collab-halo {
  fill: rgba(74, 111, 148, 0.10);
}


html[data-theme="dark"]
.tone-korea .collab-circle {
  fill: rgba(111, 143, 175, 0.27);

  stroke: #8fb2d3;
}


html[data-theme="dark"]
.tone-korea:hover .collab-circle,
html[data-theme="dark"]
.tone-korea.active .collab-circle {
  fill: rgba(111, 143, 175, 0.43);

  stroke: #b0c9df;
}


/* =========================================================
   UNITED STATES — TERRACOTTA
   ========================================================= */

.tone-us .collab-circle {
  fill: rgba(164, 98, 78, 0.18);

  stroke: #a4624e;
}


.tone-us:hover .collab-circle,
.tone-us.active .collab-circle {
  fill: rgba(164, 98, 78, 0.34);

  stroke: #8f4d3a;

  stroke-width: 2.5;
}


.tone-us:hover .collab-halo,
.tone-us.active .collab-halo {
  fill: rgba(164, 98, 78, 0.10);
}


html[data-theme="dark"]
.tone-us .collab-circle {
  fill: rgba(180, 123, 104, 0.27);

  stroke: #d48e78;
}


html[data-theme="dark"]
.tone-us:hover .collab-circle,
html[data-theme="dark"]
.tone-us.active .collab-circle {
  fill: rgba(180, 123, 104, 0.43);

  stroke: #e8ab97;
}


/* =========================================================
   JAPAN — SAGE
   ========================================================= */

.tone-japan .collab-circle {
  fill: rgba(94, 132, 103, 0.18);

  stroke: #5e8467;
}


.tone-japan:hover .collab-circle,
.tone-japan.active .collab-circle {
  fill: rgba(94, 132, 103, 0.34);

  stroke: #477253;

  stroke-width: 2.5;
}


.tone-japan:hover .collab-halo,
.tone-japan.active .collab-halo {
  fill: rgba(94, 132, 103, 0.10);
}


html[data-theme="dark"]
.tone-japan .collab-circle {
  fill: rgba(127, 155, 133, 0.27);

  stroke: #9dbcA3;
}


html[data-theme="dark"]
.tone-japan:hover .collab-circle,
html[data-theme="dark"]
.tone-japan.active .collab-circle {
  fill: rgba(127, 155, 133, 0.43);

  stroke: #b9d0bd;
}


/* =========================================================
   HONG KONG SAR, CHINA — OCHRE
   ========================================================= */

.tone-hk .collab-circle {
  fill: rgba(158, 126, 64, 0.19);

  stroke: #9e7e40;
}


.tone-hk:hover .collab-circle,
.tone-hk.active .collab-circle {
  fill: rgba(158, 126, 64, 0.35);

  stroke: #886a2f;

  stroke-width: 2.5;
}


.tone-hk:hover .collab-halo,
.tone-hk.active .collab-halo {
  fill: rgba(158, 126, 64, 0.10);
}


html[data-theme="dark"]
.tone-hk .collab-circle {
  fill: rgba(178, 154, 104, 0.27);

  stroke: #d0b46f;
}


html[data-theme="dark"]
.tone-hk:hover .collab-circle,
html[data-theme="dark"]
.tone-hk.active .collab-circle {
  fill: rgba(178, 154, 104, 0.43);

  stroke: #e0c987;
}


/* =========================================================
   ITALY — TEAL
   ========================================================= */

.tone-italy .collab-circle {
  fill: rgba(70, 126, 121, 0.18);

  stroke: #467e79;
}


.tone-italy:hover .collab-circle,
.tone-italy.active .collab-circle {
  fill: rgba(70, 126, 121, 0.34);

  stroke: #326a65;

  stroke-width: 2.5;
}


.tone-italy:hover .collab-halo,
.tone-italy.active .collab-halo {
  fill: rgba(70, 126, 121, 0.10);
}


html[data-theme="dark"]
.tone-italy .collab-circle {
  fill: rgba(111, 150, 147, 0.27);

  stroke: #8bb5b2;
}


html[data-theme="dark"]
.tone-italy:hover .collab-circle,
html[data-theme="dark"]
.tone-italy.active .collab-circle {
  fill: rgba(111, 150, 147, 0.43);

  stroke: #afd0cd;
}


/* =========================================================
   NODE LABELS — HIGH CONTRAST
   ========================================================= */

.collab-label {
  fill: var(--collab-text-strong);

  font-family: inherit;

  font-size: 15px;
  font-weight: 600;

  text-anchor: middle;

  pointer-events: none;
  user-select: none;
}


.collab-center-node .collab-label {
  fill: var(--collab-text-strong);

  font-size: 17px;
  font-weight: 700;
}


/* =========================================================
   FOCUS MODE
   ========================================================= */

.collab-network.has-selection
.collab-node:not(.active):not(.collab-center-node) {
  opacity: 0.28;
}


.collab-network.has-selection
.collab-link:not(.active) {
  opacity: 0.14;
}


/* =========================================================
   DETAIL PANEL
   ========================================================= */

.collab-detail {
  align-self: stretch;

  padding: 1.35rem 1.2rem;

  border: 1px solid var(--collab-border);
  border-radius: 10px;

  background: var(--collab-panel);
}


.collab-detail-eyebrow {
  margin-bottom: 0.75rem;

  color: #715781;

  font-size: 0.72rem;
  font-weight: 700;

  letter-spacing: 0.10em;

  text-transform: uppercase;
}


html[data-theme="dark"]
.collab-detail-eyebrow {
  color: #c0afd0;
}


.collab-detail h3 {
  margin: 0 0 0.4rem;

  color: var(--collab-text-strong);

  font-size: 1.28rem;
  font-weight: 700;

  line-height: 1.4;
}


.collab-detail-meta {
  margin-bottom: 0.9rem;

  color: var(--collab-text-secondary);

  font-size: 0.88rem;
  font-weight: 500;

  line-height: 1.5;
}


.collab-detail p {
  margin: 0 0 1.1rem;

  color: var(--collab-text-secondary);

  font-size: 0.88rem;
  font-weight: 450;

  line-height: 1.7;
}


/* =========================================================
   DETAIL LIST
   ========================================================= */

.collab-detail-list {
  padding-top: 0.9rem;

  border-top: 1px solid var(--collab-border);
}


.collab-detail-list-title {
  margin-bottom: 0.65rem;

  color: var(--collab-text-secondary);

  font-size: 0.70rem;
  font-weight: 700;

  letter-spacing: 0.09em;

  text-transform: uppercase;
}


.collab-detail-item {
  display: flex;

  align-items: flex-start;

  gap: 0.55rem;

  margin-bottom: 0.6rem;

  color: var(--collab-text-strong);

  font-size: 0.84rem;
  font-weight: 500;

  line-height: 1.5;
}


.collab-detail-dot {
  flex: 0 0 auto;

  width: 9px;
  height: 9px;

  margin-top: 0.27rem;

  border-radius: 50%;
}


.collab-detail-dot.tone-korea {
  background: #4a6f94;
}

.collab-detail-dot.tone-us {
  background: #a4624e;
}

.collab-detail-dot.tone-japan {
  background: #5e8467;
}

.collab-detail-dot.tone-hk {
  background: #9e7e40;
}

.collab-detail-dot.tone-italy {
  background: #467e79;
}


html[data-theme="dark"]
.collab-detail-dot.tone-korea {
  background: #8fb2d3;
}

html[data-theme="dark"]
.collab-detail-dot.tone-us {
  background: #d48e78;
}

html[data-theme="dark"]
.collab-detail-dot.tone-japan {
  background: #9dbca3;
}

html[data-theme="dark"]
.collab-detail-dot.tone-hk {
  background: #d0b46f;
}

html[data-theme="dark"]
.collab-detail-dot.tone-italy {
  background: #8bb5b2;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 760px) {

  .collab-stage {
    grid-template-columns: 1fr;

    gap: 1rem;
  }


  .collab-network {
    height: 440px;
  }


  .collab-detail {
    padding: 1rem 0;

    border: 0;
    border-top: 1px solid var(--collab-border);

    border-radius: 0;

    background: transparent;
  }


  .collab-label {
    font-size: 12px;
  }


  .collab-center-node .collab-label {
    font-size: 14px;
  }

}

</style>


<script
  defer
  src="{{ '/assets/js/collaborations.js' | relative_url | bust_file_cache }}">
</script>
