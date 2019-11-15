<template>
  <div v-loading="boxLoading">
    <div class="user-title">易仓客户服务平台</div>
    <div class="user-name">
      欢迎您 {{username}}
      <!-- <i class="iconfont" :class="getMappingVal(statusList,'status_code',onlineStatus,'icon')"></i> -->
    </div>
    <div class="status-list">
      <div v-for="(item,i) in statusList" @click="handleStatus(item)" class="status-item" :key="item.status_code">
        <i class="iconfont status-icon" :class="item.icon"></i>
        {{item.status_name}}
        <i class="iconfont icon-xuanzhong select-icon" v-show="onlineStatus == item.status_code"></i>
      </div>
    </div>
    <div class="user-logout" @click="logot">退出登录</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { setOnlineStatus } from '@/api/common';
import { loginout } from '@/api/user';
import baseURL from '@/config/baseUrl';
export default {
  data() {
    return {
      boxLoading: false
    };
  },
  computed: {
    ...mapGetters(['statusList', 'onlineStatus', 'username'])
  },
  methods: {
    ...mapActions(['setOnlineStatus']),
    async handleStatus(item) {
      this.boxLoading = true;
      try {
        let { data } = await setOnlineStatus({ status_code: item.status_code });
        this.setOnlineStatus(item.status_code);
      } catch (error) {
        this._message(error);
      }
      this.boxLoading = false;
    },
    logot() {
      this.$confirm('确定退出吗?将会清除您的登录信息！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loginout();
        })
        .catch(() => {});
    },
    async loginout() {
      try {
        let { message } = await loginout();
        this._message(message, 'success');
        window.open(baseURL.loginUrl, '_self');
      } catch (error) {
        this._message(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-title {
  color: #409eff;
  font-size: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f1f1;
}
.user-name {
  padding: 10px 0;
  font-size: 14px;
  color: #333;
  .iconfont {
    font-size: 15px;
    margin-left: 15px;
  }
}
.status-list {
  margin: 15px 0;
  .status-item {
    padding: 5px 0;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    .status-icon {
      margin-right: 10px;
      background: #fff;
      overflow: hidden;
      border-radius: 50%;
    }
    .select-icon {
      position: absolute;
      right: 0;
      top: 5px;
      color: #409eff;
      font-size: 15px;
    }
  }
}
.user-logout {
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid #f1f1f1;
  cursor: pointer;
  font-size: 13px;
  color: #888;
}
</style>
