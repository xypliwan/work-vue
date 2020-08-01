<template>
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
      dataList: []
    }
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
            el.is_read = 1
          }
        })
      }
    },
    chatItemId: {
      immediate: true,
      handler: async function(newVal) {
        if (newVal !== '') {
          this.params.page = 1
          this.dataList = []
          await this.getNeedAnswer()
          // this.$nextTick(() => {
          // this.$refs.chatBox.setScrollTops();
          // });
        }
      }
    },
    demand(newVal) {
      //添加对方输入的消息
      if (newVal.list_id == this.chatItemId) {
        this.pushCont(newVal)
        this.setAnswerRead(newVal.answer_id)
      }
    },
    cancelAnswer(newVal) {
      //删除对方测回的消息
      if (newVal.answer_type == 'need' && newVal.list_id == this.chatItemId) {
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
    }
  },
  components: {
    ChatBox
  }
}
</script>

<style lang="scss" scoped></style>
