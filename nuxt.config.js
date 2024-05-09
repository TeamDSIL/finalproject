import colors from 'vuetify/es5/util/colors'

export default {
  router: {
    extendRoutes(routes, resolve) {
      
      // 기존 라우트 수정도 가능
      // 첫 번째 라우트 수정
      const manageIndex = routes.findIndex(route => route.name === 'restaurant-RestaurantManageMainPage');
      if (manageIndex !== -1) {
        routes[manageIndex].path = '/restaurant/RestaurantManageMainPage/:id';
      }

      // 두 번째 라우트 수정
      const modifyIndex = routes.findIndex(route => route.name === 'restaurant-RestaurantModifyPage');
      if (modifyIndex !== -1) {
        routes[modifyIndex].path = '/restaurant/RestaurantModifyPage/:id';
      }
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    extendRoutes(routes, resolve) {
      // 기존 라우트 수정도 가능
      // 첫 번째 라우트 수정
      const manageIndex = routes.findIndex(route => route.name === 'restaurant-RestaurantManageMainPage');
      if (manageIndex !== -1) {
        routes[manageIndex].path = '/restaurant/RestaurantManageMainPage/:id';
      }
      // 두 번째 라우트 수정
      const modifyIndex = routes.findIndex(route => route.name === 'restaurant-RestaurantModifyPage');
      if (modifyIndex !== -1) {
        routes[modifyIndex].path = '/restaurant/RestaurantModifyPage/:id';
      }
      const writeReview = routes.findIndex(route => route.name === 'myDining-WriteReviewPage');
      if (writeReview !== -1) {
        routes[writeReview].path = '/myDining/WriteReviewPage/:id';
      }

      const myDining = routes.findIndex(route => route.name === 'myDining-MydiningPage');
      if (myDining !== -1) {
        routes[myDining].path = '/myDining/:id';
      }
      const registerIndex = routes.findIndex(route => route.name === 'memberManage-RegisterRestaurantPage');
      if (registerIndex !== -1) {
        routes[registerIndex].path = '/memberManage/RegisterRestaurantPage/:id';
      }

      const reserveIndex = routes.findIndex(route => route.name === 'restaurant-RestaurantDetailPage');
      if (reserveIndex !== -1) {
        routes[reserveIndex].path = '/restaurant/detail';
      }
    },
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
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
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
          // accent: '#0F3460',
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
 ,
    babel:{
      plugins: [
        // ["@babel/plugin-proposal-class-properties", { "loose": true }],
        // ["@babel/plugin-proposal-private-methods", { "loose": true }],
        // ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }  
  },

  env: {
    apiURL: process.env.VUE_APP_API_URL
  }
}
