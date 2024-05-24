import colors from "vuetify/es5/util/colors";

export default {
  // server: {
  //   host: "0.0.0.0", // 모든 IP 주소에서 접근 가능
  //   port: 3000, // 원하는 포트 번호
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'OAuthSuccess',
        path: '/OAuthSuccess',
        component: resolve(__dirname, 'pages/memberManage/OAuthSuccess.vue')
      });
      // 기존 라우트 수정도 가능
      // 첫 번째 라우트 수정
      const manageIndex = routes.findIndex(
        (route) => route.name === "restaurant-RestaurantManageMainPage"
      );
      if (manageIndex !== -1) {
        routes[manageIndex].path = "/restaurant/RestaurantManageMainPage/:id";
      }
      // 두 번째 라우트 수정
      const modifyIndex = routes.findIndex(
        (route) => route.name === "restaurant-RestaurantModifyPage"
      );
      if (modifyIndex !== -1) {
        routes[modifyIndex].path = "/restaurant/RestaurantModifyPage/:id";
      }

      const mydiningList = routes.findIndex(
        (route) => route.name === "myDining-MydiningPage"
      );
      if (mydiningList !== -1) {
        routes[mydiningList].path = "/myDining/MydiningPage/:id";
      }
      const detailIndex = routes.findIndex(
        (route) => route.name === "restaurant-RestaurantDetailPage"
      );
      if (detailIndex !== -1) {
        routes[detailIndex].path = "/restaurant/detail/:id";
      }
      const listIndex = routes.findIndex(
        (route) => route.name === "restaurant-RestaurantListPage"
      );
      if (listIndex !== -1) {
        routes[listIndex].path = "/restaurant/list";
      }
    },
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
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/foodtruck.scss"],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js', // 추가된 플러그인 경로
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ["~/components", "~/components/session"],
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // Axios 모듈 추가
  ],
  // Axios 모듈 설정
  axios: {
    baseURL: process.env.apiURL || 'http://localhost:8000', // 환경 변수 또는 기본 URL 설정
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
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
          // accent: '#0F3460',
          secondary: "#0F3460",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: "#FF5353",
          success: colors.green.accent3,
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isLegacy }) => isLegacy && "axios"],
    babel: {
      plugins: [
        // ["@babel/plugin-proposal-class-properties", { "loose": true }],
        // ["@babel/plugin-proposal-private-methods", { "loose": true }],
        // ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ],
    },
  },
  env: {
    apiURL: process.env.VUE_APP_API_URL,
  },
};
