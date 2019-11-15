<template>
  <div>
    <el-dialog :title="flg == '0' ? '新增模板' : '编辑模板'" :modal-append-to-body="false" :visible.sync="editVisible" width="500px" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" v-loading="formLoading" class="demo-ruleForm">
          <el-form-item label="板块名称" prop="category_name">
            <el-input v-model="ruleForm.category_name" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属系统" prop="product_id">
            <el-select :disabled="flg == '1'" filterable clearable v-model="ruleForm.product_id" placeholder="请选择">
              <el-option v-for="item in systemList" :key="item.product_id" :label="item.product_name" :value="item.product_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属类型" prop="is_public_category">
            <el-radio-group v-model="ruleForm.is_public_category">
              <el-radio label="0">个人</el-radio>
              <el-radio label="1">公共</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="板块排序" prop="sort">
            <el-input v-model="ruleForm.sort" type="number" placeholder="请输入" clearable :min="1"></el-input>
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
import { mapGetters } from 'vuex';
import { addTemplate, updateTemplate } from '@/api/replyTemplate';
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
    templateItem: {
      type: Object,
      default: {}
    },
    isPublicCategory: String
  },
  data() {
    return {
      ruleForm: {
        category_id: '',
        category_name: '', //分类名称
        product_id: null, //系统id
        is_public_category: '0', //是否个人  0个人 1公共
        sort: null //排序值
      },
      rules: {
        category_name: [{ required: true, message: '请填写', trigger: 'blur' }],
        product_id: [{ required: true, message: '请选择', trigger: 'change' }],
        is_public_category: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      formLoading: false
    };
  },
  computed: {
    ...mapGetters(['systemList'])
  },
  watch: {
    flg(newVal) {
      this.ruleForm.is_public_category = this.isPublicCategory;
      if (newVal == '0') {
        //新增
        this.ruleForm.category_id = '';
      } else if (newVal == '1') {
        //编辑

        this.$nextTick(() => {
          Object.assign(this.ruleForm, this.templateItem);
        });
      }
    }
  },
  methods: {
    async updateTemplates() {
      this.formLoading = true;
      try {
        let { message } = await updateTemplate(this.ruleForm);
        this._message(message, 'success');
        this.$emit('saveOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    async addTemplate() {
      //新增
      this.formLoading = true;
      try {
        let { message } = await addTemplate(this.ruleForm);
        this._message(message, 'success');
        this.$emit('saveOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.flg == '0') {
            //新增
            this.addTemplate();
          } else if (this.flg == '1') {
            //编辑
            this.updateTemplates();
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.ruleForm.is_public_category = '0';
      this.$refs.ruleForm.resetFields();
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

