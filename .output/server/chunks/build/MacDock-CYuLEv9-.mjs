import { _ as __nuxt_component_0$1 } from './client-only-Bwxzq3Sq.mjs';
import { useSSRContext, ref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { l as library$1, e as useBreakpoints, f as breakpointsTailwind, b as useRuntimeConfig } from './server.mjs';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'framesync';
import 'popmotion';
import 'style-value-types';

const _sfc_main = {
  __name: "MacDock",
  __ssrInlineRender: true,
  setup(__props) {
    library$1.add(fab);
    const breakpoints = useBreakpoints(breakpointsTailwind);
    breakpoints.smaller("md");
    ref(null);
    ref(null);
    ref({ cx: "50%", cy: "50%" });
    const config = useRuntimeConfig();
    config.public.dockItems;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dock-container" }, _attrs))} data-v-0e75758a>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MacDock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e75758a"]]);

export { __nuxt_component_0 as default };
//# sourceMappingURL=MacDock-CYuLEv9-.mjs.map
