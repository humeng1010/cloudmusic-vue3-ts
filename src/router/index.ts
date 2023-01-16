import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      name: "home",
      path: "/home",
      component: Home,
      meta: {
        showBar: true
      }
    },
    {
      name: "search",
      path: "/search",
      component: () => import("@/views/Search/Search.vue")
    },
    {
      name: "podcast",
      path: "/podcast",
      component: () => import("@/views/Podcast/Podcast.vue"),
      meta: {
        showBar: true
      }
    },
    {
      name: "me",
      path: "/me",
      component: () => import("@/views/Me/Me.vue"),
      meta: {
        showBar: true
      }
    },
    {
      name: "attention",
      path: "/attention",
      component: () => import("@/views/Attention/Attention.vue"),
      meta: {
        showBar: true
      }
    },
    {
      name: "community",
      path: "/community",
      component: () => import("@/views/Community/Community.vue"),
      meta: {
        showBar: true
      }
    }


  ]
})

export default router
