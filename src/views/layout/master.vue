<template>
  <div class="wrapper">
    <div class="marster-left">
      <user-bar></user-bar>
    </div>
    <div class="marster-right">
      <router-view></router-view>
    </div>
    <audio id="audio" preload="auto" loop style="height: 0">
      <source src="../../assets/images/info_sound.mp4" type="audio/mp4" />
    </audio>
  </div>
</template>

<script>
import UserBar from '_c/userBar'

import { getAccessToken } from '@/api/user'
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage
} from '_u/localStorage'
import { getUrlKey } from '_u/utils'
import { mapActions, mapGetters } from 'vuex'
import baseURL from '@/config/baseUrl'
import { setInterval, clearInterval } from 'timers'

export default {
  data() {
    return {
      websock: null,

      lockReconnect: false, //是否真正建立连接
      timeout: 28 * 1000, //30秒一次心跳
      timeoutObj: null, //心跳倒计时对象
      serverTimeoutObj: null, //心跳倒计时对象
      timeoutnum: null, //断开 重连倒计时
      isActivation: true,
      titleTimer: null
    }
  },
  created() {
    let id = this.$route.params.id
    // let that = this
    if (this.$route.path !== `/detail/${id}`) {
      if (this.$route.path !== '/') {
        this.initUser()
      } else {
        this.getUserinfo()
        this.setStatusList()
      }
    }
    // this.initWindowFocus()
  },
  computed: {
    ...mapGetters(['documentTitleFlg'])
  },
  watch: {
    documentTitleFlg(newVal) {
      if (!newVal) {
        if (this.titleTimer) {
          clearInterval(this.titleTimer)
        }
        this.titleTimer = null
        document.title = 'ECS-易仓客户服务平台'
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
      'setAnswerReadMand',
      'addQuestionList',
      'setDocumentTitleFlg',
      'setQuestionRemind',
      'setSupportRemind',
      'setNeedRemind'
    ]),
    play() {
      let audio = document.querySelector('#audio')
      audio.play()
      setTimeout(() => {
        audio.pause()
      }, 3500)
    },
    setDocumentTitle(txt) {
      let i = 0
      if (this.documentTitleFlg) {
        if (this.titleTimer) {
          clearInterval(this.titleTimer)
        }
        this.titleTimer = setInterval(() => {
          i++
          if (i % 2 == 0) {
            document.title = `【${txt}】新消息`
          } else {
            document.title = 'ECS-易仓客户服务平台'
          }
        }, 1000)
      }
    },
    initWindowFocus() {
      let that = this
      let hiddenProperty =
        'hidden' in document
          ? 'hidden'
          : 'webkitHidden' in document
          ? 'webkitHidden'
          : 'mozHidden' in document
          ? 'mozHidden'
          : null
      let visibilityChangeEvent = hiddenProperty.replace(
        /hidden/i,
        'visibilitychange'
      )
      let onVisibilityChange = function() {
        if (!document[hiddenProperty]) {
          that.isActivation = true
        } else {
          that.isActivation = false
        }
      }
      document.addEventListener(visibilityChangeEvent, onVisibilityChange)
    },
    async initUser() {
      let token = getUrlKey('token')
      let timestamp = getUrlKey('timestamp')
      if (token && timestamp) {
        this.getAccessToken({ token, timestamp })
      } else {
        if (getLocalStorage('Access-Token')) {
          await this.getUserinfo()
          this.globalData()
        } else {
          //跳往eos登录页
          window.open(baseURL.loginUrl, '_self')
        }
      }
    },
    async getAccessToken(params) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      })
      try {
        let { data } = await getAccessToken(params)
        clearLocalStorage()
        setLocalStorage('Access-Token', data.access_token)
        await this.getUserinfo()
        this.globalData()
        let url = window.location.href
        let valiable = url.split('?')[0]
        window.history.pushState({}, 0, valiable)
      } catch (error) {
        this._message(error)
      }
      loading.close()
    },
    globalData() {
      this.setStatusList()
      this.setInfoCount()
      this.setSupportInfoCount()
      this.initWebSocket()
      this.setMsgCount()
      this.setDemandInfoCount()
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = `${baseURL.sockUrl}?access_token=${getLocalStorage(
        'Access-Token'
      )}`
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      console.log('socket连接成功...')
      if (this.timeoutnum) {
        this.$notify({
          title: '通信服务重新连接成功',
          message: `温馨提示：请刷新当前页面已保证数据正常~`,
          type: 'success',
          duration: 60 * 100 * 30
        })
      }
      this.start()
    },
    reconnect() {
      //重新连接
      if (this.lockReconnect) {
        return
      }
      this.lockReconnect = true
      //没连接上会一直重连，设置延迟避免请求过多
      this.timeoutnum && clearTimeout(this.timeoutnum)
      this.timeoutnum = setTimeout(() => {
        //新连接
        this.initWebSocket()
        this.lockReconnect = false
      }, 5000)
    },
    reset() {
      //重置心跳
      //清除时间
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      //重启心跳
      this.start()
    },
    start() {
      //开启心跳
      this.timeoutObj && clearTimeout(this.timeoutObj)
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
      this.timeoutObj = setTimeout(() => {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (this.websock.readyState == 1) {
          //如果连接正常
          let info = {
            msg: 'heart_connect',
            data: {},
            ws_type: 'heart_connect',
            access_token: getLocalStorage('Access-Token')
          }
          this.websock.send(JSON.stringify(info))
        } else {
          //否则重连
          this.reconnect()
        }
        this.serverTimeoutObj = setTimeout(() => {
          //超时关闭
          this.websock.close()
        }, this.timeout)
      }, this.timeout)
    },
    websocketonerror() {
      console.log('通信服务验证失败')
      this.reconnect()
    },
    websocketonmessage(e) {
      this.reset()
      //数据接收
      // let that = this
      const res = JSON.parse(e.data)
      let titles = ''
      let cont = ''
      switch (res.data.msg_type) {
        case 'heart_connect': //心跳链接
          break
        case 'question': //问题消息1
          // if (that.$route.path !== '/conversation' || !that.isActivation) {
          //   Push.create('工单网新消息', {
          //     body: `来自: ${res.data.user_name}`,
          //     timeout: 40000,
          //     onClick: function() {
          //       that.$router.push('/conversation')
          //       window.focus()
          //       this.close()
          //     }
          //   })
          // }
          this.setDocumentTitleFlg(true)
          this.setDocumentTitle('工单')
          this.play()
          this.setQuestion(res.data)
          break
        case 'support': //支持消息1
          this.setDocumentTitleFlg(true)
          this.setDocumentTitle('技术')
          this.play()
          // if (
          //   that.$route.path !== '/technical-conversation' ||
          //   !that.isActivation
          // ) {
          //   Push.create('工单网新消息', {
          //     body: `来自: ${res.data.user_name}`,
          //     timeout: 40000,
          //     onClick: function() {
          //       that.$router.push('/technical-conversation')
          //       window.focus()
          //       this.close()
          //     }
          //   })
          // }

          this.setSupport(res.data)
          break
        case 'cancel_answer': //消息撤回（包含问题，支持）
          this.setCancelAnswer(res.data)
          break
        case 'chat_list_num': //新消息数字展示(工单)
          this.setInfoCount(res.data.arr)
          break
        case 'chat_list_num_support': //新消息数字展示(技术支持)
          this.setSupportInfoCount(res.data.arr)
          break
        case 'reflash_support': //为刷新支持状态
          this.setDealStatusInfo(res.data)
          break
        case 'answer_read_question': //设置消息已读    问题的答案
          this.setAnswerReadQuestion(res.data)
          break
        case 'answer_read_support': //设置消息已读    支持的答案
          this.setAnswerReadSupport(res.data)
          break
        case 'online_status': //推送工作状态修改消息
          this.setOnlineStatusInfo(res.data)
          break
        case 'message_center': //消息中心的推送
          this.setMsgCenter(res.data)
          break
        case 'needList': //需求消息1
          this.setDocumentTitleFlg(true)
          this.setDocumentTitle('需求')
          this.play()
          // if (that.$route.path !== '/demand-session' || !that.isActivation) {
          //   Push.create('工单网新消息', {
          //     body: `来自: ${res.data.user_name}`,
          //     timeout: 40000,
          //     onClick: function() {
          //       that.$router.push('/demand-session')
          //       window.focus()
          //       this.close()
          //     }
          //   })
          // }
          this.setDemand(res.data)
          break
        case 'chat_list_num_need': //新消息数字展示(需求)
          this.setDemandSocketInfoCount(res.data.arr)
          break
        case 'answer_read_need': //设置消息已读    需求的答案
          this.setAnswerReadMand(res.data)
          break
        case 'pop': //系统工单：转交工单、转交技术支持；技术支持：转交、催办，增加弹出框提醒1
          titles = `来自用户：${res.data.user_name} 的消息`
          cont = `
            <p>${res.data.content}</p>
            <p>${res.data.content2}</p>
            <p>${res.data.msg}</p>
            <p>${res.data.time}</p>
          `
          this.$notify({
            title: titles,
            dangerouslyUseHTMLString: true,
            message: cont,
            duration: 0
          })
          // Push.create('工单网弹出提醒', {
          //   body: `来自: ${res.data.user_name}`,
          //   timeout: 40000,
          //   onClick: function() {
          //     window.focus()
          //     this.close()
          //   }
          // })
          break
        case 'chat_list_append': //增加工单会话列表
          this.addQuestionList(res.data.arr)
          break
        case 'question_remind': // 工单系统提醒
          this.setQuestionRemind(res.data.arr)
          break
        case 'support_remind': // 技术系统提醒
          this.setSupportRemind(res.data.arr)
          break
        case 'need_remind': // 需求系统提醒
          this.setNeedRemind(res.data.arr)
          break
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data)
    },
    websocketclose() {
      this.reconnect()
      this.$notify({
        title: '通信服务连接失败',
        message: `请检查网络正常后重新刷新页面或联系相关人员！`,
        type: 'warning',
        duration: 4000
      })
      //关闭
    }
  },
  components: {
    UserBar
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  display: flex;
  .marster-left {
    width: 80px;
    float: left;
    background: #2a68c9;
    position: relative;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
  }
  .marster-right {
    flex: 1;
    height: 100vh;
    background: #fff;
    overflow: hidden;
    padding: 0px 10px;
    min-width: 1100px;
    position: fixed;
    top: 0;
    left: 80px;
    right: 0;
  }
}
</style>
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
