<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      title="转交工单"
      :append-to-body="true"
      :visible.sync="dialog"
      width="600px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          size="small"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-form-item label>
            <div class="desc">
              你即将转交此工单给其他人进行全权处理，请选择：
            </div>
          </el-form-item>
          <el-form-item label="客服选择" prop="user_id">
            <el-select
              filterable
              clearable
              v-model="ruleForm.user_id"
              placeholder="请选择"
            >
              <el-option
                :label="item.username"
                :value="item.user_id"
                v-for="(item, i) in userList"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转交原因" prop="content">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="ruleForm.content"
            ></el-input>
=======
    <el-dialog title="转交工单" :append-to-body="true" :visible.sync="dialog" width="600px" :before-close="handleClose">
      <div>
        <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label>
            <div class="desc">你即将转交此工单给其他人进行全权处理，请选择：</div>
          </el-form-item>
          <el-form-item label="客服选择" prop="user_id">
            <el-select filterable clearable v-model="ruleForm.user_id" placeholder="请选择">
              <el-option :label="item.username" :value="item.user_id" v-for="(item,i) in userList" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转交原因" prop="content">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.content"></el-input>
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
import {
  getResolveUserList,
  changeQuestionResolveUser
} from '@/api/conversation'
export default {
  props: {
    dialog: Boolean,
    questionId: [String, Number],
    productId: [String, Number]
=======
import { getResolveUserList, changeQuestionResolveUser } from '@/api/conversation';
export default {
  props: {
    dialog: Boolean,
    questionId: [String, Number]
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  data() {
    return {
      formLoading: false,
      userList: [],
      ruleForm: {
        question_id: '',
        user_id: '',
        content: ''
      },
      rules: {
        user_id: [{ required: true, message: '请选择', trigger: 'change' }],
        content: [{ required: true, message: '请填写', trigger: 'blur' }]
      }
<<<<<<< HEAD
    }
  },
  mounted() {},
  watch: {
    productId(newVal) {
      if (newVal !== '') {
        this.getResolveUserLists()
      }
    }
=======
    };
  },
  mounted() {
    this.getResolveUserLists();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
<<<<<<< HEAD
          this.changeQuestionResolveUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async changeQuestionResolveUser() {
      this.formLoading = true
      this.ruleForm.question_id = this.questionId
      try {
        let { message } = await changeQuestionResolveUser(this.ruleForm)
        this._message(message, 'success')
        this.$emit('transferOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    async getResolveUserLists() {
      this.formLoading = true
      try {
        let { data } = await getResolveUserList({ product_id: this.productId })
        this.userList = data
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('update:dialog', false)
    }
  }
}
=======
          this.changeQuestionResolveUser();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async changeQuestionResolveUser() {
      this.formLoading = true;
      this.ruleForm.question_id = this.questionId;
      try {
        let { message } = await changeQuestionResolveUser(this.ruleForm);
        this._message(message, 'success');
        this.$emit('transferOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    async getResolveUserLists() {
      this.formLoading = true;
      try {
        let { data } = await getResolveUserList();
        this.userList = data;
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit('update:dialog', false);
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.desc {
  font-size: 13px;
  color: #409eff;
  margin-bottom: 10px;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
