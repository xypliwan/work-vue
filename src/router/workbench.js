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