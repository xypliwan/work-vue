<<<<<<< HEAD
import master from '@/views/layout/master'

//公共
export default [
  {
    path: '/conversation',
    component: master,
    children: [
      {
        path: '/conversation', //工单会话
        name: 'conversation',
        component: () => import('@/views/conversation/index.vue'),
        meta: {
          authentication: true,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/technical-conversation',
    component: master,
    children: [
      {
        path: '/technical-conversation', //技术会话
        name: 'technical-conversation',
        component: () => import('@/views/technicalConversation/index.vue'),
        meta: {
          authentication: true,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/demand-session',
    component: master,
    children: [
      {
        path: '/demand-session', //需求会话
        name: 'demand-session',
        component: () => import('@/views/demandSession/index.vue'),
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

//公共
export default [
    {
        path: "/conversation",
        component: master,
        children: [
            {
                path: "/conversation",        //工单会话
                name: "conversation",
                component: () => import("@/views/conversation/index.vue"),
                meta: {
                    authentication: true,
                    keepAlive: true
                }
            },
        ]
    },
    {
        path: "/technical-conversation",
        component: master,
        children: [
            {
                path: "/technical-conversation",        //技术会话
                name: "technical-conversation",
                component: () => import("@/views/technicalConversation/index.vue"),
                meta: {
                    authentication: true,
                    keepAlive: true
                }
            },
        ]
    },
    {
        path: "/demand-session",
        component: master,
        children: [
            {
                path: "/demand-session",        //需求会话
                name: "demand-session",
                component: () => import("@/views/demandSession/index.vue"),
                meta: {
                    authentication: true,
                    keepAlive: true
                }
            },
        ]
    }
]
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
