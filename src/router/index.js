import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/master'
import Detail from '@/views/layout/articleDetail'
import conversation from './conversation' //工单会话
import replyTemplate from './replyTemplate' //回复模板
import ycUniversity from './ycUniversity' // 易仓大学
import servicePlatform from './servicePlatform' //客户服务平台
import backManage from './backManage' //后台管理
import workbench from './workbench' //工作台
import messageCenter from './messageCenter' //消息中心

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            authentication: true,
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/order-search',
      component: Layout,
      children: [
        {
          path: '/order-search',
          name: 'order-search',
          component: () => import('@/views/oldOrder/index.vue'),
          meta: {
            authentication: true,
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/cont-search',
      component: Layout,
      children: [
        {
          path: '/cont-search',
          name: 'cont-search',
          component: () => import('@/views/contSearch/index.vue'),
          meta: {
            authentication: true,
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    ...conversation,
    ...replyTemplate,
    ...ycUniversity,
    ...servicePlatform,
    ...backManage,
    ...workbench,
    ...messageCenter
  ]
})

router.beforeEach((to, from, next) => {
  let id = to.params.id
  if (to.path == `/detail/${id}`) {
    next()
  } else {
    next()
    // if (!getLocalStorage('Access-Token')) {
    //     window.open(baseURL.loginUrl, '_self');
    // } else {
    //     next()
    // }
  }
})

export default router
