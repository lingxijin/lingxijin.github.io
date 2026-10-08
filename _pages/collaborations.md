---
layout: page
title: collaborations
permalink: /collaborations/
description: Research Collaboration Network
nav: true
nav_order: 4
---

<div class="collab-intro">
  <p>
    A visualization of my research collaborations across countries, regions, and institutions.
  </p>
</div>


<!-- ======================================================
     GLOBAL COLLABORATION
     ====================================================== -->

<section class="collab-section">

  <div class="collab-heading-row">

    <div class="collab-heading">
      <h2>Global Collaboration</h2>
      <p>
        Countries and regions connected through my collaborative research.
      </p>
    </div>

    <button
      class="collab-reset"
      data-target="country-network"
      type="button"
    >
      Reset view
    </button>

  </div>

  <div class="collab-hint">
    Drag nodes · Scroll to zoom · Click a node to focus
  </div>

  <div class="network-wrapper">
    <div
      id="country-network"
      class="collab-network"
      aria-label="Interactive global research collaboration network"
    ></div>
  </div>

</section>



<!-- ======================================================
     INSTITUTIONAL COLLABORATION
     ====================================================== -->

<section class="collab-section">

  <div class="collab-heading-row">

    <div class="collab-heading">
      <h2>Institutional Collaboration</h2>
      <p>
        Universities and institutions connected through joint research.
      </p>
    </div>

    <button
      class="collab-reset"
      data-target="institution-network"
      type="button"
    >
      Reset view
    </button>

  </div>

  <div class="collab-hint">
    Drag nodes · Scroll to zoom · Click a node to focus
  </div>

  <div class="network-wrapper">
    <div
      id="institution-network"
      class="collab-network"
      aria-label="Interactive institutional research collaboration network"
    ></div>
  </div>

</section>



<!-- Tooltip -->

<div
  id="collab-tooltip"
  class="collab-tooltip"
  role="status"
></div>



<style>

/* =========================================================
   COLLABORATION PAGE
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


/* =========================================================
   SECTION
   ========================================================= */

.collab-section {
  margin-bottom: 5rem;
}

.collab-heading-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.45rem;
}

.collab-heading {
  min-width: 0;
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
  margin-bottom: 1rem;
  color: var(--global-text-color-light);
  font-size: 0.76rem;
  opacity: 0.72;
}


/* =========================================================
   RESET BUTTON
   ========================================================= */

.collab-reset {
  flex: 0 0 auto;

  padding: 0.35rem 0.7rem;

  border: 1px solid rgba(190, 165, 225, 0.25);
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
  background: rgba(190, 165, 225, 0.14);
  border-color: rgba(210, 188, 240, 0.42);
  color: var(--global-text-color);
}


/* =========================================================
   NETWORK AREA
   ========================================================= */

.network-wrapper {
  position: relative;

  width: 100%;
  min-height: 520px;

  overflow: hidden;

  border-top: 1px solid rgba(180, 155, 215, 0.14);
  border-bottom: 1px solid rgba(180, 155, 215, 0.14);
}

.collab-network {
  width: 100%;
  height: 520px;
  position: relative;
}

.collab-network svg {
  width: 100%;
  height: 100%;
  display: block;

  cursor: grab;
  touch-action: none;
}

.collab-network svg:active {
  cursor: grabbing;
}


/* =========================================================
   LINKS
   ========================================================= */

.collab-link {
  stroke: rgba(191, 169, 220, 0.28);
  stroke-width: 1.25px;
  stroke-linecap: round;

  transition:
    stroke 0.22s ease,
    opacity 0.22s ease,
    stroke-width 0.22s ease;
}

.collab-link.active {
  stroke: rgba(218, 196, 246, 0.88);
  stroke-width: 2px;
}


/* =========================================================
   NODES
   ========================================================= */

.collab-node {
  cursor: pointer;

  transition:
    opacity 0.22s ease;
}

.collab-node circle {
  fill: rgba(190, 164, 225, 0.18);

  stroke: rgba(211, 191, 236, 0.62);
  stroke-width: 1.3px;

  transition:
    fill 0.22s ease,
    stroke 0.22s ease,
    stroke-width 0.22s ease;
}


/* Lingxi Jin */

