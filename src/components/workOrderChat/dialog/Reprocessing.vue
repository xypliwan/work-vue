<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      title="重开技术支持"
      :append-to-body="true"
      :visible.sync="reprocessVisible"
      width="600px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          size="small"
          label-position="top"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-form-item
            label="此技术处理已解决，请详细描述未解决的原因："
            prop="content"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="ruleForm.content"
            ></el-input>
=======
    <el-dialog title="重开技术支持" :append-to-body="true" :visible.sync="reprocessVisible" width="600px" :before-close="handleClose">
      <div>
        <el-form size="small" label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label="此技术处理已解决，请详细描述未解决的原因：" prop="content">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.content"></el-input>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
import { supportUndeal } from '@/api/conversation'
=======
import { supportUndeal } from '@/api/conversation';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    reprocessVisible: Boolean,
    supportId: String
  },
  data() {
    return {
      ruleForm: {
        support_id: '',
        content: ''
      },
      rules: {
        content: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      formLoading: false
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
<<<<<<< HEAD
          this.supportUndeal()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async supportUndeal() {
      this.formLoading = true
      this.ruleForm.support_id = this.supportId
      try {
        let { message, data } = await supportUndeal(this.ruleForm)
        this._message(message, 'success')
        this.$emit('unsolved', data)
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('update:reprocessVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
=======
          this.supportUndeal();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async supportUndeal(cont) {
      this.formLoading = true;
      this.ruleForm.support_id = this.supportId;
      try {
        let { message,data } = await supportUndeal(this.ruleForm);
        this._message(message, 'success');
        this.$emit('unsolved',data);
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit('update:reprocessVisible', false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
