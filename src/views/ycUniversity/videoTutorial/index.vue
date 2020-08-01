<template>
<<<<<<< HEAD
  <div class="video-box" v-loading="loading">
    <iframe
      v-if="token.length"
      :src="`https://www.eccang.com/college.html?token=${token}`"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
=======
  <div class="video-box">
    <iframe src="https://www.eccang.com/college.html" width="100%" height="100%" frameborder="0"></iframe>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
import { getEccangToken } from '@/api/common'
export default {
  data() {
    return {
      token: '',
      loading: false
    }
  },
  mounted() {
    this.getEccangTokenFn()
  },
  methods: {
    async getEccangTokenFn() {
      this.loading = true
      try {
        const {
          data: { token }
        } = await getEccangToken()
        this.token = token
      } catch (error) {
        this._message(error)
      }
      this.loading = false
    }
  }
}
=======
export default {};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.video-box {
  height: calc(100vh - 80px);
  overflow: hidden;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
