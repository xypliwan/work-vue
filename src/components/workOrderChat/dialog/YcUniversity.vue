<template>
<<<<<<< HEAD
  <div class="yc-university-box" :style="{ height: height }">
=======
  <div class="yc-university-box" :style="{'height':height}">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    <scroll :isLoadings="isLoadings" :hasMore="hasMore" @loadingData="loadMore">
      <div slot="dataList">
        <div class="search-box">
          <div class="left">
<<<<<<< HEAD
            <el-input
              clearable
              @keyup.enter.native="search"
              size="small"
              placeholder="请输入关键词"
              v-model="params.keyword"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
=======
            <el-input clearable @keyup.enter.native="search" size="small" placeholder="请输入关键词" v-model="params.keyword" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-input>
          </div>
          <div class="right">
            <i class="el-icon-close" @click="close"></i>
          </div>
        </div>
<<<<<<< HEAD
        <div
          v-for="(item, i) in list"
          :key="i"
          class="list-box"
          @click="toDetail(item)"
        >
          <p class="list-title">{{ item.title }}</p>
          <p class="list-content">{{ toStr(item.content) }}</p>
=======
        <div v-for="(item,i) in list" :key="i" class="list-box" @click="toDetail(item)">
          <p class="list-title">{{item.title}}</p>
          <p class="list-content">{{toStr(item.content)}}</p>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
<<<<<<< HEAD
import Scroll from '_c/common/Scroll'
import { getSearchList } from '@/api/ycUniversity'
import { delHtmlTag } from '_u/utils'
=======
import Scroll from '_c/common/Scroll';
import { getSearchList } from '@/api/ycUniversity';
import { delHtmlTag } from '_u/utils';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    height: String,
    productId: String //产品id/系统id
  },
  data() {
    return {
      hasMore: false,
      isLoadings: false,
      params: {
        eyesight_id: '', //视角id
        product_id: '', //产品id
        keyword: '', //关键词
        page: 1,
        pageSize: 3
      },
      list: []
<<<<<<< HEAD
    }
  },
  computed: {
    toStr() {
      return str => {
        return delHtmlTag(str)
      }
=======
    };
  },
  computed: {
    toStr(str) {
      return str => {
        return delHtmlTag(str);
      };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    close() {
<<<<<<< HEAD
      this.$emit('close')
    },
    toDetail(item) {
      let url = window.location.origin + '/#/detail/' + item.knowledge_id
      window.open(url, '_blank')
    },
    loadMore() {
      this.params.page++
      this.getSearchList()
    },
    search() {
      if (!this.params.keyword.length) {
        this._message('请输入关键词！', 'warning')
        return
      }
      this.params.page = 1
      this.list = []
      this.getSearchList()
    },
    async getSearchList() {
      this.isLoadings = true
      this.params.product_id = this.productId
      try {
        let { data } = await getSearchList(this.params)
        this.hasMore = data.length < this.params.pageSize
        this.list = [...this.list, ...data]
      } catch (error) {
        this._message(error)
      }
      this.isLoadings = false
=======
      this.$emit('close');
    },
    toDetail(item) {
      let url = window.location.origin + '/#/detail/' + item.knowledge_id;
      window.open(url, '_blank');
    },
    loadMore() {
      this.params.page++;
      this.getSearchList();
    },
    search() {
      if (!this.params.keyword.length) {
        this._message('请输入关键词！', 'warning');
        return;
      }
      this.params.page = 1;
      this.list = [];
      this.getSearchList();
    },
    async getSearchList() {
      this.isLoadings = true;
      this.params.product_id = this.productId;
      try {
        let { data, paginator } = await getSearchList(this.params);
        this.hasMore = data.length < this.params.pageSize;
        this.list = [...this.list, ...data];
      } catch (error) {
        this._message(error);
      }
      this.isLoadings = false;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    Scroll
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.yc-university-box {
  width: 400px;
  .search-box {
    display: flex;
    .left {
      flex: 1;
    }
    .right {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .list-box {
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
    .list-title {
      color: #409eff;
      font-size: 15px;
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .list-content {
      font-size: 13px;
      color: #999;
      line-height: 20px;
      white-space: normal;
      word-wrap: break-word;
      word-break: normal;
      display: -webkit-box;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: pre-line;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
