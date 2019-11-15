<template>
  <div>
    <el-dialog :title="title" :append-to-body="true" top="50px" :visible.sync="dialogDetail" width="1200px" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" prop="title" v-loading="formLoading">
            <div>{{ruleForm.title}}</div>
          </el-form-item>
          <el-form-item label="类型" prop="question_type">
            <div>{{ruleForm.question_type == '1' ? '异常' : '咨询'}}</div>
          </el-form-item>
          <el-form-item label="附件" prop="range_id">
            <div v-for="(item,i) in ruleForm.file" :key="i">
              <a :href="item.path" target="_blank" rel="noopener noreferrer">{{item.name}}</a>
            </div>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item label="影响范围" prop="range_id">
                <div v-if="isEdit">
                  <el-select v-model="ruleForm.range_id" placeholder="请选择">
                    <el-option :label="item.name" :value="item.range_id" v-for="(item,i) in rangeList" :key="i"></el-option>
                  </el-select>
                </div>
                <div v-else>{{getMappingVal(rangeList,'range_id',ruleForm.range_id,'name')}}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="7">
              <el-form-item label="问题分类">
                <div class="classification">一级分类</div>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label-width="0px">
                <div class="classification">二级分类</div>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label-width="0px">
                <div class="classification">三级分类</div>
              </el-form-item>
            </el-col>
            <el-col :span="7" v-loading="firstLevelLoading">
              <el-form-item prop="first_category">
                <div v-if="isEdit">
                  <sort-list :id="ruleForm.first_category" ref="firstLevel" :list="firstLevelList" @selectId="firstLevelId"></sort-list>
                </div>
                <div v-else>{{detail.first_category_name}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1" v-loading="secondaryLoading">
              <el-form-item label-width="0px" prop="second_category">
                <div v-if="isEdit">
                  <sort-list :id="ruleForm.second_category" ref="secondLevel" :list="secondaryList" @selectId="secondLevelId"></sort-list>
                </div>
                <div v-else>{{detail.second_category_name}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1" v-loading="threeLevelLoading">
              <el-form-item label-width="0px" prop="third_category">
                <div v-if="isEdit">
                  <sort-list :id="ruleForm.third_category" ref="threeLevel" :list="threeLevelList" @selectId="threeLevelId"></sort-list>
                </div>
                <div v-else>{{detail.third_category_name}}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="问题描述" prop="desc">
            <div v-if="isEdit">
              <editor :content="ruleForm.desc" ref="editor" uploadUrl="/common/upload" placeholders="请您详细描述问题，尽量提供相关的业务单号/截图/异常说明等，便于我们对问题的准确定位，节省双方的沟通成本，尽快解决您的问题。"></editor>
            </div>
            <div v-else v-html="ruleForm.desc" v-viewer class="editor-dom"></div>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="isEdit = !isEdit">{{isEdit ? '关闭编辑' : '开启编辑'}}</el-button>
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submit" v-show="isEdit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getQuestionSupportCategory } from '@/api/common';
import { updateQuestion } from '@/api/conversation';
import SortList from '@/views/servicePlatform/submitWorkOrder/SortList';
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
        question_id: '', //问题id
        title: '', //标题
        question_type: '', //问题类型
        first_category: '', //一级分类
        second_category: '', //二级分类
        third_category: '', //三级分类
        desc: '', //描述
        range_id: '', //范围id
        product_id: '' //系统id
      },
      rules: {
        question_type: [{ required: true, message: '请选择', trigger: 'change' }],
        first_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
        second_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
        third_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
        range_id: [{ required: true, message: '请选择', trigger: 'change' }],
        desc: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      firstLevelList: [], //一级分类列表
      secondaryList: [], //二级列表、
      threeLevelList: [], //三级列表
      firstLevelLoading: false,
      secondaryLoading: false,
      threeLevelLoading: false,
      formLoading: false,
      sortParams: {
        pid: '', //父类id 一级分类为0
        product_id: '' //产品id/系统id
      },
      isEdit: false
    };
  },
  watch: {
    async dialogDetail(newVal) {
      if (newVal) {
        Object.assign(this.ruleForm, this.detail);

        if (this.$refs.editor) {
          this.$refs.editor.contentOwn = this.detail.desc;
        }
        // 获取一级分类列表
        await this.getQuestionSupportCategory('1', '0');
        //获取二级分类列表
        await this.getQuestionSupportCategory('2', this.ruleForm.first_category);
        //获取三级分类列表
        await this.getQuestionSupportCategory('3', this.ruleForm.second_category);
      }
    }
  },
  mounted() {},
  computed: {
    title() {
      return `工单${this.ruleForm.question_id} 详情`;
    }
  },
  methods: {
    submit() {
      this.ruleForm.desc = this.$refs.editor.getHtml();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.updateQuestion();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async updateQuestion() {
      this.formLoading = true;
      try {
        let { message } = await updateQuestion(this.ruleForm);
        this._message(message, 'success');
        this.$emit('updateOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    firstLevelId(id) {
      //一级
      this.ruleForm.first_category = id;
      this.ruleForm.second_category = '';
      this.getQuestionSupportCategory('2', this.ruleForm.first_category);
      this.threeLevelList = [];
    },
    secondLevelId(id) {
      //二级
      this.ruleForm.second_category = id;
      this.ruleForm.third_category = '';
      this.getQuestionSupportCategory('3', this.ruleForm.second_category);
    },
    threeLevelId(id) {
      //三级
      this.ruleForm.third_category = id;
    },
    async getQuestionSupportCategory(type, pid) {
      //type 1一级  2二级  3三级
      this.sortParams.product_id = this.ruleForm.product_id;
      this.sortParams.pid = pid;
      switch (type) {
        case '1': //一级
          this.firstLevelLoading = true;
          break;
        case '2': //二级
          this.secondaryLoading = true;
          break;
        case '3': //三级
          this.threeLevelLoading = true;
          break;
      }
      try {
        let { data } = await getQuestionSupportCategory(this.sortParams);
        switch (type) {
          case '1': //一级
            this.firstLevelList = data;
            this.firstLevelLoading = false;

            break;
          case '2': //二级
            this.secondaryList = data;
            this.secondaryLoading = false;
            break;
          case '3': //三级
            this.threeLevelList = data;
            this.threeLevelLoading = false;
            break;
        }
      } catch (error) {
        this._message(error);
      }
    },
    handleClose() {
      this.isEdit = false;
      this.$refs.ruleForm.resetFields();
      this.$emit('update:dialogDetail', false);
    }
  },
  components: {
    SortList,
    Editor
  }
};
</script>

<style lang="scss" scoped>
.classification {
  height: 40px;
  line-height: 40px;
  background: #f0f0f1;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  color: #555;
  span {
    font-size: 13px;
    color: #666;
    margin-left: 15px;
    font-weight: 100;
  }
}
.editor-dom {
  /deep/ img {
    max-width: 100% !important;
  }
}
</style>