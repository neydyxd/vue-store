import LoginPage from "./app/pages/LoginPage/LoginPage.vue";
import MainPage from "./app/pages/MainPage/MainPage.vue";
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: MainPage,
    props: (route) => ({
      currentPage: parseInt(route.query.page) || 1,
      rowsInPage: parseInt(route.query.rows) || 5
    })
  },
  {
    path: '/sign-in',
    component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
