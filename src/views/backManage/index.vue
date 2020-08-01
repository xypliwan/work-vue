<template>
  <div>
<<<<<<< HEAD
    <iframe
      :src="backUrl"
      width="100%"
      :height="clientHeight"
      frameborder="0"
    ></iframe>
=======
    <iframe :src="backUrl" width="100%" :height="clientHeight" frameborder="0"></iframe>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
import baseURL from '@/config/baseUrl'
export default {
  computed: {
    backUrl() {
      return baseURL.backUrl
    },
    clientHeight() {
      return document.documentElement.clientHeight + 'px'
    }
  }
}
</script>

<style lang="scss" scoped></style>
=======
import baseURL from '@/config/baseUrl';
export default {
  computed: {
    backUrl() {
      return baseURL.backUrl;
    },
    clientHeight() {
      return document.documentElement.clientHeight + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
