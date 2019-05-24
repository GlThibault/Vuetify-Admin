import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "home" */ './components/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './components/Login.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "settings" */ './components/Settings.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.admin.connected && to.query.redirect) {
      return next({ path: to.query.redirect })
    }
    if (!store.state.admin.connected) {
      return next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
  }
  return next()
})

export default router