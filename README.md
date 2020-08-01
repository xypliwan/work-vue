# work-vue 工单项目

## 项目资源

    - node >= 10.15.1
    - vue-cli 3.0
    - vue 2.6
    - element-ui 2.11.1
    - sass
    - eslint
    - webSocket

## 目录结构

    src
        assets/      静态资源
        components/  公用组件
        router/      路由模块
        api/         接口中心
        store/       公共数据缓存
        utils/       公用方法
        config/      全局配置
        views/       基础页面
        views/layout 公用布局


## 正式线打包脚本

    npm run build

## 测试打包脚本

    npm run test

## 项目其它访问地址

    gitlab仓库：http://ec-gitlab.ecgtool.com/ecs/work-vue
    接口文档：??? ( 19年2月底服务器跪了，导致接口文档丢失，待后端补充 )

## 接口环境

    正式线地址:http://ecsapi.ecgtool.com
    测试线地址:http://ecsapi-test.ecgtool.com

## 如何登录该系统？

1. 通过 EOS 后台系统主界面 > 客户服务平台 ，点击进入该系统。

   EOS 测试线：测试地址：http://eos-test.ecgtool.com/ 登陆账号：sheen 123456

   EOS 正式线：正式地址：http://eos.ecgtool.com/ 登陆账号：联系相关管理员获取

   跳转链接形式: xxx.com?token=xxx&timestamp=xxx

2. http://ecs-test.ecgtool.com/#/home?token=abcdEccang&timestamp=1566546572

## 项目说明：

该系统登陆账号分为三个身份：`客服`，`客户`，`技术`。 不同身份账号拥有不同的业务逻辑，具体见业务。

## 测试线账号 （此账号为‘EOS 后台管理系统’测试登陆账号，需要点击‘客户服务平台’跳转到此系统）

| 角色 | 账号     | 密码   |
| ---- | -------- | ------ |
| 客服 | service  | 123456 |
| 客户 | customer | 123456 |
| 技术 | tec      | 123456 |
