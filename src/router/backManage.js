import master from '@/views/layout/master'

//公共
export default [
  {
    path: '/back-manage',
    component: master,
    children: [
      {
        path: '/back-manage', //后台管理
        name: 'backManage',
        component: () => import('@/views/backManage/index.vue'),
        meta: {
          authentication: true,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/tapd',
    component: master,
    children: [
      {
        path: '/tapd', //tapd
        name: 'tapd',
        component: () => import('@/views/tapd/index.vue'),
        meta: {
          authentication: true,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/old-order',
    component: master,
    children: [
      {
        path: '/old-order', //就工单临时搜索
        name: 'old-order',
        component: () => import('@/views/oldOrder/index.vue'),
        meta: {
          authentication: true,
          keepAlive: true
        }
      }
    ]
  }
]
