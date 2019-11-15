<template>
  <!-- 易仓大学 -->
  <div>
    <view-layout headerHeight="80px">
      <div slot="header">
        <div class="yc-header">
          <div class="tab">
            <router-link tag="div" class="router-item" v-for="(item,i) in tabList" :key="i" :to="item.path">
              <span v-if="hasPermissionBtn(item.code)">{{item.title}}</span>
            </router-link>
          </div>
          <div class="search-box">
            <el-input placeholder="关键词搜索" clearable @keyup.enter.native="search" v-model="iptVal" class="input-with-select">
              <i class="iconfont icon-xingtaiduICON_sousuo--" slot="prefix"></i>
              <el-button type="primary" slot="append" @click="search">搜索</el-button>
            </el-input>
          </div>

          <div class="perspective-box">
            <system-list></system-list>
          </div>
          <div class="perspective-box">
            <perspective-list></perspective-list>
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
import PerspectiveList from '_c/common/PerspectiveList';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      tabList: [
        {
          title: '最近浏览',
          path: '/yc-university/history-brows',
          code: 'last-read'
        },
        {
          title: '知识中心',
          path: '/yc-university/knowledge-center',
          code: 'knowledge-center'
        },
        {
          title: '视频教程',
          path: '/yc-university/video-tutorial',
          code: 'video-teaching'
        },
        {
          title: '知识管理',
          path: '/yc-university/knowledge-manage',
          code: 'knowledge-manage'
        }
      ],
      iptVal: ''
    };
  },
  mounted() {},
  watch: {
    $route(to, from) {
      if (to.path !== '/yc-university/history-brows') {
        this.getKeyword('');
        this.iptVal = '';
      }
    },
    currentSystemIdx(newVal) {
      if (this.$route.query.form) {
        this.iptVal = this.$route.query.form;
        this.getKeyword(this.iptVal);
        this.setSearchFlg(!this.searchFlg);
        this.setIsSearch(true);
      }
    }
  },

  computed: {
    ...mapGetters(['isSearch', 'keyword', 'searchFlg', 'currentSystemIdx'])
  },
  methods: {
    ...mapActions(['setIsSearch', 'getKeyword', 'setSearchFlg']),
    search() {
      if (this.iptVal.length <= 0) {
        this._message('请输入搜索关键词', 'warning');
        return;
      }
      this.getKeyword(this.iptVal);
      this.setSearchFlg(!this.searchFlg);
      this.$router.push('/yc-university');
      this.setIsSearch(true);
    }
  },
  components: {
    UserBar,
    ViewLayout,
    SystemList,
    PerspectiveList
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
      float: left;
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
  .search-box {
    flex: 1;
    margin-left: 100px;
    margin-right: 100px;
    width: 500px;
    .icon-xingtaiduICON_sousuo-- {
      font-size: 20px;
      margin: 8px 17px;
      display: inline-block;
    }
    /deep/ .el-input--prefix .el-input__inner {
      padding-left: 55px;
    }
    /deep/ .el-button {
      background: #409eff;
      color: #fff;
      border-radius: 0px;
    }
  }
  .perspective-box {
    float: right;
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
