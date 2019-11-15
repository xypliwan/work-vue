<template>
  <div>
    <iframe :src="tapdUrl" width="100%" :height="clientHeight" frameborder="0"></iframe>
  </div>
</template>

<script>
import baseURL from '@/config/baseUrl';
export default {
  data() {
    return {
      tapdUrl: 'https://www.tapd.cn/my_worktable/index/todo#&filter_close=true'
    };
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
</style>