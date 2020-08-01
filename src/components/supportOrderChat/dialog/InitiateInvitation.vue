<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      title="结束技术支持"
      :append-to-body="true"
      :visible.sync="invitationVisible"
      width="800px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-form-item label>
            <div class="invitationl-title">
              你即将结束技术支持请针对此次工单进行服务总结：
            </div>
          </el-form-item>
          <el-form-item
            :label="item.tc_name"
            v-for="(item, i) in tagList"
            :key="i"
            prop="tag_ids"
          >
            <el-checkbox-group v-model="ruleForm.tag_ids">
              <el-checkbox
                :label="ev.tag_id"
                v-for="(ev, j) in item.arr"
                :key="j"
                >{{ ev.tag_name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="补充说明" prop="sum">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="ruleForm.sum"
            ></el-input>
=======
    <el-dialog title="结束技术支持" :append-to-body="true" :visible.sync="invitationVisible" width="800px" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label>
            <div class="invitationl-title">你即将结束技术支持请针对此次工单进行服务总结：</div>
          </el-form-item>
          <el-form-item :label="item.tc_name" v-for="(item,i) in tagList" :key="i" prop="tag_ids">
            <el-checkbox-group v-model="ruleForm.tag_ids">
              <el-checkbox :label="ev.tag_id" v-for="(ev,j) in item.arr" :key="j">{{ev.tag_name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="补充说明" prop="sum">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.sum"></el-input>
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
import { getTags } from '@/api/common'
import { endSupportDeal } from '@/api/workbench'
=======
import { getTags } from '@/api/common';
import { endSupportDeal } from '@/api/workbench';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    invitationVisible: Boolean,
    supportId: String
  },
  data() {
    return {
      ruleForm: {
        support_id: '', //问题id
        tag_ids: [], //标签id数组
        sum: '' //总结
      },
      rules: {
<<<<<<< HEAD
        tag_ids: [
          {
            type: 'array',
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
=======
        tag_ids: [{ type: 'array', required: true, message: '请选择', trigger: 'change' }],
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        sum: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      tagList: [], //标签列表
      formLoading: false
<<<<<<< HEAD
    }
  },
  mounted() {
    this.getTags()
=======
    };
  },
  mounted() {
    this.getTags();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
<<<<<<< HEAD
          this.endSupportDeal()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async endSupportDeal() {
      this.formLoading = true
      this.ruleForm.support_id = this.supportId
      try {
        let { message, data } = await endSupportDeal(this.ruleForm)
        this.$emit('changeStatus', data)
        this._message(message, 'success')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    async getTags() {
      try {
        let { data } = await getTags({ tc_code: 'tec_tag' })
        this.tagList = data
      } catch (error) {
        this._message(error)
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('update:invitationVisible', false)
    }
  }
}
=======
          this.endSupportDeal();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async endSupportDeal() {
      this.formLoading = true;
      this.ruleForm.support_id = this.supportId;
      try {
        let { message,data } = await endSupportDeal(this.ruleForm);
        this.$emit('changeStatus',data)
        this._message(message, 'success');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    async getTags() {
      try {
        let { data } = await getTags({ tc_code: 'tec_tag' });
        this.tagList = data;
      } catch (error) {
        this._message(error);
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit('update:invitationVisible', false);
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.invitationl-title {
  color: #409eff;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
