<template>
  <div>
    <div class="box-title">热门帮助</div>
    <div style="height:calc(100vh - 180px)">
      <scroll :hasMore="noMore" :isLoadings="isloading" @loadingData="loadMore">
        <div slot="dataList">
<<<<<<< HEAD
          <div
            v-for="item in list"
            :key="item.knowledge_id"
            class="list-item"
            @click="toDetail(item)"
          >
            <div class="title">
              <span class="name">{{ item.title }}</span>
              <span class="num">
                <i class="iconfont icon-icon_fire_area"></i>
                {{ item.click_num }}
              </span>
            </div>
            <div class="content">{{ toStr(item.content) }}</div>
=======
          <div v-for="item in list" :key="item.knowledge_id" class="list-item" @click="toDetail(item)">
            <div class="title">
              <span class="name">{{item.title}}</span>
              <span class="num">
                <i class="iconfont icon-icon_fire_area"></i>
                {{item.click_num}}
              </span>
            </div>
            <div class="content">{{toStr(item.content)}}</div>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters } from 'vuex'
import { getHotHelpList } from '@/api/ycUniversity'
import { delHtmlTag } from '_u/utils'
import Scroll from '_c/common/Scroll'
=======
import { mapGetters } from 'vuex';
import { getHotHelpList } from '@/api/ycUniversity';
import { delHtmlTag } from '_u/utils';
import Scroll from '_c/common/Scroll';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      list: [],
      noMore: false,
      isloading: false,
      params: {
        product_id: '', //产品id/系统id
        eyesight_id: '', //视角id
        page: 1,
        pageSize: 15
      }
<<<<<<< HEAD
    }
  },
  mounted() {
    if (this.currentSystemIdx !== '') {
      this.getHotHelpList()
=======
    };
  },
  mounted() {
    if (this.currentSystemIdx !== '') {
      this.getHotHelpList();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  computed: {
    ...mapGetters(['currentSystemIdx', 'eyesightIndex']),
<<<<<<< HEAD
    toStr() {
      return str => {
        return delHtmlTag(str)
      }
    }
  },
  watch: {
    currentSystemIdx() {
      this.list = []
      this.params.page = 1
      this.getHotHelpList()
    },
    eyesightIndex() {
      this.list = []
      this.params.page = 1
      this.getHotHelpList()
=======
    toStr(str) {
      return str => {
        return delHtmlTag(str);
      };
    }
  },
  watch: {
    currentSystemIdx(newVal) {
      this.list = [];
      this.params.page = 1;
      this.getHotHelpList();
    },
    eyesightIndex(newVal) {
      this.list = [];
      this.params.page = 1;
      this.getHotHelpList();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    toDetail(item) {
<<<<<<< HEAD
      let url = window.location.origin + '/#/detail/' + item.knowledge_id
      window.open(url, '_blank')
    },
    loadMore() {
      this.params.page++
      this.getHotHelpList()
    },
    async getHotHelpList() {
      this.isloading = true
      this.params.product_id = this.currentSystemIdx
      this.params.eyesight_id = this.eyesightIndex
      try {
        let { data } = await getHotHelpList(this.params)
        this.noMore = data.length < this.params.pageSize ? true : false
        this.list = [...this.list, ...data]
      } catch (error) {
        this._message(error)
      }
      this.isloading = false
=======
      let url = window.location.origin + '/#/detail/' + item.knowledge_id;
      window.open(url, '_blank');
    },
    loadMore() {
      this.params.page++;
      this.getHotHelpList();
    },
    async getHotHelpList() {
      this.isloading = true;
      this.params.product_id = this.currentSystemIdx;
      this.params.eyesight_id = this.eyesightIndex;
      try {
        let { data } = await getHotHelpList(this.params);
        this.noMore = data.length < this.params.pageSize ? true : false;
        this.list = [...this.list, ...data];
      } catch (error) {
        this._message(error);
      }
      this.isloading = false;
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
@import '@/assets/styles/global.scss';
.list-item {
  padding: 10px 10px;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 10px;
  cursor: pointer;
  .title {
    font-size: 14px;
    font-weight: normal;
    color: #409eff;
    display: flex;
    .name {
      flex: 1;
    }
    .num {
      float: right;
      color: #666;
      font-size: 13px;
      .iconfont {
        color: #15b30f;
        font-size: 13px;
      }
    }
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
    -webkit-line-clamp: 3;
    line-height: 20px;
    text-align: justify;
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
