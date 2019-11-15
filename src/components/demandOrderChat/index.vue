<template>
  <div>
    <view-layout headerHeight="100px">
      <div slot="header">
        <chat-header :chatItemId="chatItemId" @sendInfo="sendInfoId" @getComponentName="getComponentName" @causeOk="causeOk"></chat-header>
      </div>
      <div slot="content" class="content-boxs" ref="contentBoxs">
        <div class="chat-box" :style="{'height':height}" ref="chatBox">
          <split-pane @resize="resize" :min-percent="20" :default-percent="80" split="horizontal">
            <template slot="paneL">
              <chat-record class="chat-history" :chatItemId="chatItemId" ref="chatHistory"></chat-record>
            </template>
            <template slot="paneR">
              <div class="input-box" v-loading="contLoading" element-loading-text="正在发送..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0)">
                <chat-boxs @sendInfo="sendInfo" ref="chatBoxs">
                  <span slot="icon">
                    <div class="work-hours-box" v-if="productor == '1'">
                      <el-input size="mini" type="number" :maxlength="99999" v-model="workHoursNum" />
                    </div>
                    <el-button size="mini" type="primary" v-if="productor == '1'" plain @click="needDetailUpdate">更新工时</el-button>
                  </span>
                </chat-boxs>
              </div>
            </template>
          </split-pane>
        </div>
        <div class="right-box" :style="{'height':rightHeight}">
          <component :is="componentName" ref="childsComponents" :height="rightHeight" :productId="productId" @close="close" @getSelectCont="getSelectCont"></component>
        </div>
      </div>
    </view-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { addAnswer } from '@/api/conversation';
import { needDetailUpdate } from '@/api/demandConversation';
import ViewLayout from '_c/common/Layout';
import ChatHeader from './ChatHeader';
import ChatRecord from './ChatRecord';
import ChatBoxs from '_c/chat/Chat';
// 易仓大学
import YcUniversity from '_c/workOrderChat/dialog/YcUniversity';
// 快捷回复
import QuickReply from '_c/workOrderChat/dialog/QuickReply';

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
      params: {
        content: '',
        file: {},
        list_id: ''
      },
      contLoading: false,
      workHoursNum: ''
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(['productor'])
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
    }
  },

  methods: {
    ...mapActions(['setDraftList', 'delDraftList']),
    async needDetailUpdate() {
      try {
        let { data } = await needDetailUpdate({ list_id: this.chatItemId, hours: this.workHoursNum });
      } catch (error) {
        this._message(error);
      }
    },
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
    getSelectCont(cont) {
      this.sendInfo(cont);
    },
    sendInfo(info) {
      this.params.content = info;
      this.addAnswer();
    },
    async addAnswer() {
      this.params.list_id = this.chatItemId;
      this.contLoading = true;
      try {
        let { data } = await addAnswer(this.params);
        this.$refs.chatHistory.pushCont(data);
        this.$emit('updateList', data); //更新左侧列表
        this.$refs.chatBoxs.clearHtml();
      } catch (error) {
        this._message(error);
      }
      this.contLoading = false;
    },
    getComponentName(name) {
      this.componentName = name;
    },
    close() {
      this.componentName = '';
    },
    sendInfoId(info) {
      this.productId = info.productId;
      this.workHoursNum = info.hours;
    }
  },
  components: {
    ViewLayout,
    ChatHeader,
    ChatRecord,
    YcUniversity,
    QuickReply,
    ChatBoxs,
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
      .work-hours-box {
        width: 100px;
        display: inline-block;
        margin-left: 20px;
        /deep/ .el-input {
          display: inline;
        }
      }
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
</style>