import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var router = new Router({
  mode: 'hash',
  base: "/",
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, 
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: resolve => require(['@/views/login'], resolve),
    },
    {
      path: '/transtion',
      name: 'Transtion',
      meta: {
        title: '交易'
      },
      component: resolve => require(['@/views/transtion/Market'], resolve),
    },
    {
      path: '/errorinfo',
      name: 'Errorinfo',
      meta: {
        title: '错误页面'
      },
      component: resolve => require(['@/views/error'], resolve),
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    document.title = to.meta.title //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    //匹配前往的路由不存在
    next("/errorinfo");
  } else {
    if (to.path == '/') {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('status')
      sessionStorage.removeItem('attr')
      sessionStorage.removeItem('countryCode')
      sessionStorage.removeItem('height')
      sessionStorage.removeItem('statusStr')
      sessionStorage.removeItem('refresh')
    }
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next(); //如果匹配到正确跳转
  }
});
export default router
