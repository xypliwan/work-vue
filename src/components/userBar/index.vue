<template>
  <div class="user-bar">
    <el-popover placement="right" width="250" trigger="click">
      <user-info></user-info>
      <div class="user-avatar" slot="reference">
        <el-avatar :size="55" fit="cover" :src="avatar"></el-avatar>
        <i class="iconfont user-status" :class="getMappingVal(statusList,'status_code',onlineStatus,'icon')"></i>
      </div>
    </el-popover>
    <div class="nav-bar">
      <nav-bar></nav-bar>
    </div>
  </div>
</template>

<script>
import NavBar from './NavNar';
import UserInfo from './UserInfo';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['username', 'statusList', 'onlineStatus','avatar'])
  },
  components: {
    NavBar,
    UserInfo
  }
};
</script>

<style lang="scss" scoped>
.user-bar {
  padding: 10px 10px;
  text-align: center;
  .user-avatar {
    position: relative;
    margin-top: 10px;
    cursor: pointer;
    .user-status {
      position: absolute;
      z-index: 99;
      bottom: -2px;
      right: 8px;
      background: #fff;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .nav-bar {
    margin-top: 65px;
  }
}
</style>
