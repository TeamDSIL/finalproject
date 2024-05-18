import colors from 'vuetify/es5/util/colors'

module.exports = {  
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/restaurant/payment': {
      target: 'http://localhost:8081/',
      changeOrigin: true 
    }
  },
  router: {
    extendRoutes(routes, resolve) {
      // 기존 라우트 수정도 가능
      // 첫 번째 라우트 수정
      const manageIndex = routes.findIndex(route => route.name === 'memberManage-RegisterRestaurantPage');
      if (manageIndex !== -1) {
        routes[manageIndex].path = '/memberManage/RegisterRestaurantPage/:id';
      }

      // 두 번째 라우트 수정
      const modifyIndex = routes.findIndex(route => route.name === 'restaurant-RestaurantManageMainPage');
      if (modifyIndex !== -1) {
        routes[modifyIndex].path = '/restaurant/RestaurantManageMainPage/:id';
      }
      const detailIndex = routes.findIndex(route => route.name === 'restaurant-RestaurantDetailPage');
      if (modifyIndex !== -1) {
        routes[modifyIndex].path = '/restaurant/detail/:id';
      }
      const listIndex = routes.findIndex(route => route.name === 'restaurant-RestaurantListPage');
      if (modifyIndex !== -1) {
        routes[modifyIndex].path = '/restaurant/list';
      }
    }
  },

  head: {
    titleTemplate: '%s - food-truck',
    title: 'food-truck',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;900&amp;display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/foodtruck.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/session'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false,
    },
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#D23F57',
          secondary: '#0F3460',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: '#FF5353',
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'axios']
  },

  env: {
    apiURL: process.env.VUE_APP_API_URL
  }
}
