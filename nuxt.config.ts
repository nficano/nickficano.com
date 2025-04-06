import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  svgo: {
    autoImportPath: "./assets/images/",
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
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
