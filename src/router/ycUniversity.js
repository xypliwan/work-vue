import ycLayout from "@/views/layout/ycLayout";
import master from "@/views/layout/master";
// 易仓大学

export default [
    {
        path: "/yc-university",
        component: master,
        redirect: "/yc-university/history-brows",
        children: [
            {
                path: "/yc-university",
                component: ycLayout,
                redirect: "/yc-university/history-brows",
                children: [
                    {
                        path: "history-brows",        //最近浏览
                        name: "historyBrows",
                        component: () => import("@/views/ycUniversity/historyBrows/index.vue"),
                        meta: {
                            authentication: true,
                            keepAlive: true
                        }
                    },
                    {
                        path: "knowledge-center",        //知识中心
                        name: "knowledgeCenter",
                        component: () => import("@/views/ycUniversity/knowledgeCenter/index.vue"),
                        meta: {
                            authentication: true,
                            keepAlive: true
                        }
                    },
                    {
                        path: "knowledge-manage",        //知识管理
                        name: "knowledgeManage",
                        component: () => import("@/views/ycUniversity/knowledgeManage/index.vue"),
                        meta: {
                            authentication: true,
                            keepAlive: true
                        }
                    },
                    {
                        path: "video-tutorial",        //视频教程
                        name: "videoTutorial",
                        component: () => import("@/views/ycUniversity/videoTutorial/index.vue"),
                        meta: {
                            authentication: true,
                            keepAlive: true
                        }
                    },
                ]
            }
        ]

    }
]