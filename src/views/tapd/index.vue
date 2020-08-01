<template>
  <div>
<<<<<<< HEAD
    <iframe
      :src="tapdUrl"
      width="100%"
      :height="clientHeight"
      frameborder="0"
    ></iframe>
=======
    <iframe :src="tapdUrl" width="100%" :height="clientHeight" frameborder="0"></iframe>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
=======
import baseURL from '@/config/baseUrl';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      tapdUrl: 'https://www.tapd.cn/my_worktable/index/todo#&filter_close=true'
<<<<<<< HEAD
    }
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + 'px'
    }
  }
}
</script>
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
