import servicePlatformLayout from '@/views/layout/servicePlatformLayout'
import master from '@/views/layout/master'
// 客户服务平台

export default [
  {
    path: '/service-platform',
    component: master,
    // redirect: "/service-platform/submit-work-order",
    children: [
      {
        path: '/service-platform',
        component: servicePlatformLayout,
        // redirect: "/service-platform/submit-work-order",
        children: [
          {
            path: 'submit-work-order', //提交工单
            name: 'submitWorkOrder',
            component: () =>
              import('@/views/servicePlatform/submitWorkOrder/index.vue'),
            meta: {
              authentication: true,
              keepAlive: true
            }
          },
          {
            path: 'technical-support', //技术支持
            name: 'technical-support',
            component: () =>
              import('@/views/servicePlatform/technicalSupport/index.vue'),
            meta: {
              authentication: true,
              keepAlive: true
            }
          },
          {
            path: 'submit-demand', //提交需求
            name: 'submit-demand',
            component: () =>
              import('@/views/servicePlatform/submitDemand/index.vue'),
            meta: {
              authentication: true,
              keepAlive: true
            }
          }
        ]
      }
    ]
  }
]
