<template>
  <div>
    <div class="search-box">
      <el-input
        clearable
        v-model="keyword"
        size="small"
        placeholder="请输入内容"
      ></el-input>
      <el-button
        @click="toSearch"
        type="primary"
        :disabled="!keyword.length"
        size="small"
        class="btn"
        >搜索</el-button
      >
    </div>
    <div class="cont" v-loading="formLoading">{{ cont }}</div>
  </div>
</template>

<script>
import { checkOldQuestionId } from '@/api/common'
export default {
  name: 'order-search',
  data() {
    return {
      keyword: '',
      formLoading: false,
      cont: ''
    }
  },
  methods: {
    download(url) {
      var iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = url
      document.body.appendChild(iframe)
    },
    funDownload(content, filename) {
      var eleLink = document.createElement('a')
      eleLink.download = filename
      eleLink.style.display = 'none'
      var blob = new Blob([content])
      eleLink.href = URL.createObjectURL(blob)
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
    },
    async toSearch() {
      this.formLoading = true
      try {
        let { data } = await checkOldQuestionId({ question_num: this.keyword })
        this.cont = data.str
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  width: 500px;
  margin: 20px 0;
  display: flex;
  .btn {
    float: left;
  }
}
.cont {
  min-height: 200px;
}
</style>
