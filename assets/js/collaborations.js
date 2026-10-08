(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";


  /* =========================================================
     NETWORK DATA
     ========================================================= */

  var NETWORK_DATA = {

    /* ---------------------------------------------------------
       COUNTRIES / REGIONS
       --------------------------------------------------------- */

    countries: {

      nodes: [

        {
          id: "Lingxi Jin",
          type: "center",
          x: 0.48,
          y: 0.51
        },

        {
          id: "South Korea",
          type: "country",
          tone: "tone-korea",
          x: 0.16,
          y: 0.18
        },

        {
          id: "Singapore",
          type: "country",
          tone: "tone-singapore",
          x: 0.42,
          y: 0.13
        },

        {
          id: "United Kingdom",
          type: "country",
          tone: "tone-uk",
          x: 0.68,
          y: 0.17
        },

        {
          id: "United States",
          type: "country",
          tone: "tone-us",
          x: 0.88,
          y: 0.40
        },

        {
          id: "Japan",
          type: "country",
          tone: "tone-japan",
          x: 0.78,
          y: 0.77
        },

        {
          id: "Hong Kong SAR, China",
          type: "country",
          tone: "tone-hk",
          x: 0.44,
          y: 0.86
        },

        {
          id: "Italy",
          type: "country",
          tone: "tone-italy",
          x: 0.10,
          y: 0.62
        }

      ]

    },


    /* ---------------------------------------------------------
       INSTITUTIONS
       --------------------------------------------------------- */

    institutions: {

      nodes: [

        {
          id: "Lingxi Jin",
          type: "center",
          x: 0.48,
          y: 0.51
        },


        /* South Korea */

        {
          id: "Ewha Womans University",
          type: "institution",
          country: "South Korea",
          tone: "tone-korea",
          x: 0.08,
          y: 0.16
        },

        {
          id: "Sejong University",
          type: "institution",
          country: "South Korea",
          tone: "tone-korea",
          x: 0.26,
          y: 0.11
        },


        /* Singapore */

        {
          id: "Nanyang Technological University",
          type: "institution",
          country: "Singapore",
          tone: "tone-singapore",
          x: 0.46,
          y: 0.10
        },


        /* United Kingdom */

        {
          id: "University of Bristol",
          type: "institution",
          country: "United Kingdom",
          tone: "tone-uk",
          x: 0.65,
          y: 0.12
        },


        /* United States */

        {
          id: "Carnegie Mellon University",
          type: "institution",
          country: "United States",
          tone: "tone-us",
          x: 0.83,
          y: 0.20
        },

        {
          id: "University of Miami",
          type: "institution",
          country: "United States",
          tone: "tone-us",
          x: 0.92,
          y: 0.42
        },

        {
          id: "University of Utah",
          type: "institution",
          country: "United States",
          tone: "tone-us",
          x: 0.89,
          y: 0.67
        },

        {
          id: "Auburn University",
          type: "institution",
          country: "United States",
          tone: "tone-us",
          x: 0.72,
          y: 0.84
        },


        /* Japan */

        {
          id: "Kyushu University",
          type: "institution",
          country: "Japan",
          tone: "tone-japan",
          x: 0.52,
          y: 0.89
        },


        /* Hong Kong SAR, China */

        {
          id: "The Hong Kong Polytechnic University",
          type: "institution",
          country: "Hong Kong SAR, China",
          tone: "tone-hk",
          x: 0.29,
          y: 0.84
        },


        /* Italy */

        {
          id: "Politecnico di Milano",
          type: "institution",
          country: "Italy",
          tone: "tone-italy",
          x: 0.08,
          y: 0.62
        }

      ]

    }

  };


  /* =========================================================
     DOM
     ========================================================= */

  var container =
    document.getElementById(
      "collaboration-network"
    );


  var viewButtons =
    document.querySelectorAll(
      ".collab-view-btn"
    );


  var resetButton =
    document.getElementById(
      "collab-reset"
    );


  if (!container) {
    return;
  }


  var currentNetwork = null;


  /* =========================================================
     SVG HELPER
     ========================================================= */

  function svgElement(tag, attrs) {

    var element =
      document.createElementNS(
        SVG_NS,
        tag
      );


    Object.keys(
      attrs || {}
    ).forEach(
      function (key) {

        element.setAttribute(
          key,
          attrs[key]
        );

      }
    );


    return element;

  }


  /* =========================================================
     LABEL WRAPPING
     ========================================================= */

  function wrapLabel(text, maxLength) {

    var words =
      text.split(" ");


    var lines = [];

    var current = "";


    words.forEach(
      function (word) {

        var candidate =
          current
            ? current + " " + word
            : word;


        if (
          candidate.length > maxLength &&
          current
        ) {

          lines.push(current);

          current = word;

        } else {

          current = candidate;

        }

      }
    );


    if (current) {
      lines.push(current);
    }


    return lines;

  }


  /* =========================================================
     NODE RADIUS
     ========================================================= */

  function getNodeRadius(node) {

    if (
      node.type === "center"
    ) {

      return 50;

    }


    if (
      node.type === "country"
    ) {

      return 30;

    }


    return 23;

  }


  /* =========================================================
     BUILD NETWORK
     ========================================================= */

  function buildNetwork(viewName) {

    var data =
      NETWORK_DATA[viewName];


    if (!data) {
      return;
    }


    container.innerHTML = "";


    container.classList.remove(
      "has-selection"
    );


    /*
      Large internal canvas so the network can use
      the collaboration page as its main visual area.
    */

    var width = 1400;
    var height = 760;

    var centerX =
      width / 2;

    var centerY =
      height / 2;


    /* =====================================================
       SVG
       ===================================================== */

    var svg =
      svgElement(
        "svg",
        {

          viewBox:
            "0 0 " +
            width +
            " " +
            height,

          preserveAspectRatio:
            "xMidYMid meet",

          role:
            "img",

          "aria-label":
            viewName === "countries"
              ? "Global research collaboration network"
              : "Institutional research collaboration network"

        }
      );


    var background =
      svgElement(
        "rect",
        {

          x: 0,
          y: 0,

          width: width,
          height: height,

          class:
            "collab-background"

        }
      );


    var viewport =
      svgElement(
        "g",
        {
          class: "collab-viewport"
        }
      );


    var linkLayer =
      svgElement(
        "g",
        {
          class: "collab-links"
        }
      );


    var nodeLayer =
      svgElement(
        "g",
        {
          class: "collab-nodes"
        }
      );


    viewport.appendChild(
      linkLayer
    );


    viewport.appendChild(
      nodeLayer
    );


    svg.appendChild(
      background
    );


    svg.appendChild(
      viewport
    );


    container.appendChild(
      svg
    );


    /* =====================================================
       NODE DATA
       ===================================================== */

    var nodes =
      data.nodes.map(
        function (item) {

          var x =
            item.x * width;


          var y =
            item.y * height;


          return {

            id:
              item.id,

            type:
              item.type,

            country:
              item.country || "",

            tone:
              item.tone || "",

            x:
              x,

            y:
              y,

            initialX:
              x,

            initialY:
              y,

            element:
              null

          };

        }
      );


    var centerNode = null;

    var outerNodes = [];


    nodes.forEach(
      function (node) {

        if (
          node.type === "center"
        ) {

          centerNode = node;

        } else {

          outerNodes.push(node);

        }

      }
    );


    if (!centerNode) {
      return;
    }


    /* =====================================================
       LINKS
       ===================================================== */

    var links = [];


    outerNodes.forEach(
      function (node, index) {

        var path =
          svgElement(
            "path",
            {
              class:
                "collab-link"
            }
          );


        linkLayer.appendChild(
          path
        );


        links.push(
          {

            source:
              centerNode,

            target:
              node,

            index:
              index,

            element:
              path

          }
        );

      }
    );


    /* =====================================================
       NODES
       ===================================================== */

    nodes.forEach(
      function (node) {

        var classes =
          "collab-node";


        if (
          node.type === "center"
        ) {

          classes +=
            " collab-center-node";

        }


        if (node.tone) {

          classes +=
            " " +
            node.tone;

        }


        var group =
          svgElement(
            "g",
            {

              class:
                classes,

              tabindex:
                "0",

              role:
                "button",

              "aria-label":
                node.country
                  ? node.id +
                    ", " +
                    node.country
                  : node.id

            }
          );


        var radius =
          getNodeRadius(
            node
          );


        /* -------------------------------------------------
           HALO
           ------------------------------------------------- */

        var halo =
          svgElement(
            "circle",
            {

              class:
                "collab-halo",

              r:
                radius +
                (
                  node.type === "center"
                    ? 18
                    : 11
                )

            }
          );


        /* -------------------------------------------------
           MAIN CIRCLE
           ------------------------------------------------- */

        var circle =
          svgElement(
            "circle",
            {

              class:
                "collab-circle",

              r:
                radius

            }
          );


        group.appendChild(
          halo
        );


        group.appendChild(
          circle
        );


        /* -------------------------------------------------
           LABEL
           ------------------------------------------------- */

        var label =
          svgElement(
            "text",
            {

              class:
                "collab-label",

              y:
                radius + 34

            }
          );


        var maxLength =
          node.type === "institution"
            ? 22
            : 25;


        var lines =
          wrapLabel(
            node.id,
            maxLength
          );


        lines.forEach(
          function (
            lineText,
            index
          ) {

            var tspan =
              svgElement(
                "tspan",
                {

                  x: 0,

                  dy:
                    index === 0
                      ? 0
                      : 22

                }
              );


            tspan.textContent =
              lineText;


            label.appendChild(
              tspan
            );

          }
        );


        group.appendChild(
          label
        );


        node.element =
          group;


        nodeLayer.appendChild(
          group
        );


        /* =================================================
           CLICK
           ================================================= */

        group.addEventListener(
          "click",
          function (event) {

            event.stopPropagation();


            if (
              node.type === "center"
            ) {

              clearSelection();

            } else {

              selectNode(
                node
              );

            }

          }
        );


        /* =================================================
           KEYBOARD
           ================================================= */

        group.addEventListener(
          "keydown",
          function (event) {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {

              event.preventDefault();


              if (
                node.type === "center"
              ) {

                clearSelection();

              } else {

                selectNode(
                  node
                );

              }

            }

          }
        );


        /* =================================================
           DRAG NODE
           ================================================= */

        if (
          node.type !== "center"
        ) {

          var dragging = false;


          group.addEventListener(
            "pointerdown",
            function (event) {

              dragging = true;


              group.setPointerCapture(
                event.pointerId
              );


              event.stopPropagation();

            }
          );


          group.addEventListener(
            "pointermove",
            function (event) {

              if (!dragging) {
                return;
              }


              var point =
                screenToNetworkPoint(
                  event.clientX,
                  event.clientY
                );


              node.x =
                point.x;


              node.y =
                point.y;


              draw();

            }
          );


          group.addEventListener(
            "pointerup",
            function (event) {

              dragging = false;


              if (
                group.hasPointerCapture &&
                group.hasPointerCapture(
                  event.pointerId
                )
              ) {

                group.releasePointerCapture(
                  event.pointerId
                );

              }

            }
          );


          group.addEventListener(
            "pointercancel",
            function () {

              dragging = false;

            }
          );

        }

      }
    );


    /* =====================================================
       VIEWPORT
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


    function screenToNetworkPoint(
      clientX,
      clientY
    ) {

      var point =
        svg.createSVGPoint();


      point.x =
        clientX;


      point.y =
        clientY;


      var matrix =
        viewport.getScreenCTM();


      if (!matrix) {

        return {

          x:
            centerX,

          y:
            centerY

        };

      }


      return point.matrixTransform(
        matrix.inverse()
      );

    }


    /* =====================================================
       LINK PATH
       Lines begin OUTSIDE the source circle and stop
       OUTSIDE the target circle.

       Cubic Bézier control points maintain an outward
       tangent so curved links do not bend back through
       the node.
       ===================================================== */

    function linkPath(link) {

      var source =
        link.source;


      var target =
        link.target;


      var x1 =
        source.x;


      var y1 =
        source.y;


      var x2 =
        target.x;


      var y2 =
        target.y;


      /* -----------------------------------------
         VECTOR
         ----------------------------------------- */

      var dx =
        x2 - x1;


      var dy =
        y2 - y1;


      var distance =
        Math.sqrt(
          dx * dx +
          dy * dy
        ) || 1;


      var unitX =
        dx / distance;


      var unitY =
        dy / distance;


      /* -----------------------------------------
         NODE RADII

         Extra gap keeps the line visually
         separated from the circle stroke.
         ----------------------------------------- */

      var edgeGap = 3;


      var sourceRadius =
        getNodeRadius(
          source
        ) +
        edgeGap;


      var targetRadius =
        getNodeRadius(
          target
        ) +
        edgeGap;


      /*
        If nodes are dragged very close together,
        prevent invalid / reversed paths.
      */

      if (
        distance <=
        sourceRadius +
        targetRadius +
        8
      ) {

        return "";

      }


      /* -----------------------------------------
         START / END POINTS
         ----------------------------------------- */

      var startX =
        x1 +
        unitX *
        sourceRadius;


      var startY =
        y1 +
        unitY *
        sourceRadius;


      var endX =
        x2 -
        unitX *
        targetRadius;


      var endY =
        y2 -
        unitY *
        targetRadius;


      /* -----------------------------------------
         CURVE
         ----------------------------------------- */

      var pathDx =
        endX - startX;


      var pathDy =
        endY - startY;


      var pathLength =
        Math.sqrt(
          pathDx * pathDx +
          pathDy * pathDy
        ) || 1;


      var pathUnitX =
        pathDx /
        pathLength;


      var pathUnitY =
        pathDy /
        pathLength;


      /*
        Perpendicular vector.
      */

      var perpX =
        -pathUnitY;


      var perpY =
        pathUnitX;


      /*
        Alternate bend direction so the network
        feels more organic.
      */

      var direction =
        link.index % 2 === 0
          ? 1
          : -1;


      var bend =
        Math.min(
          42,
          pathLength *
          0.055
        ) *
        direction;


      /*
        Control-point distance along the link.
        Because both control points extend forward
        from the circle edges, the curve cannot
        immediately turn back into either circle.
      */

      var controlDistance =
        pathLength *
        0.34;


      var control1X =
        startX +
        pathUnitX *
        controlDistance +
        perpX *
        bend;


      var control1Y =
        startY +
        pathUnitY *
        controlDistance +
        perpY *
        bend;


      var control2X =
        endX -
        pathUnitX *
        controlDistance +
        perpX *
        bend;


      var control2Y =
        endY -
        pathUnitY *
        controlDistance +
        perpY *
        bend;


      return (
        "M " +
        startX +
        " " +
        startY +

        " C " +

        control1X +
        " " +
        control1Y +
        ", " +

        control2X +
        " " +
        control2Y +
        ", " +

        endX +
        " " +
        endY
      );

    }


    /* =====================================================
       DRAW
       ===================================================== */

    function draw() {

      links.forEach(
        function (link) {

          link.element.setAttribute(
            "d",
            linkPath(
              link
            )
          );

        }
      );


      nodes.forEach(
        function (node) {

          node.element.setAttribute(

            "transform",

            "translate(" +
            node.x +
            " " +
            node.y +
            ")"

          );

        }
      );

    }


    /* =====================================================
       SELECTION
       ===================================================== */

    function selectNode(
      selected
    ) {

      container.classList.add(
        "has-selection"
      );


      nodes.forEach(
        function (node) {

          var active =
            node === selected ||
            node.type === "center";


          node.element.classList.toggle(
            "active",
            active
          );

        }
      );


      links.forEach(
        function (link) {

          link.element.classList.toggle(
            "active",
            link.target === selected
          );

        }
      );

    }


    function clearSelection() {

      container.classList.remove(
        "has-selection"
      );


      nodes.forEach(
        function (node) {

          node.element.classList.remove(
            "active"
          );

        }
      );


      links.forEach(
        function (link) {

          link.element.classList.remove(
            "active"
          );

        }
      );

    }


    svg.addEventListener(
      "click",
      function () {

        clearSelection();

      }
    );


    /* =====================================================
       ZOOM
       ===================================================== */

    svg.addEventListener(

      "wheel",

      function (event) {

        event.preventDefault();


        if (
          event.deltaY < 0
        ) {

          zoom *=
            1.08;

        } else {

          zoom *=
            0.92;

        }


        zoom =
          Math.max(
            0.65,
            Math.min(
              2.3,
              zoom
            )
          );


        updateViewport();

      },

      {
        passive: false
      }

    );


    /* =====================================================
       PAN
       ===================================================== */

    var panning = false;

    var startX = 0;
    var startY = 0;

    var startPanX = 0;
    var startPanY = 0;


    background.addEventListener(
      "pointerdown",
      function (event) {

        panning = true;


        startX =
          event.clientX;


        startY =
          event.clientY;


        startPanX =
          panX;


        startPanY =
          panY;


        background.setPointerCapture(
          event.pointerId
        );

      }
    );


    background.addEventListener(
      "pointermove",
      function (event) {

        if (!panning) {
          return;
        }


        var rect =
          svg.getBoundingClientRect();


        panX =
          startPanX +
          (
            event.clientX -
            startX
          ) *
          (
            width /
            rect.width
          );


        panY =
          startPanY +
          (
            event.clientY -
            startY
          ) *
          (
            height /
            rect.height
          );


        updateViewport();

      }
    );


    background.addEventListener(
      "pointerup",
      function (event) {

        panning = false;


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

      }
    );


    background.addEventListener(
      "pointercancel",
      function () {

        panning = false;

      }
    );


    /* =====================================================
       RESET
       ===================================================== */

    function reset() {

      zoom = 1;

      panX = 0;
      panY = 0;


      nodes.forEach(
        function (node) {

          node.x =
            node.initialX;


          node.y =
            node.initialY;

        }
      );


      updateViewport();

      clearSelection();

      draw();

    }


    currentNetwork = {
      reset: reset
    };


    /* =====================================================
       INITIAL DRAW
       ===================================================== */

    draw();

    updateViewport();

  }


  /* =========================================================
     SWITCH VIEW
     ========================================================= */

  function switchView(
    viewName
  ) {

    if (
      !NETWORK_DATA[
        viewName
      ]
    ) {

      return;

    }


    viewButtons.forEach(
      function (button) {

        var active =
          button.getAttribute(
            "data-view"
          ) ===
          viewName;


        button.classList.toggle(
          "active",
          active
        );


        button.setAttribute(
          "aria-pressed",
          active
            ? "true"
            : "false"
        );

      }
    );


    buildNetwork(
      viewName
    );

  }


  viewButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          switchView(
            button.getAttribute(
              "data-view"
            )
          );

        }
      );

    }
  );


  /* =========================================================
     RESET BUTTON
     ========================================================= */

  if (resetButton) {

    resetButton.addEventListener(
      "click",
      function () {

        if (
          currentNetwork &&
          typeof currentNetwork.reset ===
            "function"
        ) {

          currentNetwork.reset();

        }

      }
    );

  }


  /* =========================================================
     INITIAL VIEW
     ========================================================= */

  switchView(
    "countries"
  );

})();
