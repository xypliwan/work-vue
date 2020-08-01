<template>
  <div class="conversation-box">
    <view-layout headerHeight="100px">
      <div slot="header">
        <el-input
          size="small"
          clearable
          @clear="clearBtn"
          @keyup.enter.native="searchChat"
          placeholder="请输入公司名称/工单ID/标题"
          v-model="params.keyword"
        >
          <el-button slot="append" size="small" @click="searchChat">
            <i class="el-input__icon iconfont icon-xingtaiduICON_sousuo--"></i>
          </el-button>
        </el-input>
        <div class="conversation-type">
          <conversation-type
            @changeQuestionStatus="changeQuestionStatus"
            ref="conversationType"
          ></conversation-type>
        </div>
      </div>
      <div slot="content">
        <div class="list-wrapper">
          <scroll
            :hasMore="hasMore"
            @loadingData="loadingData"
            ref="scroll"
            :isLoadings="isLoadings"
          >
            <div slot="dataList">
              <div
                v-for="(item, i) in chatList"
                :key="i"
                class="chat-list-item"
                :class="{
                  'item-active': chatItemId == item.question_id,
                  'no-read': item.is_read == 0
                }"
                @click="handleItem(item)"
              >
                <div
                  class="status"
                  :class="item.is_read == 0 ? 'active' : ''"
                ></div>
                <div class="info">
                  <div class="info-item">
                    <span class="question-id">{{ item.question_num }}</span>
                    <i class="iconfont identity-type icon-icon_talk"></i>
                    <i
                      class="iconfont identity-type"
                      :class="item.support_id !== '0' ? 'icon-jishuzhichi' : ''"
                      v-if="chatService == '1'"
                    ></i>
                    <el-tag
                      :disable-transitions="true"
                      v-show="item.customer_type.length > 0"
                      effect="plain"
                      class="customer-type"
                      size="mini"
                      >{{ item.customer_type }}</el-tag
                    >

                    <el-tag
                      :disable-transitions="true"
                      v-show="item.company_name.length > 0"
                      type="warning"
                      effect="plain"
                      class="customer-type"
                      size="mini"
                      >{{ item.company_name }}</el-tag
                    >

                    <span class="company-name">{{ item.user_name }}</span>
                  </div>
                  <div class="times">{{ item.updated_at }}</div>
                </div>
                <div class="text" v-html="item.combine_str"></div>
                <el-tag
                  class="remove-item"
                  type="danger"
                  size="mini"
                  @click.stop="removeItem(item, i)"
                  >移除</el-tag
                >
              </div>
            </div>
          </scroll>
        </div>
      </div>
    </view-layout>
  </div>
</template>

