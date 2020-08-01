<template>
  <div>
    <div class="box-title">
      搜索结果
<<<<<<< HEAD
      <span>共 {{ count }} 条</span>
      <i class="iconfont icon-guanbi close" @click="close"></i>
    </div>
    <div class="list-boxs">
      <div
        v-for="(item, i) in list"
        :key="i"
        class="list-item"
        @click="toDetail(item)"
      >
        <div class="name">{{ item.title }}</div>
        <div class="content">{{ toStr(item.content) }}</div>
      </div>
      <div class="more" v-show="!isloading && !noMore" @click="loadMore">
        加载更多
      </div>
=======
      <span>共 {{count}} 条</span>
      <i class="iconfont icon-guanbi close" @click="close"></i>
    </div>
    <div class="list-boxs">
      <div v-for="(item,i) in list" :key="i" class="list-item" @click="toDetail(item)">
        <div class="name">{{item.title}}</div>
        <div class="content">{{toStr(item.content)}}</div>
      </div>
      <div class="more" v-show="!isloading && !noMore" @click="loadMore">加载更多</div>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      <div class="more load" v-show="isloading">
        <img src="@/assets/images/loading.gif" alt />
      </div>
      <div class="more" v-show="!isloading && noMore">暂无更多</div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters, mapActions } from 'vuex'
import { getSearchList } from '@/api/ycUniversity'
import { delHtmlTag } from '_u/utils'
=======
import { mapGetters, mapActions } from 'vuex';
import { getSearchList } from '@/api/ycUniversity';
import { delHtmlTag } from '_u/utils';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      params: {
        eyesight_id: '', //视角id
        product_id: '', //产品id
        keyword: '', //关键词
        page: 1,
        pageSize: 10
      },
      list: [],
      count: 0,
      noMore: false,
      isloading: false
<<<<<<< HEAD
    }
  },
  mounted() {
    if (this.searchFlg && this.keyword.length > 0) {
      this.params.page = 1
      this.list = []
      this.getSearchList()
    }
  },
  watch: {
    searchFlg() {
      if (this.keyword.length > 0) {
        this.params.page = 1
        this.list = []
        this.getSearchList()
=======
    };
  },
  mounted() {
    if (this.searchFlg && this.keyword.length > 0) {
      this.params.page = 1;
      this.list = [];
      this.getSearchList();
    }
  },
  watch: {
    searchFlg(newVal) {
      if (this.keyword.length > 0) {
        this.params.page = 1;
        this.list = [];
        this.getSearchList();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },
  computed: {
<<<<<<< HEAD
    ...mapGetters([
      'keyword',
      'isSearch',
      'currentSystemIdx',
      'eyesightIndex',
      'searchFlg'
    ]),
    toStr() {
      return str => {
        return delHtmlTag(str)
      }
=======
    ...mapGetters(['keyword', 'isSearch', 'currentSystemIdx', 'eyesightIndex', 'searchFlg']),
    toStr(str) {
      return str => {
        return delHtmlTag(str);
      };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    ...mapActions(['setIsSearch']),
    close() {
<<<<<<< HEAD
      this.setIsSearch(false)
    },
    toDetail(item) {
      let url = window.location.origin + '/#/detail/' + item.knowledge_id
      window.open(url, '_blank')
    },
    async getSearchList() {
      this.isloading = true
      this.params.eyesight_id = this.eyesightIndex
      this.params.product_id = this.currentSystemIdx
      this.params.keyword = this.keyword
      try {
        let { data, paginator } = await getSearchList(this.params)
        this.noMore = data.length < this.params.pageSize ? true : false
        this.list = [...this.list, ...data]
        this.count = paginator.totalCount
      } catch (error) {
        this._message(error)
      }
      this.isloading = false
    },
    loadMore() {
      this.params.page++
      this.getSearchList()
    }
  }
}
=======
      this.setIsSearch(false);
    },
    toDetail(item) {
      let url = window.location.origin + '/#/detail/' + item.knowledge_id;
      window.open(url, '_blank');
    },
    async getSearchList() {
      this.isloading = true;
      this.params.eyesight_id = this.eyesightIndex;
      this.params.product_id = this.currentSystemIdx;
      this.params.keyword = this.keyword;
      try {
        let { data, paginator } = await getSearchList(this.params);
        this.noMore = data.length < this.params.pageSize ? true : false;
        this.list = [...this.list, ...data];
        this.count = paginator.totalCount;
      } catch (error) {
        this._message(error);
      }
      this.isloading = false;
    },
    loadMore() {
      this.params.page++;
      this.getSearchList();
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.close {
  float: right;
  color: #666;
  cursor: pointer;
  font-size: 16px;
}
.list-boxs {
  overflow-y: auto;
  overflow-x: hidden;
  @include scrollBar;
  padding: 0 10px;
  height: calc(100vh - 210px - 50px);
  .list-item {
    padding: 10px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
    .name {
      font-size: 16px;
      color: #409eff;
    }
    .content {
      margin: 10px 0;
      font-size: 14px;
      color: #666;
      white-space: normal;
      word-wrap: break-word;
      word-break: normal;
      display: -webkit-box;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: pre-line;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-height: 20px;
      text-align: justify;
    }
  }

  .more {
    text-align: center;
    font-size: 13px;
    padding: 10px 0;
    cursor: pointer;
    color: #999;
  }
  .load {
    img {
      width: 25px;
    }
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
