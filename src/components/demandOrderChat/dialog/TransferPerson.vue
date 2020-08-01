<template>
  <div>
    <el-dialog
      title="转交责任人"
      :append-to-body="true"
      :visible.sync="personVisible"
      width="500px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <el-form
        :model="ruleForm"
        size="small"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-loading="fromLoading"
      >
        <el-form-item label="责任人" prop="name">
          <el-select
            filterable
            v-model="ruleForm.change_user_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in personList"
              :key="item.user_id"
              :label="item.username"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转交说明" prop="mark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="ruleForm.mark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submitTransferBefore"
          >转交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getNeedDealUserList,
  needChangeDealUser
} from '@/api/demandConversation'
export default {
  props: {
    personVisible: Boolean,
    productId: [String, Number],
    chatItemId: String,
    dealUserId: [String, Number] //当前责任人
  },
  data() {
    return {
      personList: [],
      dealUserIdOwn: '',
      ruleForm: {
        list_id: '', //需求id
        change_user_id: '', //转交人id
        mark: '' //说明
      },
      rules: {
        change_user_id: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        mark: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      fromLoading: false
    }
  },
  watch: {
    productId() {
      this.getNeedDealUserList()
    },
    dealUserId() {
      this.ruleForm.change_user_id = this.dealUserId
    }
  },
  methods: {
    submitTransferBefore() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.submitTransfer()
        } else {
          return false
        }
      })
    },
    async submitTransfer() {
      this.fromLoading = true
      this.ruleForm.list_id = this.chatItemId
      try {
        let { message } = await needChangeDealUser(this.ruleForm)
        this._message(message, 'success')
        this.$emit('submitOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.fromLoading = false
    },
    async getNeedDealUserList() {
      try {
        let { data } = await getNeedDealUserList({ product_id: this.productId })
        this.personList = data
        this.dealUserIdOwn = this.dealUserId
      } catch (error) {
        this._message(error)
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('update:personVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  display: block;
}
</style>
