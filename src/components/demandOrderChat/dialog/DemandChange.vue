<template>
  <div class="status-box" v-loading="statusLoading">
    <el-radio-group v-model="selectStatus">
      <el-radio
        v-for="item in needStatusList"
        :key="item.status_code"
        :label="item.status_code"
        v-if="item.status_code !== '0'"
        >{{ item.status_name }}</el-radio
      >
    </el-radio-group>
    <div class="save-box">
      <el-button size="mini" type="primary" @click="needDetailUpdate"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { getNeedStatus, needDetailUpdate } from '@/api/demandConversation'
export default {
  props: {
    chatItemId: String,
    status: String
  },
  data() {
    return {
      needStatusList: [],
      selectStatus: '',
      statusLoading: false
    }
  },
  mounted() {
    this.setStatus()
    this.getNeedStatus()
  },
  watch: {
    chatItemId() {
      this.setStatus()
    },
    status() {
      this.setStatus()
    }
  },
  methods: {
    setStatus() {
      this.selectStatus = this.status
    },
    async needDetailUpdate() {
      this.statusLoading = true
      try {
        let { message } = await needDetailUpdate({
          list_id: this.chatItemId,
          need_status: this.selectStatus
        })
        this._message(message, 'success')
        this.$emit('updateOk')
      } catch (error) {
        this._message(error)
      }
      this.statusLoading = false
    },
    async getNeedStatus() {
      this.statusLoading = true
      try {
        let { data } = await getNeedStatus()
        this.needStatusList = data
      } catch (error) {
        this._message(error)
      }
      this.statusLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.status-box {
  /deep/ .el-radio {
    display: block;
    margin: 15px 0;
  }
  .save-box {
    padding-top: 10px;
    border-top: 1px solid #f1f1f1;
    text-align: center;
  }
}
</style>
