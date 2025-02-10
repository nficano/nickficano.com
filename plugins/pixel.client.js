export default defineNuxtPlugin(() => {
  function createPixel(canvas, context, x, y, color, speed, delay) {
    const state = {
      ctx: context,
      x,
      y,
      color,
      speed,
      size: 0,
      maxSize: 2,
      delay,
      counter: 0,
      isIdle: false,
    };

    const draw = () => {
      state.ctx.fillStyle = state.color;
      state.ctx.fillRect(state.x, state.y, state.size, state.size);
    };

    return {
      appear: () => {
        state.isIdle = false;

        if (state.counter <= state.delay) {
          state.counter += 1;
          return;
        }

        if (state.size < state.maxSize) {
          state.size += speed;
        }

        draw();
      },

      disappear: () => {
        state.counter = 0;

        if (state.size <= 0) {
          state.isIdle = true;
          return;
        }

        state.size -= speed;
        draw();
      },

      get isIdle() {
        return state.isIdle;
      },
    };
  }

  function createPixelCanvas() {
    const css = `
      :host {
        display: grid;
        inline-size: 100%;
        block-size: 100%;
        overflow: hidden;
      }
    `;

    class PixelCanvasElement extends HTMLElement {
      #pixels = [];
      #canvas;
      #ctx;
      #animation;
      #resizeObserver;
      #parent;

      getColors() {
        return (
          this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"]
        );
      }

      getGap() {
        return Math.min(Math.max(parseInt(this.dataset.gap || 5), 4), 50);
      }

      getSpeed() {
        const value = parseInt(this.dataset.speed || 35);
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        return reducedMotion ? 0 : Math.min(Math.max(value, 0), 100) * 0.001;
      }

      createPixels() {
        this.#pixels = [];
        const colors = this.getColors();
        const speed = this.getSpeed();
        const gap = this.getGap();

        for (let x = 0; x < this.#canvas.width; x += gap) {
          for (let y = 0; y < this.#canvas.height; y += gap) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const delay = Math.random() * 100;
            this.#pixels.push(
              createPixel(this.#canvas, this.#ctx, x, y, color, speed, delay)
            );
          }
        }
      }

      animate(fnName) {
        this.#animation = requestAnimationFrame(() => this.animate(fnName));
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        for (const pixel of this.#pixels) {
          pixel[fnName]();
        }

        if (this.#pixels.every((pixel) => pixel.isIdle)) {
          cancelAnimationFrame(this.#animation);
        }
      }

      handleAnimation(name) {
        cancelAnimationFrame(this.#animation);
        this.animate(name);
      }

      init() {
        const rect = this.getBoundingClientRect();
        this.#canvas.width = Math.floor(rect.width);
        this.#canvas.height = Math.floor(rect.height);
        this.#canvas.style.width = `${this.#canvas.width}px`;
        this.#canvas.style.height = `${this.#canvas.height}px`;
        this.createPixels();
      }

      connectedCallback() {
        this.#canvas = document.createElement("canvas");
        const sheet = new CSSStyleSheet();
        this.#parent = this.parentNode;

        const shadowRoot = this.attachShadow({ mode: "open" });
        sheet.replaceSync(css);
        shadowRoot.adoptedStyleSheets = [sheet];
        shadowRoot.append(this.#canvas);

        this.#ctx = this.#canvas.getContext("2d");
        this.init();

        this.#resizeObserver = new ResizeObserver(() => this.init());
        this.#resizeObserver.observe(this);

        const handleMouseEnter = () => this.handleAnimation("appear");
        const handleMouseLeave = () => this.handleAnimation("disappear");
        const handleFocusIn = (e) => {
          if (e.currentTarget.contains(e.relatedTarget)) return;
          this.handleAnimation("appear");
        };
        const handleFocusOut = (e) => {
          if (e.currentTarget.contains(e.relatedTarget)) return;
          this.handleAnimation("disappear");
        };

        this.#parent.addEventListener("mouseenter", handleMouseEnter);
        this.#parent.addEventListener("mouseleave", handleMouseLeave);

        if (!this.hasAttribute("data-no-focus")) {
          this.#parent.addEventListener("focusin", handleFocusIn);
          this.#parent.addEventListener("focusout", handleFocusOut);
        }

        this._listeners = {
          mouseenter: handleMouseEnter,
          mouseleave: handleMouseLeave,
          focusin: handleFocusIn,
          focusout: handleFocusOut,
        };
      }

      disconnectedCallback() {
        this.#resizeObserver?.disconnect();

        this.#parent.removeEventListener(
          "mouseenter",
          this._listeners.mouseenter
        );
        this.#parent.removeEventListener(
          "mouseleave",
          this._listeners.mouseleave
        );

        if (!this.hasAttribute("data-no-focus")) {
          this.#parent.removeEventListener("focusin", this._listeners.focusin);
          this.#parent.removeEventListener(
            "focusout",
            this._listeners.focusout
          );
        }

        this._listeners = null;
        this.#parent = null;
      }
    }

    if ("customElements" in window) {
      customElements.define("pixel-canvas", PixelCanvasElement);
    }
  }

  createPixelCanvas();
});
