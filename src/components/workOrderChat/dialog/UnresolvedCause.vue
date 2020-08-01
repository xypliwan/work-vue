<template>
  <div>
<<<<<<< HEAD
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
=======
    <el-dialog title="填写未解决原因" :append-to-body="true" :visible.sync="causeVisible" width="700px" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormCause" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label="原因" prop="content">
            <el-input type="textarea" placeholder="请输入您的未解决原因" v-model="ruleForm.content" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
<<<<<<< HEAD
        <el-button size="mini" type="primary" @click="submitForm"
          >提交</el-button
        >
=======
        <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </div>
    </el-dialog>
  </div>
</template>

<script>
<<<<<<< HEAD
import { questionUndeal } from '@/api/conversation'
=======
import { questionUndeal } from '@/api/conversation';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  methods: {
    submitForm() {
      this.$refs.ruleFormCause.validate(valid => {
        if (valid) {
<<<<<<< HEAD
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
=======
          this.unsolved();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async unsolved() {
      this.formLoading = true;
      try {
        let { data,message } = await questionUndeal({ question_id: this.questionId, content: this.ruleForm.content });
        this._message(message, 'success');
        this.$emit('causeOk',data.answer);
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    handleClose() {
      this.$refs.ruleFormCause.resetFields();
      this.$emit('update:causeVisible', false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
