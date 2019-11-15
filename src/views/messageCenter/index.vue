<template>
  <div class="message-center-box">
    <!-- <img src="@/assets/images/u99.png" alt /> -->
    <view-layout headerHeight="80px">
      <div slot="header">
        <div class="header-wrapper">
          <div class="left">
            <el-tabs v-model="is_read">
              <el-tab-pane label="未读消息" name="0"></el-tab-pane>
              <el-tab-pane label="已读消息" name="1"></el-tab-pane>
            </el-tabs>
          </div>
          <!-- <div class="right">
            <i class="iconfont icon-weixin"></i>
            <span>关注微信通知</span>
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ccc"></el-switch>
          </div> -->
        </div>
      </div>
      <div slot="content">
        <table-box :isRead="is_read"></table-box>
      </div>
    </view-layout>
  </div>
</template>

<script>
import ViewLayout from '_c/common/Layout';
import TableBox from './TableBox';
export default {
  data() {
    return {
      is_read: '0',
      value: false
    };
  },
  components: {
    ViewLayout,
    TableBox
  }
};
</script>

<style lang="scss" scoped>
.message-center-box {
  // height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  /deep/ .el-tabs__item {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    width: 80px;
    text-align: center;
  }
  .header-wrapper {
    display: flex;
    .left {
      flex: 1;
    }
    .right {
      float: right;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-weixin {
        color: #09bb07;
        font-size: 25px;
      }
      span {
        font-size: 13px;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>