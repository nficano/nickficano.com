import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { ref, watch, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const useTextHover = (text, options = {}) => {
  const svgRef = ref(null);
  const cursor = ref({ x: 0, y: 0 });
  const hovered = ref(false);
  const maskPosition = ref({ cx: "50%", cy: "50%" });
  const updateCursor = (e) => {
    cursor.value = { x: e.clientX, y: e.clientY };
    watch(cursor, (newCursor) => {
      if (svgRef.value && newCursor.x !== null && newCursor.y !== null) {
        const svgRect = svgRef.value.getBoundingClientRect();
        const cxPercentage = (newCursor.x - svgRect.left) / svgRect.width * 100;
        const cyPercentage = (newCursor.y - svgRect.top) / svgRect.height * 100;
        maskPosition.value = {
          cx: `${cxPercentage}%`,
          cy: `${cyPercentage}%`
        };
      }
    });
  };
  return {
    svgRef,
    cursor,
    hovered,
    maskPosition,
    updateCursor,
    text,
    ...options
  };
};
const _sfc_main = {
  __name: "TextHover",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    automatic: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    useTextHover(
      props.text,
      {
        duration: props.duration,
        automatic: props.automatic
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0;
      _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TextHover.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TextHover-MbEn23_z.mjs.map
