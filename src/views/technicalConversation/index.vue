<template>
  <div>
    <div class="conversation-wrapper">
      <div class="left">
<<<<<<< HEAD
        <conversation-list
          ref="conversationListRef"
          :chatItemId="supportId"
          @selectChatItem="selectChatItem"
        ></conversation-list>
=======
        <conversation-list ref="conversationListRef" :chatItemId="supportId" @selectChatItem="selectChatItem"></conversation-list>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </div>
      <!-- v-show="supportId !== '' && !isFirstEnter" -->
      <div class="right" v-show="!isFirstEnter">
        <!-- 聊天窗口（头部，历史聊天，聊天框，及其他相关操作） -->
        <!-- 技术支持窗口 -->
<<<<<<< HEAD
        <support-layout
          ref="supportRef"
          v-if="isTec == 1 || chatItemId == '0'"
          @changeOk="changeOk"
          :chatItemId="supportId"
          height="calc(100vh - 120px)"
          @updateList="updateList"
          @setMarkProblemOk="setMarkProblemOk"
        ></support-layout>

        <!-- 工单窗口 v-if="chatItemId !== '0'"-->
        <chat-layout
          ref="questionRef"
          v-else
          :chatItemId="chatItemId"
          @transferOk="transferOk"
          height="calc(100vh - 120px)"
          rightHeight="calc(100vh - 100px - 200px + 180px)"
          @updateList="updateList"
        ></chat-layout>
=======
        <support-layout ref="supportRef" v-if="isTec == 1 || chatItemId == '0'" @changeOk="changeOk" :chatItemId="supportId" height="calc(100vh - 120px)" @updateList="updateList"></support-layout>

        <!-- 工单窗口 v-if="chatItemId !== '0'"-->
        <chat-layout ref="questionRef" v-else :chatItemId="chatItemId" @transferOk="transferOk" height="calc(100vh - 120px)" rightHeight="calc(100vh - 100px - 200px + 180px)" @updateList="updateList"></chat-layout>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </div>
      <div class="right no-box" v-show="isFirstEnter">
        <greetings-box></greetings-box>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import ConversationList from './ConversationList'
