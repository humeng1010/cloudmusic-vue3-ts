import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: Home
    },
    {
      name: "search",
      path: "/search",
      component: () => import("@/views/Search/Search.vue")
    }


  ]
})

export default router
