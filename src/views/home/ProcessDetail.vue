<template>
  <el-dialog
    :append-to-body="true"
    title="查看进度"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
    :footer="null"
  >
    <div v-loading="detailLoading">
      <div>{{ extra.status }}</div>
      <div style="margin-top:10px">{{ extra.expect_end_at_info }}</div>
      <div class="list-box">
        <div v-for="(item, i) in processList" :key="i" class="list-item">
          <div class="left">
            <div v-html="item.desc" class="desc"></div>
            <div v-html="item.desc_time" class="desc-time"></div>
          </div>
          <div class="right">{{ item.created_at }}</div>
          <div class="quan"></div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { processDetail } from '@/api/home'
export default {
  props: {
    visible: Boolean,
    id: String,
    homeTab: String
  },
  data() {
    return {
      detailLoading: false,
      processList: [],
      extra: {}
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.processDetail()
      }
    }
  },
  methods: {
    async processDetail() {
      this.detailLoading = true
      let params = {
        id: this.id,
        home_tab: this.homeTab,
        page: 1,
        pageSize: 500
      }
      try {
        let {
          data: { list, extra }
        } = await processDetail(params)
        this.processList = list
        this.extra = extra
      } catch (error) {
        this._message(error)
      }
      this.detailLoading = false
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-box {
  margin-top: 20px;
  .list-item {
    display: flex;
    position: relative;
    border-left: 1px solid #e2dfdf;
    padding-bottom: 20px;
    padding-left: 15px;
    .left {
      flex: 1;
      .desc {
        font-size: 14px;
        ::v-deep .user_name_process {
          color: #409eff;
        }
      }
      .desc-time {
        font-size: 13px;
        margin-top: 8px;
        ::v-deep .user_name_process {
          color: #409eff;
        }
      }
    }
    .right {
      width: auto;
      font-size: 13px;
      color: #888;
    }
    .quan {
      position: absolute;
      top: 0;
      left: -5px;
      width: 10px;
      height: 10px;
      border: 1px solid #409eff;
      border-radius: 50%;
      z-index: 9;
      background: #fff;
    }
  }
}
</style>
