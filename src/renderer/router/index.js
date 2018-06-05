import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: require('@/components/LoginPage').default
    },
    {
      path: '/dashboard',
      name: 'dashboard-page',
      component: require('@/components/DashboardPage').default
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
