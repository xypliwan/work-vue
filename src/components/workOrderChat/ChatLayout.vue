<template>
  <div>
    <view-layout headerHeight="100px">
      <div slot="header">
<<<<<<< HEAD
        <chat-header
          @transferOk="transferOk"
          :chatItemId="chatItemId"
          @getComponentName="getComponentName"
          @causeOk="causeOk"
          @sendInfo="getInfo"
          ref="chatHeaderRef"
        ></chat-header>
      </div>
      <div slot="content" class="content-boxs" ref="contentBoxs">
        <div class="chat-box" :style="{ height: height }" ref="chatBox">
          <split-pane
            @resize="resize"
            :min-percent="25"
            :default-percent="75"
            split="horizontal"
          >
            <template slot="paneL">
              <chat-record
                class="chat-history"
                :chatItemId="chatItemId"
                ref="chatHistory"
              >
=======
        <chat-header @transferOk="transferOk" :chatItemId="chatItemId" @getComponentName="getComponentName" @causeOk="causeOk" @sendInfo="getInfo" ref="chatHeaderRef"></chat-header>
      </div>
      <div slot="content" class="content-boxs" ref="contentBoxs">
        <div class="chat-box" :style="{'height':height}" ref="chatBox">
          <split-pane @resize="resize" :min-percent="20" :default-percent="80" split="horizontal">
            <template slot="paneL">
              <chat-record class="chat-history" :chatItemId="chatItemId" ref="chatHistory">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
                <div slot="autoAdoptionOrder">
                  <div class="order-tips" v-show="autoCustomer == 1">
                    <el-divider>
                      <span class="order-tips-title">如已解决您的问题</span>
                    </el-divider>
                    <div class="order-tips-desc">
                      感谢您使用工单，如已解决您的问题麻烦填写
                      <span class="open-adoption" @click="showAdoptionOrder">
<<<<<<< HEAD
                        <i class="iconfont icon-duigou"></i> 采纳工单 </span
                      >， 对本次服务进行一下总结
=======
                        <i class="iconfont icon-duigou"></i> 采纳工单
                      </span>，
                      对本次服务进行一下总结
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
                    </div>
                  </div>
                </div>
              </chat-record>
            </template>
            <template slot="paneR">
<<<<<<< HEAD
              <div
                class="input-box"
                v-loading="contLoading"
                element-loading-text="正在发送..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0)"
              >
                <chat-boxs @sendInfo="sendInfo" ref="chatBoxs">
                  <span slot="icon">
                    <el-tooltip content="发起邀评" placement="bottom">
                      <i
                        class="iconfont icon-xingxing"
                        style="margin-right: 5px;"
                        v-if="chatService == '1'"
                        @click="invitationVisible = true"
                      ></i>
                    </el-tooltip>
                    <!-- <el-tag
                      size="mini"
                      effect="dark"
                      v-if="
                        isResponseTimeout == 1 &&
                          chatService == '1' &&
                          this.technicalSupportId == '0'
                      "
                      @click="timeoutVisible = true"
                      >选择超时原因</el-tag
                    > -->
                    <el-checkbox
                      v-model="isSendClient"
                      v-if="chatService == '1'"
                      v-show="this.technicalSupportId !== '0'"
                      >发给技术人员</el-checkbox
                    >
                    <system-remind
                      v-if="systemRemindList.length > 0"
                      :list="systemRemindList"
                    ></system-remind>
                    <el-select
                      v-if="checkRemind == '1'"
                      size="mini"
                      class="remand-tag"
                      v-model="remindTagId"
                      placeholder="标签"
                      @change="setRemindTagFn"
                    >
                      <el-option
                        v-for="item in remindTagList"
                        :key="item.tag_id"
                        :label="item.tag_name"
                        :value="item.tag_id"
                      >
                      </el-option>
                    </el-select>
=======
              <div class="input-box" v-loading="contLoading" element-loading-text="正在发送..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0)">
                <chat-boxs @sendInfo="sendInfo" ref="chatBoxs">
                  <span slot="icon">
                    <el-tooltip content="发起邀评" placement="bottom">
                      <i class="iconfont icon-xingxing" style="margin-right: 5px;" v-if="chatService == '1'" @click="invitationVisible = true"></i>
                    </el-tooltip>
                    <el-checkbox v-model="isSendClient" v-if="chatService == '1'" v-show="this.technicalSupportId !== '0'">发给技术人员</el-checkbox>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
                  </span>
                </chat-boxs>
              </div>
            </template>
          </split-pane>
        </div>
<<<<<<< HEAD
        <div class="right-box" :style="{ height: rightHeight }">
