<template>
  <div class="conversation-box">
    <view-layout headerHeight="100px">
      <div slot="header">
        <el-input
          size="small"
          clearable
          @clear="clearBtn"
          @keyup.enter.native="searchChat"
          placeholder="请输入需求ID/标题"
          v-model="params.keyword"
        >
          <el-button slot="append" size="small" @click="searchChat">
            <i class="el-input__icon iconfont icon-xingtaiduICON_sousuo--"></i>
          </el-button>
        </el-input>
        <div class="conversation-type">
          <demand-type
            @changeDemandStatus="changeDemandStatus"
            ref="conversationType"
          ></demand-type>
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
                  'item-active': chatItemId == item.list_id,
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
                    <span class="question-id">{{ item.list_id }}</span>
                    <!-- <span class="company-name">{{item.company_name}}</span> -->
                    <el-tag
                      :disable-transitions="true"
                      effect="plain"
                      class="customer-type"
                      size="mini"
                      >{{ item.need_status_name }}</el-tag
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
import DemandType from './DemandType'
import Scroll from '_c/common/Scroll'
import { mapGetters, mapActions } from 'vuex'
import { delChatItem } from '@/api/conversation'
import { getHoursMinutes } from '_u/utils'

import { getNeedChatList, setNeedRead } from '@/api/demandConversation'
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
        need_status: '0', //0为全部  0 未处理 1处理中 2已采纳
        keyword: '' //关键词
      },
      chatList: [],
      isResEnd: false
    }
  },
  mounted() {
    let idInfo = this.$route.query
    if (idInfo.demandid) {
      let item = {
        demandId: idInfo.demandid
      }
      this.$emit('selectChatItem', item)
      this.params.keyword = idInfo.demandid
      this.params.page = 1
      this.$refs.conversationType.activeName = '0'
    } else {
      this.getNeedChatLists()
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
      'demand',
      'draftDemandList'
    ])
  },
  watch: {
    draftDemandList(newVal) {
      this.resetDraft(newVal)
    },
    demand(newVal) {
      let demandId = newVal.list_id
      let res = this.chatList.find(el => el.list_id == demandId)
      if (!res) {
        this.unshiftChatList(demandId)
      } else {
        res.is_read = 0
        res.updated_at = newVal.created_at
        res.combine_str = newVal.combine_str
        this.chatList.splice(
          this.chatList.findIndex(item => item.list_id === res.list_id),
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
    ...mapActions([
      'setInfoCount',
      'setDemandSocketInfoCount',
      'setDocumentTitleFlg'
    ]),
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
        await delChatItem({ mid: item.mid, chat_type: 'need' })
        this.chatList.splice(i, 1)
      } catch (error) {
        this._message(error)
      }
    },
    setItemCont(chatItemId) {
      let index = this.chatList.findIndex(el => el.list_id == chatItemId)
      if (index == -1) return
      this.chatList[index].combine_str = this.chatList[index].combine_str_basc
    },
    clearBtn() {
      this.$refs.conversationType.activeName = '0'
      this.changeDemandStatus({ index: '', ids: '' })
    },
    loadingData() {
      this.params.page++
      this.getNeedChatLists()
    },
    updateList(obj) {
      //id  cont  time
      let index = this.chatList.findIndex(el => el.list_id == obj.id)
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
          if (el.list_id == ev.id) {
            el.combine_str = `<span style='color:#dd2b2b'>[草稿]</span> ${ev.cont}`
          } else {
            el.combine_str = el.combine_str_basc
          }
        })
      })
      this.chatList.forEach(el => {
        newArr.forEach(ev => {
          if (el.list_id == ev.id) {
            el.combine_str = `<span style='color:#dd2b2b'>[草稿]</span> ${ev.cont}`
          }
        })
      })
    },
    async unshiftChatList(id) {
      if (this.isResEnd) return
      this.isResEnd = true
      try {
        let { data } = await getNeedChatList({ list_id: id })
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
        this.setNeedRead(item.list_id)
      }
      this.$emit('selectChatItem', {
        demandId: item.list_id
      })
    },
    async setNeedRead(id) {
      try {
        let { data } = await setNeedRead({ list_id: id })
        //获取需求新消息条数
        this.setDemandSocketInfoCount(data.arr)
      } catch (error) {
        this._message(error)
      }
    },
    searchChat() {
      this.chatList = []
      this.params.need_status = ''
      this.params.page = 1
      this.$refs.conversationType.activeName = '0'
      this.getNeedChatLists()
    },
    formParentSearch() {
      this.chatList = []
      this.params.page = 1
      this.getNeedChatLists()
    },
    async getNeedChatLists() {
      if (this.isResEnd) return
      this.isResEnd = true
      this.isLoadings = true
      try {
        let { data } = await getNeedChatList(this.params)
        this.hasMore = data.length < this.params.pageSize ? true : false
        this.chatList = [...this.chatList, ...data]
        this.chatList.forEach(el => {
          el.combine_str = el.combine_str.replace(/\<a/g, '<span')
          el.combine_str = el.combine_str.replace(/\<br/g, '<span')
          el.combine_str_basc = el.combine_str
        })
        this.resetDraft(this.draftDemandList)
      } catch (error) {
        this._message(error)
      }
      this.isLoadings = false
      this.isResEnd = false
    },
    changeDemandStatus(obj) {
      this.chatList = []
      this.params.keyword = ''
      this.params.need_status = obj.index
      this.params.page = 1
      this.getNeedChatLists()
    }
  },
  components: {
    ViewLayout,
    DemandType,
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
          margin-left: 10px;
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
