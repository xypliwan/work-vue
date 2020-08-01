<template>
  <div>
<<<<<<< HEAD
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
=======
    <el-drawer :show-close="false" :visible.sync="chatDialogVisible" size="1000px" direction="rtl" :before-close="handleClose">
      <div class="c-box">
        <chat-layout :chatItemId="chatItemId" height="calc(100vh - 120px)" rightHeight="calc(100vh - 100px - 200px + 180px)" ref="questionRef"></chat-layout>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </div>
    </el-drawer>
  </div>
</template>

<<<<<<< HEAD
<script>
import ChatLayout from '_c/workOrderChat/ChatLayout'
=======

<script>
import ChatLayout from '_c/workOrderChat/ChatLayout';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    chatDialogVisible: Boolean,
    chatItemId: [String, Number]
  },
  methods: {
    handleClose() {
<<<<<<< HEAD
      this.$refs.questionRef.clearEditorHtml()
      this.$emit('update:chatDialogVisible', false)
=======
      this.$refs.questionRef.clearEditorHtml();
      this.$emit('update:chatDialogVisible', false);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    ChatLayout
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
/deep/ .el-drawer__header {
  display: none;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
