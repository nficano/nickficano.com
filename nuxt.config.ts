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
