<template>
  <div>
    <view-layout headerHeight="100px">
      <div slot="header">
        <support-header
          ref="supportHeader"
          @sendDealStatus="getDealStatus"
          :chatItemId="chatItemId"
          @changeOk="changeOk"
          @supportUrgent="supportUrgent"
          @setMarkProblemOk="setMarkProblemOk"
        ></support-header>
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
                :supportId="chatItemId"
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
                <chat-boxs
                  @sendFile="sendFile"
                  @sendInfo="sendInfo"
                  ref="chatBoxs"
                >
                  <span slot="icon">
                    <el-tooltip
                      content="开始处理"
                      placement="bottom"
                      v-if="
                        (dealStatus == '0' || dealStatus == '3') &&
                          dealButton == '1'
                      "
                    >
                      <i
                        class="iconfont icon-kaishi1"
                        v-if="
                          (dealStatus == '0' || dealStatus == '3') &&
                            dealButton == '1'
                        "
                        @click="startProcessing"
                      ></i>
                    </el-tooltip>
                    <el-tooltip
                      content="结束处理"
                      placement="bottom"
                      v-if="dealStatus == '1' && dealButton == '1'"
                    >
                      <i
                        class="iconfont icon-zanting1"
                        v-if="dealStatus == '1' && dealButton == '1'"
                        @click="invitationVisible = true"
                      ></i>
                    </el-tooltip>

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
                  </span>
                </chat-boxs>
              </div>
            </template>
          </split-pane>
        </div>
      </div>
    </view-layout>

    <initiate-invitation
      @changeStatus="changeStatus"
      :supportId="chatItemId"
      :invitationVisible.sync="invitationVisible"
    ></initiate-invitation>
  </div>
</template>

<script>
import ViewLayout from '_c/common/Layout'
import ChatBoxs from '_c/chat/Chat'
import ChatRecord from './ChatRecord'
import SupportHeader from './SupportHeader'
import InitiateInvitation from './dialog/InitiateInvitation'
import { startSupportDeal } from '@/api/workbench'
import { addAnswer } from '@/api/conversation'
import { mapGetters, mapActions } from 'vuex'
import {
  getRemindContent,
  getRemindTag,
  setRemindTag,
  getRemindTagDetail
} from '@/api/user'
// 系统提醒
import SystemRemind from '_c/common/SystemRemind'
import splitPane from 'vue-splitpane'
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
      },
      systemRemindList: [],
      remindTagId: '', //系统提醒标签id
      remindTagList: []
    }
  },
  computed: {
    ...mapGetters([
      'dealStatusInfo',
      'draftList',
      'checkRemind',
      'supportRemind'
    ])
  },
  mounted() {
    this.getRemindTagFn()
  },
  watch: {
    chatItemId: {
      immediate: true,
      handler: function(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            let chatInfoDoms = document.getElementsByClassName('chat-info')[0]
            let oprenBoxDoms = document.getElementsByClassName('opren-box')[0]
            // let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight - 50;
            let editorHeight =
              chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight

            this.$refs.chatBoxs.setEditorHeight(editorHeight)
            this.$refs.chatBoxs.setFoucsEdit()

            if (this.checkRemind == 1) {
              this.getRemindContentFn()
            }
            this.getRemindTagDetailFn()
          })
        }
      }
    },
    dealStatusInfo(newVal) {
      if (newVal.support_id == this.chatItemId) {
        this.$refs.supportHeader.detail.deal_status_name =
          newVal.deal_status_name
        this.dealStatus = newVal.deal_status
      }
    },
    supportRemind(newVal) {
      if (newVal) {
        this.systemRemindList.push(newVal)
      }
    }
  },
  methods: {
    ...mapActions(['setDraftList', 'delDraftList', 'setDocumentTitleFlg']),
    async getRemindTagDetailFn() {
      try {
        let { data } = await getRemindTagDetail({
          data_id: this.chatItemId,
          data_type: '2'
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
        data_type: '2'
      }
      try {
        await setRemindTag(params)
      } catch (error) {
        this._message(error)
      }
    },
    async getRemindTagFn() {
      try {
        let { data } = await getRemindTag({ tag_type: '2' })
        this.remindTagList = data
      } catch (error) {
        this._message(error)
      }
    },
    async getRemindContentFn() {
      try {
        const { data } = await getRemindContent({
          data_id: this.chatItemId,
          data_type: '2'
        })
        this.systemRemindList = data
      } catch (error) {
        this._message(error)
      }
    },
    setMarkProblemOk(infos) {
      this.$emit('setMarkProblemOk', infos)
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
      let chatInfoDoms = document.getElementsByClassName('chat-info')[0]
      let oprenBoxDoms = document.getElementsByClassName('opren-box')[0]
      // let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight - 50;
      let editorHeight = chatInfoDoms.clientHeight - oprenBoxDoms.clientHeight
      this.$refs.chatBoxs.setEditorHeight(editorHeight)
    },
    supportUrgent(info) {
      this.params.content = info.content
      this.params.support_id = this.chatItemId
      this.$refs.chatHistory.pushCont(this.params)
      this.$refs.chatBoxs.clearHtml()
      this.$emit('updateList', this.params) //更新左侧列表
      // this.addAnswer()
    },
    sendFile(data) {
      //发送聊天信息----发送上传的图片
      let cont = `<img src="${data.url}"  alt="${data.file_name}" />`
      this.params.content = cont
      this.addAnswer()
    },
    sendInfo(info) {
      this.params.content = info
      this.addAnswer()
    },
    async addAnswer() {
      if (this.params.content.length <= 0) {
        return
      }
      this.setDocumentTitleFlg(false)
      this.contLoading = true
      this.params.support_id = this.chatItemId
      try {
        let { data } = await addAnswer(this.params)
        this.$refs.chatHistory.pushCont(data)
        this.$refs.chatBoxs.clearHtml()
        this.$emit('updateList', data) //更新左侧列表
      } catch (error) {
        this._message(error)
      }
      this.contLoading = false
    },
    changeStatus(data) {
      this.dealStatus = data.deal_status
      let info = data.answer
      // this.params.content = info.content;
      // this.addAnswer();
      this.$refs.chatHistory.pushCont(info)
      this.$refs.supportHeader.getSupportDetail()
    },
    startProcessing() {
      this.$confirm('确定开始处理该技术支持吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.startSupportDeal()
        })
        .catch(() => {})
    },
    async startSupportDeal() {
      try {
        let { message, data } = await startSupportDeal({
          support_id: this.chatItemId
        })
        this.dealStatus = data.deal_status
        this._message(message, 'success')
        let info = data.answer
        this.$refs.chatHistory.pushCont(info)
        this.$refs.supportHeader.getSupportDetail()
      } catch (error) {
        this._message(error)
      }
    },
    getDealStatus(obj) {
      //获取处理状态
      this.dealStatus = obj.dealStatus
      this.dealButton = obj.dealButton
    },
    changeOk() {
      this.$emit('changeOk')
    }
  },
  components: {
    ViewLayout,
    ChatBoxs,
    ChatRecord,
    SupportHeader,
    InitiateInvitation,
    splitPane,
    SystemRemind
  }
}
</script>

<style lang="scss" scoped>
.content-boxs {
  display: flex;
  .chat-box {
    flex: 1;
    .input-box {
      height: 100%;
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
