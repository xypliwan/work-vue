import master from '@/views/layout/master'
//快捷回复

export default [
  {
    path: '/reply-template', //快捷回复模板
    component: master,
    children: [
      {
        path: '/reply-template', //快捷回复模板
        name: 'reply-template',
        component: () => import('@/views/replyTemplate/index.vue'),
        meta: {
          authentication: true,
          keepAlive: true
        }
      }
    ]
  }
]