=======
        <div class="right-box" :style="{'height':rightHeight}">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          <component
            :is="componentName"
            ref="childsComponents"
            :height="rightHeight"
            :productId="productId"
            @close="close"
            :supportId="technicalSupportId"
            @getSelectCont="getSelectCont"
            @supportUrgent="supportUrgent"
          ></component>
        </div>
      </div>
    </view-layout>

<<<<<<< HEAD
    <initiate-invitation
      v-if="chatService == '1'"
      :supportId="technicalSupportId"
      :questionId="chatItemId"
      :invitationVisible.sync="invitationVisible"
      @serviceInviteOk="serviceInviteOk"
    ></initiate-invitation>

    <response-timeout
      v-if="chatService == '1' && this.technicalSupportId == '0'"
      :questionId="chatItemId"
      :visible.sync="timeoutVisible"
      :list="questionResponseTimeoutList"
    ></response-timeout>
=======
    <initiate-invitation v-if="chatService == '1'" :supportId="technicalSupportId" :questionId="chatItemId" :invitationVisible.sync="invitationVisible" @serviceInviteOk="serviceInviteOk"></initiate-invitation>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters, mapActions } from 'vuex'
import { addAnswer } from '@/api/conversation'
import { getTags } from '@/api/common'
import {
  getRemindContent,
  getRemindTag,
  setRemindTag,
  getRemindTagDetail
} from '@/api/user'
import ViewLayout from '_c/common/Layout'
import ChatHeader from '_c/workOrderChat/ChatHeader'
import ChatRecord from '_c/workOrderChat/ChatRecord'
import ChatBoxs from '_c/chat/Chat'
// 易仓大学
import YcUniversity from '_c/workOrderChat/dialog/YcUniversity'
// 快捷回复
import QuickReply from '_c/workOrderChat/dialog/QuickReply'
//技术支持聊天内容
import SupportChat from '_c/workOrderChat/dialog/SupportChat'
//发起邀评
import InitiateInvitation from './dialog/InitiateInvitation'
//超时原因
import ResponseTimeout from './dialog/ResponseTimeout'

import splitPane from 'vue-splitpane'
// 系统提醒
import SystemRemind from '_c/common/SystemRemind'
=======
import { mapGetters, mapActions } from 'vuex';
import { addAnswer } from '@/api/conversation';
import ViewLayout from '_c/common/Layout';
import ChatHeader from '_c/workOrderChat/ChatHeader';
import ChatRecord from '_c/workOrderChat/ChatRecord';
import ChatBoxs from '_c/chat/Chat';
// 易仓大学
import YcUniversity from '_c/workOrderChat/dialog/YcUniversity';
// 快捷回复
import QuickReply from '_c/workOrderChat/dialog/QuickReply';
//技术支持聊天内容
import SupportChat from '_c/workOrderChat/dialog/SupportChat';
//发起邀评
import InitiateInvitation from './dialog/InitiateInvitation';

