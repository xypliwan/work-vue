<template>
  <div>
    <el-dialog
      title="填写未解决原因"
      :append-to-body="true"
      :visible.sync="causeVisible"
      width="700px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormCause"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-form-item label="原因" prop="content">
            <el-input
              type="textarea"
              placeholder="请输入您的未解决原因"
              v-model="ruleForm.content"
              :autosize="{ minRows: 4, maxRows: 4 }"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submitForm"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { questionUndeal } from '@/api/conversation'
export default {
  props: {
    causeVisible: Boolean,
    questionId: String
  },
  data() {
    return {
      ruleForm: {
        content: ''
      },
      rules: {
        content: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      formLoading: false
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleFormCause.validate(valid => {
        if (valid) {
          this.unsolved()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async unsolved() {
      this.formLoading = true
      try {
        let { data, message } = await questionUndeal({
          question_id: this.questionId,
          content: this.ruleForm.content
        })
        this._message(message, 'success')
        this.$emit('causeOk', data.answer)
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    handleClose() {
      this.$refs.ruleFormCause.resetFields()
      this.$emit('update:causeVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
