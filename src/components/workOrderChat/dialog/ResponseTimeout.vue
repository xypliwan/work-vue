<template>
  <div>
    <el-dialog
      title="选择超时原因"
      :append-to-body="true"
      :visible.sync="visible"
      width="900px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-form-item
            :label="item.tc_name"
            v-for="(item, i) in list"
            :key="i"
            prop="tag_id"
            :required="true"
            :rules="[
              {
                required: true,
                message: '请选择',
                trigger: 'change'
              }
            ]"
          >
            <el-radio-group v-model="ruleForm.tag_id">
              <el-radio
                :label="ev.tag_id"
                v-for="(ev, j) in item.arr"
                :key="j"
                >{{ ev.tag_name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addTimeoutTag } from '@/api/conversation'
export default {
  props: {
    visible: Boolean,
    questionId: String,
    list: Array
  },
  data() {
    return {
      ruleForm: {
        question_id: '', //问题id
        tag_id: '' //标签id
      },
      rules: {},
      formLoading: false
    }
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.addTimeoutTagFn()
        } else {
          return false
        }
      })
    },
    async addTimeoutTagFn() {
      this.ruleForm.question_id = this.questionId
      try {
        const { message } = await addTimeoutTag(this.ruleForm)
        this._message(message, 'success')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.invitationl-title {
  color: #409eff;
}
.rate-box {
  margin-top: 10px;
}
</style>
