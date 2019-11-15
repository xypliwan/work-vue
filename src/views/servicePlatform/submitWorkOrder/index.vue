<template>
  <div class="service-platform">
    <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
      <el-form-item label="工单标题" prop="title">
        <el-input v-model="ruleForm.title" clearable placeholder="请将您所遇到的问题进行简述，或通过关键字进行知识库检索，寻找您满意的答案。">
          <el-button slot="append" type="primary" @click="toKnowledge">检索知识库</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="工单类型" prop="question_type">
        <el-radio-group v-model="ruleForm.question_type">
          <el-radio label="1">异常</el-radio>
          <el-radio label="2">咨询</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="7">
          <el-form-item label="影响范围" prop="range_id">
            <el-select v-model="ruleForm.range_id" placeholder="请选择">
              <el-option :label="item.name" :value="item.range_id" v-for="(item,i) in rangeList" :key="i"></el-option>
            </el-select>
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
            <div class="classification">
              二级分类
              <span>(请先选择一级分类)</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label-width="0px">
            <div class="classification">
              三级分类
              <span>(请先选择二级分类)</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-loading="firstLevelLoading">
          <el-form-item prop="first_category">
            <sort-list :id="ruleForm.first_category" ref="firstLevel" :list="firstLevelList" @selectId="firstLevelId"></sort-list>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1" v-loading="secondaryLoading">
          <el-form-item label-width="0px" prop="second_category">
            <sort-list :id="ruleForm.second_category" ref="secondLevel" :list="secondaryList" @selectId="secondLevelId"></sort-list>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1" v-loading="threeLevelLoading">
          <el-form-item label-width="0px" prop="third_category">
            <sort-list :id="ruleForm.third_category" ref="threeLevel" :list="threeLevelList" @selectId="threeLevelId"></sort-list>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="问题描述">
            <editor ref="editor" uploadUrl="/common/upload" placeholders="请您详细描述问题，尽量提供相关的业务单号/截图/异常说明等，便于我们对问题的准确定位，节省双方的沟通成本，尽快解决您的问题。"></editor>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="上传文件" prop="file">
            <upload desc="最多可以上传3个文件，每个附件大小不得超过5M,附件支持jpg、png、gif、zip、rar、doc、xls、txt、pdf格式" :limit="3" :list="ruleForm.file" @successOk="successOk" @deleteFile="deleteFile"></upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SortList from './SortList';
import { getQuestionSupportCategory, getQuestionRange } from '@/api/common';
import { addQuestion } from '@/api/servicePlatform';
import Upload from '_c/common/Upload';
import Editor from '_c/editor/LightEditor';

export default {
  data() {
    return {
      ruleForm: {
        title: '', //标题
        question_type: '1', //工单类型 1异常 2咨询
        first_category: '', //一级分类id
        second_category: '', //二级分类id
        third_category: '', //三级分类id
        range_id: '', //范围id
        desc: '', //描述
        product_id: '', //产品id/系统id
        file: [] //文件
      },
      rules: {
        title: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        question_type: [{ required: true, message: '请选择', trigger: 'change' }],
        first_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
        second_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
        third_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
        range_id: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      sortParams: {
        pid: '', //父类id 一级分类为0
        product_id: '' //产品id/系统id
      },
      firstLevelList: [], //一级分类列表
      secondaryList: [], //二级列表、
      threeLevelList: [], //三级列表
      firstLevelLoading: false,
      secondaryLoading: false,
      threeLevelLoading: false,
      rangeList: [], //影响范围列表
      formLoading: false
    };
  },
  mounted() {
    if (this.currentSystemIdx !== '') {
      this.getQuestionSupportCategory('1', '0');
      this.getQuestionRange();
    }
  },
  watch: {
    currentSystemIdx(newVal) {
      this.ruleForm.range_id = '';
      this.firstLevelList = [];
      this.secondaryList = [];
      this.threeLevelList = [];
      this.ruleForm.first_category = '';
      this.ruleForm.second_category = '';
      this.ruleForm.third_category = '';
      this.$refs.firstLevel.resetId();
      this.$refs.secondLevel.resetId();
      this.$refs.threeLevel.resetId();
      this.getQuestionSupportCategory('1', '0');
      this.getQuestionRange();
    }
  },
  computed: {
    ...mapGetters(['currentSystemIdx'])
  },
  methods: {
    toKnowledge() {
      if (!this.ruleForm.title.length) {
        this._message('请输入工单标题');
        return;
      }
      let url = `${window.location.origin}/#/yc-university/history-brows?form=${this.ruleForm.title}`;
      window.open(url, '_blank');
    },
    deleteFile(i) {
      this.ruleForm.file.splice(i, 1);
    },
    successOk(data) {
      let item = {
        name: data.file_name,
        path: data.url
      };
      this.ruleForm.file.push(item);
    },
    async addQuestion() {
      this.formLoading = true;
      this.ruleForm.product_id = this.currentSystemIdx;
      try {
        let { data } = await addQuestion(this.ruleForm);
        this._message(`提交成功,工单id为 ${data.question_num}`, 'success');
        this.$refs.ruleForm.resetFields();
        this.$refs.editor.clearHtml();
        this.$router.push(`/conversation?id=${data.question_id}&num=${data.question_num}&supportId=0`);
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.desc = this.$refs.editor.getHtml();
          if (this.ruleForm.desc.length <= 0) {
            this._message('请输入问题描述', 'warning');
            return;
          }
          this.addQuestion();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
      this.sortParams.product_id = this.currentSystemIdx;
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
    async getQuestionRange() {
      try {
        let { data } = await getQuestionRange({ product_id: this.currentSystemIdx });
        this.rangeList = data;
      } catch (error) {
        this._message(error);
      }
    }
  },
  components: {
    SortList,
    Upload,
    Editor
  }
};
</script>

<style lang="scss" scoped>
.service-platform {
  overflow: auto;
  .sort-title {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #daecff;
    font-size: 16px;
    color: #409eff;
  }
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
}
</style>