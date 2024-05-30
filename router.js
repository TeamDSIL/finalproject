import Vue from 'vue';
import Router from 'vue-router';
import AccessDenied from '~/pages/access-denied.vue';  // 실제 파일 경로로 변경
import NotFound from '~/pages/NotFound.vue';
import Main from '~/pages/main/MainPage.vue';
import LoginPage from '~/pages/memberManage/LoginPage.vue';

Vue.use(Router);

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: "/access-denied",
      component: AccessDenied,
      name: "access-denied"
    },
    {
      path: "/",
      component: Main,
      name: "main"
    },
    {
      path: "/memberManage/loginPage",
      component: LoginPage,
      name: "loginPage"
    },
    // 기타 경로 설정 생략
    {
      path: "*",
      component: NotFound,
      name: "NotFound"
    }
  ],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base;
  const router = new Router({ ...routerOptions, base });

  return router;
}
