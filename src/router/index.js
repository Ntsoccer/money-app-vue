import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Money from '../views/Money.vue'
import firebase from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      const currentUser = firebase.auth().currentUser
      if (!currentUser) {
        next()
      } else {
        next('/money')
      }
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter(to, from, next) {
      const currentUser = firebase.auth().currentUser
      if (!currentUser) {
        next('/')
      } else {
        next('/')
      }
    }
  },
  {
    path: '/money',
    name: 'Money',
    component: Money,
    beforeEnter(to, from, next) {
      const currentUser = firebase.auth().currentUser
      if (!currentUser) {
        next('/')
      } else {
        next()
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
