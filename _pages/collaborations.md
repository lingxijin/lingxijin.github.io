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

  <div
    class="collab-view-switch"
    aria-label="Collaboration network view">

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


<div
  id="collaboration-network"
  class="collab-network"
  aria-label="Interactive research collaboration network">

  <div
    class="collab-strength-legend"
    aria-hidden="true">

    <div class="collab-legend-title">
      Collaboration strength
    </div>

    <div class="collab-legend-row">
      <span class="collab-legend-line collab-legend-line-1"></span>
      <span>1 work</span>
    </div>

    <div class="collab-legend-row">
      <span class="collab-legend-line collab-legend-line-2"></span>
      <span>2–3 works</span>
    </div>

    <div class="collab-legend-row">
      <span class="collab-legend-line collab-legend-line-3"></span>
      <span>4+ works</span>
    </div>

  </div>

</div>


<style>

/* =========================================================
   COLOR SYSTEM
   ========================================================= */

:root {

  --collab-bg: #fbfaf8;

  --collab-border:
    rgba(54, 58, 63, 0.14);

  --collab-text:
    #282b30;

  --collab-text-strong:
    #17191d;

  --collab-text-secondary:
    #5e626b;

  --collab-link:
    #9299a5;

  --collab-link-active:
    #596171;

  --collab-popover:
    rgba(255, 255, 255, 0.97);

  --collab-popover-shadow:
    0 12px 38px rgba(40, 43, 48, 0.13);

}


/* =========================================================
   DARK MODE
   ========================================================= */

html[data-theme="dark"] {

  --collab-bg:
    #211f27;

  --collab-border:
    rgba(229, 225, 234, 0.16);

  --collab-text:
    #f2eff4;

  --collab-text-strong:
    #ffffff;

  --collab-text-secondary:
    #d5d0d9;

  --collab-link:
    #858894;

  --collab-link-active:
    #d4d0d9;

  --collab-popover:
    rgba(37, 34, 43, 0.97);

  --collab-popover-shadow:
    0 14px 40px rgba(0, 0, 0, 0.30);

}


/* =========================================================
   INTRO
   ========================================================= */

.collab-intro {

  max-width: 860px;

  margin-bottom: 2.6rem;

}


.collab-intro p {

  margin: 0;

  color:
    var(--global-text-color);

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

  border:
    1px solid
    var(--collab-border);

  border-radius: 9px;

  background: transparent;

}


.collab-view-btn {

  appearance: none;

  padding:
    0.52rem
    1rem;

  border: 0;

  border-radius: 7px;

  background: transparent;

  color:
    var(--collab-text);

  font-family: inherit;

  font-size: 0.9rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.18s ease,
    color 0.18s ease;

}


.collab-view-btn:hover {

  color:
    var(--collab-text-strong);

}


.collab-view-btn.active {

  color: #ffffff;

  background:
    #78608d;

}


/* =========================================================
   RESET
   ========================================================= */

.collab-reset {

  appearance: none;

  padding:
    0.48rem
    0.8rem;

  border:
    1px solid
    var(--collab-border);

  border-radius: 8px;

  background: transparent;

  color:
    var(--collab-text);

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

  color:
    var(--collab-text-strong);

  border-color:
    rgba(120, 96, 141, 0.55);

  background:
    rgba(120, 96, 141, 0.07);

}


/* =========================================================
   HINT
   ========================================================= */

.collab-hint {

  margin-bottom: 0.9rem;

  color:
    var(--collab-text-secondary);

  font-size: 0.84rem;

  font-weight: 500;

}


/* =========================================================
   NETWORK
   ========================================================= */

.collab-network {

  position: relative;

  width: 100%;

  height: 650px;

  overflow: hidden;

  border:
    1px solid
    var(--collab-border);

  border-radius: 12px;

  background:
    var(--collab-bg);

}


/* subtle dotted research-viz texture */

.collab-network::before {

  content: "";

  position: absolute;

  inset: 0;

  pointer-events: none;

  opacity: 0.10;

  background-image:
    radial-gradient(
      circle,
      #8b9099 1px,
      transparent 1.4px
    );

  background-size:
    96px 96px;

  background-position:
    28px 35px;

}


