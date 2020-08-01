<template>
  <div class="search-condit">
<<<<<<< HEAD
    <el-form
      size="small"
      :model="ruleForm"
      label-position="top"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="工单号" prop="question_id">
            <el-input
              v-model="ruleForm.question_id"
              clearable
              @keyup.enter.native="submitForm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="工单标题" prop="title">
            <el-input
              v-model="ruleForm.title"
              clearable
              @keyup.enter.native="submitForm"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="工单类型" prop="question_type">
            <el-radio-group v-model="ruleForm.question_type">
              <el-radio label>全部</el-radio>
              <el-radio label="1">异常</el-radio>
              <el-radio label="2">咨询</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="11" :offset="2">
          <el-form-item label="发起人" prop="user_id">
            <el-select
              v-model="ruleForm.user_id"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入发起人名称搜索"
              :remote-method="remoteUser"
              :loading="uLoading"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="责任人" prop="resolve_question_user_id">
            <el-select
              v-model="ruleForm.resolve_question_user_id"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in filterData.resolveUser"
                :key="i"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11" :offset="2">
          <el-form-item label="影响范围" prop="range_id">
            <el-select
              v-model="ruleForm.range_id"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in filterData.range"
                :key="i"
                :label="item.name"
                :value="item.range_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工单状态" prop="question_status_extend">
            <el-select
              v-model="ruleForm.question_status_extend"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in quesitonType"
                :key="i"
                :label="item.title"
                :value="item.index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="时间类型" prop="time_type">
            <el-select
              v-model="ruleForm.time_type"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in timeType"
                :key="i"
                :label="item.title"
                :value="item.index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="时间段" prop="selectTime">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="selectTime"
              @change="timeChange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="评分" prop="score">
            <el-select
              v-model="ruleForm.score"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in scoreType"
                :key="i"
                :label="item.title"
                :value="item.index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="一级分类" prop="first_category">
            <el-select
              v-model="ruleForm.first_category"
              placeholder="请选择"
              @change="hanleFirstCategory"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in filterData.firstCategoryList"
                :key="i"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11" :offset="2">
          <el-form-item label="二级分类" prop="second_category">
            <el-select
              :disabled="!ruleForm.first_category"
              @change="hanleSecondCategory"
              v-model="ruleForm.second_category"
              placeholder="请先选择一级分类"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in secondCategoryList"
                :key="i"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="三级分类" prop="third_category">
            <el-select
              :disabled="!ruleForm.second_category"
              v-model="ruleForm.third_category"
              placeholder="请先选择二级分类"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in thirdCategoryList"
                :key="i"
                :label="`${item.name} 【${item.difficulty_level}】`"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11" :offset="2">
          <el-form-item label="采纳类型" prop="accept_type">
            <el-select
              placeholder="请选择采纳类型"
              filterable
              clearable
              v-model="ruleForm.accept_type"
            >
              <el-option
                v-for="(item, i) in filterData.acceptType"
                :key="i"
                :label="item.accept_type_tips"
                :value="item.accept_type"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" v-show="filterData.company == 1">
          <el-form-item label="所属公司" prop="company_id">
            <el-select
              v-model="ruleForm.company_id"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入公司名称搜索"
              :remote-method="remoteCompany"
              :loading="cLoading"
            >
              <el-option
                v-for="item in companyList"
                :key="item.company_id"
                :label="item.company_name"
                :value="item.company_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="filterData.company == 1 ? 2 : 0">
          <el-form-item label="内容" prop="desc" v-show="filterData.desc == 1">
            <el-input
              v-model="ruleForm.desc"
              placeholder="请输入内容关键词模糊搜索"
              clearable
              @keyup.enter.native="submitForm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="操作">
