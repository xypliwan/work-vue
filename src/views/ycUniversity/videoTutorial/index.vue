<template>
  <div class="video-box" v-loading="loading">
    <iframe
      v-if="token.length"
      :src="`https://www.eccang.com/college.html?token=${token}`"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
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
</script>

<style lang="scss" scoped>
.video-box {
  height: calc(100vh - 80px);
  overflow: hidden;
}
</style>