.collab-node.center-node circle {
  fill: rgba(188, 155, 230, 0.36);

  stroke: rgba(229, 213, 249, 0.95);
  stroke-width: 1.7px;
}


/* Hover / selected */

.collab-node:hover circle,
.collab-node.active circle {
  fill: rgba(195, 166, 235, 0.48);

  stroke: rgba(239, 226, 255, 1);
  stroke-width: 1.8px;
}


/* =========================================================
   LABELS
   ========================================================= */

.collab-node text {
  fill: var(--global-text-color);

  font-family: inherit;
  font-size: 11.5px;
  font-weight: 400;

  text-anchor: middle;

  pointer-events: none;
  user-select: none;
}

.collab-node.center-node text {
  font-size: 13px;
  font-weight: 600;
}


/* =========================================================
   FOCUS MODE
   ========================================================= */

.collab-network.has-selection
.collab-node:not(.active):not(.center-node) {
  opacity: 0.2;
}

.collab-network.has-selection
.collab-link:not(.active) {
  opacity: 0.08;
}


/* =========================================================
   TOOLTIP
   ========================================================= */

.collab-tooltip {
  position: fixed;

  z-index: 9999;

  display: none;

  max-width: 280px;

  padding: 0.65rem 0.8rem;

  border:
    1px solid rgba(195, 168, 229, 0.28);

  border-radius: 7px;

  background:
    rgba(31, 27, 38, 0.95);

  color: #f4eefb;

  font-family: inherit;
  font-size: 0.8rem;
  line-height: 1.45;

  pointer-events: none;

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.collab-tooltip strong {
  display: block;

  margin-bottom: 3px;

  color: #ffffff;

  font-size: 0.83rem;
  font-weight: 600;
}

.collab-tooltip span {
  color: rgba(239, 230, 249, 0.72);
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

html:not([data-theme="dark"]) .collab-link {
  stroke: rgba(115, 82, 153, 0.22);
}

html:not([data-theme="dark"]) .collab-node circle {
  fill: rgba(167, 130, 206, 0.13);

  stroke: rgba(119, 83, 160, 0.48);
}

html:not([data-theme="dark"])
.collab-node.center-node circle {
  fill: rgba(167, 130, 206, 0.23);

  stroke: rgba(119, 83, 160, 0.75);
}

html:not([data-theme="dark"]) .collab-tooltip {
  background: rgba(255, 255, 255, 0.97);

  color: #332b3b;

  border-color: rgba(119, 83, 160, 0.20);
}

html:not([data-theme="dark"])
.collab-tooltip strong {
  color: #241d2b;
}

html:not([data-theme="dark"])
.collab-tooltip span {
  color: #706679;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .collab-section {
    margin-bottom: 4rem;
  }

  .collab-heading-row {
    align-items: flex-start;
  }

  .network-wrapper {
    min-height: 440px;
  }

  .collab-network {
    height: 440px;
  }

  .collab-node text {
    font-size: 9.5px;
  }

  .collab-node.center-node text {
    font-size: 11px;
  }

  .collab-hint {
    font-size: 0.7rem;
  }

}

</style>



<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>


<script>

document.addEventListener("DOMContentLoaded", function () {


/* =========================================================
   DATA
   ========================================================= */


/* ---------------------------------------------------------
   GLOBAL COLLABORATION

   Countries / regions represented in research collaborations.
   --------------------------------------------------------- */

const countryData = [

  {
    id: "Lingxi Jin",
    type: "center"
  },

  {
    id: "South Korea",
    type: "country"
  },

  {
    id: "United States",
    type: "country"
  },

  {
    id: "Japan",
    type: "country"
  },

  {
    id: "Hong Kong",
    type: "country"
  },

  {
    id: "Italy",
    type: "country"
  }

];


const countryLinks = [

  {
    source: "Lingxi Jin",
    target: "South Korea"
  },

  {
    source: "Lingxi Jin",
    target: "United States"
  },

  {
    source: "Lingxi Jin",
    target: "Japan"
  },

  {
    source: "Lingxi Jin",
    target: "Hong Kong"
  },

  {
    source: "Lingxi Jin",
    target: "Italy"
  }

];



/* ---------------------------------------------------------
   INSTITUTIONAL COLLABORATION

   Institution names are normalized at university level.
   --------------------------------------------------------- */

const institutionData = [

  {
    id: "Lingxi Jin",
    type: "center"
  },


  /* South Korea */

  {
    id: "Ewha Womans University",
    country: "South Korea",
    type: "institution"
  },

  {
    id: "Chung-Ang University",
    country: "South Korea",
    type: "institution"
  },

  {
    id: "Sejong University",
    country: "South Korea",
    type: "institution"
  },


  /* United States */

  {
    id: "Carnegie Mellon University",
    country: "United States",
    type: "institution"
  },

  {
    id: "University of Miami",
    country: "United States",
    type: "institution"
  },

  {
    id: "University of Utah",
    country: "United States",
    type: "institution"
  },

  {
    id: "Auburn University",
    country: "United States",
    type: "institution"
  },


  /* Japan */

  {
    id: "Kyushu University",
    country: "Japan",
    type: "institution"
  },


  /* Hong Kong */

  {
    id: "The Hong Kong Polytechnic University",
    country: "Hong Kong",
    type: "institution"
  },


  /* Italy */

  {
    id: "Politecnico di Milano",
    country: "Italy",
    type: "institution"
  }

];


const institutionLinks = [

  {
    source: "Lingxi Jin",
    target: "Ewha Womans University"
  },

  {
    source: "Lingxi Jin",
    target: "Chung-Ang University"
  },

  {
    source: "Lingxi Jin",
    target: "Sejong University"
  },

  {
    source: "Lingxi Jin",
    target: "Carnegie Mellon University"
  },

  {
    source: "Lingxi Jin",
    target: "University of Miami"
  },

  {
    source: "Lingxi Jin",
    target: "University of Utah"
  },

  {
    source: "Lingxi Jin",
    target: "Auburn University"
  },

  {
    source: "Lingxi Jin",
    target: "Kyushu University"
  },

  {
    source: "Lingxi Jin",
    target: "The Hong Kong Polytechnic University"
  },

  {
    source: "Lingxi Jin",
    target: "Politecnico di Milano"
  }

];



/* =========================================================
   LABEL WRAPPING
   ========================================================= */

function splitLabel(text, maxLength) {

  const words = text.split(" ");

  const lines = [];

  let currentLine = "";

  words.forEach(function(word) {

    const candidate =
      currentLine
        ? currentLine + " " + word
        : word;

    if (
      candidate.length > maxLength &&
      currentLine
    ) {

      lines.push(currentLine);

      currentLine = word;

    } else {

      currentLine = candidate;

    }

  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;

}



/* =========================================================
   NETWORK FUNCTION
   ========================================================= */

function createNetwork(
  containerId,
  nodesInput,
  linksInput,
  mode
) {

  const container =
    document.getElementById(containerId);

  if (!container) return;


  const width =
    container.clientWidth || 800;

  const height =
    container.clientHeight || 520;


  const nodes =
    nodesInput.map(function(d) {
      return { ...d };
    });


  const links =
    linksInput.map(function(d) {
      return { ...d };
    });



  /* -------------------------------------------------------
     SVG
     ------------------------------------------------------- */

  const svg =
    d3
      .select(container)
      .append("svg")

      .attr(
        "viewBox",
        "0 0 " + width + " " + height
      )

      .attr(
        "preserveAspectRatio",
        "xMidYMid meet"
      );



  const zoomLayer =
    svg
      .append("g");



  /* -------------------------------------------------------
     ZOOM
     ------------------------------------------------------- */

  const zoom =
    d3
      .zoom()

      .scaleExtent([
        0.65,
        2.8
      ])

      .on(
        "zoom",
        function(event) {

          zoomLayer.attr(
            "transform",
            event.transform
          );

        }
      );


  svg.call(zoom);



  /* -------------------------------------------------------
     LINKS
     ------------------------------------------------------- */

  const link =
    zoomLayer
      .append("g")

      .selectAll("line")

      .data(links)

      .join("line")

      .attr(
        "class",
        "collab-link"
      );



  /* -------------------------------------------------------
     NODES
     ------------------------------------------------------- */

  const node =
    zoomLayer
      .append("g")

      .selectAll("g")

      .data(nodes)

      .join("g")

      .attr(
        "class",
        function(d) {

          return d.type === "center"
            ? "collab-node center-node"
            : "collab-node";

        }
      )

      .attr(
        "tabindex",
        0
      )

      .attr(
        "role",
        "button"
      )

      .attr(
        "aria-label",
        function(d) {

          if (d.type === "center") {
            return "Lingxi Jin";
          }

          if (
            mode === "institution" &&
            d.country
          ) {

            return (
              d.id +
              ", " +
              d.country
            );

          }

          return d.id;

        }
      );



  /* -------------------------------------------------------
     CIRCLES
     ------------------------------------------------------- */

  node
    .append("circle")

    .attr(
      "r",
      function(d) {

        return d.type === "center"
          ? 29
          : mode === "country"
            ? 15
            : 13;

      }
    );



  /* -------------------------------------------------------
     LABELS
     ------------------------------------------------------- */

  node.each(
    function(d) {

      const group =
        d3.select(this);


      const radius =
        d.type === "center"
          ? 29
          : mode === "country"
            ? 15
            : 13;


      const text =
        group
          .append("text")

          .attr(
            "y",
            radius + 19
          );


      const maxLength =
        d.type === "center"
          ? 18
          : mode === "institution"
            ? 22
            : 18;


      const lines =
        splitLabel(
          d.id,
          maxLength
        );


      lines.forEach(
        function(lineText, index) {

          text
            .append("tspan")

            .attr(
              "x",
              0
            )

            .attr(
              "dy",
              index === 0
                ? 0
                : 13
            )

            .text(lineText);

        }
      );

    }
  );



  /* -------------------------------------------------------
     TOOLTIP
     ------------------------------------------------------- */

  const tooltip =
    document.getElementById(
      "collab-tooltip"
    );


  function tooltipHTML(d) {

    if (d.type === "center") {

      return (
        "<strong>Lingxi Jin</strong>" +
        "<span>Research collaboration network</span>"
      );

    }


    if (
      mode === "institution" &&
      d.country
    ) {

      return (
        "<strong>" +
        d.id +
        "</strong>" +

        "<span>" +
        d.country +
        "</span>"
      );

    }


    return (
      "<strong>" +
      d.id +
      "</strong>" +

      "<span>Research collaboration</span>"
    );

  }



  function showTooltip(event, d) {

    tooltip.innerHTML =
      tooltipHTML(d);

    tooltip.style.display =
      "block";


    let x =
      event.clientX + 14;

    let y =
      event.clientY + 14;


    const tooltipWidth =
      tooltip.offsetWidth;

    const tooltipHeight =
      tooltip.offsetHeight;


    if (
      x + tooltipWidth >
      window.innerWidth - 10
    ) {

      x =
        event.clientX -
        tooltipWidth -
        14;

    }


    if (
      y + tooltipHeight >
      window.innerHeight - 10
    ) {

      y =
        event.clientY -
        tooltipHeight -
        14;

    }


    tooltip.style.left =
      x + "px";

    tooltip.style.top =
      y + "px";

  }



  function hideTooltip() {

    tooltip.style.display =
      "none";

  }



  node

    .on(
      "mouseenter",
      function(event, d) {

        showTooltip(
          event,
          d
        );

      }
    )


    .on(
      "mousemove",
      function(event, d) {

        showTooltip(
          event,
          d
        );

      }
    )


    .on(
      "mouseleave",
      function() {

        hideTooltip();

      }
    );



  /* -------------------------------------------------------
     SELECTION
     ------------------------------------------------------- */

  function clearSelection() {

    container
      .classList
      .remove(
        "has-selection"
      );


    node.classed(
      "active",
      false
    );


    link.classed(
      "active",
      false
    );


    hideTooltip();

  }



  function selectNode(
    event,
    selectedNode
  ) {

    if (
      selectedNode.type === "center"
    ) {

      clearSelection();

      return;

    }


    container
      .classList
      .add(
        "has-selection"
      );


    node.classed(
      "active",
      function(d) {

        return (
          d.id === selectedNode.id ||
          d.type === "center"
        );

      }
    );


    link.classed(
      "active",
      function(d) {

        const sourceId =
          typeof d.source === "object"
            ? d.source.id
            : d.source;


        const targetId =
          typeof d.target === "object"
            ? d.target.id
            : d.target;


        return (
          sourceId === selectedNode.id ||
          targetId === selectedNode.id
        );

      }
    );


    showTooltip(
      event,
      selectedNode
    );

  }



  node.on(
    "click",
    function(event, d) {

      event.stopPropagation();

      selectNode(
        event,
        d
      );

    }
  );



  node.on(
    "keydown",
    function(event, d) {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        selectNode(
          event,
          d
        );

      }

    }
  );



  svg.on(
    "click",
    function() {

      clearSelection();

    }
  );



  /* -------------------------------------------------------
     DRAG
     ------------------------------------------------------- */

  const drag =
    d3
      .drag()

      .on(
        "start",
        function(event, d) {

          if (!event.active) {

            simulation
              .alphaTarget(0.16)
              .restart();

          }


          if (
            d.type !== "center"
          ) {

            d.fx = d.x;
            d.fy = d.y;

          }

        }
      )


      .on(
        "drag",
        function(event, d) {

          if (
            d.type === "center"
          ) {
            return;
          }


          d.fx =
            event.x;

          d.fy =
            event.y;

        }
      )


      .on(
        "end",
        function(event, d) {

          if (!event.active) {

            simulation
              .alphaTarget(0);

          }


          if (
            d.type !== "center"
          ) {

            d.fx = null;
            d.fy = null;

          }

        }
      );


  node.call(drag);



  /* -------------------------------------------------------
     FORCE SIMULATION
     ------------------------------------------------------- */

  const simulation =
    d3
      .forceSimulation(nodes)


      .force(

        "link",

        d3
          .forceLink(links)

          .id(
            function(d) {
              return d.id;
            }
          )

          .distance(
            mode === "country"
              ? 150
              : 180
          )

          .strength(0.55)

      )


      .force(

        "charge",

        d3
          .forceManyBody()

          .strength(
            mode === "country"
              ? -650
              : -850
          )

      )


      .force(

        "collision",

        d3
          .forceCollide()

          .radius(
            function(d) {

              if (
                d.type === "center"
              ) {
                return 75;
              }


              return mode === "institution"
                ? 78
                : 60;

            }
          )

      )


      .force(

        "x",

        d3
          .forceX(
            width / 2
          )

          .strength(0.055)

      )


      .force(

        "y",

        d3
          .forceY(
            height / 2
          )

          .strength(0.055)

      );



  /* -------------------------------------------------------
     CENTER NODE
     ------------------------------------------------------- */

  const centerNode =
    nodes.find(
      function(d) {
        return d.type === "center";
      }
    );


  if (centerNode) {

    centerNode.fx =
      width / 2;

    centerNode.fy =
      height / 2;

  }



  /* -------------------------------------------------------
     DRAW
     ------------------------------------------------------- */

  simulation.on(
    "tick",
    function() {


      link

        .attr(
          "x1",
          function(d) {
            return d.source.x;
          }
        )

        .attr(
          "y1",
          function(d) {
            return d.source.y;
          }
        )

        .attr(
          "x2",
          function(d) {
            return d.target.x;
          }
        )

        .attr(
          "y2",
          function(d) {
            return d.target.y;
          }
        );



      node.attr(
        "transform",
        function(d) {

          return (
            "translate(" +
            d.x +
            "," +
            d.y +
            ")"
          );

        }
      );

    }
  );



  /* -------------------------------------------------------
     RESET
     ------------------------------------------------------- */

  function resetView() {

    clearSelection();


    svg
      .transition()
      .duration(450)

      .call(
        zoom.transform,
        d3.zoomIdentity
      );


    nodes.forEach(
      function(d) {

        if (
          d.type !== "center"
        ) {

          d.fx = null;
          d.fy = null;

        }

      }
    );


    simulation
      .alpha(0.55)
      .restart();

  }



  container._resetNetwork =
    resetView;

}



/* =========================================================
   CREATE NETWORKS
   ========================================================= */

createNetwork(
  "country-network",
  countryData,
  countryLinks,
  "country"
);


createNetwork(
  "institution-network",
  institutionData,
  institutionLinks,
  "institution"
);



/* =========================================================
   RESET BUTTONS
   ========================================================= */

document
  .querySelectorAll(
    ".collab-reset"
  )

  .forEach(
    function(button) {

      button.addEventListener(
        "click",
        function() {

          const targetId =
            button.dataset.target;


          const target =
            document.getElementById(
              targetId
            );


          if (
            target &&
            target._resetNetwork
          ) {

            target._resetNetwork();

          }

        }
      );

    }
  );


});

</script>
