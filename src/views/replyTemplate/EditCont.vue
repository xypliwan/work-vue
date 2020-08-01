<template>
  <div>
    <el-dialog
      :title="flg == '0' ? '新增板块' : '编辑板块'"
      :modal-append-to-body="false"
      :visible.sync="editVisible"
      width="600px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          :model="ruleForm"
          size="small"
          :rules="rules"
          ref="ruleForms"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-form-item label="板块名称" prop="category_id">
            <el-select
              :disabled="flg == '1'"
              v-model="ruleForm.category_id"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in plateList"
                v-if="item.category_id !== ''"
                :key="item.category_id"
                :label="item.category_name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板名称" prop="template_name">
            <el-input
              v-model="ruleForm.template_name"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="模板排序" prop="sort">
            <el-input
              type="number"
              v-model="ruleForm.sort"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="模板内容" prop="content">
            <el-input
              type="textarea"
              clearable
              :autosize="{ minRows: 2, maxRows: 8 }"
              placeholder="请输入内容"
              v-model="ruleForm.content"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addTemplateCont, updateTemplateCont } from '@/api/replyTemplate'

export default {
  props: {
    editVisible: {
      type: Boolean,
      default: false
    },
    flg: {
      type: String,
      default: ''
    },
    plateList: [Array],
    detailItem: Object,
    categoryId: String
  },
  data() {
    return {
      ruleForm: {
        category_id: '', //分类id
        template_name: '', //模板名
        content: '', //模板内容
        sort: '' //排序
      },
      rules: {
        template_name: [{ required: true, message: '请填写', trigger: 'blur' }],
        category_id: [{ required: true, message: '请选择', trigger: 'change' }],
        content: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      formLoading: false
    }
  },
  watch: {
    flg(newVal) {
      this.ruleForm.category_id = this.categoryId
      if (newVal == '0') {
        //新增
      } else if (newVal == '1') {
        //编辑
        this.$nextTick(() => {
          Object.assign(this.ruleForm, this.detailItem)
        })
      }
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForms.validate(valid => {
        if (valid) {
          if (this.flg == '0') {
            //新增
            this.addTemplateCont()
          } else if (this.flg == '1') {
            //编辑
            this.updateTemplates()
          }
        } else {
          return false
        }
      })
    },
    async updateTemplates() {
      this.formLoading = true
      try {
        let { message } = await updateTemplateCont(this.ruleForm)
        this._message(message, 'success')
        this.$emit('saveOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    async addTemplateCont() {
      this.formLoading = true
      try {
        let { message } = await addTemplateCont(this.ruleForm)
        this._message(message, 'success')
        this.handleClose()
        this.$emit('saveOk')
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    handleClose() {
      this.$refs.ruleForms.resetFields()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
