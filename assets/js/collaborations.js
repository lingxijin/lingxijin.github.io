(function () {
  "use strict";

  var SVG_NS =
    "http://www.w3.org/2000/svg";


  /* =========================================================
     COLLABORATION DATA

     workCount controls:
     1. line thickness
     2. information shown after clicking a node

     The network does NOT show these numbers initially.
     ========================================================= */

  var INSTITUTIONS = {

    "Ewha Womans University": {
      country: "South Korea",
      tone: "tone-korea",
      workCount: 7
    },

    "Sejong University": {
      country: "South Korea",
      tone: "tone-korea",
      workCount: 1
    },

    "Nanyang Technological University": {
      country: "Singapore",
      tone: "tone-singapore",
      workCount: 2
    },

    "University of Bristol": {
      country: "United Kingdom",
      tone: "tone-uk",
      workCount: 1
    },

    "Carnegie Mellon University": {
      country: "United States",
      tone: "tone-us",
      workCount: 1
    },

    "University of Miami": {
      country: "United States",
      tone: "tone-us",
      workCount: 1
    },

    "University of Utah": {
      country: "United States",
      tone: "tone-us",
      workCount: 1
    },

    "Auburn University": {
      country: "United States",
      tone: "tone-us",
      workCount: 1
    },

    "Kyushu University": {
      country: "Japan",
      tone: "tone-japan",
      workCount: 1
    },

    "The Hong Kong Polytechnic University": {
      country: "Hong Kong SAR, China",
      tone: "tone-hk",
      workCount: 1
    },

    "Politecnico di Milano": {
      country: "Italy",
      tone: "tone-italy",
      workCount: 1
    }

  };


  var COUNTRIES = {

    "South Korea": {
      tone: "tone-korea",
      workCount: 8,
      institutions: [
        "Ewha Womans University",
        "Sejong University"
      ]
    },

    "Singapore": {
      tone: "tone-singapore",
      workCount: 2,
      institutions: [
        "Nanyang Technological University"
      ]
    },

    "United Kingdom": {
      tone: "tone-uk",
      workCount: 1,
      institutions: [
        "University of Bristol"
      ]
    },

    "United States": {
      tone: "tone-us",
      workCount: 4,
      institutions: [
        "Carnegie Mellon University",
        "University of Miami",
        "University of Utah",
        "Auburn University"
      ]
    },

    "Japan": {
      tone: "tone-japan",
      workCount: 1,
      institutions: [
        "Kyushu University"
      ]
    },

    "Hong Kong SAR, China": {
      tone: "tone-hk",
      workCount: 1,
      institutions: [
        "The Hong Kong Polytechnic University"
      ]
    },

    "Italy": {
      tone: "tone-italy",
      workCount: 1,
      institutions: [
        "Politecnico di Milano"
      ]
    }

  };


  /* =========================================================
     NETWORK POSITIONS
     ========================================================= */

  var NETWORK_DATA = {

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
          x: 0.15,
          y: 0.19
        },

        {
          id: "Singapore",
          type: "country",
          tone: "tone-singapore",
          x: 0.43,
          y: 0.13
        },

        {
          id: "United Kingdom",
          type: "country",
          tone: "tone-uk",
          x: 0.69,
          y: 0.18
        },

        {
          id: "United States",
          type: "country",
          tone: "tone-us",
          x: 0.88,
          y: 0.42
        },

        {
          id: "Japan",
          type: "country",
          tone: "tone-japan",
          x: 0.79,
          y: 0.78
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
          x: 0.11,
          y: 0.63
        }

      ]

    },


    institutions: {

      nodes: [

        {
          id: "Lingxi Jin",
          type: "center",
          x: 0.48,
          y: 0.51
        },


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


        {
          id: "Nanyang Technological University",
          type: "institution",
          country: "Singapore",
          tone: "tone-singapore",
          x: 0.46,
          y: 0.10
        },


        {
          id: "University of Bristol",
          type: "institution",
          country: "United Kingdom",
          tone: "tone-uk",
          x: 0.65,
          y: 0.12
        },


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


        {
          id: "Kyushu University",
          type: "institution",
          country: "Japan",
          tone: "tone-japan",
          x: 0.52,
          y: 0.89
        },


        {
          id: "The Hong Kong Polytechnic University",
          type: "institution",
          country: "Hong Kong SAR, China",
          tone: "tone-hk",
          x: 0.29,
          y: 0.84
        },


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

  function svgElement(
    tag,
    attrs
  ) {

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

  function wrapLabel(
    text,
    maxLength
  ) {

    var words =
      text.split(" ");


    var lines = [];

    var current =
      "";


    words.forEach(
      function (word) {

        var candidate =
          current
            ? current + " " + word
            : word;


        if (
          candidate.length >
            maxLength &&
          current
        ) {

          lines.push(
            current
          );

          current =
            word;

        } else {

          current =
            candidate;

        }

      }
    );


    if (current) {

      lines.push(
        current
      );

    }


    return lines;

  }


  /* =========================================================
     NODE RADIUS
     ========================================================= */

  function getNodeRadius(
    node
  ) {

    if (
      node.type ===
      "center"
    ) {

      return 48;

    }


    if (
      node.type ===
      "country"
    ) {

      return 30;

    }


    return 23;

  }


  /* =========================================================
     COLLABORATION STRENGTH
     ========================================================= */

  function getWorkCount(
    node
  ) {

    if (
      node.type ===
      "country"
    ) {

      return (
        COUNTRIES[
          node.id
        ] || {}
      ).workCount || 1;

    }


    if (
      node.type ===
      "institution"
    ) {

      return (
        INSTITUTIONS[
          node.id
        ] || {}
      ).workCount || 1;

    }


    return 1;

  }


  function strengthToWidth(
    count
  ) {

    if (
      count >= 7
    ) {

      return 7;

    }


    if (
      count >= 4
    ) {

      return 5.3;

    }


    if (
      count >= 2
    ) {

      return 3.7;

    }


    return 2.2;

  }


  /* =========================================================
     BUILD NETWORK
     ========================================================= */

  function buildNetwork(
    viewName
  ) {

    var data =
      NETWORK_DATA[
        viewName
      ];


    if (!data) {
      return;
    }


    /*
      Remove SVG and previous popover,
      but preserve the HTML strength legend.
    */

    Array.prototype.slice
      .call(
        container.querySelectorAll(
          "svg, .collab-popover"
        )
      )
      .forEach(
        function (element) {

          element.remove();

        }
      );


    container.classList.remove(
      "has-selection"
    );


    var width =
      1400;


    var height =
      760;


    var centerX =
      width / 2;


    var centerY =
      height / 2;


    var selectedNode =
      null;


    /* =====================================================
       POPOVER
       ===================================================== */

    var popover =
      document.createElement(
        "div"
      );


    popover.className =
      "collab-popover";


    popover.setAttribute(
      "role",
      "dialog"
    );


    container.appendChild(
      popover
    );


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
            viewName ===
              "countries"
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

          width:
            width,

          height:
            height,

          class:
            "collab-background"

        }
      );


    var viewport =
      svgElement(
        "g",
        {
          class:
            "collab-viewport"
        }
      );


    var linkLayer =
      svgElement(
        "g",
        {
          class:
            "collab-links"
        }
      );


    var nodeLayer =
      svgElement(
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


    /* =====================================================
       NODE DATA
       ===================================================== */

    var nodes =
      data.nodes.map(
        function (item) {

          var x =
            item.x *
            width;


          var y =
            item.y *
            height;


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


    var centerNode =
      null;


    var outerNodes =
      [];


    nodes.forEach(
      function (node) {

        if (
          node.type ===
          "center"
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


    /* =====================================================
       LINKS
       ===================================================== */

    var links =
      [];


    outerNodes.forEach(
      function (
        node,
        index
      ) {

        var workCount =
          getWorkCount(
            node
          );


        var widthValue =
          strengthToWidth(
            workCount
          );


        var path =
          svgElement(
            "path",
            {
              class:
                "collab-link"
            }
          );


        path.style.setProperty(
          "--link-width",
          widthValue +
          "px"
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

            workCount:
              workCount,

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
          node.type ===
          "center"
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
                radius +
                34

            }
          );


        var maxLength =
          node.type ===
          "institution"
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
              node.type ===
              "center"
            ) {

              clearSelection();

              return;

            }


            selectNode(
              node
            );

          }
        );


        /* =================================================
           KEYBOARD
           ================================================= */

        group.addEventListener(
          "keydown",
          function (event) {

            if (
              event.key ===
                "Enter" ||
              event.key ===
                " "
            ) {

              event.preventDefault();


              if (
                node.type ===
                "center"
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
          node.type !==
          "center"
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
                screenToNetworkPoint(
                  event.clientX,
                  event.clientY
                );


              node.x =
                point.x;


              node.y =
                point.y;


              draw();


              if (
                selectedNode ===
                node
              ) {

                positionPopover(
                  node
                );

              }

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


          group.addEventListener(
            "pointercancel",
            function () {

              dragging =
                false;

            }
          );

        }

      }
    );


    /* =====================================================
       VIEWPORT
       ===================================================== */

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


      if (
        selectedNode
      ) {

        requestAnimationFrame(
          function () {

            positionPopover(
              selectedNode
            );

          }
        );

      }

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
          x: centerX,
          y: centerY
        };

      }


      return point.matrixTransform(
        matrix.inverse()
      );

    }


    /* =====================================================
       LINKS

       Lines begin outside the center circle
       and end outside the target circle.
       ===================================================== */

    function linkPath(
      link
    ) {

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


      var dx =
        x2 -
        x1;


      var dy =
        y2 -
        y1;


      var distance =
        Math.sqrt(
          dx * dx +
          dy * dy
        ) || 1;


      var unitX =
        dx /
        distance;


      var unitY =
        dy /
        distance;


      var edgeGap =
        5;


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


      if (
        distance <=
        sourceRadius +
        targetRadius +
        10
      ) {

        return "";

      }


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


      var pathDx =
        endX -
        startX;


      var pathDy =
        endY -
        startY;


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


      var perpX =
        -pathUnitY;


      var perpY =
        pathUnitX;


      var direction =
        link.index %
        2 === 0
          ? 1
          : -1;


      var bend =
        Math.min(
          42,
          pathLength *
          0.055
        ) *
        direction;


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


      if (
        selectedNode
      ) {

        requestAnimationFrame(
          function () {

            positionPopover(
              selectedNode
            );

          }
        );

      }

    }


    /* =====================================================
       POPOVER CONTENT
       ===================================================== */

    function pluralize(
      value,
      singular,
      plural
    ) {

      return (
        value +
        " " +
        (
          value === 1
            ? singular
            : plural
        )
      );

    }


    function buildPopover(
      node
    ) {

      popover.innerHTML =
        "";


      var header =
        document.createElement(
          "div"
        );


      header.className =
        "collab-popover-header";


      var titleWrap =
        document.createElement(
          "div"
        );


      titleWrap.className =
        "collab-popover-title-wrap";


      var dot =
        document.createElement(
          "span"
        );


      dot.className =
        "collab-popover-dot " +
        node.tone;


      var title =
        document.createElement(
          "h3"
        );


      title.className =
        "collab-popover-title";


      title.textContent =
        node.id;


      titleWrap.appendChild(
        dot
      );


      titleWrap.appendChild(
        title
      );


      var close =
        document.createElement(
          "button"
        );


      close.type =
        "button";


      close.className =
        "collab-popover-close";


      close.setAttribute(
        "aria-label",
        "Close"
      );


      close.innerHTML =
        "&times;";


      close.addEventListener(
        "click",
        function (event) {

          event.stopPropagation();

          clearSelection();

        }
      );


      header.appendChild(
        titleWrap
      );


      header.appendChild(
        close
      );


      popover.appendChild(
        header
      );


      /* -------------------------------------------------
         COUNTRY
         ------------------------------------------------- */

      if (
        node.type ===
        "country"
      ) {

        var countryData =
          COUNTRIES[
            node.id
          ];


        var count =
          countryData
            .workCount;


        var institutions =
          countryData
            .institutions;


        var meta =
          document.createElement(
            "div"
          );


        meta.className =
          "collab-popover-count";


        meta.textContent =
          pluralize(
            count,
            "collaborative work",
            "collaborative works"
          );


        popover.appendChild(
          meta
        );


        var institutionMeta =
          document.createElement(
            "div"
          );


        institutionMeta.className =
          "collab-popover-meta";


        institutionMeta.textContent =
          pluralize(
            institutions.length,
            "institution",
            "institutions"
          );


        popover.appendChild(
          institutionMeta
        );


        var section =
          document.createElement(
            "div"
          );


        section.className =
          "collab-popover-section";


        var sectionTitle =
          document.createElement(
            "div"
          );


        sectionTitle.className =
          "collab-popover-section-title";


        sectionTitle.textContent =
          "Institutions";


        section.appendChild(
          sectionTitle
        );


        institutions.forEach(
          function (
            institutionName
          ) {

            var institutionData =
              INSTITUTIONS[
                institutionName
              ];


            var row =
              document.createElement(
                "div"
              );


            row.className =
              "collab-popover-row";


            var name =
              document.createElement(
                "span"
              );


            name.className =
              "collab-popover-row-name";


            name.textContent =
              institutionName;


            var value =
              document.createElement(
                "span"
              );


            value.className =
              "collab-popover-row-count";


            value.textContent =
              institutionData
                .workCount;


            row.appendChild(
              name
            );


            row.appendChild(
              value
            );


            section.appendChild(
              row
            );

          }
        );


        popover.appendChild(
          section
        );

      }


      /* -------------------------------------------------
         INSTITUTION
         ------------------------------------------------- */

      if (
        node.type ===
        "institution"
      ) {

        var institutionData =
          INSTITUTIONS[
            node.id
          ];


        var location =
          document.createElement(
            "div"
          );


        location.className =
          "collab-popover-meta";


        location.textContent =
          institutionData
            .country;


        popover.appendChild(
          location
        );


        var workCount =
          document.createElement(
            "div"
          );


        workCount.className =
          "collab-popover-count";


        workCount.textContent =
          pluralize(
            institutionData
              .workCount,
            "collaborative work",
            "collaborative works"
          );


        popover.appendChild(
          workCount
        );

      }

    }


    /* =====================================================
       POPOVER POSITION
       ===================================================== */

    function positionPopover(
      node
    ) {

      if (
        !node ||
        !node.element ||
        !popover.classList.contains(
          "visible"
        )
      ) {

        return;

      }


      var containerRect =
        container.getBoundingClientRect();


      var nodeRect =
        node.element.getBoundingClientRect();


      var popoverRect =
        popover.getBoundingClientRect();


      var nodeCenterX =
        (
          nodeRect.left +
          nodeRect.right
        ) / 2 -
        containerRect.left;


      var nodeCenterY =
        (
          nodeRect.top +
          nodeRect.bottom
        ) / 2 -
        containerRect.top;


      var gap =
        24;


      var left;


      /*
        Node on left half:
        show popover to the right.

        Node on right half:
        show popover to the left.
      */

      if (
        nodeCenterX <
        containerRect.width /
        2
      ) {

        left =
          nodeRect.right -
          containerRect.left +
          gap;

      } else {

        left =
          nodeRect.left -
          containerRect.left -
          popoverRect.width -
          gap;

      }


      var top =
        nodeCenterY -
        popoverRect.height /
        2;


      var padding =
        16;


      left =
        Math.max(
          padding,
          Math.min(
            left,
            containerRect.width -
            popoverRect.width -
            padding
          )
        );


      top =
        Math.max(
          padding,
          Math.min(
            top,
            containerRect.height -
            popoverRect.height -
            padding
          )
        );


      popover.style.left =
        left +
        "px";


      popover.style.top =
        top +
        "px";

    }


    /* =====================================================
       SELECTION
       ===================================================== */

    function selectNode(
      selected
    ) {

      selectedNode =
        selected;


      container.classList.add(
        "has-selection"
      );


      nodes.forEach(
        function (node) {

          var active =
            node ===
              selected ||
            node.type ===
              "center";


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
            link.target ===
              selected
          );

        }
      );


      buildPopover(
        selected
      );


      popover.classList.add(
        "visible"
      );


      requestAnimationFrame(
        function () {

          positionPopover(
            selected
          );

        }
      );

    }


    function clearSelection() {

      selectedNode =
        null;


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


      popover.classList.remove(
        "visible"
      );

    }


    background.addEventListener(
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
          event.deltaY <
          0
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
        passive:
          false
      }
    );


    /* =====================================================
       PAN
       ===================================================== */

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


    background.addEventListener(
      "pointercancel",
      function () {

        panning =
          false;

      }
    );


    /* =====================================================
       ESC CLOSE
       ===================================================== */

    function escapeHandler(
      event
    ) {

      if (
        event.key ===
        "Escape"
      ) {

        clearSelection();

      }

    }


    document.addEventListener(
      "keydown",
      escapeHandler
    );


    /* =====================================================
       RESET
       ===================================================== */

    function reset() {

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


      clearSelection();

      draw();

      updateViewport();

    }


    currentNetwork = {

      reset:
        reset,

      destroy:
        function () {

          document.removeEventListener(
            "keydown",
            escapeHandler
          );

        }

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


    if (
      currentNetwork &&
      typeof currentNetwork.destroy ===
      "function"
    ) {

      currentNetwork.destroy();

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
     RESET
     ========================================================= */

  if (
    resetButton
  ) {

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
