<template>
  <div class="conversation-box">
    <view-layout headerHeight="100px">
      <div slot="header">
<<<<<<< HEAD
        <el-input
          size="small"
          clearable
          @clear="clearBtn"
          @keyup.enter.native="searchChat"
          placeholder="请输入支持ID/工单号"
          v-model="params.keyword"
        >
=======
        <el-input size="small" clearable @clear="clearBtn" @keyup.enter.native="searchChat" placeholder="请输入支持ID/工单号" v-model="params.keyword">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          <el-button slot="append" size="small" @click="searchChat">
            <i class="el-input__icon iconfont icon-xingtaiduICON_sousuo--"></i>
          </el-button>
        </el-input>
        <div class="conversation-type">
<<<<<<< HEAD
          <conversation-type
            @changeSupportStatus="changeSupportStatus"
            ref="conversationType"
          ></conversation-type>
=======
          <conversation-type @changeSupportStatus="changeSupportStatus" ref="conversationType"></conversation-type>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        </div>
      </div>
      <div slot="content">
        <div class="list-wrapper">
<<<<<<< HEAD
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
                  'item-active': chatItemId == item.support_id,
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
                    <span class="question-id">{{ item.support_id }}</span>
                    <i
                      :class="
                        item.question_id !== '0'
                          ? 'iconfont identity-type icon-icon_talk'
                          : ''
                      "
                    ></i>
                    <i class="iconfont identity-type icon-jishuzhichi"></i>
                    <span class="company-name">{{ item.user_name }}</span>
                    <el-tag
                      :disable-transitions="true"
                      v-show="item.resolve_user_name.length > 0"
                      effect="plain"
                      class="customer-type"
                      size="mini"
                      >{{ item.resolve_user_name }}</el-tag
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
                    <el-tooltip
                      placement="bottom"
                      :content="item.customer_type"
                    >
                      <el-tag
                        :disable-transitions="true"
                        v-show="item.customer_type.length > 0"
                        type="success"
                        effect="plain"
                        class="customer-type"
                        size="mini"
                        >{{ item.customer_type }}</el-tag
                      >
                    </el-tooltip>
                    <el-tooltip placement="bottom" content="疑难杂症">
                      <i
                        class="iconfont icon-weixian"
                        v-show="item.mark_problem == '1'"
                      ></i>
                    </el-tooltip>
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
=======
          <scroll :hasMore="hasMore" @loadingData="loadingData" ref="scroll" :isLoadings="isLoadings">
            <div slot="dataList">
              <div v-for="(item,i) in chatList" :key="i" class="chat-list-item" :class="{'item-active' : chatItemId == item.support_id,'no-read':item.is_read == 0}" @click="handleItem(item)">
                <div class="status" :class="item.is_read == 0 ? 'active' : ''"></div>
                <div class="info">
                  <div class="info-item">
                    <span class="question-id">{{item.support_id}}</span>
                    <i :class="item.question_id !== '0' ? 'iconfont identity-type icon-icon_talk' : '' "></i>
                    <i class="iconfont identity-type icon-jishuzhichi"></i>
                    <span class="company-name">{{item.user_name}}</span>
                    <el-tag :disable-transitions="true" v-show="item.resolve_user_name.length > 0" effect="plain" class="customer-type" size="mini">{{item.resolve_user_name}}</el-tag>
                  </div>
                  <div class="times">{{item.updated_at}}</div>
                </div>
                <div class="text" v-html="item.combine_str"></div>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
              </div>
            </div>
          </scroll>
        </div>
      </div>
    </view-layout>
  </div>
</template>

