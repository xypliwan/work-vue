<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      :title="title"
      :append-to-body="true"
      :visible.sync="tapdVisible"
      width="500px"
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
          <el-form-item label="TAPD ID" prop="tapd_id">
            <el-input
              v-model="ruleForm.tapd_id"
              clearable
              placeholder="请输入TAPD ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="TAPD项目" prop="workspace_id">
            <el-select
              v-model="ruleForm.workspace_id"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in tapdWorkspaceList"
                :key="item.workspace_id"
                :label="item.name"
                :value="item.workspace_id"
              ></el-option>
=======
    <el-dialog title="关联TAPD" :append-to-body="true" :visible.sync="tapdVisible" width="500px" :before-close="handleClose">
      <div>
        <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label="TAPD ID" prop="tapd_id">
            <el-input v-model="ruleForm.tapd_id" clearable placeholder="请输入TAPD ID"></el-input>
          </el-form-item>
          <el-form-item label="TAPD项目" prop="workspace_id">
            <el-select v-model="ruleForm.workspace_id" placeholder="请选择" clearable filterable>
              <el-option v-for="item in tapdWorkspaceList" :key="item.workspace_id" :label="item.name" :value="item.workspace_id"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
          <el-form-item label prop="isBug">
            <el-checkbox v-model="isBug">是否为BUG</el-checkbox>
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
import { bindTapd } from '@/api/demandConversation'
export default {
  props: {
    tapdVisible: {
      type: Boolean,
      default: false
    },
    tapdWorkspaceList: Array,
    id: String,
    isEdit: [String, Number], //0关联，  1修改
    editInfo: {
      type: Object,
      deafult: {}
    }
=======
import { bindTapd } from '@/api/demandConversation';
export default {
  props: {
    tapdVisible: false,
    tapdWorkspaceList: Array,
    id: String
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  data() {
    return {
      ruleForm: {
        list_id: '', //需求id
        workspace_id: '', //tapd项目id
        tapd_id: '', //tapd id
        is_bug: 0
      },
      rules: {
        tapd_id: [{ required: true, message: '请输入', trigger: 'blur' }],
        workspace_id: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      isBug: false,
<<<<<<< HEAD
      formLoading: false,
      title: '关联TAPD'
    }
  },
  watch: {
    isBug(newVal) {
      this.ruleForm.is_bug = newVal ? 1 : 0
    },
    tapdVisible(newVal) {
      if (newVal) {
        this.title = this.isEdit ? '修改TAPD' : '关联TAPD'
        Object.assign(this.ruleForm, this.editInfo)
        this.isBug = this.editInfo.is_bug == 1 ? true : false
        console.log(this.editInfo)
        console.log(this.ruleForm)
      }
=======
      formLoading: false
    };
  },
  watch: {
    isBug(newVal) {
      this.ruleForm.is_bug = newVal ? 1 : 0;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
<<<<<<< HEAD
          this.bindTapd()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async bindTapd() {
      this.formLoading = true
      this.ruleForm.list_id = this.id
      try {
        let { message } = await bindTapd(this.ruleForm)
        this._message(message, 'success')
        this.$emit('associationOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    handleClose() {
      this.isBug = false
      this.$refs.ruleForm.resetFields()
      this.$emit('update:tapdVisible', false)
    }
  }
}
=======
          this.bindTapd();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async bindTapd() {
      this.formLoading = true;
      this.ruleForm.list_id = this.id;
      try {
        let { data, message } = await bindTapd(this.ruleForm);
        this._message(message, 'success');
        this.$emit('associationOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    handleClose() {
      this.isBug = false;
      this.$refs.ruleForm.resetFields();
      this.$emit('update:tapdVisible', false);
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  display: block;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
