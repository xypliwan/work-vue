<template>
  <div>
    <el-drawer
      :show-close="false"
      :append-to-body="true"
      :visible.sync="chatDialogVisible"
      size="1000px"
      direction="rtl"
      :before-close="handleClose"
    >
      <div class="c-box">
        <!-- <chat-layout :chatItemId="chatItemId" height="calc(100vh - 120px)" rightHeight="calc(100vh - 100px - 200px + 180px)" ref="questionRef"></chat-layout> -->

        <!-- 聊天窗口（头部，历史聊天，聊天框，及其他相关操作） -->
        <demand-order-chat
          :chatItemId="chatItemId"
          height="calc(100vh - 120px)"
          rightHeight="calc(100vh - 100px - 200px + 180px)"
          ref="demandRef"
        ></demand-order-chat>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import DemandOrderChat from '_c/demandOrderChat'
export default {
  props: {
    chatDialogVisible: Boolean,
    chatItemId: [String, Number]
  },
  methods: {
    handleClose() {
      this.$refs.demandRef.clearEditorHtml()
      this.$emit('update:chatDialogVisible', false)
    }
  },
  components: {
    DemandOrderChat
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-drawer__header {
  display: none;
}
</style>
