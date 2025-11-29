import tailwindcss from "@tailwindcss/vite";
import type { PluginOption } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const appManifestFallbackPlugin = (): PluginOption => {
  const virtualId = "\0watch-app-manifest";

  return {
    name: "watch-app-manifest-fallback",
    apply: "serve",
    resolveId(id) {
      if (id === "#app-manifest") {
        return virtualId;
      }
    },
    load(id) {
      if (id === virtualId) {
        return "export default {}";
      }
    },
  };
};

const manifestFallbackPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "utils/app-manifest-fallback.ts"
);
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    port: 4000,
  },
  svgo: {
    autoImportPath: "./assets/images/",
    componentPrefix: "watch",
    defaultImport: "component",
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [appManifestFallbackPlugin(), tailwindcss()],
    resolve: {
      alias:
        process.env.NODE_ENV === "development"
          ? {
              "#app-manifest": manifestFallbackPath,
            }
          : {},
    },
  },
  build: {
    transpile: [
      "@fortawesome/pro-light-svg-icons",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/vue-fontawesome",
    ],
  },
  modules: ["nuxt-svgo", "@vueuse/motion/nuxt"],
  runtimeConfig: {
    public: {
      dockItems: [
        {
          icon: ["fab", "github"],
          link: "https://github.com/nficano",
          target: "_blank",
        },
        {
          icon: ["fab", "linkedin"],
          link: "https://linkedin.com/in/nficano",
          target: "_blank",
        },
        {
          icon: ["fal", "envelope"],
          link: "mailto:nficano@gmail.com",
          target: "_blank",
        },
        {
          icon: ["fal", "calendar-circle-user"],
          link: "https://fantastical.app/nficano/15m",
          target: "_blank",
        },
      ],
    },
  },
  app: {
    head: {
      meta: [
        {
          name: "description",
          content: "Time is a flat circle",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Bebas+Neue&display=swap",
        },
      ],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["pixel-canvas"].includes(tag),
    },
  },
  components: {
    dirs: [
      {
        path: "~/components",
        global: true,
      },
    ],
  },
});
