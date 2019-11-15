# work-vue 工单网

# 技术栈 
vue cli3.0 + elementUI + vuex + axios + scss + webSocket

# 项目特色
1. 统一的接口请求封装，携带token验证
2. 统一模块划分api接口管理
3. 角色权限管理
4. webSocket即时通信
5. 聊天消息对方是否已读未读，聊天草稿箱，聊天列表最新消息即时置顶。聊天截图粘贴。快捷发送消息。聊天表情包发送。消息撤回 等等。
6. 支持多种类型文件发送
7. 图片放大预览
5. 多环境打包配置 （内网 + 测试 + 线上）

# 项目描述
一个以客户针对公司服务产品有疑问的情况下提出问题进行解决的即时交流网站。业务主要流程以三个角色（ 客户，客服， 技术人员 ）进行展开。【客服】和【技术人员】为【客户】提出的工单问题进行追踪，交流，解决。【客户】提问题给【客服】，【客服】在不清楚问题的情况下开技术问题提给相关【技术人员】进行解答,然后【客服】反馈给客户。中间各角色可以催办给对方，对方会及时收到通知催办消息。工单问题在不同的流程即时更新状态。

# 测试环境客服身份体验地址: 
http://ecs-test.ecgtool.com/#/home?token=abcdEccang&timestamp=1566546572

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Run your intr
```
npm run intr
```




