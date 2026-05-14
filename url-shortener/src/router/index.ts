
import AdminPage from '@/AdminPage.vue'
import DashboardPage from '@/DashboardPage.vue'
import LinkPage from '@/LinkPage.vue'
import LoginPage from '@/LoginPage.vue'
import SettingsPage from '@/SettingsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: DashboardPage
    },
    {
      path: "/shorten",
      name: "shorten",
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
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage
    }
  ],
})

export default router
