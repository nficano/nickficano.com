import __nuxt_component_0 from './MacDock-CYuLEv9-.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { a as useNuxtApp } from './server.mjs';
import './client-only-Bwxzq3Sq.mjs';
import '@fortawesome/free-brands-svg-icons';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
  __name: "Mobile",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(0);
    const { $fluid } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MacDock = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 w-screen h-screen bg-black overflow-hidden" }, _ctx.$attrs, _attrs))}>`);
      _push(ssrRenderComponent(_component_MacDock, null, null, _parent));
      _push(`<canvas id="fluid" class="absolute top-0 left-0 w-screen h-screen overflow-hidden" style="${ssrRenderStyle({ "z-index": "1" })}"></canvas></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Mobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Mobile-Cm8Of_0D.mjs.map
