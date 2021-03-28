import Vue from 'vue'
import VueRouter from 'vue-router'

import Title from '@/views/Title'
import Item from '@/views/Item'
import Roulette from '@/views/Roulette'


Vue.use(VueRouter)
// VueRouterインスタンスを生成する
const router = new VueRouter({
  mode:"history",
  routes: [
    {
      path:"/",
      component: Title
    },
    {
        path:"/item",
        component: Item
      },
      {
        path:"/roulette",
        component: Roulette
      }
  ],
  base: ""
})

export default router
