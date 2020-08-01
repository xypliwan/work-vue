<<<<<<< HEAD
import master from '@/views/layout/master'
//工作台

export default [
  {
    path: '/workbench', //工作台
    component: master,
    children: [
      {
        path: '/workbench', //工作台
        name: 'workbench',
        component: () => import('@/views/workbench/index.vue'),
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
//工作台

export default [
    {
        path: "/workbench",        //工作台
        component: master,
        children: [
            {
                path: "/workbench",        //工作台
                name: "workbench",
                component: () => import("@/views/workbench/index.vue"),
                meta: {
                    authentication: true,
                    keepAlive: true
                },
            },
        ]
    },
]
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
