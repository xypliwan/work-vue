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
        <chat-layout
          :chatItemId="chatItemId"
          height="calc(100vh - 120px)"
          rightHeight="calc(100vh - 100px - 200px + 180px)"
          ref="questionRef"
        ></chat-layout>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ChatLayout from '_c/workOrderChat/ChatLayout'
export default {
  props: {
    chatDialogVisible: Boolean,
    chatItemId: [String, Number]
  },
  methods: {
    handleClose() {
      this.$refs.questionRef.clearEditorHtml()
      this.$emit('update:chatDialogVisible', false)
    }
  },
  components: {
    ChatLayout
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-drawer__header {
  display: none;
}
</style>