html[data-theme="dark"]
.collab-network::before {

  opacity: 0.08;

  background-image:
    radial-gradient(
      circle,
      #cbc6d0 1px,
      transparent 1.4px
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

  stroke:
    var(--collab-link);

  stroke-width:
    var(--link-width, 2.2px);

  stroke-linecap: round;

  transition:
    opacity 0.2s ease,
    stroke 0.2s ease,
    stroke-width 0.2s ease;

}


.collab-link.active {

  stroke:
    var(--collab-link-active);

  stroke-width:
    calc(
      var(--link-width, 2.2px) + 1.2px
    );

}


/* =========================================================
   NODE BASE
   ========================================================= */

.collab-node {

  cursor: grab;

  outline: none;

  transition:
    opacity 0.2s ease;

}


.collab-node:active {

  cursor: grabbing;

}


/*
  Completely remove halo / outer ring.
*/

.collab-halo {

  display: none;

}


/*
  Solid Morandi circles.
  NO stroke.
  NO transparency.
*/

.collab-circle {

  stroke: none;

  stroke-width: 0;

  transition:
    filter 0.18s ease;

}


/* =========================================================
   MORANDI PALETTE
   ========================================================= */


/* CENTER — warm stone */

.collab-center-node .collab-circle {

  fill:
    #817970;

}


/* SOUTH KOREA — dusty blue */

.tone-korea .collab-circle {

  fill:
    #7e97ad;

}


/* UNITED STATES — muted clay */

.tone-us .collab-circle {

  fill:
    #b88778;

}


/* SINGAPORE — muted ochre */

.tone-singapore .collab-circle {

  fill:
    #bea06d;

}


/* UNITED KINGDOM — dusty mauve */

.tone-uk .collab-circle {

  fill:
    #96839a;

}


/* JAPAN — sage */

.tone-japan .collab-circle {

  fill:
    #8fa18a;

}


/* HONG KONG SAR, CHINA — blue gray */

.tone-hk .collab-circle {

  fill:
    #839c9e;

}


/* ITALY — muted teal */

.tone-italy .collab-circle {

  fill:
    #779792;

}


/* =========================================================
   HOVER / ACTIVE
   ========================================================= */

.collab-node:hover .collab-circle {

  filter:
    brightness(1.08);

}


.collab-node.active .collab-circle {

  filter:
    brightness(1.12);

}


/* =========================================================
   LABELS
   ========================================================= */

.collab-label {

  fill:
    var(--collab-text-strong);

  font-family: inherit;

  font-size: 18px;

  font-weight: 650;

  text-anchor: middle;

  pointer-events: none;

  user-select: none;

}


.collab-center-node .collab-label {

  font-size: 22px;

  font-weight: 750;

}


/* =========================================================
   FOCUS MODE
   ========================================================= */

.collab-network.has-selection
.collab-node:not(.active):not(.collab-center-node) {

  opacity: 0.25;

}


.collab-network.has-selection
.collab-link:not(.active) {

  opacity: 0.14;

}


/* =========================================================
   STRENGTH LEGEND
   ========================================================= */

.collab-strength-legend {

  position: absolute;

  left: 18px;

  bottom: 18px;

  z-index: 4;

  width: 190px;

  padding:
    0.85rem
    0.9rem;

  border:
    1px solid
    var(--collab-border);

  border-radius: 9px;

  background:
    var(--collab-popover);

  box-shadow:
    0 5px 18px
    rgba(30, 33, 38, 0.05);

  pointer-events: none;

}


.collab-legend-title {

  margin-bottom: 0.65rem;

  color:
    var(--collab-text-strong);

  font-size: 0.79rem;

  font-weight: 700;

}


.collab-legend-row {

  display: flex;

  align-items: center;

  gap: 0.65rem;

  margin:
    0.42rem 0;

  color:
    var(--collab-text-secondary);

  font-size: 0.76rem;

  font-weight: 550;

}


.collab-legend-line {

  display: inline-block;

  width: 62px;

  border-radius: 100px;

  background:
    var(--collab-link-active);

}


.collab-legend-line-1 {

  height: 2px;

}


.collab-legend-line-2 {

  height: 4px;

}


.collab-legend-line-3 {

  height: 7px;

}


/* =========================================================
   POPOVER
   ========================================================= */

.collab-popover {

  position: absolute;

  z-index: 20;

  width: 310px;

  max-width:
    calc(100% - 32px);

  padding:
    1.05rem
    1.1rem;

  border:
    1px solid
    var(--collab-border);

  border-radius: 11px;

  background:
    var(--collab-popover);

  box-shadow:
    var(--collab-popover-shadow);

  backdrop-filter:
    blur(14px);

  -webkit-backdrop-filter:
    blur(14px);

  opacity: 0;

  visibility: hidden;

  transform:
    translateY(4px);

  transition:
    opacity 0.16s ease,
    transform 0.16s ease,
    visibility 0.16s ease;

}


.collab-popover.visible {

  opacity: 1;

  visibility: visible;

  transform:
    translateY(0);

}


.collab-popover-header {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 0.75rem;

}


.collab-popover-title-wrap {

  display: flex;

  align-items: flex-start;

  gap: 0.65rem;

  min-width: 0;

}


.collab-popover-dot {

  flex:
    0 0 auto;

  width: 12px;

  height: 12px;

  margin-top: 0.34rem;

  border-radius: 50%;

}


.collab-popover-title {

  margin: 0;

  color:
    var(--collab-text-strong);

  font-size: 1rem;

  font-weight: 750;

  line-height: 1.38;

}


.collab-popover-close {

  appearance: none;

  flex:
    0 0 auto;

  width: 28px;

  height: 28px;

  margin:
    -4px
    -4px
    0 0;

  padding: 0;

  border: 0;

  border-radius: 50%;

  background: transparent;

  color:
    var(--collab-text-secondary);

  font-size: 1.45rem;

  font-family: inherit;

  font-weight: 400;

  line-height: 26px;

  text-align: center;

  cursor: pointer;

}


.collab-popover-close:hover {

  color:
    var(--collab-text-strong);

  background:
    rgba(120, 120, 125, 0.08);

}


.collab-popover-meta {

  margin-top: 0.7rem;

  color:
    var(--collab-text-secondary);

  font-size: 0.86rem;

  line-height: 1.55;

}


.collab-popover-count {

  margin-top: 0.75rem;

  color:
    var(--collab-text-strong);

  font-size: 0.94rem;

  font-weight: 700;

}


.collab-popover-section {

  margin-top: 0.9rem;

  padding-top: 0.8rem;

  border-top:
    1px solid
    var(--collab-border);

}


.collab-popover-section-title {

  margin-bottom: 0.55rem;

  color:
    var(--collab-text-strong);

  font-size: 0.77rem;

  font-weight: 750;

}


.collab-popover-row {

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 0.8rem;

  padding:
    0.22rem 0;

  color:
    var(--collab-text-secondary);

  font-size: 0.82rem;

  line-height: 1.45;

}


.collab-popover-row-name {

  min-width: 0;

}


.collab-popover-row-count {

  flex:
    0 0 auto;

  color:
    var(--collab-text-strong);

  font-weight: 700;

}


/* popover dots */

.collab-popover-dot.tone-korea {
  background: #7e97ad;
}

.collab-popover-dot.tone-us {
  background: #b88778;
}

.collab-popover-dot.tone-singapore {
  background: #bea06d;
}

.collab-popover-dot.tone-uk {
  background: #96839a;
}

.collab-popover-dot.tone-japan {
  background: #8fa18a;
}

.collab-popover-dot.tone-hk {
  background: #839c9e;
}

.collab-popover-dot.tone-italy {
  background: #779792;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 760px) {

  .collab-network {

    height: 560px;

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


  .collab-strength-legend {

    width: 156px;

    left: 10px;

    bottom: 10px;

    padding:
      0.7rem;

  }


  .collab-legend-line {

    width: 44px;

  }


  .collab-popover {

    width: 270px;

    padding:
      0.9rem;

  }

}

</style>


<script
  defer
  src="{{ '/assets/js/collaborations.js' | relative_url | bust_file_cache }}">
</script>
