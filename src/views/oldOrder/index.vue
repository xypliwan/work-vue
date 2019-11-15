<template>
  <div>
    <div class="search-box">
      <el-input clearable v-model="keyword" size="small" placeholder="请输入内容"></el-input>
      <el-button @click="toSearch" type="primary" :disabled="!keyword.length" size="small" class="btn">搜索</el-button>
    </div>
    <div class="cont" v-loading="formLoading">{{cont}}</div>
    <button @click="test">下载测试</button>
    <span>1111</span>
  </div>
</template>

<script>
import { checkOldQuestionId } from '@/api/common';
export default {
  name: 'order-search',
  data() {
    return {
      keyword: '',
      formLoading: false,
      cont: ''
    };
  },
  methods: {
    test() {
      // http://img.ecgtool.com/ecs/ec/txt/2019/10/31//plain/1/201910/31/1_1572514061.txt
      // this.funDownload('http://img.ecgtool.com/ecs/ec/txt/2019/10/31//plain/1/201910/31/1_1572514061.txt', '测试');
      // window.open('http://img.ecgtool.com/ecs/ec/txt/2019/10/31//plain/1/201910/31/1_1572514061.txt', '_blank');
      this.download('http://img.ecgtool.com/ecs/ec/txt/2019/10/31//plain/1/201910/31/1_1572514061.txt');
    },
    download(url) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);
    },
    tes2(src) {
      var eleLink = document.createElement('a');
      eleLink.download = src;
      eleLink.style.display = 'none';
      // // 字符内容转变成blob地址
      eleLink.href = src;
      // // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // // 然后移除
      document.body.removeChild(eleLink);
    },
    funDownload(content, filename) {
      // 创建隐藏的可下载链接
      var eleLink = document.createElement('a');
      eleLink.download = filename;
      eleLink.style.display = 'none';
      // 字符内容转变成blob地址
      var blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    async toSearch() {
      this.formLoading = true;
      try {
        let { data } = await checkOldQuestionId({ question_num: this.keyword });
        this.cont = data.str;
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    }
  }
};
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

