<template>
  <!-- 提交工单 -->
  <div>
    <view-layout headerHeight="80px">
      <div slot="header">
        <div class="yc-header">
          <div class="tab">
            <router-link tag="div" v-if="hasPermissionBtn('question')" class="router-item" to="/service-platform/submit-work-order">提交工单</router-link>
            <router-link tag="div" v-if="hasPermissionBtn('support')" class="router-item" to="/service-platform/technical-support">技术支持</router-link>
            <router-link tag="div" v-if="hasPermissionBtn('need')" class="router-item" to="/service-platform/submit-demand">提交需求</router-link>
          </div>
          <div class="perspective-box">
            <system-list></system-list>
          </div>
        </div>
      </div>
      <div slot="content">
        <router-view></router-view>
      </div>
    </view-layout>
  </div>
</template>

<script>
import UserBar from '_c/userBar';
import ViewLayout from '_c/common/Layout';
import SystemList from '_c/common/SystemList';
import { mapGetters } from 'vuex';
export default {
  mounted() {
    let params = this.$route.query;
    if (params.questionId || params.supportId || params.isBug) {
    } else {
      this.toRoute();
    }
  },
  computed: {
    ...mapGetters(['permissionBtn'])
  },
  watch: {
    permissionBtn(newVal) {
      let params = this.$route.query;
      if (params.questionId || params.supportId || params.isBug) {
      } else {
        this.toRoute();
      }
    },
  },
  methods: {
    toRoute() {
      // if(this.$route.path)
      if (!this.hasPermissionBtn('question')) {
        if (!this.hasPermissionBtn('support')) {
          if (!this.hasPermissionBtn('need')) {
          } else {
            this.$router.push('/service-platform/submit-demand');
          }
        } else {
          this.$router.push('/service-platform/technical-support');
        }
      } else {
        this.$router.push('/service-platform/submit-work-order');
      }
    }
  },
  components: {
    UserBar,
    ViewLayout,
    SystemList
  }
};
</script>

<style lang="scss" scoped>
.yc-header {
  height: 60px;
  margin-bottom: 20px;
  border-bottom: 2px solid #e4e7ed;
  display: flex;
  overflow: hidden;
  .tab {
    float: left;
    .router-item {
      height: 58px;
      display: inline-block;
      margin: 0 10px;
      line-height: 60px;
      font-size: 16px;
      color: #303133;
      border-bottom: none;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
      &.router-link-active {
        color: #409eff;
        border-bottom: 2px solid #409eff;
      }
    }
  }
  .perspective-box {
    flex: 1;
    height: 60px;
    text-align: right;
    line-height: 60px;
    padding: 0 20px;

    /deep/ .el-dropdown-link {
      cursor: pointer;
      color: #e16b06;
    }
  }
}
</style>
