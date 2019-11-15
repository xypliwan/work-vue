<template>
  <div>
    <view-layout headerHeight="100px">
      <div slot="header">
        <chat-header @transferOk="transferOk" :chatItemId="chatItemId" @getComponentName="getComponentName" @causeOk="causeOk" @sendInfo="getInfo" ref="chatHeaderRef"></chat-header>
      </div>
      <div slot="content" class="content-boxs" ref="contentBoxs">
        <div class="chat-box" :style="{'height':height}" ref="chatBox">
          <split-pane @resize="resize" :min-percent="20" :default-percent="80" split="horizontal">
            <template slot="paneL">
              <chat-record class="chat-history" :chatItemId="chatItemId" ref="chatHistory">
                <div slot="autoAdoptionOrder">
                  <div class="order-tips" v-show="autoCustomer == 1">
                    <el-divider>
                      <span class="order-tips-title">如已解决您的问题</span>
                    </el-divider>
                    <div class="order-tips-desc">
                      感谢您使用工单，如已解决您的问题麻烦填写
                      <span class="open-adoption" @click="showAdoptionOrder">
                        <i class="iconfont icon-duigou"></i> 采纳工单
                      </span>，
                      对本次服务进行一下总结
                    </div>
                  </div>
                </div>
              </chat-record>
            </template>
            <template slot="paneR">
              <div class="input-box" v-loading="contLoading" element-loading-text="正在发送..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0)">
                <chat-boxs @sendInfo="sendInfo" ref="chatBoxs">
                  <span slot="icon">
                    <el-tooltip content="发起邀评" placement="bottom">
                      <i class="iconfont icon-xingxing" style="margin-right: 5px;" v-if="chatService == '1'" @click="invitationVisible = true"></i>
                    </el-tooltip>
                    <el-checkbox v-model="isSendClient" v-if="chatService == '1'" v-show="this.technicalSupportId !== '0'">发给技术人员</el-checkbox>
                  </span>
                </chat-boxs>
              </div>
            </template>
          </split-pane>
        </div>
        <div class="right-box" :style="{'height':rightHeight}">
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

    <initiate-invitation v-if="chatService == '1'" :supportId="technicalSupportId" :questionId="chatItemId" :invitationVisible.sync="invitationVisible" @serviceInviteOk="serviceInviteOk"></initiate-invitation>
  </div>
</template>

<script>
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
      autoCustomer: 0 //是否显示采纳工单   1显示
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(['chatService', 'draftList'])
  },
  watch: {
    chatItemId: {
      immediate: true,
      handler: function(newVal) {
        if (newVal) {
          let chatInfoDoms = document.getElementsByClassName('chat-info')[0];
          let oprenBoxDoms = document.getElementsByClassName('opren-box')[0];
          let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight - 50;
          this.$nextTick(() => {
            this.$refs.chatBoxs.setEditorHeight(editorHeight);
            this.$refs.chatBoxs.setFoucsEdit();
          });
        }
      }
    },
    isSendClient(newVal) {
      if (newVal) {
        this.componentName = 'SupportChat';
      }
    }
  },

  methods: {
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
    splitPane
  }
};
</script>

<style lang="scss" scoped>
.content-boxs {
  display: flex;
  .chat-box {
    flex: 1;
    .input-box {
      height: 100%;
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
</style>