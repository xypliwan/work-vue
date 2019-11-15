<template>
  <div>
    <view-layout headerHeight="100px">
      <div slot="header">
        <support-header ref="supportHeader" @sendDealStatus="getDealStatus" :chatItemId="chatItemId" @changeOk="changeOk" @supportUrgent="supportUrgent"></support-header>
      </div>
      <div slot="content" class="content-boxs" ref="contentBoxs">
        <div class="chat-box" :style="{'height':height}" ref="chatBox">
          <split-pane @resize="resize" :min-percent="20" :default-percent="80" split="horizontal">
            <template slot="paneL">
              <chat-record class="chat-history" :supportId="chatItemId" ref="chatHistory"></chat-record>
            </template>
            <template slot="paneR">
              <div class="input-box" v-loading="contLoading" element-loading-text="正在发送..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0)">
                <chat-boxs @sendFile="sendFile" @sendInfo="sendInfo" ref="chatBoxs">
                  <span slot="icon">
                    <el-tooltip content="开始处理" placement="bottom" v-if="(dealStatus == '0' || dealStatus == '3') && dealButton == '1'">
                      <i class="iconfont icon-kaishi1" v-if="(dealStatus == '0' || dealStatus == '3') && dealButton == '1'" @click="startProcessing"></i>
                    </el-tooltip>
                    <el-tooltip content="结束处理" placement="bottom" v-if="dealStatus == '1' && dealButton == '1'">
                      <i class="iconfont icon-zanting1" v-if="dealStatus == '1' && dealButton == '1'" @click="invitationVisible = true"></i>
                    </el-tooltip>
                  </span>
                </chat-boxs>
              </div>
            </template>
          </split-pane>
        </div>
      </div>
    </view-layout>

    <initiate-invitation @changeStatus="changeStatus" :supportId="chatItemId" :invitationVisible.sync="invitationVisible"></initiate-invitation>
  </div>
</template>

<script>
import ViewLayout from '_c/common/Layout';
import ChatBoxs from '_c/chat/Chat';
import ChatRecord from './ChatRecord';
import SupportHeader from './SupportHeader';
import InitiateInvitation from './dialog/InitiateInvitation';
import { startSupportDeal } from '@/api/workbench';
import { getSupportAnswer, addAnswer } from '@/api/conversation';
import { mapGetters, mapActions } from 'vuex';
import splitPane from 'vue-splitpane';
export default {
  props: {
    chatItemId: String, //支持id
    height: String //聊天历史div的高度
  },
  data() {
    return {
      contLoading: false,
      dealStatus: '', //0未处理 1处理中 2已解决 3未解决
      dealButton: '', //开始处理，结束处理的按钮是否显示   1显示
      invitationVisible: false,
      params: {
        content: '',
        file: {},
        question_id: '', //问题id
        support_id: '' //技术支持id
      }
    };
  },
  computed: {
    ...mapGetters(['dealStatusInfo', 'draftList'])
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
    dealStatusInfo(newVal) {
      if (newVal.support_id == this.chatItemId) {
        this.$refs.supportHeader.detail.deal_status_name = newVal.deal_status_name;
        this.dealStatus = newVal.deal_status;
      }
    }
  },
  methods: {
    ...mapActions(['setDraftList', 'delDraftList']),
    getEditorHtml() {
      return this.$refs.chatBoxs.getHtml();
    },
    clearEditorHtml() {
      this.$refs.chatBoxs.clearHtml();
    },
    showHtml(val) {
      this.$refs.chatBoxs.showHtml(val);
    },
    resize() {
      let chatInfoDoms = document.getElementsByClassName('chat-info')[0];
      let oprenBoxDoms = document.getElementsByClassName('opren-box')[0];
      let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight - 50;
      this.$refs.chatBoxs.setEditorHeight(editorHeight);
    },
    supportUrgent(info) {
      this.params.content = info.content;
      this.addAnswer();
    },
    sendFile(data) {
      //发送聊天信息----发送上传的图片
      let cont = `<img src="${data.url}"  alt="${data.file_name}" />`;
      this.params.content = cont;
      this.addAnswer();
    },
    sendInfo(info) {
      this.params.content = info;
      this.addAnswer();
    },
    async addAnswer() {
      if (this.params.content.length <= 0) {
        return;
      }
      this.contLoading = true;
      this.params.support_id = this.chatItemId;
      try {
        let { data } = await addAnswer(this.params);
        this.$refs.chatHistory.pushCont(data);
        this.$refs.chatBoxs.clearHtml();
        this.$emit('updateList', data); //更新左侧列表
      } catch (error) {
        this._message(error);
      }
      this.contLoading = false;
    },
    changeStatus(data) {
      this.dealStatus = data.deal_status;
      let info = data.answer;
      // this.params.content = info.content;
      // this.addAnswer();
      this.$refs.chatHistory.pushCont(info);
      this.$refs.supportHeader.getSupportDetail();
    },
    startProcessing() {
      this.$confirm('确定开始处理该技术支持吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.startSupportDeal();
        })
        .catch(() => {});
    },
    async startSupportDeal() {
      try {
        let { message, data } = await startSupportDeal({ support_id: this.chatItemId });
        this.dealStatus = data.deal_status;
        this._message(message, 'success');
        let info = data.answer;
        this.$refs.chatHistory.pushCont(info);
        this.$refs.supportHeader.getSupportDetail();
      } catch (error) {
        this._message(error);
      }
    },
    getDealStatus(obj) {
      //获取处理状态
      this.dealStatus = obj.dealStatus;
      this.dealButton = obj.dealButton;
    },
    changeOk() {
      this.$emit('changeOk');
    }
  },
  components: {
    ViewLayout,
    ChatBoxs,
    ChatRecord,
    SupportHeader,
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
  /deep/ .splitter-pane-resizer {
    opacity: 0.1;
  }
}
</style>