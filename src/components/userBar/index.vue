<template>
  <div class="user-bar">
    <el-popover placement="right" width="250" trigger="click">
      <user-info></user-info>
      <div class="user-avatar" slot="reference">
        <el-avatar :size="55" fit="cover" :src="avatar"></el-avatar>
<<<<<<< HEAD
        <i
          class="iconfont user-status"
          :class="
            getMappingVal(statusList, 'status_code', onlineStatus, 'icon')
          "
        ></i>
=======
        <i class="iconfont user-status" :class="getMappingVal(statusList,'status_code',onlineStatus,'icon')"></i>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </div>
    </el-popover>
    <div class="nav-bar">
      <nav-bar></nav-bar>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import NavBar from './NavNar'
import UserInfo from './UserInfo'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['username', 'statusList', 'onlineStatus', 'avatar'])
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  components: {
    NavBar,
    UserInfo
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
