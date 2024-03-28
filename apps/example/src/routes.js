import LoginPage from "./app/pages/LoginPage/LoginPage.vue";
import MainPage from "./app/pages/MainPage/MainPage.vue";
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: MainPage
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
