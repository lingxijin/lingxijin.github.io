(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";


  /* =========================================================
     DATA
     ========================================================= */

  var networks = {

    "country-network": {
      radius: 175,

      nodes: [
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
          id: "Hong Kong SAR, China",
          type: "country"
        },
        {
          id: "Italy",
          type: "country"
        }
      ]
    },


    "institution-network": {
      radius: 190,

      nodes: [
        {
          id: "Lingxi Jin",
          type: "center"
        },

        {
          id: "Ewha Womans University",
          type: "institution",
          country: "South Korea"
        },

        {
          id: "Chung-Ang University",
          type: "institution",
          country: "South Korea"
        },

        {
          id: "Sejong University",
          type: "institution",
          country: "South Korea"
        },

        {
          id: "Carnegie Mellon University",
          type: "institution",
          country: "United States"
        },

        {
          id: "University of Miami",
          type: "institution",
          country: "United States"
        },

        {
          id: "University of Utah",
          type: "institution",
          country: "United States"
        },

        {
          id: "Auburn University",
          type: "institution",
          country: "United States"
        },

        {
          id: "Kyushu University",
          type: "institution",
          country: "Japan"
        },

        {
          id: "The Hong Kong Polytechnic University",
          type: "institution",
          country: "Hong Kong SAR, China"
        },

        {
          id: "Politecnico di Milano",
          type: "institution",
          country: "Italy"
        }
      ]
    }

  };


  /* =========================================================
     SVG HELPER
     ========================================================= */

  function createSvgElement(tag, attrs) {
    var element = document.createElementNS(SVG_NS, tag);

    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        element.setAttribute(key, attrs[key]);
      });
    }

    return element;
  }


  /* =========================================================
     LABEL WRAPPING
     ========================================================= */

  function wrapLabel(text, maxLength) {
    var words = text.split(" ");
    var lines = [];
    var current = "";

    words.forEach(function (word) {
      var candidate = current ? current + " " + word : word;

      if (candidate.length > maxLength && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    });

    if (current) {
      lines.push(current);
    }

    return lines;
  }


  /* =========================================================
     BUILD NETWORK
     ========================================================= */

  function buildNetwork(containerId, config) {

    var container = document.getElementById(containerId);

    if (!container) {
      return;
    }


    /* Remove anything previously rendered */

    container.innerHTML = "";


    var width = 900;
    var height = 520;

    var centerX = width / 2;
    var centerY = height / 2;


    /* =====================================================
       SVG
       ===================================================== */

    var svg = createSvgElement("svg", {
      viewBox: "0 0 " + width + " " + height,
      preserveAspectRatio: "xMidYMid meet"
    });


    var background = createSvgElement("rect", {
      x: "0",
      y: "0",
      width: width,
      height: height,
      class: "collab-background"
    });


    var viewport = createSvgElement("g", {
      class: "collab-viewport"
    });


    var linkLayer = createSvgElement("g", {
      class: "collab-links"
    });


    var nodeLayer = createSvgElement("g", {
      class: "collab-nodes"
    });


    viewport.appendChild(linkLayer);
    viewport.appendChild(nodeLayer);

    svg.appendChild(background);
    svg.appendChild(viewport);

    container.appendChild(svg);


    /* =====================================================
       TOOLTIP
       ===================================================== */

    var tooltip = document.createElement("div");

    tooltip.className = "collab-tooltip";

    container.appendChild(tooltip);


    /* =====================================================
       COPY DATA
       ===================================================== */

    var nodes = config.nodes.map(function (item) {
      return {
        id: item.id,
        type: item.type,
        country: item.country || "",
        x: centerX,
        y: centerY,
        initialX: centerX,
        initialY: centerY,
        element: null
      };
    });


    var centerNode = null;
    var outerNodes = [];


    nodes.forEach(function (node) {

      if (node.type === "center") {
        centerNode = node;
      } else {
        outerNodes.push(node);
      }

    });


    if (!centerNode) {
      return;
    }


    /* =====================================================
       INITIAL RADIAL POSITIONS
       ===================================================== */

    outerNodes.forEach(function (node, index) {

      var angle =
        -Math.PI / 2 +
        (index / outerNodes.length) *
        Math.PI *
        2;


      node.x =
        centerX +
        Math.cos(angle) *
        config.radius;


      node.y =
        centerY +
        Math.sin(angle) *
        config.radius;


      node.initialX = node.x;
      node.initialY = node.y;

    });


    centerNode.x = centerX;
    centerNode.y = centerY;

    centerNode.initialX = centerX;
    centerNode.initialY = centerY;


    /* =====================================================
       LINKS
       ===================================================== */

    var links = [];


    outerNodes.forEach(function (node) {

      var line = createSvgElement("line", {
        class: "collab-link"
      });


      linkLayer.appendChild(line);


      links.push({
        source: centerNode,
        target: node,
        element: line
      });

    });


    /* =====================================================
       NODE ELEMENTS
       ===================================================== */

    nodes.forEach(function (node) {

      var groupClass =
        node.type === "center"
          ? "collab-node collab-center-node"
          : "collab-node";


      var group = createSvgElement("g", {
        class: groupClass,
        tabindex: "0"
      });


      var radius =
        node.type === "center"
          ? 30
          : 14;


      var circle = createSvgElement("circle", {
        r: radius
      });


      group.appendChild(circle);


      /* -------------------------------------------------
         LABEL
         ------------------------------------------------- */

      var label = createSvgElement("text", {
        class: "collab-label",
        y: radius + 21
      });


      var maxChars =
        node.type === "institution"
          ? 23
          : 20;


      var lines =
        wrapLabel(
          node.id,
          maxChars
        );


      lines.forEach(function (lineText, index) {

        var tspan = createSvgElement("tspan", {
          x: "0",
          dy: index === 0 ? "0" : "14"
        });


        tspan.textContent = lineText;

        label.appendChild(tspan);

      });


      group.appendChild(label);

      node.element = group;

      nodeLayer.appendChild(group);


      /* =================================================
         TOOLTIP
         ================================================= */

      group.addEventListener("mouseenter", function (event) {

        var html =
          "<strong>" +
          node.id +
          "</strong>";


        if (node.type === "center") {

          html +=
            "<span>Research collaboration network</span>";

        } else if (node.country) {

          html +=
            "<span>" +
            node.country +
            "</span>";

        } else {

          html +=
            "<span>Research collaboration</span>";

        }


        tooltip.innerHTML = html;

        tooltip.classList.add("is-visible");

        positionTooltip(event);

      });


      group.addEventListener("mousemove", function (event) {

        positionTooltip(event);

      });


      group.addEventListener("mouseleave", function () {

        hideTooltip();

      });


      /* =================================================
         CLICK
         ================================================= */

      group.addEventListener("click", function (event) {

        event.stopPropagation();


        if (node.type === "center") {

          clearSelection();

        } else {

          selectNode(node);

        }

      });


      /* =================================================
         DRAG
         ================================================= */

      if (node.type !== "center") {

        var dragging = false;


        group.addEventListener("pointerdown", function (event) {

          dragging = true;

          group.setPointerCapture(event.pointerId);

          event.stopPropagation();

        });


        group.addEventListener("pointermove", function (event) {

          if (!dragging) {
            return;
          }


          var point =
            screenToSvgPoint(
              event.clientX,
              event.clientY
            );


          node.x = point.x;
          node.y = point.y;

          draw();

        });


        group.addEventListener("pointerup", function (event) {

          dragging = false;


          if (
            group.hasPointerCapture &&
            group.hasPointerCapture(event.pointerId)
          ) {

            group.releasePointerCapture(
              event.pointerId
            );

          }

        });

      }

    });


    /* =====================================================
       ZOOM / PAN
       ===================================================== */

    var zoom = 1;

    var panX = 0;
    var panY = 0;


    function updateViewport() {

      var tx =
        centerX *
        (1 - zoom) +
        panX;


      var ty =
        centerY *
        (1 - zoom) +
        panY;


      viewport.setAttribute(
        "transform",
        "translate(" +
          tx +
          " " +
          ty +
          ") scale(" +
          zoom +
          ")"
      );

    }


    function screenToSvgPoint(clientX, clientY) {

      var point =
        svg.createSVGPoint();


      point.x = clientX;
      point.y = clientY;


      var matrix =
        viewport.getScreenCTM();


      if (!matrix) {

        return {
          x: centerX,
          y: centerY
        };

      }


      return point.matrixTransform(
        matrix.inverse()
      );

    }


    /* Mouse wheel zoom */

    svg.addEventListener(
      "wheel",

      function (event) {

        event.preventDefault();


        if (event.deltaY < 0) {

          zoom *= 1.1;

        } else {

          zoom *= 0.9;

        }


        if (zoom < 0.65) {
          zoom = 0.65;
        }


        if (zoom > 2.5) {
          zoom = 2.5;
        }


        updateViewport();

      },

      {
        passive: false
      }
    );


    /* -------------------------------------------------
       PAN
       ------------------------------------------------- */

    var isPanning = false;

    var startClientX = 0;
    var startClientY = 0;

    var originalPanX = 0;
    var originalPanY = 0;


    background.addEventListener("pointerdown", function (event) {

      isPanning = true;

      startClientX = event.clientX;
      startClientY = event.clientY;

      originalPanX = panX;
      originalPanY = panY;

      background.setPointerCapture(
        event.pointerId
      );

    });


    background.addEventListener("pointermove", function (event) {

      if (!isPanning) {
        return;
      }


      var bounds =
        svg.getBoundingClientRect();


      var scaleX =
        width /
        bounds.width;


      var scaleY =
        height /
        bounds.height;


      panX =
        originalPanX +
        (
          event.clientX -
          startClientX
        ) *
        scaleX;


      panY =
        originalPanY +
        (
          event.clientY -
          startClientY
        ) *
        scaleY;


      updateViewport();

    });


    background.addEventListener("pointerup", function (event) {

      isPanning = false;


      if (
        background.hasPointerCapture &&
        background.hasPointerCapture(
          event.pointerId
        )
      ) {

        background.releasePointerCapture(
          event.pointerId
        );

      }

    });


    /* =====================================================
       TOOLTIP HELPERS
       ===================================================== */

    function positionTooltip(event) {

      var bounds =
        container.getBoundingClientRect();


      var left =
        event.clientX -
        bounds.left +
        14;


      var top =
        event.clientY -
        bounds.top +
        14;


      tooltip.style.left =
        left + "px";


      tooltip.style.top =
        top + "px";

    }


    function hideTooltip() {

      tooltip.classList.remove(
        "is-visible"
      );

    }


    /* =====================================================
       SELECTION
       ===================================================== */

    function selectNode(selectedNode) {

      container.classList.add(
        "has-selection"
      );


      nodes.forEach(function (node) {

        var active =
          node === selectedNode ||
          node.type === "center";


        if (active) {

          node.element.classList.add(
            "active"
          );

        } else {

          node.element.classList.remove(
            "active"
          );

        }

      });


      links.forEach(function (link) {

        if (
          link.target ===
          selectedNode
        ) {

          link.element.classList.add(
            "active"
          );

        } else {

          link.element.classList.remove(
            "active"
          );

        }

      });

    }


    function clearSelection() {

      container.classList.remove(
        "has-selection"
      );


      nodes.forEach(function (node) {

        node.element.classList.remove(
          "active"
        );

      });


      links.forEach(function (link) {

        link.element.classList.remove(
          "active"
        );

      });


      hideTooltip();

    }


    svg.addEventListener("click", function () {

      clearSelection();

    });


    /* =====================================================
       DRAW
       ===================================================== */

    function draw() {

      links.forEach(function (link) {

        link.element.setAttribute(
          "x1",
          link.source.x
        );


        link.element.setAttribute(
          "y1",
          link.source.y
        );


        link.element.setAttribute(
          "x2",
          link.target.x
        );


        link.element.setAttribute(
          "y2",
          link.target.y
        );

      });


      nodes.forEach(function (node) {

        node.element.setAttribute(
          "transform",
          "translate(" +
            node.x +
            " " +
            node.y +
            ")"
        );

      });

    }


    /* =====================================================
       RESET
       ===================================================== */

    container.resetNetwork =
      function () {

        zoom = 1;

        panX = 0;
        panY = 0;


        nodes.forEach(function (node) {

          node.x =
            node.initialX;

          node.y =
            node.initialY;

        });


        updateViewport();

        clearSelection();

        draw();

      };


    /* =====================================================
       INITIAL RENDER
       ===================================================== */

    updateViewport();

    draw();

  }


  /* =========================================================
     INITIALISE PAGE
     ========================================================= */

  function initialise() {

    Object.keys(networks).forEach(
      function (networkId) {

        buildNetwork(
          networkId,
          networks[networkId]
        );

      }
    );


    var resetButtons =
      document.querySelectorAll(
        ".collab-reset"
      );


    resetButtons.forEach(
      function (button) {

        button.addEventListener(
          "click",

          function () {

            var networkId =
              button.getAttribute(
                "data-network"
              );


            var network =
              document.getElementById(
                networkId
              );


            if (
              network &&
              typeof network.resetNetwork ===
                "function"
            ) {

              network.resetNetwork();

            }

          }

        );

      }
    );

  }


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialise
    );

  } else {

    initialise();

  }

})();
