<template>
  <div>
    <el-dialog
      :title="flg == '0' ? '新增知识' : '编辑知识'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :fullscreen="isFullscreen"
      :modal-append-to-body="false"
      :visible.sync="dialogKnowledge"
      width="1000px"
      :before-close="handleClose"
    >
      <div slot="title">
        {{flg == '0' ? '新增知识' : '编辑知识'}}
        <i class="iconfont" @click="isFullscreen = !isFullscreen" :class="isFullscreen ? 'icon-zuixiaohua' : 'icon-icon_enlarge'"></i>
      </div>
      <div>
        <el-form :model="ruleForm" size="small" clearable :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="formLoding">
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="11">
              <el-form-item label="一级板块" prop="first_km_id">
                <el-select :disabled="flg == '1'" v-model="ruleForm.first_km_id" @change="getSecondKnowledgeModel" clearable filterable placeholder="请选择">
                  <el-option v-for="(item,i) in onePlateAll" :key="i" :label="item.title" :value="item.km_id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="二级板块" prop="second_km_id">
                <el-select :disabled="flg == '1'" v-model="ruleForm.second_km_id" clearable filterable placeholder="请选择">
                  <el-option v-for="(item,i) in secondPlate" :key="i" v-if="item.km_id !== ''" :label="item.title" :value="item.km_id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="允许客户查看" prop="is_customer_check">
                <el-switch v-model="ruleForm.is_customer_check" active-value="1" inactive-value="0" active-color="#409EFF" inactive-color="#ccc"></el-switch>
                &nbsp;&nbsp;{{ruleForm.is_customer_check == '0' ? '否' : '是'}}
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="排序" prop="sort">
                <el-input v-model="ruleForm.sort" clearable type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="内容" prop="content">
            <light-editor :content="ruleForm.content" ref="editor" uploadUrl="/common/upload"></light-editor>
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
import LightEditor from '_c/editor/LightEditor';
import { getSecondKnowledgeModel } from '@/api/common';
import { addKnowledge, getKnowledgeDetail, updateKnowledgeDetail } from '@/api/ycUniversity';
export default {
  props: {
    dialogKnowledge: {
      type: Boolean,
      default: false
    },
    onePlateAll: [Array],
    pid: String,
    secondId: String,
    flg: String,
    id: String
  },
  data() {
    return {
      ruleForm: {
        knowledge_id: this.id,
        title: '', //标题
        content: '', //内容
        first_km_id: this.pid, //一级模块id
        second_km_id: this.secondId, //二级模块id
        sort: '', //排序
        is_customer_check: '1' //是否用户查看 1是  0否
      },
      rules: {
        title: [{ required: true, message: '请输入', trigger: 'blur' }],
        first_km_id: [{ required: true, message: '请选择', trigger: 'change' }],
        second_km_id: [{ required: true, message: '请选择', trigger: 'change' }],
        sort: [{ required: true, message: '请输入', trigger: 'blur' }],
        content: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      secondPlate: [], //二级板块
      formLoding: false,
      isFullscreen: false
    };
  },
  watch: {
    dialogKnowledge(newVal) {
      if (newVal) {
        switch (this.flg) {
          case '0': //新增
            break;
          case '1': //编辑
            this.getKnowledgeDetail();
            break;
        }
      }
    },
    pid(newVal) {
      this.ruleForm.first_km_id = newVal;
      if (this.ruleForm.first_km_id !== '') {
        this.getSecondKnowledgeModel();
      }
    },
    secondId(newVal) {
      this.ruleForm.second_km_id = newVal;
    }
  },
  methods: {
    async updateKnowledgeDetail() {
      this.formLoding = true;
      try {
        let { message } = await updateKnowledgeDetail(this.ruleForm);
        this._message(message, 'success');
        this.$emit('saveOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoding = false;
    },
    async getKnowledgeDetail() {
      this.formLoding = true;
      try {
        let { data } = await getKnowledgeDetail({ knowledge_id: this.id });
        Object.assign(this.ruleForm, data);
      } catch (error) {
        this._message(error);
      }
      this.formLoding = false;
    },
    async addKnowledge() {
      this.formLoding = true;
      try {
        let { message } = await addKnowledge(this.ruleForm);
        this._message(message, 'success');
        this.$emit('saveOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoding = false;
    },
    async getSecondKnowledgeModel() {
      try {
        let { data } = await getSecondKnowledgeModel({ pid: this.ruleForm.first_km_id });
        this.secondPlate = data;
      } catch (error) {
        this._message(error);
      }
    },
    submit() {
      this.ruleForm.content = this.$refs.editor.getHtml();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          switch (this.flg) {
            case '0':
              this.addKnowledge();
              break;

            case '1':
              this.updateKnowledgeDetail();
              break;
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.editor.clearHtml();
      this.$refs.ruleForm.resetFields();
      this.$emit('close');
    }
  },
  components: {
    LightEditor
  }
};
</script>

<style lang="scss" scoped>
</style>