=======
    <el-form size="small" :model="ruleForm" label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="工单号" prop="question_id">
        <el-input v-model="ruleForm.question_id" clearable></el-input>
      </el-form-item>
      <el-form-item label="工单标题" prop="title">
        <el-input v-model="ruleForm.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="工单类型" prop="question_type">
        <el-radio-group v-model="ruleForm.question_type">
          <el-radio label>全部</el-radio>
          <el-radio label="1">异常</el-radio>
          <el-radio label="2">咨询</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="所属公司" prop="company_id" v-show="filterData.company == 1">
        <el-select v-model="ruleForm.company_id" filterable clearable remote reserve-keyword placeholder="请输入公司名称搜索" :remote-method="remoteCompany" :loading="cLoading">
          <el-option v-for="item in companyList" :key="item.company_id" :label="item.company_name" :value="item.company_id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发起人" prop="user_id">
        <el-select v-model="ruleForm.user_id" filterable clearable remote reserve-keyword placeholder="请输入发起人名称搜索" :remote-method="remoteUser" :loading="uLoading">
          <el-option v-for="item in userList" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="责任人" prop="resolve_question_user_id">
        <el-select v-model="ruleForm.resolve_question_user_id" placeholder="请选择" filterable clearable>
          <el-option v-for="(item,i) in filterData.resolveUser" :key="i" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="影响范围" prop="range_id">
        <el-select v-model="ruleForm.range_id" placeholder="请选择" filterable clearable>
          <el-option v-for="(item,i) in filterData.range" :key="i" :label="item.name" :value="item.range_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间段" prop="time_type">
        <el-select v-model="ruleForm.time_type" placeholder="请选择" filterable clearable>
          <el-option v-for="(item,i) in timeType" :key="i" :label="item.title" :value="item.index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label prop="selectTime">
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="selectTime" @change="timeChange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters } from 'vuex'
import {
  getUserBySearch,
  getCompanyBySearch,
  getQuestionSupportCategory
} from '@/api/common'
// import { getQuestionListFilter } from "@/api/conversation";
=======
import { mapGetters } from 'vuex';
import { getUserBySearch, getCompanyBySearch } from '@/api/common';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  name: 'searchcoint',
  props: {
    filterData: Object
  },
  data() {
    return {
      ruleForm: {
        question_id: '', //问题id
        title: '', //	标题
        company_id: '', //公司id
        user_id: '', //发起人id
        resolve_question_user_id: '', //责任人id
        question_type: '', //	1异常 2咨询
        range_id: '', //影响范围id
        time_type: '', //create 工单发起时间 last_update 工单最后更新时间 adopt 工单采纳时间
        start_at: '', //开始时间
<<<<<<< HEAD
        end_at: '', //结束时间
        first_category: '', //一级分类
        question_status: '', //工单状态
        score: '', //评分
        question_status_extend: 'all',
        second_category: '', //二级分类
        third_category: '', //三级分类
        desc: '', //工单内容
        accept_type: '' //采纳类信息
=======
        end_at: '' //结束时间
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      },
      timeType: [
        { title: '工单发起时间', index: 'create' },
        { title: '工单最后更新时间', index: 'last_update' },
        { title: '工单采纳时间', index: 'adopt' }
      ],
<<<<<<< HEAD
      quesitonType: [
        { title: '全部', index: 'all' },
        { title: '未处理', index: 'undeal' },
        { title: '处理中', index: 'doing' },
        { title: '已采纳', index: 'done' }
      ],
      scoreType: [
        { title: '全部', index: '' },
        { title: '1分', index: '1' },
        { title: '2分', index: '2' },
        { title: '3分', index: '3' },
        { title: '4分', index: '4' },
        { title: '5分', index: '5' }
      ],
=======
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      selectTime: [],
      cLoading: false,
      companyList: [], //公司列表
      userList: [], //发起人列表
<<<<<<< HEAD
      uLoading: false,
      secondCategoryList: [], //二级分类列表
      thirdCategoryList: [] //三级分类列表
    }
=======
      uLoading: false
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },

  watch: {
    filterData: {
<<<<<<< HEAD
      handler() {
        this.resetForm()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['userId', 'currentSystemIdx'])
  },

  methods: {
    hanleFirstCategory() {
      this.ruleForm.second_category = ''
      this.ruleForm.third_category = ''
      this.secondCategoryList = []
      this.thirdCategoryList = []
      if (this.ruleForm.first_category !== '') {
        this.getQuestionSupportCategory(this.ruleForm.first_category, 'first')
      }
    },
    hanleSecondCategory() {
      this.ruleForm.third_category = ''
      this.thirdCategoryList = []
      if (this.ruleForm.second_category !== '') {
        this.getQuestionSupportCategory(this.ruleForm.second_category, 'second')
      }
    },
    async getQuestionSupportCategory(id, type) {
      try {
        let { data } = await getQuestionSupportCategory({
          product_id: this.currentSystemIdx,
          pid: id
        })
        switch (type) {
          case 'first':
            this.secondCategoryList = data
            break
          case 'second':
            this.thirdCategoryList = data
            break
        }
      } catch (error) {
        this._message(error)
      }
    },
    async remoteCompany(query) {
      if (!query) return
      this.cLoading = true
      try {
        let { data } = await getCompanyBySearch({ keyword: query })
        this.companyList = data
      } catch (error) {
        this._message(error)
      }
      this.cLoading = false
    },
    async remoteUser(query) {
      if (!query) return
      this.uLoading = true
      try {
        let { data } = await getUserBySearch({ keyword: query })
        this.userList = data
      } catch (error) {
        this._message(error)
      }
      this.uLoading = false
    },
    setInitId() {
      if (this.filterData.resolveUser.length > 0) {
        let item = this.filterData.resolveUser.find(el => el.id == this.userId)
        this.ruleForm.resolve_question_user_id = item ? item.id : ''
        this.$emit('search', this.ruleForm)
      }
    },
    submitForm() {
      this.ruleForm['page'] = 1
      this.$emit('search', this.ruleForm)
    },
    resetForm() {
      this.selectTime = []
      this.$refs.ruleForm.resetFields()
    },
    timeChange(e) {
      if (e == null) {
        this.ruleForm.start_at = ''
        this.ruleForm.end_at = ''
      } else {
        this.ruleForm.start_at = this.selectTime[0]
        this.ruleForm.end_at = this.selectTime[1]
      }
    }
  }
}
=======
      handler(newVal) {
        this.resetForm();
        // this.setInitId();
      },
      deep: true
    },
    userId(newVal) {
      // this.setInitId();
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },

  methods: {
    async remoteCompany(query) {
      if (!query) return;
      this.cLoading = true;
      try {
        let { data } = await getCompanyBySearch({ keyword: query });
        this.companyList = data;
      } catch (error) {
        this._message(error);
      }
      this.cLoading = false;
    },
    async remoteUser(query) {
      if (!query) return;
      this.uLoading = true;
      try {
        let { data } = await getUserBySearch({ keyword: query });
        this.userList = data;
      } catch (error) {
        this._message(error);
      }
      this.uLoading = false;
    },
    setInitId() {
      if (this.filterData.resolveUser.length > 0) {
        let item = this.filterData.resolveUser.find(el => el.id == this.userId);
        this.ruleForm.resolve_question_user_id = item ? item.id : '';
        this.$emit('search', this.ruleForm);
      }
    },
    submitForm() {
      this.$emit('search', this.ruleForm);
    },
    resetForm() {
      this.selectTime = [];
      this.$refs.ruleForm.resetFields();
    },
    timeChange(e) {
      if (e == null) {
        this.ruleForm.start_at = '';
        this.ruleForm.end_at = '';
      } else {
        this.ruleForm.start_at = this.selectTime[0];
        this.ruleForm.end_at = this.selectTime[1];
      }
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.search-condit {
  margin-top: 10px;
  display: block;
  /deep/ .el-form-item__label {
    padding: 0;
  }
  /deep/ .el-select {
    display: block;
  }
  /deep/ .el-range-editor--small.el-input__inner {
    width: 100%;
  }
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