<script>
import ViewLayout from '_c/common/Layout'
import ConversationType from './ConversationType'
import Scroll from '_c/common/Scroll'
import { getChatList, setRead, delChatItem } from '@/api/conversation'
import { mapGetters, mapActions } from 'vuex'
import { getHoursMinutes } from '_u/utils'
export default {
  props: {
    chatItemId: String
  },
  data() {
    return {
      hasMore: false,
      isLoadings: false,
      params: {
        page: 1,
        pageSize: 50,
        question_status: '1', //空为全部  0 未处理 1处理中 2已采纳
        keyword: '', //关键词
        question_ids: '' //问题id 多个用 , 隔开
      },
      chatList: [],
      isResEnd: false
    }
  },
  mounted() {
    let idInfo = this.$route.query
    if (idInfo.id && idInfo.supportId) {
      let item = {
        questionId: idInfo.id,
        supportId: idInfo.supportId
      }
      this.$emit('selectChatItem', item)
      this.params.question_ids = idInfo.id
      this.params.keyword = idInfo.num
      this.params.page = 1
      this.$refs.conversationType.activeName = ''
    } else {
      this.getChatLists()
    }
  },
  computed: {
    ...mapGetters([
      'chatService',
      'question',
      'infoCount',
      'cancelAnswer',
      'support',
      'draftList',
      'questionList',
      'questionRemind'
    ])
  },
  watch: {
    questionRemind(newVal) {
      let questionId = newVal.question_id
      let res = this.chatList.find(el => el.question_id == questionId)
      if (!res) {
        this.unshiftChatList(questionId)
      } else {
        res.is_read = 0
        res.updated_at = newVal.show_time
        res.combine_str = `<label style="color:#e6a23c!important">系统提醒: ${newVal.content}<label>`
        this.chatList.splice(
          this.chatList.findIndex(item => item.question_id === res.question_id),
          1
        )
        this.chatList.unshift(res)
      }
      this.$refs.scroll.toScrollTop()
    },
    questionList(newVal) {
      for (let i = 0; i < newVal.length; i++) {
        for (let j = 0; j < this.chatList.length; j++) {
          if (
            newVal[i].question_id == this.chatList[j].question_id &&
            newVal[i].support_id == this.chatList[j].support_id
          ) {
            this.chatList.splice(j, 1)
          }
        }
        this.chatList.unshift(newVal[i])
      }
    },
    draftList(newVal) {
      this.resetDraft(newVal)
    },
    support(newVal) {
      let questionId = newVal.question_id
      if (questionId) {
        let res = this.chatList.find(el => el.question_id == questionId)
        if (!res) {
          this.unshiftChatList(questionId)
        } else {
          res.is_read = 0
          res.updated_at = getHoursMinutes(newVal.created_at)
          res.combine_str = newVal.combine_str
          this.chatList.splice(
            this.chatList.findIndex(
              item => item.question_id === res.question_id
            ),
            1
          )
          this.chatList.unshift(res)
        }
        this.$refs.scroll.toScrollTop()
      }
    },
    question(newVal) {
      // console.log(newVal,'nerwVal')
      // this.showNewInfo(newVal)
      let questionId = newVal.question_id
      let res = this.chatList.find(el => el.question_id == questionId)
      if (!res) {
        this.unshiftChatList(questionId)
      } else {
        res.is_read = 0
        res.updated_at = newVal.created_at
        res.combine_str = newVal.combine_str
        this.chatList.splice(
          this.chatList.findIndex(item => item.question_id === res.question_id),
          1
        )
        this.chatList.unshift(res)
      }
      this.$refs.scroll.toScrollTop()
    },
    cancelAnswer(newVal) {
      let questionId = newVal.question_id
      let res = this.chatList.find(el => el.question_id == questionId)
      if (res) {
        res.updated_at = newVal.created_at
        res.is_read = 0
        res.combine_str = '撤回一条消息'
        this.chatList.splice(
          this.chatList.findIndex(item => item.question_id === res.question_id),
          1
        )
        this.chatList.unshift(res)
      }
      this.$refs.scroll.toScrollTop()
    }
  },
  methods: {
    ...mapActions(['setInfoCount', 'setDocumentTitleFlg']),
    showNewInfo(info) {
      let questionId = info.question_id
      let res = this.chatList.find(el => el.question_id == questionId)
      if (!res) {
        this.unshiftChatList(questionId)
      } else {
        res.is_read = 0
        res.updated_at = info.created_at
        res.combine_str = info.combine_str
        this.chatList.splice(
          this.chatList.findIndex(item => item.question_id === res.question_id),
          1
        )
        this.chatList.unshift(res)
      }
      this.$refs.scroll.toScrollTop()
    },
    removeItem(item, i) {
      this.$confirm('是否移除此会话?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.removeItemFn(item, i)
        })
        .catch(() => {})
    },
    async removeItemFn(item, i) {
      try {
        await delChatItem({
          mid: item.mid,
          chat_type: 'question'
        })
        this.chatList.splice(i, 1)
      } catch (error) {
        this._message(error)
      }
    },
    setItemCont(chatItemId, supportId) {
      let index = this.chatList.findIndex(
        el => el.question_id == chatItemId && el.support_id == supportId
      )
      if (index == -1) return
      this.chatList[index].combine_str = this.chatList[index].combine_str_basc
    },
    clearBtn() {
      this.$refs.conversationType.activeName = 'processing'
      this.changeQuestionStatus({ index: '1', ids: '' })
    },
    loadingData() {
      if (this.isResEnd) return
      this.params.page++
      this.getChatLists()
    },
    updateList(obj) {
      //id  cont  time  supportId
      let index = this.chatList.findIndex(
        el => el.question_id == obj.id && el.support_id == obj.supportId
      )
      let item = this.chatList[index]
      item.combine_str = obj.cont.replace(/\<a/g, '<span')
      item.combine_str = obj.cont.replace(/\<br/g, '<span')
      item.combine_str_basc = obj.cont.replace(/\<a/g, '<span')
      item.combine_str_basc = obj.cont.replace(/\<br/g, '<span')
      item.updated_at = getHoursMinutes(obj.time)
      this.chatList.splice(index, 1)
      this.chatList.unshift(item)
      this.$refs.scroll.toScrollTop()
    },
    resetDraft(newArr) {
      this.chatList.forEach(el => {
        newArr.forEach(ev => {
          if (el.question_id == ev.id && el.support_id == ev.supportId) {
            el.combine_str = `<span style='color:#dd2b2b'>[草稿]</span> ${ev.cont}`
          } else {
            el.combine_str = el.combine_str_basc
          }
        })
      })
      this.chatList.forEach(el => {
        newArr.forEach(ev => {
          if (el.question_id == ev.id && el.support_id == ev.supportId) {
            el.combine_str = `<span style='color:#dd2b2b'>[草稿]</span> ${ev.cont}`
          }
        })
      })
    },
    async unshiftChatList(id) {
      if (this.isResEnd) return
      this.isResEnd = true
      try {
        let { data } = await getChatList({ question_ids: id })
        this.chatList = [...data, ...this.chatList]
      } catch (error) {
        this._message(error)
      }
      this.isResEnd = false
    },
    handleItem(item) {
      if (item.is_read == 0) {
        this.setDocumentTitleFlg(false)
        item.is_read = 1
        this.setRead(item.question_id)
      }
      this.$emit('selectChatItem', {
        questionId: item.question_id,
        supportId: item.support_id
      })
    },
    async setRead(id) {
      try {
        let { data } = await setRead({ question_id: id })
        this.setInfoCount(data.arr)
      } catch (error) {
        this._message(error)
      }
    },
    searchChat() {
      this.chatList = []
      this.params.question_status = ''
      this.params.page = 1
      this.$refs.conversationType.activeName = 'all'
      this.getChatLists()
    },
    formParentSearch() {
      this.chatList = []
      this.params.page = 1
      this.getChatLists()
    },
    async getChatLists() {
      if (this.isResEnd) return
      this.isResEnd = true
      this.isLoadings = true
      try {
        let { data } = await getChatList(this.params)
        this.hasMore = data.length < this.params.pageSize ? true : false
        this.chatList = [...this.chatList, ...data]
        this.chatList.forEach(el => {
          el.combine_str = el.combine_str.replace(/\<a/g, '<span')
          el.combine_str = el.combine_str.replace(/\<br/g, '<span')
          el.combine_str_basc = el.combine_str
        })
        this.resetDraft(this.draftList)
      } catch (error) {
        this._message(error)
      }
      this.isLoadings = false
      this.isResEnd = false
    },
    changeQuestionStatus(obj) {
      this.chatList = []
      this.params.keyword = ''
      this.params.question_status = obj.index
      this.params.question_ids = obj.ids
      this.params.page = 1
      this.getChatLists()
    }
  },
  components: {
    ViewLayout,
    ConversationType,
    Scroll
  }
}
</script>

