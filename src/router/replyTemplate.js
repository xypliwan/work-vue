<<<<<<< HEAD
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
=======
import master from "@/views/layout/master";
//快捷回复

export default [
    {
        path: "/reply-template",        //快捷回复模板
        component: master,
        children: [
            {
                path: "/reply-template",        //快捷回复模板
                name: "reply-template",
                component: () => import("@/views/replyTemplate/index.vue"),
                meta: {
                    authentication: true,
                    keepAlive: true
                }
            },
        ]
    },
]
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
