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

  <div class="collab-view-switch" aria-label="Collaboration network view">

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
   COLOR SYSTEM
   ========================================================= */

:root {
  --collab-bg: #ffffff;
  --collab-panel: rgba(255, 255, 255, 0.96);

  --collab-border: rgba(33, 38, 46, 0.15);

  --collab-text: #20242a;
  --collab-text-strong: #111418;
  --collab-text-secondary: #353b44;

  --collab-link: rgba(66, 72, 82, 0.48);
  --collab-link-active: rgba(28, 32, 38, 0.88);

  --collab-center-fill: rgba(89, 82, 72, 0.14);
  --collab-center-stroke: #5f5850;
}


html[data-theme="dark"] {
  --collab-bg: rgba(255, 255, 255, 0.012);
  --collab-panel: rgba(34, 31, 40, 0.94);

  --collab-border: rgba(224, 219, 231, 0.18);

  --collab-text: #f3f1f5;
  --collab-text-strong: #ffffff;
  --collab-text-secondary: #e1dce5;

  --collab-link: rgba(213, 209, 219, 0.46);
  --collab-link-active: rgba(255, 255, 255, 0.92);

  --collab-center-fill: rgba(238, 231, 221, 0.28);
  --collab-center-stroke: #eee8df;
}


/* =========================================================
   INTRO
   ========================================================= */

.collab-intro {
  max-width: 820px;
  margin-bottom: 2.6rem;
}

.collab-intro p {
  margin: 0;

  color: var(--global-text-color);

  font-size: 1rem;
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

  margin-bottom: 0.65rem;
}


/* =========================================================
   VIEW SWITCH
   ========================================================= */

.collab-view-switch {
  display: inline-flex;

  padding: 3px;

  border: 1px solid var(--collab-border);
  border-radius: 9px;

  background: transparent;
}

.collab-view-btn {
  appearance: none;

  padding: 0.52rem 1rem;

  border: 0;
  border-radius: 7px;

  background: transparent;

  color: var(--collab-text);

  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;

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

  background: rgba(132, 93, 180, 0.78);
}


/* =========================================================
   RESET
   ========================================================= */

.collab-reset {
  appearance: none;

  padding: 0.48rem 0.8rem;

  border: 1px solid var(--collab-border);
  border-radius: 8px;

  background: transparent;

  color: var(--collab-text);

  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    color 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}

.collab-reset:hover {
  color: var(--collab-text-strong);

  border-color: rgba(132, 93, 180, 0.45);

  background: rgba(132, 93, 180, 0.06);
}


/* =========================================================
   HINT
   ========================================================= */

.collab-hint {
  margin-bottom: 0.9rem;

  color: var(--collab-text-secondary);

  font-size: 0.84rem;
  font-weight: 500;
}


/* =========================================================
   STAGE
   ========================================================= */

.collab-stage {
  position: relative;
  width: 100%;
}


/* =========================================================
   NETWORK
   ========================================================= */

.collab-network {
  position: relative;

  width: 100%;
  height: 650px;

  overflow: hidden;

  border: 1px solid var(--collab-border);
  border-radius: 12px;

  background: var(--collab-bg);
}

.collab-network::before {
  content: "";

  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: 0.14;

  background-image:
    radial-gradient(
      circle,
      rgba(90, 96, 108, 0.28) 1px,
      transparent 1.5px
    );

  background-size: 96px 96px;
  background-position: 28px 35px;
}

