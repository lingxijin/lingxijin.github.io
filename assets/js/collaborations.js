(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";


  /* =========================================================
     DATA + CURATED POSITIONS
     ========================================================= */

  var networks = {

    "country-network": {

      nodes: [

        {
          id: "Lingxi Jin",
          type: "center",
          x: 0.50,
          y: 0.51
        },

        {
          id: "South Korea",
          type: "country",
          x: 0.28,
          y: 0.25
        },

        {
          id: "United States",
          type: "country",
          x: 0.75,
          y: 0.28
        },

        {
          id: "Japan",
          type: "country",
          x: 0.79,
          y: 0.69
        },

        {
          id: "Hong Kong SAR, China",
          type: "country",
          x: 0.29,
          y: 0.73
        },

        {
          id: "Italy",
          type: "country",
          x: 0.16,
          y: 0.49
        }

      ]

    },


    "institution-network": {

      nodes: [

        {
          id: "Lingxi Jin",
          type: "center",
          x: 0.50,
          y: 0.50
        },


        /* South Korea */

        {
          id: "Ewha Womans University",
          type: "institution",
          country: "South Korea",
          x: 0.22,
          y: 0.19
        },

        {
          id: "Chung-Ang University",
          type: "institution",
          country: "South Korea",
          x: 0.41,
          y: 0.20
        },

        {
          id: "Sejong University",
          type: "institution",
          country: "South Korea",
          x: 0.67,
          y: 0.18
        },


        /* United States */

        {
          id: "Carnegie Mellon University",
          type: "institution",
          country: "United States",
          x: 0.82,
          y: 0.34
        },

        {
          id: "University of Miami",
          type: "institution",
          country: "United States",
          x: 0.82,
          y: 0.61
        },

        {
          id: "University of Utah",
          type: "institution",
          country: "United States",
          x: 0.68,
          y: 0.78
        },

        {
          id: "Auburn University",
          type: "institution",
          country: "United States",
          x: 0.48,
          y: 0.81
        },


        /* Japan */

        {
          id: "Kyushu University",
          type: "institution",
          country: "Japan",
          x: 0.25,
          y: 0.75
        },


        /* Hong Kong SAR, China */

        {
          id: "The Hong Kong Polytechnic University",
          type: "institution",
          country: "Hong Kong SAR, China",
          x: 0.13,
          y: 0.53
        },


        /* Italy */

        {
          id: "Politecnico di Milano",
          type: "institution",
          country: "Italy",
          x: 0.12,
          y: 0.31
        }

      ]

    }

  };


  /* =========================================================
     SVG HELPER
     ========================================================= */

  function createSvgElement(tag, attrs) {

    var element =
      document.createElementNS(
        SVG_NS,
        tag
      );


    if (attrs) {

      Object.keys(attrs).forEach(
        function (key) {

          element.setAttribute(
            key,
            attrs[key]
          );

        }
      );

    }


    return element;

  }


  /* =========================================================
     WRAP LABEL
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
     BUILD NETWORK
     ========================================================= */

  function buildNetwork(
    containerId,
    config
  ) {

    var container =
      document.getElementById(
        containerId
      );


    if (!container) {

      return;

    }


    container.innerHTML = "";


    var width = 1000;
    var height = 520;


    var centerX =
      width / 2;

    var centerY =
      height / 2;


    /* ---------------------------------------------------------
       SVG
       --------------------------------------------------------- */

    var svg =
      createSvgElement(
        "svg",
        {
          viewBox:
            "0 0 " +
            width +
            " " +
            height,

          preserveAspectRatio:
            "xMidYMid meet"
        }
      );


    var background =
      createSvgElement(
        "rect",
        {
          x: 0,
          y: 0,
          width: width,
          height: height,
          class: "collab-background"
        }
      );


    var viewport =
      createSvgElement(
        "g",
        {
          class:
            "collab-viewport"
        }
      );


    var linkLayer =
      createSvgElement(
        "g",
        {
          class:
            "collab-links"
        }
      );


    var nodeLayer =
      createSvgElement(
        "g",
        {
          class:
            "collab-nodes"
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


    /* ---------------------------------------------------------
       TOOLTIP
       --------------------------------------------------------- */

    var tooltip =
      document.createElement(
        "div"
      );


    tooltip.className =
      "collab-tooltip";


    container.appendChild(
      tooltip
    );


    /* ---------------------------------------------------------
       DATA
       --------------------------------------------------------- */

    var nodes =
      config.nodes.map(
        function (item) {

          var nodeX =
            item.x * width;

          var nodeY =
            item.y * height;


          return {

            id:
              item.id,

            type:
              item.type,

            country:
              item.country || "",

            x:
              nodeX,

            y:
              nodeY,

            initialX:
              nodeX,

            initialY:
              nodeY,

            element:
              null

          };

        }
      );


    var centerNode =
      null;


    var outerNodes =
      [];


    nodes.forEach(
      function (node) {

        if (
          node.type === "center"
        ) {

          centerNode =
            node;

        } else {

          outerNodes.push(
            node
          );

        }

      }
    );


    if (!centerNode) {

      return;

    }


    /* ---------------------------------------------------------
       LINKS
       --------------------------------------------------------- */

    var links =
      [];


    outerNodes.forEach(
      function (node) {

        var line =
          createSvgElement(
            "line",
            {
              class:
                "collab-link"
            }
          );


        linkLayer.appendChild(
          line
        );


        links.push(
          {

            source:
              centerNode,

            target:
              node,

            element:
              line

          }
        );

      }
    );


    /* =========================================================
       NODES
       ========================================================= */

    nodes.forEach(
      function (node) {

        var group =
          createSvgElement(
            "g",
            {

              class:
                node.type === "center"
                  ? "collab-node collab-center-node"
                  : "collab-node",

              tabindex:
                "0"

            }
          );


        /* -----------------------------------------------------
           NODE SIZE
           ----------------------------------------------------- */

        var radius;


        if (
          node.type === "center"
        ) {

          radius = 39;

        } else if (
          node.type === "country"
        ) {

          radius = 22;

        } else {

          radius = 18;

        }


        /* -----------------------------------------------------
           HALO
           ----------------------------------------------------- */

        var halo =
          createSvgElement(
            "circle",
            {

              r:
                radius +
                (
                  node.type === "center"
                    ? 12
                    : 8
                ),

              class:
                "collab-halo"

            }
          );


        group.appendChild(
          halo
        );


        /* -----------------------------------------------------
           MAIN CIRCLE
           ----------------------------------------------------- */

        var circle =
          createSvgElement(
            "circle",
            {

              r:
                radius,

              class:
                "collab-circle"

            }
          );


        group.appendChild(
          circle
        );


        /* -----------------------------------------------------
           LABEL
           ----------------------------------------------------- */

        var label =
          createSvgElement(
            "text",
            {

              class:
                "collab-label",

              y:
                radius +
                26

            }
          );


        var maxLength;


        if (
          node.type === "institution"
        ) {

          maxLength =
            25;

        } else {

          maxLength =
            22;

        }


        var labelLines =
          wrapLabel(
            node.id,
            maxLength
          );


        labelLines.forEach(
          function (
            lineText,
            index
          ) {

            var tspan =
              createSvgElement(
                "tspan",
                {

                  x: 0,

                  dy:
                    index === 0
                      ? 0
                      : 14

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


        /* =====================================================
           TOOLTIP
           ===================================================== */

        group.addEventListener(
          "mouseenter",

          function (event) {

            var html =
              "<strong>" +
              node.id +
              "</strong>";


            if (
              node.type === "center"
            ) {

              html +=
                "<span>Research collaboration network</span>";

            } else if (
              node.country
            ) {

              html +=
                "<span>" +
                node.country +
                "</span>";

            } else {

              html +=
                "<span>Research collaboration</span>";

            }


            tooltip.innerHTML =
              html;


            tooltip.classList.add(
              "is-visible"
            );


            positionTooltip(
              event
            );

          }
        );


        group.addEventListener(
          "mousemove",

          function (event) {

            positionTooltip(
              event
            );

          }
        );


        group.addEventListener(
          "mouseleave",

          function () {

            hideTooltip();

          }
        );


        /* =====================================================
           SELECT
           ===================================================== */

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


        /* =====================================================
           DRAG
           ===================================================== */

        if (
          node.type !== "center"
        ) {

          var dragging =
            false;


          group.addEventListener(
            "pointerdown",

            function (event) {

              dragging =
                true;


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
                screenToSvgPoint(
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

              dragging =
                false;


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

        }

      }
    );


    /* =========================================================
       ZOOM + PAN
       ========================================================= */

    var zoom =
      1;


    var panX =
      0;


    var panY =
      0;


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


    function screenToSvgPoint(
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


    /* ---------------------------------------------------------
       ZOOM
       --------------------------------------------------------- */

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


        if (
          zoom < 0.7
        ) {

          zoom =
            0.7;

        }


        if (
          zoom > 2.2
        ) {

          zoom =
            2.2;

        }


        updateViewport();

      },

      {
        passive:
          false
      }

    );


    /* ---------------------------------------------------------
       PAN
       --------------------------------------------------------- */

    var panning =
      false;


    var startX =
      0;


    var startY =
      0;


    var startPanX =
      0;


    var startPanY =
      0;


    background.addEventListener(

      "pointerdown",

      function (event) {

        panning =
          true;


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

        panning =
          false;


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


    /* =========================================================
       TOOLTIP
       ========================================================= */

    function positionTooltip(
      event
    ) {

      var bounds =
        container.getBoundingClientRect();


      tooltip.style.left =
        (
          event.clientX -
          bounds.left +
          14
        ) +
        "px";


      tooltip.style.top =
        (
          event.clientY -
          bounds.top +
          14
        ) +
        "px";

    }


    function hideTooltip() {

      tooltip.classList.remove(
        "is-visible"
      );

    }


    /* =========================================================
       SELECTION
       ========================================================= */

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


      hideTooltip();

    }


    svg.addEventListener(

      "click",

      function () {

        clearSelection();

      }

    );


    /* =========================================================
       DRAW
       ========================================================= */

    function draw() {

      links.forEach(
        function (link) {

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


    /* =========================================================
       RESET
       ========================================================= */

    container.resetNetwork =
      function () {

        zoom =
          1;


        panX =
          0;


        panY =
          0;


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

      };


    updateViewport();

    draw();

  }


  /* =========================================================
     INITIALISE
     ========================================================= */

  function initialise() {

    Object.keys(
      networks
    ).forEach(
      function (networkId) {

        buildNetwork(
          networkId,
          networks[networkId]
        );

      }
    );


    document
      .querySelectorAll(
        ".collab-reset"
      )
      .forEach(
        function (button) {

          button.addEventListener(

            "click",

            function () {

              var id =
                button.getAttribute(
                  "data-network"
                );


              var network =
                document.getElementById(
                  id
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
