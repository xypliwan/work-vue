<template>
<<<<<<< HEAD
  <chat-box
    ref="chatBox"
    :chatItemId="supportId"
    :hasMore="hasMore"
    :isLoadings="isLoadings"
    :direction="direction"
    :dataList="dataList"
    @loadingData="loadingData"
    @canCancel="canCancelInfo"
  ></chat-box>
</template>

<script>
import { getSupportAnswer, cancelSend, setAnswerRead } from '@/api/conversation'
import ChatBox from '_c/common/ChatBox'
import { mapGetters } from 'vuex'
=======
  <chat-box ref="chatBox" :chatItemId="supportId" :hasMore="hasMore" :isLoadings="isLoadings" :direction="direction" :dataList="dataList" @loadingData="loadingData" @canCancel="canCancelInfo"></chat-box>
</template>

<script>
import { getSupportAnswer, cancelSend, setAnswerRead } from '@/api/conversation';
import ChatBox from '_c/common/ChatBox';
import { mapGetters } from 'vuex';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    supportId: String
  },
  data() {
    return {
      params: {
        support_id: '',
        page: 1,
        pageSize: 50
      },
      hasMore: false,
      isLoadings: false,
      direction: false,
<<<<<<< HEAD
      dataList: []
    }
=======
      dataList: [],
      isResData: false
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  mounted() {},
  computed: {
    ...mapGetters(['support', 'cancelAnswer', 'answerReadSupport'])
  },
  watch: {
    answerReadSupport(newVal) {
      if (newVal.support_id == this.supportId) {
        this.dataList.forEach(el => {
          if (el.answer_id == newVal.answer_id) {
<<<<<<< HEAD
            el.is_read = 1
          }
        })
=======
            el.is_read = 1;
          }
        });
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    supportId: {
      immediate: true,
      handler: async function(newVal) {
        if (newVal !== '') {
<<<<<<< HEAD
          this.params.page = 1
          this.dataList = []
          await this.getSupportAnswer()
=======
          this.params.page = 1;
          this.dataList = [];
          await this.getSupportAnswer();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          // this.$nextTick(() => {
          // this.$refs.chatBox.setScrollTops();
          // });
        }
      }
    },
    support(newVal) {
      //添加对方输入的消息
      if (newVal.support_id == this.supportId) {
<<<<<<< HEAD
        this.pushCont(newVal)
        this.setAnswerRead(newVal.answer_id)
=======
        this.pushCont(newVal);
        this.setAnswerRead(newVal.answer_id);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    cancelAnswer(newVal) {
      //删除对方测回的消息
<<<<<<< HEAD
      if (
        newVal.answer_type == 'support' &&
        newVal.support_id == this.supportId
      ) {
        this.dataList.forEach((el, i) => {
          if (el.answer_id == newVal.answer_id) {
            this.dataList.splice(i, 1)
          }
        })
=======
      if (newVal.answer_type == 'support' && newVal.support_id == this.supportId) {
        this.dataList.forEach((el, i) => {
          if (el.answer_id == newVal.answer_id) {
            this.dataList.splice(i, 1);
          }
        });
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },
  methods: {
    async setAnswerRead(id) {
      try {
<<<<<<< HEAD
        await setAnswerRead({ answer_id: id })
      } catch (error) {
        this._message(error)
=======
        let { data } = await setAnswerRead({ answer_id: id });
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    pushCont(item) {
      //发送信息
<<<<<<< HEAD
      item.msgLoading = false
      this.dataList.push(item)
      this.$nextTick(() => {
        this.$refs.chatBox.setScrollTops()
      })
    },
    canCancelInfo(obj) {
      //撤回消息
      this.cancelSend(obj.id, obj.index)
    },
    async cancelSend(answerId, i) {
      this.$set(this.dataList[i], 'msgLoading', true)
      try {
        await cancelSend({
          answer_id: answerId,
          answer_type: 'support'
        })
        this.dataList.splice(i, 1)
      } catch (error) {
        this.$set(this.dataList[i], 'msgLoading', false)
        this._message(error)
      }
    },
    loadingData(oldHeight) {
      if (this.isLoadings) return
      this.params.page++
      this.getSupportAnswer(oldHeight)
    },
    async getSupportAnswer(oldHeight = null) {
      this.isLoadings = true
      this.params.support_id = this.supportId
      try {
        let { data, extend } = await getSupportAnswer(this.params)
        if (this.supportId == extend.support_id) {
          let snapData = data.reverse()
          this.hasMore = data.length < this.params.pageSize
          this.dataList = [...snapData, ...this.dataList]
          this.dataList.forEach(el => {
            el.msgLoading = false
          })
          if (this.$refs['chatBox'] !== undefined) {
            this.$refs.chatBox.resetScrollHeight(oldHeight)
          }
        }
      } catch (error) {
        this._message(error)
      }
      this.isLoadings = false
=======
      item.msgLoading = false;
      this.dataList.push(item);
      this.$nextTick(() => {
        this.$refs.chatBox.setScrollTops();
      });
    },
    canCancelInfo(obj) {
      //撤回消息
      this.cancelSend(obj.id, obj.index);
    },
    async cancelSend(answerId, i) {
      this.$set(this.dataList[i], 'msgLoading', true);
      try {
        let { data } = await cancelSend({ answer_id: answerId, answer_type: 'support' });
        this.dataList.splice(i, 1);
      } catch (error) {
        this.$set(this.dataList[i], 'msgLoading', false);
        this._message(error);
      }
    },
    loadingData(oldHeight) {
      this.params.page++;
      this.getSupportAnswer(oldHeight);
    },
    async getSupportAnswer(oldHeight = null) {
      if (this.isResData) return;
      this.isResData = true;
      this.isLoadings = true;
      this.params.support_id = this.supportId;
      try {
        let { data } = await getSupportAnswer(this.params);
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    ChatBox
  }
<<<<<<< HEAD
}
</script>

<style lang="scss" scoped></style>
=======
};
</script>

<style lang="scss" scoped>
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