html[data-theme="dark"] .collab-network::before {
  opacity: 0.12;

  background-image:
    radial-gradient(
      circle,
      rgba(224, 220, 231, 0.44) 1px,
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

  stroke-width: 2.8;
  stroke-linecap: round;

  transition:
    opacity 0.22s ease,
    stroke 0.22s ease,
    stroke-width 0.22s ease;
}

.collab-link.active {
  stroke: var(--collab-link-active);

  stroke-width: 4.2;
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
  stroke-width: 2.2;

  transition:
    fill 0.2s ease,
    stroke 0.2s ease,
    stroke-width 0.2s ease;
}


/* =========================================================
   CENTER
   ========================================================= */

.collab-center-node .collab-halo {
  fill: rgba(108, 100, 90, 0.08);
}

html[data-theme="dark"]
.collab-center-node .collab-halo {
  fill: rgba(238, 231, 221, 0.12);
}

.collab-center-node .collab-circle {
  fill: var(--collab-center-fill);

  stroke: var(--collab-center-stroke);

  stroke-width: 2.8;
}

.collab-center-node:hover .collab-circle,
.collab-center-node.active .collab-circle {
  stroke-width: 3.4;
}


/* =========================================================
   SOUTH KOREA
   ========================================================= */

.tone-korea .collab-circle {
  fill: rgba(74, 111, 148, 0.20);

  stroke: #4a6f94;
}

.tone-korea:hover .collab-circle,
.tone-korea.active .collab-circle {
  fill: rgba(74, 111, 148, 0.38);

  stroke: #315d89;

  stroke-width: 3;
}

html[data-theme="dark"]
.tone-korea .collab-circle {
  fill: rgba(111, 143, 175, 0.30);

  stroke: #91b6d8;
}


/* =========================================================
   UNITED STATES
   ========================================================= */

.tone-us .collab-circle {
  fill: rgba(164, 98, 78, 0.20);

  stroke: #a4624e;
}

.tone-us:hover .collab-circle,
.tone-us.active .collab-circle {
  fill: rgba(164, 98, 78, 0.38);

  stroke: #914b38;

  stroke-width: 3;
}

html[data-theme="dark"]
.tone-us .collab-circle {
  fill: rgba(180, 123, 104, 0.30);

  stroke: #db947d;
}


/* =========================================================
   JAPAN
   ========================================================= */

.tone-japan .collab-circle {
  fill: rgba(94, 132, 103, 0.20);

  stroke: #5e8467;
}

.tone-japan:hover .collab-circle,
.tone-japan.active .collab-circle {
  fill: rgba(94, 132, 103, 0.38);

  stroke: #44724f;

  stroke-width: 3;
}

html[data-theme="dark"]
.tone-japan .collab-circle {
  fill: rgba(127, 155, 133, 0.30);

  stroke: #9fc1a6;
}


/* =========================================================
   HONG KONG SAR, CHINA
   ========================================================= */

.tone-hk .collab-circle {
  fill: rgba(158, 126, 64, 0.20);

  stroke: #9e7e40;
}

.tone-hk:hover .collab-circle,
.tone-hk.active .collab-circle {
  fill: rgba(158, 126, 64, 0.38);

  stroke: #85682f;

  stroke-width: 3;
}

html[data-theme="dark"]
.tone-hk .collab-circle {
  fill: rgba(178, 154, 104, 0.30);

  stroke: #d7bb75;
}


/* =========================================================
   ITALY
   ========================================================= */

.tone-italy .collab-circle {
  fill: rgba(70, 126, 121, 0.20);

  stroke: #467e79;
}

.tone-italy:hover .collab-circle,
.tone-italy.active .collab-circle {
  fill: rgba(70, 126, 121, 0.38);

  stroke: #306c66;

  stroke-width: 3;
}

html[data-theme="dark"]
.tone-italy .collab-circle {
  fill: rgba(111, 150, 147, 0.30);

  stroke: #8fbab6;
}


/* =========================================================
   SINGAPORE
   ========================================================= */

.tone-singapore .collab-circle {
  fill: rgba(189, 137, 69, 0.20);

  stroke: #a87535;
}

.tone-singapore:hover .collab-circle,
.tone-singapore.active .collab-circle {
  fill: rgba(189, 137, 69, 0.38);

  stroke: #8d5f27;

  stroke-width: 3;
}

html[data-theme="dark"]
.tone-singapore .collab-circle {
  fill: rgba(205, 157, 92, 0.30);

  stroke: #d9a968;
}


/* =========================================================
   UNITED KINGDOM
   ========================================================= */

.tone-uk .collab-circle {
  fill: rgba(103, 105, 157, 0.20);

  stroke: #67699d;
}

.tone-uk:hover .collab-circle,
.tone-uk.active .collab-circle {
  fill: rgba(103, 105, 157, 0.38);

  stroke: #505487;

  stroke-width: 3;
}

html[data-theme="dark"]
.tone-uk .collab-circle {
  fill: rgba(135, 137, 187, 0.30);

  stroke: #a7a9d7;
}


/* =========================================================
   LABELS
   ========================================================= */

.collab-label {
  fill: var(--collab-text-strong);

  font-family: inherit;

  font-size: 18px;
  font-weight: 650;

  text-anchor: middle;

  pointer-events: none;
  user-select: none;
}

.collab-center-node .collab-label {
  fill: var(--collab-text-strong);

  font-size: 22px;
  font-weight: 750;
}


/* =========================================================
   FOCUS
   ========================================================= */

.collab-network.has-selection
.collab-node:not(.active):not(.collab-center-node) {
  opacity: 0.28;
}

.collab-network.has-selection
.collab-link:not(.active) {
  opacity: 0.16;
}


/* =========================================================
   FLOATING DETAIL PANEL
   ========================================================= */

.collab-detail {
  position: absolute;

  top: 26px;
  right: 26px;

  z-index: 10;

  width: 290px;
  max-width: calc(100% - 52px);

  padding: 1.35rem 1.25rem;

  border: 1px solid var(--collab-border);
  border-radius: 11px;

  background: var(--collab-panel);

  box-shadow:
    0 10px 30px rgba(20, 24, 30, 0.08);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

html[data-theme="dark"] .collab-detail {
  box-shadow:
    0 12px 34px rgba(0, 0, 0, 0.20);
}


/* =========================================================
   DETAIL TYPOGRAPHY
   ========================================================= */

.collab-detail-eyebrow {
  margin-bottom: 0.75rem;

  color: #715781;

  font-size: 0.76rem;
  font-weight: 750;

  letter-spacing: 0.10em;

  text-transform: uppercase;
}

html[data-theme="dark"]
.collab-detail-eyebrow {
  color: #c9b7da;
}

.collab-detail h3 {
  margin: 0 0 0.45rem;

  color: var(--collab-text-strong);

  font-size: 1.38rem;
  font-weight: 750;

  line-height: 1.35;
}

.collab-detail-meta {
  margin-bottom: 0.9rem;

  color: var(--collab-text-secondary);

  font-size: 0.96rem;
  font-weight: 600;

  line-height: 1.5;
}

.collab-detail p {
  margin: 0 0 1rem;

  color: var(--collab-text-secondary);

  font-size: 0.93rem;
  font-weight: 500;

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
  margin-bottom: 0.7rem;

  color: var(--collab-text-secondary);

  font-size: 0.72rem;
  font-weight: 750;

  letter-spacing: 0.09em;

  text-transform: uppercase;
}

.collab-detail-item {
  display: flex;

  align-items: flex-start;

  gap: 0.6rem;

  margin-bottom: 0.65rem;

  color: var(--collab-text-strong);

  font-size: 0.88rem;
  font-weight: 550;

  line-height: 1.5;
}

.collab-detail-dot {
  flex: 0 0 auto;

  width: 10px;
  height: 10px;

  margin-top: 0.28rem;

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

.collab-detail-dot.tone-singapore {
  background: #a87535;
}

.collab-detail-dot.tone-uk {
  background: #67699d;
}


html[data-theme="dark"]
.collab-detail-dot.tone-korea {
  background: #91b6d8;
}

html[data-theme="dark"]
.collab-detail-dot.tone-us {
  background: #db947d;
}

html[data-theme="dark"]
.collab-detail-dot.tone-japan {
  background: #9fc1a6;
}

html[data-theme="dark"]
.collab-detail-dot.tone-hk {
  background: #d7bb75;
}

html[data-theme="dark"]
.collab-detail-dot.tone-italy {
  background: #8fbab6;
}

html[data-theme="dark"]
.collab-detail-dot.tone-singapore {
  background: #d9a968;
}

html[data-theme="dark"]
.collab-detail-dot.tone-uk {
  background: #a7a9d7;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 760px) {

  .collab-network {
    height: 540px;
  }

  .collab-detail {
    position: absolute;

    top: auto;
    right: 16px;
    bottom: 16px;
    left: 16px;

    width: auto;
    max-width: none;

    padding: 1rem;
  }

  .collab-label {
    font-size: 13px;
  }

  .collab-center-node .collab-label {
    font-size: 16px;
  }

  .collab-toolbar {
    align-items: flex-start;
  }

}

</style>


<script
  defer
  src="{{ '/assets/js/collaborations.js' | relative_url | bust_file_cache }}">
</script>
