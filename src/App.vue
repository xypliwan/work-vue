<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/common';
import { getAccessToken } from '@/api/user';
import { getLocalStorage, setLocalStorage, clearLocalStorage } from '_u/localStorage';
import { getUrlKey } from '_u/utils';
import { mapActions } from 'vuex';
import baseURL from '@/config/baseUrl';
import axios from 'axios';
export default {
  data() {
    return {
      websock: null,
      count: 1,
      timer: null,

      lockReconnect: false, //是否真正建立连接
      timeout: 28 * 1000, //30秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null //断开 重连倒计时
    };
  },
  created() {
    let id = this.$route.params.id;
    if (this.$route.path !== `/detail/${id}`) {
      if (this.$route.path == '/') {
        this.initUser();
      } else {
        this.getUserinfo();
        this.setStatusList();
      }
    }
  },
  methods: {
    ...mapActions([
      'setStatusList',
      'setQuestion',
      'setSupport',
      'setCancelAnswer',
      'setInfoCount',
      'setDealStatusInfo',
      'setAnswerReadQuestion',
      'setAnswerReadSupport',
      'setOnlineStatusInfo',
      'setSupportInfoCount',
      'setMsgCenter',
      'setMsgCount',
      'getUserinfo',
      'setDemandInfoCount',
      'setDemand',
      'setDemandSocketInfoCount',
      'setAnswerReadMand'
    ]),
    async initUser() {
      // 客户
      // setLocalStorage('Access-Token', 'serviceEccang');
      //客服
      // setLocalStorage('Access-Token', 'abcdEccang');
      // setLocalStorage('Access-Token', 'b7c6a9214ccde4187b91e8ee954c27d6c318ce12e109a9a6914c729d09d9b334');
      //技术
      // setLocalStorage('Access-Token', 'tecEccang');
      let token = getUrlKey('token');
      let timestamp = getUrlKey('timestamp');
      if (token && timestamp) {
        this.getAccessToken({ token, timestamp });
      } else {
        if (getLocalStorage('Access-Token')) {
          await this.getUserinfo();
          this.globalData();
        } else {
          //跳往eos登录页
          window.open(baseURL.loginUrl, '_self');
        }
      }
    },
    async getAccessToken(params) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      try {
        let { data } = await getAccessToken(params);
        clearLocalStorage();
        setLocalStorage('Access-Token', data.access_token);
        await this.getUserinfo();
        this.globalData();
        let url = window.location.href;
        let valiable = url.split('?')[0];
        window.history.pushState({}, 0, valiable);
      } catch (error) {
        this._message(error);
      }
      loading.close();
    },
    globalData() {
      this.setStatusList();
      this.setInfoCount();
      this.setSupportInfoCount();
      this.initWebSocket();
      this.setMsgCount();
      this.setDemandInfoCount();
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = `${baseURL.sockUrl}?access_token=${getLocalStorage('Access-Token')}`;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log('socket连接成功...');
      if (this.timeoutnum) {
        this.$notify({
          title: '通信服务重新连接成功',
          message: `温馨提示：请刷新当前页面已保证数据正常~`,
          type: 'success',
          duration: 60 * 100 * 30
        });
      }
      this.start();
    },
    reconnect() {
      //重新连接
      if (this.lockReconnect) {
        return;
      }
      this.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      this.timeoutnum && clearTimeout(this.timeoutnum);
      this.timeoutnum = setTimeout(() => {
        //新连接
        this.initWebSocket();
        this.lockReconnect = false;
      }, 5000);
    },
    reset() {
      // console.log('重置心跳');
      //重置心跳
      //清除时间
      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
      //重启心跳
      this.start();
    },
    start() {
      //开启心跳
      this.timeoutObj && clearTimeout(this.timeoutObj);
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
      this.timeoutObj = setTimeout(() => {
        // console.log('开启心跳');
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (this.websock.readyState == 1) {
          //如果连接正常
          let info = {
            msg: 'heart_connect',
            data: {},
            ws_type: 'heart_connect',
            access_token: getLocalStorage('Access-Token')
          };
          this.websock.send(JSON.stringify(info));
        } else {
          //否则重连
          this.reconnect();
        }
        this.serverTimeoutObj = setTimeout(() => {
          //超时关闭
          this.websock.close();
        }, this.timeout);
      }, this.timeout);
    },
    websocketonerror() {
      console.log('通信服务验证失败');
      this.reconnect();
    },
    websocketonmessage(e) {
      this.reset();
      //数据接收
      const res = JSON.parse(e.data);
      // console.log(res.data, 'socket');
      switch (res.data.msg_type) {
        case 'heart_connect': //心跳链接
          break;
        case 'question': //问题消息
          this.setQuestion(res.data);
          break;
        case 'support': //支持消息
          this.setSupport(res.data);
          break;
        case 'cancel_answer': //消息撤回（包含问题，支持）
          this.setCancelAnswer(res.data);
          break;
        case 'chat_list_num': //新消息数字展示(工单)
          this.setInfoCount(res.data.arr);
          break;
        case 'chat_list_num_support': //新消息数字展示(技术支持)
          this.setSupportInfoCount(res.data.arr);
          break;
        case 'reflash_support': //为刷新支持状态
          this.setDealStatusInfo(res.data);
          break;
        case 'answer_read_question': //设置消息已读    问题的答案
          this.setAnswerReadQuestion(res.data);
          break;
        case 'answer_read_support': //设置消息已读    支持的答案
          this.setAnswerReadSupport(res.data);
          break;
        case 'online_status': //推送工作状态修改消息
          this.setOnlineStatusInfo(res.data);
          break;
        case 'message_center': //消息中心的推送
          this.setMsgCenter(res.data);
          break;
        case 'needList': //需求消息
          this.setDemand(res.data);
          break;
        case 'chat_list_num_need': //新消息数字展示(需求)
          this.setDemandSocketInfoCount(res.data.arr);
          break;
        case 'answer_read_need': //设置消息已读    需求的答案
          this.setAnswerReadMand(res.data);
          break;
        case 'pop': //系统工单：转交工单、转交技术支持；技术支持：转交、催办，增加弹出框提醒
          let titles = `来自用户：${res.data.user_name} 的消息`;
          let cont = `
            <p>${res.data.content}</p>
            <p>${res.data.content2}</p>
            <p>${res.data.msg}</p>
            <p>${res.data.time}</p>
          `;
          this.$notify({
            title: titles,
            dangerouslyUseHTMLString: true,
            message: cont,
            duration: 0
          });
          break;
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      this.reconnect();
      this.$notify({
        title: '通信服务连接失败',
        message: `请检查网络正常后重新刷新页面或联系相关人员！`,
        type: 'warning',
        duration: 4000
      });
      //关闭
    }
  },
  components: {}
};
</script>

<style lang="scss">
.special-box {
  .el-tabs__header {
    margin: 0 !important;
    margin-top: 10px !important;
  }
  .el-tabs__nav {
    width: 100% !important;
    display: flex !important;
    .el-tabs__item {
      flex: 1 !important;
      text-align: center !important;
      line-height: 50px !important;
      height: 50px !important;
    }
    .el-badge__content {
      top: 10px !important;
      line-height: 17px !important;
    }
  }
  .el-tabs__header {
    margin: 0 !important;
    margin-top: 10px !important;
  }
}
.el-notification {
  background: #d9e3f3 !important;
}
</style>


