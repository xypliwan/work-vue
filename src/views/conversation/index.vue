<template>
  <div>
    <div class="conversation-wrapper">
      <div class="left">
        <conversation-list
          ref="conversationListRef"
          :chatItemId="chatItemId"
          @selectChatItem="selectChatItem"
        ></conversation-list>
      </div>
      <div class="right" v-show="chatItemId !== '' && !isFirstEnter">
        <!-- 聊天窗口（头部，历史聊天，聊天框，及其他相关操作） -->
        <chat-layout
          :chatItemId="chatItemId"
          @transferOk="transferOk"
          height="calc(100vh - 120px)"
          rightHeight="calc(100vh - 100px - 200px + 180px)"
          ref="questionRef"
          @updateList="updateList"
        ></chat-layout>
      </div>
      <div class="right no-box" v-show="chatItemId == '' && isFirstEnter">
        <greetings-box></greetings-box>
      </div>
    </div>
  </div>
</template>

<script>
import ConversationList from './ConversationList'
import ChatLayout from '_c/workOrderChat/ChatLayout'
import GreetingsBox from '_c/common/Greetings'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      chatItemId: '',
      supportId: '',
      isFirstEnter: true
    }
  },
  computed: {
    ...mapGetters(['draftList'])
  },
  methods: {
    ...mapActions(['setDraftList', 'delDraftList']),
    updateList(data) {
      let obj = {
        id: data.question_id,
        supportId: data.support_id,
        cont: data.combine_str,
        time: data.created_at
      }
      this.$refs.conversationListRef.updateList(obj)
    },
    transferOk() {
      //转交工单其他人
      this.isFirstEnter = true
      this.chatItemId = ''
      this.$refs.conversationListRef.formParentSearch()
    },
    selectChatItem(obj) {
      this.$nextTick(() => {
        this.beforeSaveDraft()
        this.isFirstEnter = false
        this.chatItemId = obj.questionId
        this.supportId = obj.supportId

        //每次切换时，判断当前新的工单是否【有】草稿
        let hasItem = this.draftList.find(
          item => item.id == this.chatItemId && item.supportId == this.supportId
        )
        if (hasItem) {
          //工单
          this.$nextTick(() => {
            this.$refs.questionRef.showHtml(hasItem.cont)
          })
        }
      })
    },
    beforeSaveDraft() {
      let oldHtml = this.$refs.questionRef.getEditorHtml()
      this.$refs.questionRef.clearEditorHtml()
      if (oldHtml.length > 0) {
        //当输入框内容不为空，记录为草稿
        let item = {
          id: this.chatItemId,
          cont: oldHtml,
          supportId: this.supportId
        }
        //先删
        this.hasDraftDIndex(this.chatItemId, this.supportId)
        //在增
        this.setDraftList(item)
      } else if (oldHtml.length == 0) {
        this.$refs.conversationListRef.setItemCont(
          this.chatItemId,
          this.supportId
        )
        //内容为空时
        this.hasDraftDIndex(this.chatItemId, this.supportId)
      }
    },
    hasDraftDIndex(id, supportId) {
      //查找草稿箱是否有当前的草稿
      let findIndex = this.draftList.findIndex(
        item => item.id === id && item.supportId == supportId
      )
      if (findIndex !== -1) {
        //找到并且删除

        // console.log(findIndex,'findIndex')
        this.delDraftList(findIndex)
      }
    }
  },
  beforeDestroy() {
    this.beforeSaveDraft()
  },
  components: {
    ConversationList,
    ChatLayout,
    GreetingsBox
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.conversation-wrapper {
  padding: 10px 0;
  display: flex;
  height: 100vh;
  overflow: hidden;
  .left {
    width: 360px;
    float: left;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #f1f1f1;
  }
  .right {
    flex: 1;
  }
  .no-box {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
