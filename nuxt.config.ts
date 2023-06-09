// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Feeds App",
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  plugins: [{ src: "~/plugins/aos", mode: "client" }],

  // devtools: { enabled: true }
});
