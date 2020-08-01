<template>
  <div>
    <iframe
      :src="backUrl"
      width="100%"
      :height="clientHeight"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
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
