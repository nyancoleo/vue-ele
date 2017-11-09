import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.config.debug = true

Vue.use(Router)

export default new Router({
  linkActiveClass: 'activeClass',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    { // name: 'goods',
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '*',
      redirect: '/goods'
    }
  ]
})
// Router.push('/goods')
