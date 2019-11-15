<template>
  <div class="search-condit">
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
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getUserBySearch, getCompanyBySearch } from '@/api/common';
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
        end_at: '' //结束时间
      },
      timeType: [
        { title: '工单发起时间', index: 'create' },
        { title: '工单最后更新时间', index: 'last_update' },
        { title: '工单采纳时间', index: 'adopt' }
      ],
      selectTime: [],
      cLoading: false,
      companyList: [], //公司列表
      userList: [], //发起人列表
      uLoading: false
    };
  },

  watch: {
    filterData: {
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
</style>