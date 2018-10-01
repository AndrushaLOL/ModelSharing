import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddNewModel from '@/components/AddNewModel'
import Register from '@/components/Register'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/add',
      name: 'AddNewModel',
      component: AddNewModel
    }
  ]
})
