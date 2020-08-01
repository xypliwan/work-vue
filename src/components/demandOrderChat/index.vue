<template>
  <div>
    <view-layout headerHeight="100px">
      <div slot="header">
<<<<<<< HEAD
        <chat-header
          :chatItemId="chatItemId"
          @sendInfo="sendInfoId"
          @getComponentName="getComponentName"
          @causeOk="causeOk"
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
              ></chat-record>
            </template>
            <template slot="paneR">
              <div
                class="input-box"
                v-loading="contLoading"
                element-loading-text="正在发送..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0)"
              >
                <chat-boxs @sendInfo="sendInfo" ref="chatBoxs">
                  <span slot="icon">
                    <div class="work-hours-box" v-if="productor == '1'">
                      <el-input
                        size="mini"
                        type="number"
                        :maxlength="99999"
                        v-model="workHoursNum"
                      />
                    </div>
                    <el-button
                      size="mini"
                      type="primary"
                      v-if="productor == '1'"
                      plain
                      @click="needDetailUpdate"
                      >更新工时</el-button
                    >
                    <system-remind
                      v-if="systemRemindList.length > 0"
                      :list="systemRemindList"
                    ></system-remind>
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
                  </span>
                </chat-boxs>
              </div>
            </template>
          </split-pane>
        </div>
<<<<<<< HEAD
        <div class="right-box" :style="{ height: rightHeight }">
          <component
            :is="componentName"
            ref="childsComponents"
            :height="rightHeight"
            :productId="productId"
            @close="close"
            @getSelectCont="getSelectCont"
          ></component>
=======
        <div class="right-box" :style="{'height':rightHeight}">
          <component :is="componentName" ref="childsComponents" :height="rightHeight" :productId="productId" @close="close" @getSelectCont="getSelectCont"></component>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        </div>
      </div>
    </view-layout>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters, mapActions } from 'vuex'
import { addAnswer } from '@/api/conversation'
import { getRemindContent } from '@/api/user'
import { needDetailUpdate } from '@/api/demandConversation'
import ViewLayout from '_c/common/Layout'
import ChatHeader from './ChatHeader'
import ChatRecord from './ChatRecord'
import ChatBoxs from '_c/chat/Chat'
// 易仓大学
import YcUniversity from '_c/workOrderChat/dialog/YcUniversity'
// 快捷回复
import QuickReply from '_c/workOrderChat/dialog/QuickReply'

import splitPane from 'vue-splitpane'
// 系统提醒
import SystemRemind from '_c/common/SystemRemind'
=======
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
      params: {
        content: '',
        file: {},
        list_id: ''
      },
      contLoading: false,
<<<<<<< HEAD
      workHoursNum: '',
      systemRemindList: []
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(['productor', 'checkRemind'])
=======
      workHoursNum: ''
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(['productor'])
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

            // if (this.checkRemind == 1) {
            //   this.getRemindContentFn()
            // }
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
    }
  },

  methods: {
<<<<<<< HEAD
    ...mapActions(['setDraftList', 'delDraftList', 'setDocumentTitleFlg']),
    async getRemindContentFn() {
      try {
        const { data } = await getRemindContent({
          data_id: this.chatItemId,
          data_type: '3'
        })
        this.systemRemindList = data
      } catch (error) {
        this._message(error)
      }
    },
    async needDetailUpdate() {
      try {
        await needDetailUpdate({
          list_id: this.chatItemId,
          hours: this.workHoursNum
        })
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
    getSelectCont(cont) {
      this.params.content = cont
      this.addAnswer(1)
    },
    sendInfo(info) {
      this.params.content = info
      this.addAnswer()
    },
    //isTmpInfo 是否从快捷模板消息过来的  0否   1是
    async addAnswer(isTmpInfo = 0) {
      this.setDocumentTitleFlg(false)
      this.params.list_id = this.chatItemId
      this.contLoading = true
      try {
        let { data } = await addAnswer(this.params)
        this.$refs.chatHistory.pushCont(data)
        this.$emit('updateList', data) //更新左侧列表
        if (isTmpInfo == 0) {
          this.$refs.chatBoxs.clearHtml()
        }
      } catch (error) {
        this._message(error)
      }
      this.contLoading = false
    },
    getComponentName(name) {
      this.componentName = name
    },
    close() {
      this.componentName = ''
    },
    sendInfoId(info) {
      this.productId = info.productId
      this.workHoursNum = info.hours
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    ViewLayout,
    ChatHeader,
    ChatRecord,
    YcUniversity,
    QuickReply,
    ChatBoxs,
<<<<<<< HEAD
    splitPane,
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
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
