
import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from './Pages/DashboardPage.vue'
import LinkPage from './Pages/LinkPage.vue'
import SettingsPage from './Pages/SettingsPage.vue'
import LoginPage from './Pages/LoginPage.vue'
import AdminPage from './Pages/AdminPage.vue'

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
