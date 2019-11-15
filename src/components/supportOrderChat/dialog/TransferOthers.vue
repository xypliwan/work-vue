<template>
  <div>
    <el-dialog title="转交技术支持" :append-to-body="true" :visible.sync="dialog" width="500px" :before-close="handleClose">
      <div>
        <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label>
            <div class="desc">你即将转交给其他人进行全权处理，请选择：</div>
          </el-form-item>
          <el-form-item label="技术人员" prop="change_people_id">
            <el-select filterable clearable v-model="ruleForm.change_people_id" placeholder="请选择">
              <el-option :label="item.username" :value="item.user_id" v-for="(item,i) in userList" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submit">转交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTecPeople } from '@/api/servicePlatform';
import { changeSupportTec } from '@/api/workbench';
export default {
  props: {
    dialog: Boolean,
    supportId: [String, Number]
  },
  data() {
    return {
      formLoading: false,
      userList: [],
      ruleForm: {
        support_id: '',
        change_people_id: ''
      },
      rules: {
        change_people_id: [{ required: true, message: '请选择', trigger: 'change' }]
      }
    };
  },
  mounted() {
    this.getTecPeople();
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.changeSupportTec();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async changeSupportTec() {
      this.formLoading = true;
      this.ruleForm.support_id = this.supportId;
      try {
        let { message } = await changeSupportTec(this.ruleForm);
        this._message(message, 'success');
        this.$emit('transferOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    async getTecPeople() {
      this.formLoading = true;
      try {
        let { data } = await getTecPeople();
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
</script>

<style lang="scss" scoped>
.desc {
  font-size: 13px;
  color: #409eff;
  margin-bottom: 10px;
}
/deep/ .el-select {
  display: block;
}
</style>