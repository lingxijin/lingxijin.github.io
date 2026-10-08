(() => {
  const NETWORKS = {
    "country-network": {
      radius: 175,

      nodes: [
        {
          id: "Lingxi Jin",
          type: "center",
        },
        {
          id: "South Korea",
          type: "country",
        },
        {
          id: "United States",
          type: "country",
        },
        {
          id: "Japan",
          type: "country",
        },
        {
          id: "Hong Kong SAR, China",
          type: "country",
        },
        {
          id: "Italy",
          type: "country",
        },
      ],
    },

    "institution-network": {
      radius: 195,

      nodes: [
        {
          id: "Lingxi Jin",
          type: "center",
        },

        {
          id: "Ewha Womans University",
          type: "institution",
          country: "South Korea",
        },
        {
          id: "Chung-Ang University",
          type: "institution",
          country: "South Korea",
        },
        {
          id: "Sejong University",
          type: "institution",
          country: "South Korea",
        },

        {
          id: "Carnegie Mellon University",
          type: "institution",
          country: "United States",
        },
        {
          id: "University of Miami",
          type: "institution",
          country: "United States",
        },
        {
          id: "University of Utah",
          type: "institution",
          country: "United States",
        },
        {
          id: "Auburn University",
          type: "institution",
          country: "United States",
        },

        {
          id: "Kyushu University",
          type: "institution",
          country: "Japan",
        },

        {
          id: "The Hong Kong Polytechnic University",
          type: "institution",
          country: "Hong Kong SAR, China",
        },

        {
          id: "Politecnico di Milano",
          type: "institution",
          country: "Italy",
        },
      ],
    },
  };


  const SVG_NS = "http://www.w3.org/2000/svg";


  function svgElement(tag, attrs = {}) {
    const element = document.createElementNS(SVG_NS, tag);

    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  }


  function wrapWords(text, maxChars) {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;

      if (test.length > maxChars && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });

    if (line) {
      lines.push(line);
    }

    return lines;
  }


  function initialiseNetwork(containerId, config) {
    const container = document.getElementById(containerId);

    if (!container) return;


    const width = 900;
    const height = 520;

    const centreX = width / 2;
    const centreY = height / 2;


    const svg = svgElement("svg", {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
    });


    const background = svgElement("rect", {
      x: 0,
      y: 0,
      width,
      height,
      class: "collab-background",
    });


    const viewport = svgElement("g", {
      class: "collab-viewport",
    });


    const linksLayer = svgElement("g", {
      class: "collab-links",
    });


    const nodesLayer = svgElement("g", {
      class: "collab-nodes",
    });


    viewport.appendChild(linksLayer);
    viewport.appendChild(nodesLayer);

    svg.appendChild(background);
    svg.appendChild(viewport);

    container.appendChild(svg);


    const tooltip = document.createElement("div");

    tooltip.className = "collab-tooltip";
    tooltip.setAttribute("aria-hidden", "true");

    container.appendChild(tooltip);


    const nodes = config.nodes.map((node) => ({
      ...node,
      x: centreX,
      y: centreY,
      initialX: centreX,
      initialY: centreY,
    }));


    const centreNode = nodes.find(
      (node) => node.type === "center"
    );


    const outerNodes = nodes.filter(
      (node) => node.type !== "center"
    );


    outerNodes.forEach((node, index) => {
      const angle =
        -Math.PI / 2 +
        (index / outerNodes.length) * Math.PI * 2;

      node.x =
        centreX +
        Math.cos(angle) * config.radius;

      node.y =
        centreY +
        Math.sin(angle) * config.radius;

      node.initialX = node.x;
      node.initialY = node.y;
    });


    const links = outerNodes.map((node) => ({
      source: centreNode,
      target: node,
    }));


    links.forEach((link) => {
      const line = svgElement("line", {
        class: "collab-link",
      });

      link.element = line;
      linksLayer.appendChild(line);
    });


    nodes.forEach((node) => {
      const group = svgElement("g", {
        class:
          node.type === "center"
            ? "collab-node collab-center-node"
            : "collab-node",
        tabindex: "0",
        role: "button",
      });


      const circle = svgElement("circle", {
        r: node.type === "center" ? 30 : 14,
      });


      group.appendChild(circle);


      const label = svgElement("text", {
        class: "collab-label",
      });


      const labelLines =
        node.type === "institution"
          ? wrapWords(node.id, 23)
          : wrapWords(node.id, 20);


      labelLines.forEach((line, index) => {
        const tspan = svgElement("tspan", {
          x: 0,
          dy: index === 0 ? 0 : 14,
        });

        tspan.textContent = line;

        label.appendChild(tspan);
      });


      const radius =
        node.type === "center"
          ? 30
          : 14;


      label.setAttribute(
        "y",
        radius + 21
      );


      group.appendChild(label);


      node.element = group;
      node.circle = circle;

      nodesLayer.appendChild(group);


      group.addEventListener(
        "pointerenter",
        (event) => {
          showTooltip(event, node);
        }
      );


      group.addEventListener(
        "pointermove",
        (event) => {
          moveTooltip(event);
        }
      );


      group.addEventListener(
        "pointerleave",
        () => {
          hideTooltip();
        }
      );


      group.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          if (node.type === "center") {
            clearSelection();
          } else {
            selectNode(node);
          }
        }
      );


      group.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            if (node.type === "center") {
              clearSelection();
            } else {
              selectNode(node);
            }
          }
        }
      );


      let draggingNode = false;


      group.addEventListener(
        "pointerdown",
        (event) => {
          if (node.type === "center") return;

          draggingNode = true;

          group.setPointerCapture(
            event.pointerId
          );

          event.stopPropagation();
        }
      );


      group.addEventListener(
        "pointermove",
        (event) => {
          if (!draggingNode) return;

          const point =
            clientToViewport(
              event.clientX,
              event.clientY
            );

          node.x = point.x;
          node.y = point.y;

          render();
        }
      );


      group.addEventListener(
        "pointerup",
        (event) => {
          draggingNode = false;

          if (
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
    });


    let zoom = 1;
    let panX = 0;
    let panY = 0;


    function updateViewport() {
      const tx =
        centreX * (1 - zoom) +
        panX;

      const ty =
        centreY * (1 - zoom) +
        panY;

      viewport.setAttribute(
        "transform",
        `translate(${tx} ${ty}) scale(${zoom})`
      );
    }


    function clientToViewport(clientX, clientY) {
      const point =
        svg.createSVGPoint();

      point.x = clientX;
      point.y = clientY;

      const matrix =
        viewport.getScreenCTM();

      if (!matrix) {
        return {
          x: centreX,
          y: centreY,
        };
      }

      return point.matrixTransform(
        matrix.inverse()
      );
    }


    function render() {
      links.forEach((link) => {
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


      nodes.forEach((node) => {
        node.element.setAttribute(
          "transform",
          `translate(${node.x} ${node.y})`
        );
      });
    }


    function showTooltip(event, node) {
      let html =
        `<strong>${node.id}</strong>`;


      if (node.type === "center") {
        html +=
          `<span>Research collaboration network</span>`;
      } else if (node.country) {
        html +=
          `<span>${node.country}</span>`;
      } else {
        html +=
          `<span>Research collaboration</span>`;
      }


      tooltip.innerHTML = html;

      tooltip.classList.add(
        "is-visible"
      );

      tooltip.setAttribute(
        "aria-hidden",
        "false"
      );

      moveTooltip(event);
    }


    function moveTooltip(event) {
      const bounds =
        container.getBoundingClientRect();


      let left =
        event.clientX -
        bounds.left +
        14;


      let top =
        event.clientY -
        bounds.top +
        14;


      tooltip.style.left =
        `${left}px`;

      tooltip.style.top =
        `${top}px`;
    }


    function hideTooltip() {
      tooltip.classList.remove(
        "is-visible"
      );

      tooltip.setAttribute(
        "aria-hidden",
        "true"
      );
    }


    function selectNode(selected) {
      container.classList.add(
        "has-selection"
      );


      nodes.forEach((node) => {
        const active =
          node === selected ||
          node.type === "center";

        node.element.classList.toggle(
          "active",
          active
        );
      });


      links.forEach((link) => {
        link.element.classList.toggle(
          "active",
          link.target === selected
        );
      });
    }


    function clearSelection() {
      container.classList.remove(
        "has-selection"
      );


      nodes.forEach((node) => {
        node.element.classList.remove(
          "active"
        );
      });


      links.forEach((link) => {
        link.element.classList.remove(
          "active"
        );
      });


      hideTooltip();
    }


    svg.addEventListener(
      "click",
      () => {
        clearSelection();
      }
    );


    svg.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();


        const factor =
          event.deltaY < 0
            ? 1.1
            : 0.9;


        zoom *= factor;

        zoom = Math.max(
          0.65,
          Math.min(2.4, zoom)
        );


        updateViewport();
      },
      {
        passive: false,
      }
    );


    let panning = false;
    let panStartX = 0;
    let panStartY = 0;
    let panOriginX = 0;
    let panOriginY = 0;


    background.addEventListener(
      "pointerdown",
      (event) => {
        panning = true;

        panStartX = event.clientX;
        panStartY = event.clientY;

        panOriginX = panX;
        panOriginY = panY;

        background.setPointerCapture(
          event.pointerId
        );
      }
    );


    background.addEventListener(
      "pointermove",
      (event) => {
        if (!panning) return;


        const rect =
          svg.getBoundingClientRect();


        const scaleX =
          width / rect.width;

        const scaleY =
          height / rect.height;


        panX =
          panOriginX +
          (event.clientX - panStartX) *
            scaleX;


        panY =
          panOriginY +
          (event.clientY - panStartY) *
            scaleY;


        updateViewport();
      }
    );


    background.addEventListener(
      "pointerup",
      (event) => {
        panning = false;

        if (
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


    container.resetNetwork = () => {
      zoom = 1;
      panX = 0;
      panY = 0;


      outerNodes.forEach((node) => {
        node.x = node.initialX;
        node.y = node.initialY;
      });


      centreNode.x = centreX;
      centreNode.y = centreY;


      updateViewport();
      clearSelection();
      render();
    };


    updateViewport();
    render();


    requestAnimationFrame(() => {
      container.classList.add(
        "network-ready"
      );
    });
  }


  function start() {
    Object.entries(NETWORKS).forEach(
      ([containerId, config]) => {
        initialiseNetwork(
          containerId,
          config
        );
      }
    );


    document
      .querySelectorAll(
        ".collab-reset"
      )
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            const id =
              button.dataset.network;

            const network =
              document.getElementById(id);

            if (
              network &&
              typeof network.resetNetwork ===
                "function"
            ) {
              network.resetNetwork();
            }
          }
        );
      });
  }


  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      start
    );
  } else {
    start();
  }
})();
