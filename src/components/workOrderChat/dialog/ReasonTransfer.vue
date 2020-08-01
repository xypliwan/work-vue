<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      title="转交原因"
      :append-to-body="true"
      :visible.sync="reasonTransferDialog"
      width="30%"
      :before-close="handleClose"
      v-dialogDrag
    >
=======
    <el-dialog title="转交原因" :append-to-body="true" :visible.sync="reasonTransferDialog" width="30%" :before-close="handleClose">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
      this.$emit('update:reasonTransferDialog', false)
    }
  }
}
</script>
=======
      this.$emit('update:reasonTransferDialog', false);
    }
  }
};
</script>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
