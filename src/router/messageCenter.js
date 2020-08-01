import master from '@/views/layout/master'
//消息中心

export default [
  {
    path: '/message-center', //消息中心
    component: master,
    children: [
      {
        path: '/message-center', //消息中心
        name: 'message-center',
        component: () => import('@/views/messageCenter/index.vue'),
        meta: {
          authentication: true,
          keepAlive: true
        }
      }
    ]
  }
]
