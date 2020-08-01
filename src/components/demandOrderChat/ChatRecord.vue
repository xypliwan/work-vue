<template>
<<<<<<< HEAD
  <chat-box
    ref="chatBox"
    :chatItemId="chatItemId"
    :hasMore="hasMore"
    :isLoadings="isLoadings"
    :direction="direction"
    :dataList="dataList"
    @loadingData="loadingData"
    @canCancel="canCancelInfo"
  ></chat-box>
</template>

<script>
import { cancelSend, setAnswerRead } from '@/api/conversation'
import { getNeedAnswer } from '@/api/demandConversation'
import ChatBox from '_c/common/ChatBox'
import { mapGetters } from 'vuex'
=======
  <chat-box ref="chatBox" :chatItemId="chatItemId" :hasMore="hasMore" :isLoadings="isLoadings" :direction="direction" :dataList="dataList" @loadingData="loadingData" @canCancel="canCancelInfo"></chat-box>
</template>

<script>
import { cancelSend, setAnswerRead } from '@/api/conversation';
import { getNeedAnswer } from '@/api/demandConversation';
import ChatBox from '_c/common/ChatBox';
import { mapGetters } from 'vuex';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    chatItemId: String
  },
  data() {
    return {
      params: {
        list_id: '',
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
    ...mapGetters(['cancelAnswer', 'answerReadDemand', 'demand'])
  },
  watch: {
    answerReadDemand(newVal) {
      if (newVal.list_id == this.chatItemId) {
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
    chatItemId: {
      immediate: true,
      handler: async function(newVal) {
        if (newVal !== '') {
<<<<<<< HEAD
          this.params.page = 1
          this.dataList = []
          await this.getNeedAnswer()
=======
          this.params.page = 1;
          this.dataList = [];
          await this.getNeedAnswer();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          // this.$nextTick(() => {
          // this.$refs.chatBox.setScrollTops();
          // });
        }
      }
    },
    demand(newVal) {
      //添加对方输入的消息
      if (newVal.list_id == this.chatItemId) {
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
      if (newVal.answer_type == 'need' && newVal.list_id == this.chatItemId) {
        this.dataList.forEach((el, i) => {
          if (el.answer_id == newVal.answer_id) {
<<<<<<< HEAD
            this.dataList.splice(i, 1)
          }
        })
=======
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
    showHtml(val) {
      this.$refs.chatBox.showHtml(val)
    },
    canCancelInfo(obj) {
      //撤回消息
      this.cancelSend(obj.id, obj.index)
    },
    loadingData(oldHeight) {
      if (this.isLoadings) return
      //加载更多列表数据
      this.params.page++
      this.getNeedAnswer(oldHeight)
    },
    async cancelSend(answerId, i) {
      this.$set(this.dataList[i], 'msgLoading', true)
      try {
        await cancelSend({
          answer_id: answerId,
          answer_type: 'need'
        })
        this.dataList.splice(i, 1)
      } catch (error) {
        this.$set(this.dataList[i], 'msgLoading', false)
        this._message(error)
      }
    },
    async getNeedAnswer(oldHeight = null) {
      this.isLoadings = true
      this.params.list_id = this.chatItemId
      try {
        let { data, extend } = await getNeedAnswer(this.params)
        if (this.chatItemId == extend.list_id) {
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
      this.getNeedAnswer(oldHeight);
    },
    async cancelSend(answerId, i) {
      this.$set(this.dataList[i], 'msgLoading', true);
      try {
        let { data } = await cancelSend({ answer_id: answerId, answer_type: 'need' });
        this.dataList.splice(i, 1);
      } catch (error) {
        this.$set(this.dataList[i], 'msgLoading', false);
        this._message(error);
      }
    },
    async getNeedAnswer(oldHeight = null) {
      if (this.isResData) return;
      this.isResData = true;
      this.isLoadings = true;
      this.params.list_id = this.chatItemId;
      try {
        let { data } = await getNeedAnswer(this.params);
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
