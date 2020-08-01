<template>
  <div>
    <el-dialog
      title="技术评价"
      :append-to-body="true"
      :visible.sync="invitationVisible"
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
          <el-form-item label>
            <div class="invitationl-title">
              你即将向此次技术人员进行评价，请针对此次工单进行服务总结：
            </div>
            <div class="desc">请对本工单进行服务总结选择：</div>
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
import { getTags } from '@/api/common'
import { addSupportInvite } from '@/api/conversation'
export default {
  props: {
    invitationVisible: Boolean,
    questionId: String,
    supportId: String
  },
  data() {
    return {
      ruleForm: {
        support_id: '',
        tag_ids: [], //标签id数组
        sum: '' //总结
      },
      rules: {
        tag_ids: [
          {
            type: 'array',
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        sum: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      tagList: [], //标签列表
      formLoading: false
    }
  },
  mounted() {
    this.getTags()
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.addSupportInvite()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addSupportInvite() {
      this.formLoading = true
      this.ruleForm.support_id = this.supportId
      try {
        let { message } = await addSupportInvite(this.ruleForm)
        this._message(message, 'success')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    async getTags() {
      try {
        let { data } = await getTags({ tc_code: 'tec_sum' })
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
</script>

<style lang="scss" scoped>
.invitationl-title {
  color: #409eff;
}
.rate-box {
  margin-top: 10px;
}
</style>
