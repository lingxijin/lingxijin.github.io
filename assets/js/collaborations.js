(function () {
  "use strict";


  var SVG_NS =
    "http://www.w3.org/2000/svg";


  /* =========================================================
     COUNTRY INFORMATION
     ========================================================= */

  var COUNTRY_INFO = {

    "South Korea": {
      tone: "tone-korea",

      institutions: [
        "Ewha Womans University",
        "Chung-Ang University",
        "Sejong University"
      ]
    },


    "United States": {
      tone: "tone-us",

      institutions: [
        "Carnegie Mellon University",
        "University of Miami",
        "University of Utah",
        "Auburn University"
      ]
    },


    "Japan": {
      tone: "tone-japan",

      institutions: [
        "Kyushu University"
      ]
    },


    "Hong Kong SAR, China": {
      tone: "tone-hk",

      institutions: [
        "The Hong Kong Polytechnic University"
      ]
    },


    "Italy": {
      tone: "tone-italy",

      institutions: [
        "Politecnico di Milano"
      ]
    }

  };


  /* =========================================================
     NETWORK DATA
     ========================================================= */

  var NETWORK_DATA = {

    countries: {

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
          tone: "tone-korea",
          x: 0.27,
          y: 0.27
        },

        {
          id: "United States",
          type: "country",
          tone: "tone-us",
          x: 0.76,
          y: 0.29
        },

        {
          id: "Japan",
          type: "country",
          tone: "tone-japan",
          x: 0.76,
          y: 0.72
        },

        {
          id: "Hong Kong SAR, China",
          type: "country",
          tone: "tone-hk",
          x: 0.31,
          y: 0.78
        },

        {
          id: "Italy",
          type: "country",
          tone: "tone-italy",
          x: 0.13,
          y: 0.52
        }

      ]

    },


    institutions: {

      nodes: [

        {
          id: "Lingxi Jin",
          type: "center",
          x: 0.50,
          y: 0.50
        },


        {
          id: "Ewha Womans University",
          type: "institution",
          country: "South Korea",
          tone: "tone-korea",
          x: 0.21,
          y: 0.19
        },

        {
          id: "Chung-Ang University",
          type: "institution",
          country: "South Korea",
          tone: "tone-korea",
          x: 0.40,
          y: 0.20
        },

        {
          id: "Sejong University",
          type: "institution",
          country: "South Korea",
          tone: "tone-korea",
          x: 0.59,
          y: 0.19
        },


        {
          id: "Carnegie Mellon University",
          type: "institution",
          country: "United States",
          tone: "tone-us",
          x: 0.80,
          y: 0.28
        },

        {
          id: "University of Miami",
          type: "institution",
          country: "United States",
          tone: "tone-us",
          x: 0.84,
          y: 0.52
        },

        {
          id: "University of Utah",
          type: "institution",
          country: "United States",
          tone: "tone-us",
          x: 0.73,
          y: 0.74
        },

        {
          id: "Auburn University",
          type: "institution",
          country: "United States",
          tone: "tone-us",
          x: 0.54,
          y: 0.82
        },


        {
          id: "Kyushu University",
          type: "institution",
          country: "Japan",
          tone: "tone-japan",
          x: 0.31,
          y: 0.76
        },


        {
          id: "The Hong Kong Polytechnic University",
          type: "institution",
          country: "Hong Kong SAR, China",
          tone: "tone-hk",
          x: 0.13,
          y: 0.61
        },


        {
          id: "Politecnico di Milano",
          type: "institution",
          country: "Italy",
          tone: "tone-italy",
          x: 0.13,
          y: 0.34
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


  var detailEyebrow =
    document.querySelector(
      ".collab-detail-eyebrow"
    );


  var detailTitle =
    document.getElementById(
      "collab-detail-title"
    );


  var detailMeta =
    document.getElementById(
      "collab-detail-meta"
    );


  var detailDescription =
    document.getElementById(
      "collab-detail-description"
    );


  var detailList =
    document.getElementById(
      "collab-detail-list"
    );


  if (!container) {
    return;
  }


  var currentView =
    "countries";


  var currentNetwork =
    null;


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
     LABEL WRAP
     ========================================================= */

  function wrapLabel(
    text,
    maxLength
  ) {

    var words =
      text.split(" ");


    var lines =
      [];


    var current =
      "";


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
     DETAIL PANEL
     ========================================================= */

  function clearDetailList() {

    detailList.innerHTML =
      "";

  }


  function showCenterDetail() {

    detailEyebrow.textContent =
      "Research Network";


    detailTitle.textContent =
      "Lingxi Jin";


    detailMeta.textContent =
      currentView === "countries"
        ? "Global collaboration"
        : "Institutional collaboration";


    detailDescription.textContent =
      currentView === "countries"
        ? "Select a country or region in the network to explore connected institutions."
        : "Select an institution in the network to view its location.";


    clearDetailList();

  }


  function showCountryDetail(
    country
  ) {

    var info =
      COUNTRY_INFO[
        country.id
      ];


    detailEyebrow.textContent =
      "Country / Region";


    detailTitle.textContent =
      country.id;


    detailMeta.textContent =
      "Research collaboration";


    detailDescription.textContent =
      "Connected through collaborative research with Lingxi Jin.";


    clearDetailList();


    if (
      !info ||
      !info.institutions.length
    ) {

      return;

    }


    var title =
      document.createElement(
        "div"
      );


    title.className =
      "collab-detail-list-title";


    title.textContent =
      "Institutions";


    detailList.appendChild(
      title
    );


    info.institutions.forEach(
      function (
        institution
      ) {

        var item =
          document.createElement(
            "div"
          );


        item.className =
          "collab-detail-item";


        var dot =
          document.createElement(
            "span"
          );


        dot.className =
          "collab-detail-dot " +
          info.tone;


        var label =
          document.createElement(
            "span"
          );


        label.textContent =
          institution;


        item.appendChild(
          dot
        );


        item.appendChild(
          label
        );


        detailList.appendChild(
          item
        );

      }
    );

  }


  function showInstitutionDetail(
    institution
  ) {

    detailEyebrow.textContent =
      "Institution";


    detailTitle.textContent =
      institution.id;


    detailMeta.textContent =
      institution.country;


    detailDescription.textContent =
      "Connected through collaborative research with Lingxi Jin.";


    clearDetailList();

  }


  function showNodeDetail(
    node
  ) {

    if (
      node.type === "center"
    ) {

      showCenterDetail();

    } else if (
      node.type === "country"
    ) {

      showCountryDetail(
        node
      );

    } else {

      showInstitutionDetail(
        node
      );

    }

  }


  /* =========================================================
     BUILD NETWORK
     ========================================================= */

  function buildNetwork(
    viewName
  ) {

    currentView =
      viewName;


    var data =
      NETWORK_DATA[
        viewName
      ];


    container.innerHTML =
      "";


    container.classList.remove(
      "has-selection"
    );


    var width =
      1000;


    var height =
      560;


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
            "xMidYMid meet"

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
       DATA
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

            tone:
              item.tone || "",

            country:
              item.country || "",

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
      function (
        node
      ) {

        var classes =
          "collab-node";


        if (
          node.type ===
          "center"
        ) {

          classes +=
            " collab-center-node";

        }


        if (
          node.tone
        ) {

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
                "button"

            }
          );


        var radius;


        if (
          node.type ===
          "center"
        ) {

          radius =
            38;

        } else if (
          node.type ===
          "country"
        ) {

          radius =
            22;

        } else {

          radius =
            16;

        }


        var halo =
          svgElement(
            "circle",
            {

              class:
                "collab-halo",

              r:
                radius +
                (
                  node.type ===
                    "center"
                    ? 14
                    : 9
                )

            }
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
          halo
        );


        group.appendChild(
          circle
        );


        /* label */

        var label =
          svgElement(
            "text",
            {

              class:
                "collab-label",

              y:
                radius +
                25

            }
          );


        var maxLength =
          node.type ===
            "institution"
            ? 21
            : 22;


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
           DRAG
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
       CURVED LINKS
       ===================================================== */

    function linkPath(
      link
    ) {

      var x1 =
        link.source.x;


      var y1 =
        link.source.y;


      var x2 =
        link.target.x;


      var y2 =
        link.target.y;


      var mx =
        (
          x1 +
          x2
        ) /
        2;


      var my =
        (
          y1 +
          y2
        ) /
        2;


      var dx =
        x2 -
        x1;


      var dy =
        y2 -
        y1;


      var length =
        Math.sqrt(
          dx * dx +
          dy * dy
        ) || 1;


      var direction =
        link.index %
        2 === 0
          ? 1
          : -1;


      var bend =
        Math.min(
          25,
          length *
          0.07
        ) *
        direction;


      var cx =
        mx -
        (
          dy /
          length
        ) *
        bend;


      var cy =
        my +
        (
          dx /
          length
        ) *
        bend;


      return (
        "M " +
        x1 +
        " " +
        y1 +
        " Q " +
        cx +
        " " +
        cy +
        " " +
        x2 +
        " " +
        y2
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
       SELECT
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

            link.target ===
            selected

          );

        }
      );


      showNodeDetail(
        selected
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


      showCenterDetail();

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
            0.72,
            Math.min(
              2.15,
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


    draw();

    updateViewport();

    showCenterDetail();

  }


  /* =========================================================
     VIEW SWITCH
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
          ) === viewName;


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
     START
     ========================================================= */

  switchView(
    "countries"
  );

})();
