import LinkPage from '@/LinkPage.vue'
import LoginPage from '@/LoginPage.vue'
import SettingsPage from '@/SettingsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: LinkPage
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    }
  ],
})

export default router