<script>
<<<<<<< HEAD
import ViewLayout from '_c/common/Layout'
import ConversationType from './ConversationType'
import Scroll from '_c/common/Scroll'
import { getSupportChatList, setSupportRead } from '@/api/technicalConversation'
import { delChatItem } from '@/api/conversation'
import { mapGetters, mapActions } from 'vuex'
import { getHoursMinutes } from '_u/utils'
=======
import ViewLayout from '_c/common/Layout';
import ConversationType from './ConversationType';
import Scroll from '_c/common/Scroll';
import { getSupportChatList, setSupportRead } from '@/api/technicalConversation';
import { mapGetters, mapActions } from 'vuex';
import { getHoursMinutes } from '_u/utils';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    chatItemId: String
  },
  data() {
    return {
      hasMore: false,
      isLoadings: false,
      params: {
        keyword: '', //关键词
        page: 1,
        pageSize: 15,
        deal_status: '1' //''全部  1处理中 2已完成  10与我有关
      },
      chatList: [],
      isResEnd: false
<<<<<<< HEAD
    }
  },
  mounted() {
    let idInfo = this.$route.query
=======
    };
  },
  mounted() {
    let idInfo = this.$route.query;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    if (idInfo.id && idInfo.supportId) {
      let item = {
        questionId: idInfo.id,
        supportId: idInfo.supportId
<<<<<<< HEAD
      }
      this.$emit('selectChatItem', item)
      this.params.keyword = idInfo.supportId
      this.params.page = 1
      this.$refs.conversationType.activeName = ''
    } else if (idInfo.message_type && idInfo.message_type == '1') {
      console.log()
    } else {
      this.getChatLists()
    }
  },
  computed: {
    ...mapGetters([
      'question',
      'cancelAnswer',
      'support',
      'draftList',
      'supportInfoCount',
      'supportRemind'
    ])
  },
  watch: {
    supportRemind(newVal) {
      let questionId = newVal.question_id
      let supportId = newVal.support_id
      let res = this.chatList.find(
        el => el.question_id == questionId && el.support_id == supportId
      )
      if (!res) {
        this.unshiftChatList(supportId)
      } else {
        res.is_read = 0
        res.updated_at = getHoursMinutes(newVal.created_at)
        res.combine_str = newVal.combine_str
        this.chatList.splice(
          this.chatList.findIndex(
            item =>
              item.question_id == res.question_id &&
              item.support_id == supportId
          ),
          1
        )
        this.chatList.unshift(res)
      }
      this.$refs.scroll.toScrollTop()
    },
    draftList(newVal) {
      this.resetDraft(newVal)
    },
    support(newVal) {
      let questionId = newVal.question_id
      let supportId = newVal.support_id
      let res = this.chatList.find(
        el => el.question_id == questionId && el.support_id == supportId
      )
      if (!res) {
        this.unshiftChatList(supportId)
      } else {
        res.is_read = 0
        res.updated_at = getHoursMinutes(newVal.created_at)
        res.combine_str = newVal.combine_str
        this.chatList.splice(
          this.chatList.findIndex(
            item =>
              item.question_id == res.question_id &&
              item.support_id == supportId
          ),
          1
        )
        this.chatList.unshift(res)
      }
      this.$refs.scroll.toScrollTop()
    },
    question(newVal) {
      let questionId = newVal.question_id
      let supportId = newVal.support_id
      let res = this.chatList.find(
        el => el.question_id == questionId && el.support_id == supportId
      )
      if (!res) {
        this.unshiftChatList(supportId)
      } else {
        res.is_read = 0
        res.updated_at = getHoursMinutes(newVal.created_at)
        res.combine_str = newVal.combine_str
        this.chatList.splice(
          this.chatList.findIndex(
            item =>
              item.question_id === res.question_id &&
              item.support_id == supportId
          ),
          1
        )
        this.chatList.unshift(res)
      }
      this.$refs.scroll.toScrollTop()
    },
    cancelAnswer(newVal) {
      let questionId = newVal.question_id
      let supportId = newVal.support_id
      let res = this.chatList.find(
        el => el.question_id == questionId && el.support_id == supportId
      )
      if (res) {
        res.updated_at = newVal.created_at
        res.is_read = 0
        res.combine_str = '撤回一条消息'
        this.chatList.splice(
          this.chatList.findIndex(
            item =>
              item.question_id == res.question_id &&
              item.support_id == supportId
          ),
          1
        )
        this.chatList.unshift(res)
      }
      this.$refs.scroll.toScrollTop()
    }
  },
  methods: {
    ...mapActions(['setSupportInfoCount', 'setDocumentTitleFlg']),
    setMarkProblemStatus(obj) {
      let item = this.chatList.find(
        item =>
          item.question_id == obj.question_id &&
          item.support_id == obj.support_id
      )
      item.mark_problem = obj.mark_problem
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
          chat_type: 'support'
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
      this.$refs.conversationType.activeName = 'upcoming'
      this.changeSupportStatus({ index: '1', ids: '' })
    },
    loadingData() {
      this.params.page++
      this.getChatLists()
=======
      };
      this.$emit('selectChatItem', item);
      this.params.keyword = idInfo.supportId;
      this.params.page = 1;
      this.$refs.conversationType.activeName = '';
    } else if (idInfo.message_type && idInfo.message_type == '1') {
    } else {
      this.getChatLists();
    }
  },
  computed: {
    ...mapGetters(['question', 'cancelAnswer', 'support', 'draftList', 'supportInfoCount'])
  },
  watch: {
    draftList(newVal) {
      this.resetDraft(newVal);
    },
    support(newVal) {
      let questionId = newVal.question_id;
      let supportId = newVal.support_id;
      let res = this.chatList.find(el => el.question_id == questionId && el.support_id == supportId);
      if (!res) {
        this.unshiftChatList(supportId);
      } else {
        res.is_read = 0;
        res.updated_at = getHoursMinutes(newVal.created_at);
        res.combine_str = newVal.combine_str;
        this.chatList.splice(
          this.chatList.findIndex(item => item.question_id == res.question_id && item.support_id == supportId),
          1
        );
        this.chatList.unshift(res);
      }
      this.$refs.scroll.toScrollTop();
    },
    question(newVal) {
      let questionId = newVal.question_id;
      let supportId = newVal.support_id;
      let res = this.chatList.find(el => el.question_id == questionId && el.support_id == supportId);
      if (!res) {
        this.unshiftChatList(supportId);
      } else {
        res.is_read = 0;
        res.updated_at = getHoursMinutes(newVal.created_at);
        res.combine_str = newVal.combine_str;
        this.chatList.splice(
          this.chatList.findIndex(item => item.question_id === res.question_id && item.support_id == supportId),
          1
        );
        this.chatList.unshift(res);
      }
      this.$refs.scroll.toScrollTop();
    },
    cancelAnswer(newVal) {
      let questionId = newVal.question_id;
      let supportId = newVal.support_id;
      let res = this.chatList.find(el => el.question_id == questionId && el.support_id == supportId);
      if (res) {
        res.updated_at = newVal.created_at;
        res.is_read = 0;
        res.combine_str = '撤回一条消息';
        this.chatList.splice(
          this.chatList.findIndex(item => item.question_id === res.question_id && item.support_id == supportId),
          1
        );
        this.chatList.unshift(res);
      }
      this.$refs.scroll.toScrollTop();
    }
  },
  methods: {
    ...mapActions(['setSupportInfoCount']),
    setItemCont(chatItemId, supportId) {
      let index = this.chatList.findIndex(el => el.question_id == chatItemId && el.support_id == supportId);
      if (index == -1) return;
      this.chatList[index].combine_str = this.chatList[index].combine_str_basc;
    },
    clearBtn() {
      this.$refs.conversationType.activeName = 'upcoming';
      this.changeSupportStatus({ index: '1', ids: '' });
    },
    loadingData() {
      this.params.page++;
      this.getChatLists();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    updateList(obj) {
      //id  cont  time

<<<<<<< HEAD
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
        let { data } = await getSupportChatList({ support_id: id })
        this.chatList = [...data, ...this.chatList]
      } catch (error) {
        this._message(error)
      }
      this.isResEnd = false
    },
    handleItem(item) {
      if (item.is_read == 0) {
        item.is_read = 1
        this.setDocumentTitleFlg(false)
        this.setRead(item.support_id)
=======
      let index = this.chatList.findIndex(el => el.question_id == obj.id && el.support_id == obj.supportId);
      let item = this.chatList[index];
      item.combine_str = obj.cont.replace(/\<a/g, '<span');
      item.combine_str = obj.cont.replace(/\<br/g, '<span');
      item.combine_str_basc = obj.cont.replace(/\<a/g, '<span');
      item.combine_str_basc = obj.cont.replace(/\<br/g, '<span');
      item.updated_at = getHoursMinutes(obj.time);
      this.chatList.splice(index, 1);
      this.chatList.unshift(item);
      this.$refs.scroll.toScrollTop();
    },
    resetDraft(newArr) {
      this.chatList.forEach((el, i) => {
        newArr.forEach((ev, j) => {
          if (el.question_id == ev.id && el.support_id == ev.supportId) {
            el.combine_str = `<span style='color:#dd2b2b'>[草稿]</span> ${ev.cont}`;
          } else {
            el.combine_str = el.combine_str_basc;
          }
        });
      });
      this.chatList.forEach((el, i) => {
        newArr.forEach((ev, j) => {
          if (el.question_id == ev.id && el.support_id == ev.supportId) {
            el.combine_str = `<span style='color:#dd2b2b'>[草稿]</span> ${ev.cont}`;
          }
        });
      });
    },
    async unshiftChatList(id) {
      if (this.isResEnd) return;
      this.isResEnd = true;
      try {
        let { data } = await getSupportChatList({ support_id: id });
        this.chatList = [...data, ...this.chatList];
      } catch (error) {
        this._message(error);
      }
      this.isResEnd = false;
    },
    handleItem(item) {
      if (item.is_read == 0) {
        item.is_read = 1;
        this.setRead(item.support_id);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
      this.$emit('selectChatItem', {
        questionId: item.question_id,
        supportId: item.support_id
<<<<<<< HEAD
      })
    },
    async setRead(id) {
      try {
        let { data } = await setSupportRead({ support_id: id })
        this.setSupportInfoCount(data.arr)
      } catch (error) {
        this._message(error)
      }
    },
    searchChat() {
      this.chatList = []
      this.params.deal_status = ''
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
        let { data } = await getSupportChatList(this.params)
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
    changeSupportStatus(obj) {
      this.chatList = []
      this.params.deal_status = obj.index
      this.params.keyword = obj.ids
      this.params.page = 1
      this.getChatLists()
=======
      });
    },
    async setRead(id) {
      try {
        let { message, data } = await setSupportRead({ support_id: id });
        this.setSupportInfoCount(data.arr);
      } catch (error) {
        this._message(error);
      }
    },
    searchChat() {
      this.chatList = [];
      this.params.deal_status = '';
      this.params.page = 1;
      this.$refs.conversationType.activeName = 'all';
      this.getChatLists();
    },
    formParentSearch() {
      this.chatList = [];
      this.params.page = 1;
      this.getChatLists();
    },
    async getChatLists() {
      if (this.isResEnd) return;
      this.isResEnd = true;
      this.isLoadings = true;
      try {
        let { data } = await getSupportChatList(this.params);
        this.hasMore = data.length < this.params.pageSize ? true : false;
        this.chatList = [...this.chatList, ...data];
        this.chatList.forEach(el => {
          el.combine_str = el.combine_str.replace(/\<a/g, '<span');
          el.combine_str = el.combine_str.replace(/\<br/g, '<span');
          el.combine_str_basc = el.combine_str;
        });
        this.resetDraft(this.draftList);
      } catch (error) {
        this._message(error);
      }
      this.isLoadings = false;
      this.isResEnd = false;
    },
    changeSupportStatus(obj) {
      this.chatList = [];
      this.params.deal_status = obj.index;
      this.params.keyword = obj.ids;
      this.params.page = 1;
      this.getChatLists();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    ViewLayout,
    ConversationType,
    Scroll
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
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
=======
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
        .icon-weixian {
          font-size: 15px;
          margin-left: 5px;
          color: #f56c6c;
        }
=======
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
      line-height: 24px;
=======
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
