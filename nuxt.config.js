import colors from "vuetify/es5/util/colors";

export default {
  server: {
    host: "0.0.0.0", // 모든 IP 주소에서 접근 가능
    port: 3000, // 원하는 포트 번호
  },
  head: {
    titleTemplate: "%s - food-truck",
    title: "food-truck",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;900&display=swap",
      },
    ],
  },
  css: ["@/assets/scss/foodtruck.scss"],
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/event-bus.js'
  ],
  components: {
    dirs: ["~/components", "~/components/session"],
  },
  buildModules: [
    "@nuxtjs/vuetify",
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
  ],
  axios: {
    baseURL: process.env.API_URL,
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
  proxy: {
    '/api/': {
      target: process.env.API_URL,
      pathRewrite: { '^/api/': '' },
      changeOrigin: true,
    },
  },
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: {
      font: false,
    },
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: "#D23F57",
          secondary: "#0F3460",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: "#FF5353",
          success: colors.green.accent3,
        },
      },
    },
  },
  build: {
    transpile: [({ isLegacy }) => isLegacy && "axios"],
    babel: {
      plugins: [],
    },
  },
  env: {
    apiURL: process.env.API_URL,
  },
};
