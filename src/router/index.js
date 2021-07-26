import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
// const Home = () => import("../views/home/home.vue")
const Login = () =>import("../views/login/login.vue")
const Home = () => import("../layout/index.vue")
// import AppIndex from '../components/home/AppIndex'
// import Login from '../components/Login'
import Layout from '../layout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/',
      component: Layout,
      children: [{
        path: 'main',
        name: 'main',
        component: () => import('../views/home/main.vue'), // 懒加载，此处写所添加文件的路径
        meta: {
          title: '主页', icon:'el-icon-s-home' //配置选项可配置测试名称和图标
        }
      }]
    },
    //动态菜单管理
    {
      path: '/menus',
      component: Layout,
      children: [{
        path: 'menus',
        name: 'menus',
        component: () => import('../views/pages/menus'), // 懒加载，此处写所添加文件的路径
        meta: {
          title: '动态菜单管理', icon:'el-icon-menu' //配置选项可配置测试名称和图标
        }
      }]
    },
    //新闻资讯页面
    {
      path: '/news',
      component: Layout,
      children: [{
        path: 'news',
        name: 'news',
        component: () => import('../views/pages/news.vue'), // 懒加载，此处写所添加文件的路径
        meta: {
          title: '新闻资讯管理', icon:'el-icon-reading' //配置选项可配置测试名称和图标
        }
      }]
    },
    //招聘信息
    {
    path: '/recruit',
    component: Layout,
    // meta: {
    //   title: '招聘信息管理',
    //   icon: 'el-icon-user'
    // },
    children: [
      {
        path: 'recruit',
          name: 'recruit',
          component: () => import('../views/pages/recruit.vue'),
          meta: {
            title: '招聘信息管理', icon: 'el-icon-s-custom'
          }
      },
      // {
      //   path: 'social_recruit',
      //     name: 'social_recruit',
      //     component: () => import('../views/pages/recruit/social_recruit'),
      //     meta: {
      //       title: '社会招聘', icon: 'el-icon-s-custom'
      //     }
      // },
      // {
      //   path: 'generate',
      //   name: 'generate',
      //   component: () => import('@/views/material/generate'),
      //   meta: {
      //     title: '生成素材',
      //   }
      // },
      // {
      //   path: 'check',
      //   name: 'check',
      //   component: () => import('@/views/material/check'),
      //   meta: {
      //     title: '查看素材',
      //   }
      // },
    ]
  },
  ]

    
  // const router = new VueRouter({
  //   mode: 'history',
  //   base: peocess
  // })
})