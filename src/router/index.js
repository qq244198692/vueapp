import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import content from '@/components/content'
import publish from '@/components/publish'
import self from '@/components/my'
import message from '@/components/message'
import Atalk from '@/components/atalk'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/home',
      name: 'Home',
      component: Home
    },
    {
      path:'/content',
      name:'content',
      component: content
    },
    {
      path:'/publish',
      name:'publish',
      component: publish
    },
    {
      path:'/self',
      name:'self',
      component: self
    },
    {
      path:'/msg',
      name:'msg',
      component: message
    },
    {
      path:'/atalk',
      name:'Atalk',
      component: Atalk
    }
  ]
})
