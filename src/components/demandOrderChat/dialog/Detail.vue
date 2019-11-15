<template>
  <div>
    <el-dialog :title="title" :append-to-body="true" top="50px" :visible.sync="dialogDetail" width="1000px" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="需求标题" prop="title" v-loading="formLoading">
            <div>{{ruleForm.title}}</div>
          </el-form-item>
          <el-row>
            <el-col :span="7">
              <el-form-item label="姓名" prop="contact_name">
                <div>{{detail.contact_name}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="电话" prop="phone">
                <div>{{detail.phone}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="邮箱" prop="email">
                <div>{{detail.email}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="需求模块" prop="model_id">
                <div>{{detail.model_name}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="model_id" label-width="0">
                <div>紧急需求，是否愿意付费：{{detail.is_pay == '1' ? '付费' : '不付费'}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="model_id" label-width="0">
                <div>是否为BUG：{{detail.is_bug == '1' ? 'BUG' : '非BUG'}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="附件">
            <div v-for="(item,i) in ruleForm.file" :key="i">
              <a :href="item.path" target="_blank" rel="noopener noreferrer">{{item.name}}</a>
            </div>
          </el-form-item>
          <el-row>
            <el-col :span="7">
              <el-form-item label="影响范围" prop="range_id">
                <div v-if="isEdit">
                  <el-select filterable v-model="ruleForm.range_id" placeholder="请选择">
                    <el-option :label="item.name" :value="item.range_id" v-for="(item,i) in rangeList" :key="i"></el-option>
                  </el-select>
                </div>
                <div v-else>{{getMappingVal(rangeList,'range_id',ruleForm.range_id,'name')}}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="需求目的" prop="backgroup">
            <div v-if="isEdit">
              <editor :content="ruleForm.backgroup" ref="backgroupRef" uploadUrl="/common/upload" placeholders="您提的不是“需求”，而是“解决方案”，请您阐述需求的最终目的。"></editor>
            </div>
            <div v-else v-html="ruleForm.backgroup" v-viewer class="editor-dom"></div>
          </el-form-item>
          <el-form-item label="改动细节" prop="adjust">
            <div v-if="isEdit">
              <editor :content="ruleForm.adjust" ref="adjustRef" uploadUrl="/common/upload" placeholders="您提的不是“需求”，而是“解决方案”，请您阐述需求的最终目的。"></editor>
            </div>
            <div v-else v-html="ruleForm.adjust" v-viewer class="editor-dom"></div>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="isEdit = !isEdit">{{isEdit ? '关闭编辑' : '开启编辑'}}</el-button>
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { needDetailUpdate } from '@/api/demandConversation';
import Editor from '_c/editor/LightEditor';
export default {
  props: {
    dialogDetail: Boolean,
    detail: Object,
    rangeList: [Array] //范围列表
  },
  data() {
    return {
      ruleForm: {
        list_id: '', //问题id
        title: '', //标题
        backgroup: '', //需求目的
        adjust: '', //改动细节
        range_id: '', //范围id
        product_id: '', //系统id
        model_name: '', //需求模块名
        file: [],
        contact_name: '', //联系人
        phone: '', //电话
        email: '' //邮箱
      },
      rules: {
        range_id: [{ required: true, message: '请选择', trigger: 'change' }],
        backgroup: [{ required: true, message: '请输入', trigger: 'blur' }],
        adjust: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      formLoading: false,
      isEdit: false
    };
  },
  watch: {
    dialogDetail(newVal) {
      if (newVal) {
        Object.assign(this.ruleForm, this.detail);
        if (this.$refs.backgroupRef) {
          this.$refs.backgroupRef.contentOwn = this.detail.backgroup;
        }
        if (this.$refs.adjustRef) {
          this.$refs.adjustRef.contentOwn = this.detail.adjust;
        }
      }
    }
  },
  mounted() {},
  computed: {
    title() {
      return `需求${this.ruleForm.list_id} 详情`;
    }
  },
  methods: {
    submit() {
      this.ruleForm.backgroup = this.$refs.backgroupRef.getHtml();
      this.ruleForm.adjust = this.$refs.adjustRef.getHtml();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.needDetailUpdate();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async needDetailUpdate() {
      this.formLoading = true;
      try {
        let { message } = await needDetailUpdate(this.ruleForm);
        this._message(message, 'success');
        this.$emit('updateOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    handleClose() {
      this.isEdit = false;
      this.$refs.ruleForm.resetFields();
      this.$emit('update:dialogDetail', false);
    }
  },
  components: {
    Editor
  }
};
</script>

<style lang="scss" scoped>
.editor-dom {
  /deep/ img {
    max-width: 100% !important;
  }
}
</style>