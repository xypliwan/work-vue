<template>
  <div>
    <div class="conversation-wrapper">
      <div class="left">
        <demand-list
          ref="conversationListRef"
          :chatItemId="chatItemId"
          @selectChatItem="selectChatItem"
        ></demand-list>
      </div>
      <div class="right" v-show="chatItemId !== '' && !isFirstEnter">
        <!-- 聊天窗口（头部，历史聊天，聊天框，及其他相关操作） -->
        <demand-order-chat
          :chatItemId="chatItemId"
          height="calc(100vh - 120px)"
          rightHeight="calc(100vh - 100px - 200px + 180px)"
          ref="demandRef"
          @updateList="updateList"
        ></demand-order-chat>
      </div>
      <div class="right no-box" v-show="chatItemId == '' && isFirstEnter">
        <greetings-box></greetings-box>
      </div>
    </div>
  </div>
</template>

<script>
import DemandList from './DemandList'
import DemandOrderChat from '_c/demandOrderChat'
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
    ...mapGetters(['draftDemandList'])
  },
  methods: {
    ...mapActions(['setDraftDemandList', 'delDraftDemandList']),
    updateList(data) {
      let obj = {
        id: data.list_id,
        cont: data.combine_str,
        time: data.created_at
      }
      this.$refs.conversationListRef.updateList(obj)
    },
    selectChatItem(obj) {
      this.$nextTick(() => {
        this.beforeSaveDraft()
        this.isFirstEnter = false
        this.chatItemId = obj.demandId

        // //每次切换时，判断当前新的工单是否【有】草稿
        let hasItem = this.draftDemandList.find(
          item => item.id == this.chatItemId
        )
        if (hasItem) {
          //工单
          this.$nextTick(() => {
            this.$refs.demandRef.showHtml(hasItem.cont)
          })
        }
      })
    },
    beforeSaveDraft() {
      let oldHtml = this.$refs.demandRef.getEditorHtml()
      this.$refs.demandRef.clearEditorHtml()
      // //每次切换时，判断是否【存】草稿
      if (oldHtml.length > 0) {
        //当输入框内容不为空，记录为草稿
        let item = {
          id: this.chatItemId,
          cont: oldHtml
        }
        //先删
        this.hasDraftDIndex(this.chatItemId)
        //在增
        this.setDraftDemandList(item)
      } else if (oldHtml.length == 0) {
        this.$refs.conversationListRef.setItemCont(this.chatItemId)
        //内容为空时
        this.hasDraftDIndex(this.chatItemId)
      }
    },
    hasDraftDIndex(id) {
      //查找草稿箱是否有当前的草稿
      let findIndex = this.draftDemandList.findIndex(item => item.id === id)
      if (findIndex !== -1) {
        //找到并且删除
        this.delDraftDemandList(findIndex)
      }
    }
  },
  beforeDestroy() {
    this.beforeSaveDraft()
  },
  components: {
    DemandList,
    GreetingsBox,
    DemandOrderChat
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
