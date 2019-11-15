<template>
  <div>
    <view-layout headerHeight="100px">
      <div slot="header">
        <chat-header @transferOk="transferOk" :chatItemId="chatItemId" @getProductId="getProductId" @getComponentName="getComponentName" @hasTechnicalSupport="hasTechnicalSupport"></chat-header>
      </div>
      <div slot="content" class="content-boxs" ref="contentBoxs">
        <div class="chat-box" ref="chatBox">
          <div class="history-chat">
            <chat-record :height="height" :chatItemId="chatItemId" ref="chatHistory"></chat-record>
          </div>
          <div class="input-box" v-loading="contLoading" element-loading-text="正在发送..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0)">
            <chat-boxs @sendInfo="sendInfo" ref="chatBoxs">
              <span slot="icon">
                <i class="iconfont icon-xingxing" v-if="chatService == '1'" title="发起邀评" @click="invitationVisible = true"></i>
                <el-checkbox v-model="isSendClient" v-if="chatService == '1'" v-show="this.technicalSupportId !== '0'">发给技术人员</el-checkbox>
              </span>
            </chat-boxs>
          </div>
        </div>
        <div class="right-box">
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

    <initiate-invitation v-if="chatService == '1'" :questionId="chatItemId" :invitationVisible.sync="invitationVisible" @serviceInviteOk="serviceInviteOk"></initiate-invitation>
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

export default {
  props: {
    chatItemId: String, //问题id
    height: String, //聊天历史div的高度
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
      contLoading: false
    };
  },
  computed: {
    ...mapGetters(['chatService', 'draftList','distance'])
  },

  watch: {
    isSendClient(newVal) {
      if (newVal) {
        this.componentName = 'SupportChat';
      }
    },
    chatItemId(newVal, olaVal) {
      if (newVal !== '') {
        let oldHtml = this.$refs.chatBoxs.getHtml();
        this.$refs.chatBoxs.clearHtml();

        //每次切换时，判断是否【存】草稿
        if (oldHtml.length > 0 && olaVal !== '') {
          //当输入框内容不为空并且上一次的工单id不为空是，记录为草稿
          let item = {
            id: olaVal,
            cont: oldHtml
          };
          this.hasDraftDIndex(olaVal);
          this.setDraftList(item);
        } else if (oldHtml.length == 0 && olaVal !== '') {
          //内容不为空时
          this.hasDraftDIndex(olaVal);
        }

        //每次切换时，判断当前新的工单是否【有】草稿
        let hasItem = this.draftList.find(item => item.id === newVal);
        if (hasItem) {
          this.$refs.chatBoxs.showHtml(hasItem.cont);
        }
      }
    }
  },

  methods: {
    ...mapActions(['setDraftList', 'delDraftList']),
    hasDraftDIndex(id) {
      //查找草稿箱是否有当前的草稿
      let findIndex = this.draftList.findIndex(item => item.id === id);
      if (findIndex !== -1) {
        //找不到
        this.delDraftList(findIndex);
      }
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
          this.$emit('updateList', data); //更新左侧列表
          //发给当前默认
          this.$refs.chatHistory.pushCont(data);
        }

        this.$refs.chatBoxs.clearHtml();
      } catch (error) {
        this._message(error);
      }
      this.hasDraftDIndex(this.chatItemId);
      this.contLoading = false;
    },
    hasTechnicalSupport(flg) {
      this.technicalSupportId = flg;
      this.componentName = this.technicalSupportId == '0' ? '' : 'SupportChat';
    },
    getComponentName(name) {
      this.componentName = name;
    },
    close() {
      this.componentName = this.technicalSupportId == '0' ? '' : 'SupportChat';
    },
    getProductId(id) {
      this.productId = id;
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
    InitiateInvitation
  }
};
</script>

<style lang="scss" scoped>
.content-boxs {
  display: flex;
  .chat-box {
    flex: 1;
    .history-chat {
      // height: calc(100vh - 100px - 170px);
      overflow: hidden;
      padding: 10px 0px;
      background: #f8f8f8;
    }
    .input-box {
      // height: 150px;
      // background: #ccc;
    }
  }
  .right-box {
    float: right;
    padding-left: 10px;
  }
}
</style>