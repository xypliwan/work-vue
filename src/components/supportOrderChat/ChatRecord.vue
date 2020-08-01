<template>
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
      dataList: []
    }
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
            el.is_read = 1
          }
        })
      }
    },
    supportId: {
      immediate: true,
      handler: async function(newVal) {
        if (newVal !== '') {
          this.params.page = 1
          this.dataList = []
          await this.getSupportAnswer()
          // this.$nextTick(() => {
          // this.$refs.chatBox.setScrollTops();
          // });
        }
      }
    },
    support(newVal) {
      //添加对方输入的消息
      if (newVal.support_id == this.supportId) {
        this.pushCont(newVal)
        this.setAnswerRead(newVal.answer_id)
      }
    },
    cancelAnswer(newVal) {
      //删除对方测回的消息
      if (
        newVal.answer_type == 'support' &&
        newVal.support_id == this.supportId
      ) {
        this.dataList.forEach((el, i) => {
          if (el.answer_id == newVal.answer_id) {
            this.dataList.splice(i, 1)
          }
        })
      }
    }
  },
  methods: {
    async setAnswerRead(id) {
      try {
        await setAnswerRead({ answer_id: id })
      } catch (error) {
        this._message(error)
      }
    },
    pushCont(item) {
      //发送信息
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
    }
  },
  components: {
    ChatBox
  }
}
</script>

<style lang="scss" scoped></style>
