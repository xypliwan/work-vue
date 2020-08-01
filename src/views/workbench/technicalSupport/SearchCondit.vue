<template>
  <div class="search-condit">
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
          <el-form-item label="支持ID" prop="support_id">
            <el-input
              v-model="ruleForm.support_id"
              clearable
              @keyup.enter.native="submitForm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="标题" prop="title">
            <el-input
              v-model="ruleForm.title"
              clearable
              @keyup.enter.native="submitForm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="支持类型" prop="support_type">
            <el-radio-group v-model="ruleForm.support_type">
              <el-radio label>全部</el-radio>
              <el-radio label="1">异常</el-radio>
              <el-radio label="2">咨询</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
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
        <el-col :span="11">
          <el-form-item label="发起人" prop="demand_user_id">
            <el-select
              v-model="ruleForm.demand_user_id"
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
        <el-col :span="11" :offset="2">
          <el-form-item label="责任人" prop="resolve_user_id">
            <el-select
              v-model="ruleForm.resolve_user_id"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in filterData.resolveUser"
                :key="i"
                :label="item.username"
                :value="item.user_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
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
        <el-col :span="11" :offset="2">
          <el-form-item label="是否为疑难杂症" prop="mark_problem">
            <el-select
              v-model="ruleForm.mark_problem"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="(item, i) in markProblemList"
                :key="i"
                :label="item.title"
                :value="item.status"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
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
        <el-col :span="11" :offset="2">
          <el-form-item prop="selectTime" label="时间段">
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
        <el-col :span="11">
          <el-form-item label="内容" prop="desc">
            <el-input
              v-model="ruleForm.desc"
              placeholder="请输入内容关键词模糊搜索"
              clearable
              @keyup.enter.native="submitForm"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="11" :offset="2">
          <el-form-item label="是否内部发起" prop="support_usr_type">
            <el-radio-group v-model="ruleForm.support_usr_type">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">普通提交</el-radio>
              <el-radio :label="1">内部人员提交</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>-->
        <el-col :span="11" :offset="2">
          <el-form-item label="操作">
            <el-button type="primary" @click="submitForm">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getUserBySearch, getCompanyBySearch } from '@/api/common'
export default {
  props: {
    filterData: Object
  },
  data() {
    return {
      ruleForm: {
        support_id: '', //支持id
        title: '', //	标题
        company_id: '', //公司id
        demand_user_id: '', //发起人id
        resolve_user_id: '', //责任人id
        range_id: '', //影响范围id
        time_type: '', //create 发起时间 last_update 最后更新时间
        start_at: '', //开始时间
        end_at: '', //结束时间
        support_type: '', //1异常 2咨询
        desc: '',
        mark_problem: ''
        // support_usr_type:null,     //0普通提交，1内部人员提交
      },
      timeType: [
        { title: '发起时间', index: 'create' },
        { title: '最后更新时间', index: 'last_update' }
      ],
      selectTime: [],
      companyList: [], //所属公司
      cLoading: false,
      userList: [], //发起人
      uLoading: false,
      markProblemList: [
        { status: '', title: '全部' },
        { status: '1', title: '是' },
        { status: '0', title: '否' }
      ]
    }
  },
  watch: {
    filterData() {
      this.resetForm()
    }
  },
  methods: {
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
