<template>
  <div class="wrapper">
    <div class="marster-left">
      <user-bar></user-bar>
    </div>
    <div class="marster-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import UserBar from '_c/userBar';

export default {
  components: {
    UserBar
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  display: flex;
  .marster-left {
    width: 80px;
    float: left;
    background: #2a68c9;
    position: relative;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
  }
  .marster-right {
    flex: 1;
    height: 100vh;
    background: #fff;
    overflow: hidden;
    padding: 0px 10px;
    min-width: 1100px;
    position: fixed;
    top: 0;
    left: 80px;
    right: 0;
  }
}
</style>
