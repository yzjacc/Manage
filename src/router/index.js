import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'
// eslint-disable-next-line
var demo = localStorage.getItem('user') == 'true' ? true : false

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  // var i = 0
  if (to.path === '/dashboard/pro-basic' && store.getters.id) {
    next('/dashboard/pro-mess')
    console.log(from.path)
  } else next()
})
export default router