import splitPane from 'vue-splitpane';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  props: {
    chatItemId: String, //问题id
    height: String, //聊天框div的高度（外层的高度）
    rightHeight: String //右侧组件的高度
  },
  data() {
    return {
      componentName: '',
      productId: '',
      technicalSupportId: '', ////技术支持id 如果为0 表示没有技术支持
      params: {
        content: '',
        file: {},
        question_id: '', //问题id
        support_id: '' //技术支持id
      },
      invitationVisible: false,
      isSendClient: false, //是否发送给客户
      contLoading: false,
<<<<<<< HEAD
      autoCustomer: 0, //是否显示采纳工单   1显示
      isResponseTimeout: 1,
      questionResponseTimeoutList: [],
      timeoutVisible: false,
      systemRemindList: [],
      remindTagId: '', //系统提醒标签id
      remindTagList: []
    }
  },
  mounted() {
    this.getTagsFn()
    this.getRemindTagFn()
  },
  computed: {
    ...mapGetters(['chatService', 'draftList', 'checkRemind', 'questionRemind'])
=======
      autoCustomer: 0 //是否显示采纳工单   1显示
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(['chatService', 'draftList'])
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  watch: {
    chatItemId: {
      immediate: true,
      handler: function(newVal) {
        if (newVal) {
<<<<<<< HEAD
          this.$nextTick(() => {
            let chatInfoDoms = document.getElementsByClassName('chat-info')[0]
            let oprenBoxDoms = document.getElementsByClassName('opren-box')[0]
            // let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight - 50;
            let editorHeight =
              chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight
            this.$refs.chatBoxs.setEditorHeight(editorHeight)
            this.$refs.chatBoxs.setFoucsEdit()
            // if (newVal !== '' && this.componentName == 'SupportChat') {
            //   this.$refs.childsComponents.clearDataList();
            // }

            if (this.checkRemind == 1) {
              this.getRemindContentFn()
            }
            this.getRemindTagDetailFn()
          })
=======
          let chatInfoDoms = document.getElementsByClassName('chat-info')[0];
          let oprenBoxDoms = document.getElementsByClassName('opren-box')[0];
          let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight - 50;
          this.$nextTick(() => {
            this.$refs.chatBoxs.setEditorHeight(editorHeight);
            this.$refs.chatBoxs.setFoucsEdit();
          });
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        }
      }
    },
    isSendClient(newVal) {
      if (newVal) {
<<<<<<< HEAD
        this.componentName = 'SupportChat'
      }
    },
    questionRemind(newVal) {
      if (newVal) {
        this.systemRemindList.push(newVal)
=======
        this.componentName = 'SupportChat';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },

  methods: {
<<<<<<< HEAD
    ...mapActions(['setDraftList', 'delDraftList', 'setDocumentTitleFlg']),
    async getRemindTagDetailFn() {
      try {
        let { data } = await getRemindTagDetail({
          data_id: this.chatItemId,
          data_type: '1'
        })
        if (data.tag_id_arr.length) {
          this.remindTagId = data.tag_id_arr[0]
        } else {
          this.remindTagId = ''
        }
      } catch (error) {
        this._message(error)
      }
    },
    async setRemindTagFn() {
      const params = {
        tag_id_arr: [this.remindTagId],
        data_id: this.chatItemId,
        data_type: '1'
      }
      try {
        await setRemindTag(params)
      } catch (error) {
        this._message(error)
      }
    },
    async getRemindTagFn() {
      try {
        let { data } = await getRemindTag({ tag_type: '1' })
        this.remindTagList = data
      } catch (error) {
        this._message(error)
      }
    },
    async getRemindContentFn() {
      try {
        const { data } = await getRemindContent({
          data_id: this.chatItemId,
          data_type: '1'
        })
        this.systemRemindList = data
      } catch (error) {
        this._message(error)
      }
    },
    async getTagsFn() {
      try {
        const { data } = await getTags({ tc_code: 'question_response_timeout' })
        this.questionResponseTimeoutList = data
      } catch (error) {
        this._message(error)
      }
    },
    causeOk(data) {
      this.$refs.chatHistory.pushCont(data)
    },
    getEditorHtml() {
      return this.$refs.chatBoxs.getHtml()
    },
    clearEditorHtml() {
      this.$refs.chatBoxs.clearHtml()
    },
    showHtml(val) {
      this.$refs.chatBoxs.showHtml(val)
    },
    resize() {
      //动态设置输入框的高度
      let chatInfoDoms = document.getElementsByClassName('chat-info')[0]
      let oprenBoxDoms = document.getElementsByClassName('opren-box')[0]
      // let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight - 50;
      let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight
      this.$refs.chatBoxs.setEditorHeight(editorHeight)
    },
    serviceInviteOk(obj) {
      this.isSendClient = false
      this.$refs.chatHistory.pushCont(obj.answer)
    },
    supportUrgent(info) {
      this.isSendClient = true
      this.componentName = 'SupportChat'
      this.$refs.childsComponents.pushCont(info)
    },

    getSelectCont(cont) {
      this.params.content = cont
      this.addAnswer(1)
    },
    sendInfo(info) {
      this.params.content = info
      this.addAnswer()
    },
    //isTmpInfo  是否从快捷模板消息过来的   0否  1是
    async addAnswer(isTmpInfo = 0) {
      this.setDocumentTitleFlg(false)
      if (this.isSendClient && this.technicalSupportId !== '0') {
        //发给技术
        this.params.support_id = this.technicalSupportId
        this.params.question_id = ''
      } else {
        //发给当前默认
        this.params.question_id = this.chatItemId
        this.params.support_id = ''
      }
      this.contLoading = true
      try {
        let { data } = await addAnswer(this.params)
        if (this.isSendClient && this.technicalSupportId !== '0') {
          //发给技术
          this.componentName = 'SupportChat'
          this.$nextTick(() => {
            this.$refs.childsComponents.pushCont(data)
          })
        } else {
          //发给当前默认
          this.$refs.chatHistory.pushCont(data)
        }
        this.$emit('updateList', data) //更新左侧列表
        if (isTmpInfo == 0) {
          this.$refs.chatBoxs.clearHtml()
        }
      } catch (error) {
        this._message(error)
      }
      this.contLoading = false
    },
    showAdoptionOrder() {
      this.$refs.chatHeaderRef.adoptWorkOrderVisible = true
    },
    getInfo(info) {
      this.isResponseTimeout = info.isResponseTimeout
      this.productId = info.productId
      this.technicalSupportId = info.supportId
      this.componentName = this.technicalSupportId == '0' ? '' : 'SupportChat'
      this.autoCustomer = info.autoCustomer
    },
    getComponentName(name) {
      this.componentName = name
    },
    close() {
      this.componentName = this.technicalSupportId == '0' ? '' : 'SupportChat'
    },
    transferOk() {
      this.$emit('transferOk')
=======
    ...mapActions(['setDraftList', 'delDraftList']),
    causeOk(data) {
      this.$refs.chatHistory.pushCont(data);
    },
    getEditorHtml() {
      return this.$refs.chatBoxs.getHtml();
    },
    clearEditorHtml() {
      this.$refs.chatBoxs.clearHtml();
    },
    showHtml(val) {
      this.$refs.chatBoxs.showHtml(val);
    },
    resize(e) {
      //动态设置输入框的高度
      let chatInfoDoms = document.getElementsByClassName('chat-info')[0];
      let oprenBoxDoms = document.getElementsByClassName('opren-box')[0];
      let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight - 50;
      this.$refs.chatBoxs.setEditorHeight(editorHeight);
    },
    serviceInviteOk(obj) {
      this.isSendClient = false;
      this.$refs.chatHistory.pushCont(obj.answer);
    },
    supportUrgent(info) {
      this.isSendClient = true;
      this.componentName = 'SupportChat';
      this.$refs.childsComponents.pushCont(info);
    },
    getSelectCont(cont) {
      this.sendInfo(cont);
    },
    sendInfo(info) {
      this.params.content = info;
      this.addAnswer();
    },
    async addAnswer() {
      if (this.isSendClient && this.technicalSupportId !== '0') {
        //发给技术
        this.params.support_id = this.technicalSupportId;
        this.params.question_id = '';
      } else {
        //发给当前默认
        this.params.question_id = this.chatItemId;
        this.params.support_id = '';
      }
      this.contLoading = true;
      try {
        let { data } = await addAnswer(this.params);
        if (this.isSendClient && this.technicalSupportId !== '0') {
          //发给技术
          this.componentName = 'SupportChat';
          this.$nextTick(() => {
            this.$refs.childsComponents.pushCont(data);
          });
        } else {
          //发给当前默认
          this.$refs.chatHistory.pushCont(data);
        }
        this.$emit('updateList', data); //更新左侧列表

        this.$refs.chatBoxs.clearHtml();
      } catch (error) {
        this._message(error);
      }
      this.contLoading = false;
    },
    showAdoptionOrder() {
      this.$refs.chatHeaderRef.adoptWorkOrderVisible = true;
    },
    getInfo(info) {
      this.productId = info.productId;
      this.technicalSupportId = info.supportId;
      this.componentName = this.technicalSupportId == '0' ? '' : 'SupportChat';
      this.autoCustomer = info.autoCustomer;
    },
    getComponentName(name) {
      this.componentName = name;
    },
    close() {
      this.componentName = this.technicalSupportId == '0' ? '' : 'SupportChat';
    },
    transferOk() {
      this.$emit('transferOk');
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    ViewLayout,
    ChatHeader,
    ChatRecord,
    YcUniversity,
    QuickReply,
    SupportChat,
    ChatBoxs,
    InitiateInvitation,
<<<<<<< HEAD
    splitPane,
    ResponseTimeout,
    SystemRemind
  }
}
=======
    splitPane
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.content-boxs {
  display: flex;
  .chat-box {
    flex: 1;
    .input-box {
      height: 100%;
<<<<<<< HEAD
      .remand-tag {
        display: inline-block;
        float: right;
        width: 150px;
        margin-right: 10px;
        ::v-deep .el-input__inner {
          height: 20px;
          line-height: 20px;
        }
        ::v-deep .el-input__icon {
          line-height: 20px;
        }
      }
=======
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
    .chat-history {
      padding: 10px 0px;
      background: #f8f8f8;
    }
  }
  .right-box {
    float: right;
    padding-left: 10px;
    overflow: hidden;
  }
  /deep/ .splitter-pane-resizer {
    opacity: 0.1;
  }
}
.order-tips {
  width: 90%;
  margin: 0px auto;
  margin-top: 50px;
  .order-tips-title {
    font-size: 13px;
    color: #999;
  }
  .order-tips-desc {
    margin-top: 30px;
    font-size: 13px;
    color: #999;
    text-align: center;
    .open-adoption {
      color: #409eff;
      cursor: pointer;
    }
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
