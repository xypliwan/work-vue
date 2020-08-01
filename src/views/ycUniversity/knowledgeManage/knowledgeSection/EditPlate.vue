<template>
  <div>
    <el-dialog
      :title="flg == '0' ? '新建一级板块' : '编辑一级板块'"
      :modal-append-to-body="false"
      :visible.sync="dialogPlate"
      width="600px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          :model="ruleForm"
          :validate-on-rule-change="false"
          size="small"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-form-item label="视角状态" prop="open_status">
            <el-select
              v-model="ruleForm.open_status"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(item, i) in openStatus"
                :key="i"
                :label="item.status_name"
                :value="item.status_code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面向客户" prop="forth_status">
            <el-select
              v-model="ruleForm.forth_status"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(item, i) in forthStatus"
                :key="i"
                :label="item.status_name"
                :value="item.status_code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统类型" prop="product_id">
            <el-select
              :disabled="flg == '1'"
              v-model="ruleForm.product_id"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(item, i) in systemList"
                :key="i"
                :label="item.product_name"
                :value="item.product_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="板块名称" prop="title">
            <el-input
              v-model="ruleForm.title"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="板块排序" prop="sort">
            <el-input
              v-model="ruleForm.sort"
              type="number"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addFirstModel, updateFirstModel } from '@/api/ycUniversity'
export default {
  props: {
    forthStatus: [Array],
    openStatus: [Array],
    dialogPlate: {
      type: Boolean,
      default: false
    },
    flg: String,
    detailItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        open_status: '', //状态
        forth_status: '', //面向客户
        product_id: '', //产品id
        title: '', //标题
        sort: '' //排序
      },
      rules: {
        open_status: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        forth_status: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        product_id: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        title: [
          { required: true, message: '请填写', trigger: ['blur', 'change'] }
        ]
      },
      formLoading: false
    }
  },
  watch: {
    dialogPlate(newVal) {
      if (newVal) {
        switch (this.flg) {
          case '0': //新增
            break

          case '1': //编辑
            this.$nextTick(() => {
              Object.assign(this.ruleForm, this.detailItem)
            })
            break
        }
      }
    }
  },
  computed: {
    ...mapGetters(['systemList'])
  },
  methods: {
    async updateFirstModel() {
      this.formLoading = true
      try {
        let { message } = await updateFirstModel(this.ruleForm)
        this._message(message, 'success')
        this.$emit('saveOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    async addFirstModel() {
      this.formLoading = true
      try {
        let { message } = await addFirstModel(this.ruleForm)
        this._message(message, 'success')
        this.$emit('saveOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          switch (this.flg) {
            case '0': //新增
              this.addFirstModel()
              break

            case '1': //编辑
              this.updateFirstModel()
              break
          }
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
