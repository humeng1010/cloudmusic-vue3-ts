import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import NotFound from '@/views/NotFound/NotFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:any",
      component: NotFound
    },
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: "/login",
      component: () => import("@/views/Login/Login.vue")
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
      name: "songList",
      path: "/song-list",
      /*  props: (router) => {
         return router.query.keyword
       }, */
      component: () => import("@/views/songList/SongList.vue")
    },
    {
      name: "privatefm",
      path: "/privatefm",
      component: () => import("@/views/Home/components/views/Privatefm/privatefm.vue")
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
