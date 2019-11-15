<template>
  <div class="search-condit">
    <el-form size="small" :model="ruleForm" label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="11">
          <el-form-item label="需求ID" prop="list_id">
            <el-input v-model="ruleForm.list_id" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="需求标题" prop="title">
            <el-input v-model="ruleForm.title" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="TAPD需求ID" prop="tapd_id">
            <el-input v-model="ruleForm.tapd_id" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="需求状态" prop="need_status">
            <el-select v-model="ruleForm.need_status" placeholder="请选择" filterable clearable>
              <el-option v-for="(item,i) in filterData.statusList" :key="i" :label="item.status_name" :value="item.status_code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所属公司" prop="extend_deal_company_id" v-show="filterData.company == 1">
            <el-select
              v-model="ruleForm.extend_deal_company_id"
              @change="changeCompany"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入公司名称搜索"
              :remote-method="remoteCompany"
              :loading="cLoading"
            >
              <el-option v-for="item in companyList" :key="item.company_id" :label="item.company_name" :value="item.company_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11" :offset="2">
          <el-form-item label="所属人" prop="extend_deal_user_id" v-show="filterData.company == 1">
            <el-select v-model="ruleForm.extend_deal_user_id" :disabled="!ruleForm.extend_deal_company_id" placeholder="请先选择所属公司" filterable clearable>
              <el-option v-for="(item,i) in companyUserList" :key="i" :label="item.username" :value="item.user_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="紧急需求，是否愿意付费" prop="is_pay">
            <el-select v-model="ruleForm.is_pay" placeholder="请选择" filterable clearable>
              <el-option label="全部" value></el-option>
              <el-option label="付费" value="1"></el-option>
              <el-option label="不付费" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="是否为BUG" prop="is_bug">
            <el-select v-model="ruleForm.is_bug" placeholder="请选择" filterable clearable>
              <el-option label="全部" value></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="不是" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="责任人" prop="deal_user_id" v-show="filterData.dealUser.length > 0">
            <el-select v-model="ruleForm.deal_user_id" placeholder="请选择" filterable clearable>
              <el-option v-for="(item,i) in filterData.dealUser" :key="i" :label="item.username" :value="item.user_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="需求模块" prop="model_id">
            <el-select v-model="ruleForm.model_id" placeholder="请选择" filterable clearable>
              <el-option v-for="(item,i) in filterData.model" :key="i" :label="item.model_name" :value="item.model_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="影响范围" prop="range_id">
            <el-select v-model="ruleForm.range_id" placeholder="请选择" filterable clearable>
              <el-option v-for="(item,i) in filterData.range" :key="i" :label="item.name" :value="item.range_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="时间类型" prop="time_type">
            <el-select v-model="ruleForm.time_type" placeholder="请选择" filterable clearable>
              <el-option v-for="(item,i) in timeType" :key="i" :label="item.title" :value="item.index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="时间段" prop="selectTime">
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="selectTime" @change="timeChange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="操作" prop="selectTime">
            <el-button type="primary" @click="submitForm">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getCompanyBySearch } from '@/api/common';
export default {
  props: {
    filterData: Object,
    companyUserList: Array
  },
  data() {
    return {
      ruleForm: {
        list_id: '', //需求id
        title: '', //	标题
        is_pay: '', //是否付费
        deal_user_id: '', //责任人id
        model_id: '', //模块id
        range_id: '', //影响范围id
        time_type: 'created_at', //created_at  需求发起时间 updated_at 需求更新时间
        start_at: '', //开始时间
        end_at: '', //结束时间,
        is_bug: '', //1是
        tapd_id: '', //tapd ID
        need_status: '', //需求状态
        extend_deal_company_id: '', //公司id
        extend_deal_user_id: '' //所属人ID
      },
      timeType: [
        { title: '工单发起时间', index: 'create' },
        { title: '工单最后更新时间', index: 'last_update' },
        { title: '工单采纳时间', index: 'adopt' }
      ],
      selectTime: [],
      timeType: [{ title: '需求发起时间', index: 'created_at' }, { title: '最后更新时间', index: 'updated_at' }],
      companyList: [],
      cLoading: false
    };
  },

  watch: {
    filterData: {
      handler(newVal) {
        this.resetForm();
      },
      deep: true
    }
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
    changeCompany() {
      this.ruleForm.extend_deal_user_id = '';
      if (this.ruleForm.extend_deal_company_id) {
        this.$emit('selectCompany', this.ruleForm.extend_deal_company_id);
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