import ChatLayout from '_c/workOrderChat/ChatLayout'
import SupportLayout from '_c/supportOrderChat'
import GreetingsBox from '_c/common/Greetings'
import { mapGetters, mapActions } from 'vuex'
=======
import ConversationList from './ConversationList';
import ChatLayout from '_c/workOrderChat/ChatLayout';
import SupportLayout from '_c/supportOrderChat';
import GreetingsBox from '_c/common/Greetings';
import { mapGetters, mapActions } from 'vuex';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      chatItemId: '',
      supportId: '',
      isFirstEnter: true
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  computed: {
    ...mapGetters(['draftList', 'isTec'])
  },
  methods: {
    ...mapActions(['setDraftList', 'delDraftList']),
<<<<<<< HEAD
    setMarkProblemOk(infos) {
      this.$refs.conversationListRef.setMarkProblemStatus(infos)
    },
    updateList(data) {
      this.hasDraftDIndex(data.question_id, data.support_id)
=======
    updateList(data) {
      this.hasDraftDIndex(data.question_id, data.support_id);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      let obj = {
        id: data.question_id,
        supportId: data.support_id,
        cont: data.combine_str,
        time: data.created_at
<<<<<<< HEAD
      }
      this.$refs.conversationListRef.updateList(obj)
    },
    transferOk() {
      //转交工单其他人
      this.isFirstEnter = true
      this.supportId = ''
      this.$refs.conversationListRef.formParentSearch()
    },
    selectChatItem(obj) {
      this.$nextTick(() => {
        this.beforeSaveDraft()
        this.isFirstEnter = false
        this.chatItemId = obj.questionId
        this.supportId = obj.supportId

        //   //每次切换时，判断当前新的item是否【有】草稿
        let hasItem = this.draftList.find(
          item => item.id == this.chatItemId && item.supportId == this.supportId
        )
=======
      };
      this.$refs.conversationListRef.updateList(obj);
    },
    transferOk() {
      //转交工单其他人
      this.isFirstEnter = true;
      this.supportId = '';
      this.$refs.conversationListRef.formParentSearch();
    },
    selectChatItem(obj) {
      this.$nextTick(() => {
        this.beforeSaveDraft();
        this.isFirstEnter = false;
        this.chatItemId = obj.questionId;
        this.supportId = obj.supportId;

        //   //每次切换时，判断当前新的item是否【有】草稿
        let hasItem = this.draftList.find(item => item.id == this.chatItemId && item.supportId == this.supportId);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        if (hasItem) {
          if (this.isTec == 1 || this.chatItemId == '0') {
            //技术
            this.$nextTick(() => {
<<<<<<< HEAD
              this.$refs.supportRef.showHtml(hasItem.cont)
            })
          } else {
            //工单
            this.$nextTick(() => {
              this.$refs.questionRef.showHtml(hasItem.cont)
            })
          }
        }
      })
=======
              this.$refs.supportRef.showHtml(hasItem.cont);
            });
          } else {
            //工单
            this.$nextTick(() => {
              this.$refs.questionRef.showHtml(hasItem.cont);
            });
          }
        }
      });
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    beforeSaveDraft() {
      let oldHtml =
        this.isTec == 1 || this.chatItemId == '0'
          ? this.$refs.supportRef.getEditorHtml()
<<<<<<< HEAD
          : this.$refs.questionRef.getEditorHtml()
      this.isTec == 1 || this.chatItemId == '0'
        ? this.$refs.supportRef.clearEditorHtml()
        : this.$refs.questionRef.clearEditorHtml()
=======
          : this.$refs.questionRef.getEditorHtml();
      this.isTec == 1 || this.chatItemId == '0'
        ? this.$refs.supportRef.clearEditorHtml()
        : this.$refs.questionRef.clearEditorHtml();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      if (oldHtml.length > 0) {
        //当输入框内容不为空，记录为草稿
        let item = {
          id: this.chatItemId,
          cont: oldHtml,
          supportId: this.supportId
<<<<<<< HEAD
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
        //内容不为空时
        this.hasDraftDIndex(this.chatItemId, this.supportId)
=======
        };
        //先删
        this.hasDraftDIndex(this.chatItemId, this.supportId);
        //在增
        this.setDraftList(item);
      } else if (oldHtml.length == 0) {
        this.$refs.conversationListRef.setItemCont(this.chatItemId, this.supportId);
        //内容不为空时
        this.hasDraftDIndex(this.chatItemId, this.supportId);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    hasDraftDIndex(id, supportId) {
      //查找草稿箱是否有当前的草稿
<<<<<<< HEAD
      let findIndex = this.draftList.findIndex(
        item => item.id === id && item.supportId == supportId
      )
      if (findIndex !== -1) {
        //找到并且删除
        this.delDraftList(findIndex)
      }
    },
    changeOk() {
      this.isFirstEnter = true
      this.supportId = ''
    }
  },
  beforeDestroy() {
    this.beforeSaveDraft()
=======
      let findIndex = this.draftList.findIndex(item => item.id === id && item.supportId == supportId);
      if (findIndex !== -1) {
        //找到并且删除
        this.delDraftList(findIndex);
      }
    },
    changeOk() {
      this.isFirstEnter = true;
      this.supportId = '';
    }
  },
  beforeDestroy() {
    this.beforeSaveDraft();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  components: {
    ConversationList,
    ChatLayout,
    SupportLayout,
    GreetingsBox
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.conversation-wrapper {
  padding: 10px 0;
  display: flex;
  height: 100vh;
  overflow: hidden;
  .left {
<<<<<<< HEAD
    width: 400px;
=======
    width: 360px;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
