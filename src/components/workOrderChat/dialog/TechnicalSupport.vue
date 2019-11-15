<template>
  <div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="isFullscreen" :append-to-body="true" :visible.sync="supportVisible" width="700px" :before-close="handleClose">
      <div slot="title">
        技术支持
        <i class="iconfont" @click="isFullscreen = !isFullscreen" :class="isFullscreen ? 'icon-zuixiaohua' : 'icon-icon_enlarge'"></i>
      </div>
      <div>
        <el-form size="small" label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label="请选择技术人员进行技术支持" prop="tec_id">
            <el-select filterable v-model="ruleForm.tec_id" placeholder="请选择">
              <el-option v-for="(item,i) in tecPeopleList" :key="i" :label="item.username" :value="item.user_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请录入对应的问题排查结果，便于技术支持快速配合处理：">
            <editor ref="editor" uploadUrl="/common/upload"></editor>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submit">发起</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTecPeople } from '@/api/servicePlatform';
import { addSupport } from '@/api/conversation';
import Editor from '_c/editor/LightEditor';
export default {
  props: {
    supportVisible: Boolean,
    questionId: String
  },
  data() {
    return {
      ruleForm: {
        question_id: '', //问题id
        content: '', //内容
        tec_id: '', //技术人员id
        file: []
      },
      rules: {
        tec_id: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      tecPeopleList: [],
      isFullscreen: false,
      formLoading: false
    };
  },
  created() {
    this.getTecPeople();
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.content = this.$refs.editor.getHtml();
          if (!this.ruleForm.content) {
            this._message('请输入内容', 'warning');
            return;
          }
          this.addSupport();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async addSupport() {
      this.formLoading = true;
      this.ruleForm.question_id = this.questionId;
      try {
        let { message } = await addSupport(this.ruleForm);
        this._message(message, 'success');
        this.$refs.editor.clearHtml();
        this.$emit('submitOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    async getTecPeople() {
      try {
        let { data } = await getTecPeople();
        this.tecPeopleList = data;
      } catch (error) {
        this._message(error);
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit('update:supportVisible', false);
    }
  },
  components: {
    Editor
  }
};
</script>

<style lang="scss" scoped>
</style>