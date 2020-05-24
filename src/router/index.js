import Vue from 'vue'
import VueRouter from 'vue-router'
import All from '../views/All.vue'
import Complete from '../views/Complete.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'All',
    component: All
  },
  {
    path: '/active',
    name: 'Active',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Active.vue')
  },
  {
    path: '/complete',
    name: 'Complete',
    component: Complete
  },
  {
    path: '*',
    redirect: { name: 'All' }
  }
]

const router = new VueRouter({
  routes
})

export default router
