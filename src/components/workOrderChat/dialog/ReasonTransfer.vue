<template>
  <div>
    <el-dialog
      title="转交原因"
      :append-to-body="true"
      :visible.sync="reasonTransferDialog"
      width="30%"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div v-html="reasonTransferText"></div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    reasonTransferDialog: Boolean,
    reasonTransferText: String
  },
  methods: {
    handleClose() {
      this.$emit('update:reasonTransferDialog', false)
    }
  }
}
</script>
