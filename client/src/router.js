import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register'
import Login from './views/Login'
import NotFound from './views/404'
import Home from './views/Home'
import InfoShow from "./views/InfoShow"
import FundList from "./views/FundList"
Vue.use(Router)

// router接收
 const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[
        {path:'',component:Home},
        {path:'/home',name:'home',component:Home},
        {path:'/infoshow',name:'infoshow',component:InfoShow},
        {path:'/fundlist',name:'infoshow',component:FundList}
      ]
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/*',
      name:'404',
      component:NotFound
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断localstorage里面是否有token
  const isLogin = localStorage.eleToken ? true : false;
  
  if(to.path == "/login" || to.path == "/register"){
    next();
  }else{
    // 如果为真，正常跳转，否则跳到登录页面
    isLogin ? next():next('/login');
  }


})

export default router;