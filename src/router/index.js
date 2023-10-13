import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/musiclist',
    name: 'musiclist',
    component: () => import('../views/MusicList.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: (to,from,next)=>{
      store.commit('updateFooterShow',false)
      next()
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/ucenter',
    name: 'ucenter',
    beforeEnter: (to,from,next)=>{
      // 没有登陆过
      if(!sessionStorage.getItem('isLogin') || !sessionStorage.getItem('token')) {
        next('/login')
      }else {
        next()
      }
    },
    component: () => import('../views/Ucenter.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login') {
    store.commit('updateFooterShow',false)
  }else {
    store.commit('updateFooterShow',true)
  }
  next()
})

export default router