<style lang="scss" scoped>
.conversation-box {
  /deep/ .el-input__inner {
    background: #f5f5f5;
  }
  .icon-xingtaiduICON_sousuo-- {
    margin-right: 5px;
    cursor: pointer;
  }
  .list-wrapper {
    height: calc(100vh - 120px);
  }
  .chat-list-item {
    padding: 10px 10px;
    position: relative;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 10px;
    cursor: pointer;
    .remove-item {
      position: absolute;
      right: 5px;
      bottom: 5px;
      z-index: 99;
      padding: 0px 10px;
      transform: translateX(150%);
      transition: transform 0.2s linear;
      cursor: pointer;
    }
    &:hover .remove-item {
      transform: translateX(-5%);
    }
    &.item-active {
      background: #f3f3f3;
    }
    &.no-read {
      padding-left: 25px;
    }
    .status {
      position: absolute;
      left: 5px;
      width: 10px;
      height: 10px;
      background: none;
      border-radius: 50%;
      top: 50%;
      margin-top: -6px;
      &.active {
        background: red !important;
      }
    }
    .info {
      margin-bottom: 10px;
      display: flex;
      .info-item {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .identity-type {
          margin-left: 5px;
          font-size: 13px;
          &.icon-jishuzhichi {
            color: #67c23a;
          }
          &.icon-icon_talk {
            color: #e6a23c;
          }
        }
        .question-id {
          color: #409eff;
          font-size: 14px;
        }
        .company-name {
          color: #333;
          font-size: 15px;
          margin-left: 8px;
        }
        .customer-type {
          margin-left: 8px;
          padding-left: 3px;
          padding-right: 3px;
        }
      }
      .times {
        float: right;
        color: #999;
        font-size: 12px;
        padding-left: 10px;
      }
    }
    .text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px !important;
      color: #999 !important;
      max-height: 20px !important;
      line-height: 24px;
      /deep/ img {
        width: 15px;
        height: 15px;
      }
      /deep/ p {
        display: inline !important;
      }
      /deep/ div {
        display: inline !important;
      }
      /deep/ br {
        display: inline !important;
      }
    }
  }
}
</style>
