<template>
  <chat-box ref="chatBox" :chatItemId="chatItemId" :hasMore="hasMore" :isLoadings="isLoadings" :direction="direction" :dataList="dataList" @loadingData="loadingData" @canCancel="canCancelInfo">
    <div slot="autoAdoptionOrder">
      <slot name="autoAdoptionOrder"></slot>
    </div>
  </chat-box>
</template>

<script>
import { getAnswer, cancelSend, setAnswerRead } from '@/api/conversation';
import ChatBox from '_c/common/ChatBox';
import { mapGetters } from 'vuex';
export default {
  props: {
    chatItemId: String
  },
  data() {
    return {
      params: {
        question_id: '',
        page: 1,
        pageSize: 15
      },
      hasMore: false,
      isLoadings: false,
      direction: false,
      dataList: [],
      isResData: false
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(['question', 'cancelAnswer', 'answerReadQuestion'])
  },
  watch: {
    answerReadQuestion(newVal) {
      if (newVal.question_id == this.chatItemId) {
        this.dataList.forEach(el => {
          if (el.answer_id == newVal.answer_id) {
            el.is_read = 1;
          }
        });
      }
    },
    chatItemId: {
      immediate: true,
      handler: async function(newVal) {
        if (newVal !== '') {
          this.params.page = 1;
          this.dataList = [];
          await this.getAnswer();
          // this.$nextTick(() => {
          // this.$refs.chatBox.setScrollTops();
          // });
        }
      }
    },
    question(newVal) {
      //添加对方输入的消息
      if (newVal.question_id == this.chatItemId) {
        this.pushCont(newVal);
        this.setAnswerRead(newVal.answer_id);
      }
    },
    cancelAnswer(newVal) {
      //删除对方测回的消息
      if (newVal.answer_type == 'question' && newVal.question_id == this.chatItemId) {
        this.dataList.forEach((el, i) => {
          if (el.answer_id == newVal.answer_id) {
            this.dataList.splice(i, 1);
          }
        });
      }
    }
  },
  methods: {
    async setAnswerRead(id) {
      try {
        let { data } = await setAnswerRead({ answer_id: id });
      } catch (error) {
        this._message(error);
      }
    },
    pushCont(item) {
      //发送信息
      item.msgLoading = false;
      this.dataList.push(item);
      this.$nextTick(() => {
        this.$refs.chatBox.setScrollTops();
      });
    },
    showHtml(val) {
      this.$refs.chatBox.showHtml(val);
    },
    canCancelInfo(obj) {
      //撤回消息
      this.cancelSend(obj.id, obj.index);
    },
    loadingData(oldHeight) {
      //加载更多列表数据
      this.params.page++;
      this.getAnswer(oldHeight);
    },
    async cancelSend(answerId, i) {
      this.$set(this.dataList[i], 'msgLoading', true);
      try {
        let { data } = await cancelSend({ answer_id: answerId });
        this.dataList.splice(i, 1);
      } catch (error) {
        this.$set(this.dataList[i], 'msgLoading', false);
        this._message(error);
      }
    },
    async getAnswer(oldHeight = null) {
      //此处限制：当加载当前页没请求回来时，用户继续上拉触发 当前页+1 页的请求时，直接return掉
      if (this.isResData) return;
      this.isResData = true;
      this.isLoadings = true;
      this.params.question_id = this.chatItemId;
      try {
        let { data } = await getAnswer(this.params);
        let snapData = data.reverse();
        this.hasMore = data.length < this.params.pageSize;
        this.dataList = [...snapData, ...this.dataList];
        this.dataList.forEach(el => {
          el.msgLoading = false;
        });
        if (this.$refs['chatBox'] !== undefined) {
          this.$refs.chatBox.resetScrollHeight(oldHeight);
        }
      } catch (error) {
        this._message(error);
      }
      this.isLoadings = false;
      this.isResData = false;
    }
  },
  components: {
    ChatBox
  }
};
</script>

<style lang="scss" scoped>
</style>