<template>
  <el-form
    :inline="true"
    size="small"
    :model="ruleForm"
    ref="ruleForm"
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="" prop="keyword">
      <el-input
        style="width: 220px"
        clearable
        v-model="ruleForm.keyword"
        placeholder="输入工单号，标题，客服查询"
      ></el-input>
    </el-form-item>
    <el-form-item label="提出时间" prop="createRange">
      <el-date-picker
        style="width: 349px"
        clearable
        v-model="ruleForm.createRange"
        type="datetimerange"
        placeholder="请选择"
        value-format="yyyy-MM-dd HH:mm:ss"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="handleChangeCreate"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="完成时间" prop="finishRange">
      <el-date-picker
        style="width: 349px"
        clearable
        v-model="ruleForm.finishRange"
        type="datetimerange"
        placeholder="请选择"
        value-format="yyyy-MM-dd HH:mm:ss"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="handleChangeFinish"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="" prop="name">
      <el-button type="primary" size="mini" @click="search('0')"
        >查询</el-button
      >
      <el-button size="mini" @click="resetForm">重置</el-button>
      <el-button type="info" size="mini" @click="search('1')">导出</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        keyword: '',
        create_time_start: '', //提出时间开始
        create_time_end: '', //提出时间结束
        finish_time_start: '', //结束时间开始
        finishe_time_end: '', //结束时间结束
        createRange: [],
        finishRange: [],
        export: '0' // 1 为导出
      }
    }
  },
  methods: {
    search(flg) {
      this.ruleForm.export = flg
      this.$emit('search', this.ruleForm)
    },
    handleChangeCreate(e) {
      if (e) {
        this.ruleForm.create_time_start = e[0]
        this.ruleForm.create_time_end = e[1]
      } else {
        this.ruleForm.create_time_start = ''
        this.ruleForm.create_time_end = ''
      }
    },
    handleChangeFinish(e) {
      if (e) {
        this.ruleForm.finish_time_start = e[0]
        this.ruleForm.finishe_time_end = e[1]
      } else {
        this.ruleForm.finish_time_start = ''
        this.ruleForm.finishe_time_end = ''
      }
    },
    resetForm() {
      this.ruleForm.create_time_start = ''
      this.ruleForm.create_time_end = ''
      this.ruleForm.finish_time_start = ''
      this.ruleForm.finishe_time_end = ''
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 0;
}
</style>
