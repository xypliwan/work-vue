<template>
  <div>
    <div class="box-title">
      浏览记录 &nbsp;&nbsp;&nbsp;
      <span
        v-for="(item, i) in timeType"
        :key="i"
        :class="currentIndex == i ? 'active' : ''"
        @click="changeSearch(item, i)"
        >{{ item.title }}</span
      >
      &nbsp;&nbsp;&nbsp;
      <span>指定时间段</span>
      &nbsp;&nbsp;&nbsp;
      <el-date-picker
        size="mini"
        ref="pickers"
        v-model="times"
        @change="handleChange"
        :clearable="false"
        format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <i
        class="iconfont icon-xingtaiduICON_sousuo-- searchicon"
        @click="searchs"
      ></i>
    </div>

    <div class="list-box">
      <left-scroll
        :hasMore="noMore"
        :isLoadings="isloading"
        @loadingData="loadMore"
      >
        <div slot="dataList">
          <el-timeline>
            <el-timeline-item
              :key="i"
              v-for="(item, i) in list"
              :timestamp="item.created_at"
              placement="top"
            >
              <el-card shadow="hover">
                <div class="name" @click="toDetail(item)">{{ item.title }}</div>
                <div class="cont">{{ toStr(item.content) }}</div>
                <div class="update-time">更新时间: {{ item.updated_at }}</div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </left-scroll>
    </div>
  </div>
</template>
<script>
import { getHistoryLog } from '@/api/ycUniversity'
import { mapGetters } from 'vuex'
import { delHtmlTag } from '_u/utils'
import LeftScroll from '_c/common/Scroll'
export default {
  data() {
    return {
      currentIndex: 2,
      timeType: [
        { type: 1, title: '近1天' },
        { type: 7, title: '近7天' },
        { type: 30, title: '近30天' }
      ],
      times: [new Date(), new Date()],
      params: {
        page: 1,
        pageSize: 15,
        start_time: '', //开始时间
        end_time: '', ///结束时间
        product_id: '', //产品id/系统id
        eyesight_id: '' //视角id
      },
      list: [],
      noMore: false,
      isloading: false
    }
  },
  computed: {
    ...mapGetters(['currentSystemIdx', 'eyesightIndex']),
    toStr() {
      return str => {
        return delHtmlTag(str)
      }
    }
  },
  mounted() {
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)

    this.times = [start, new Date()]
    if (this.currentSystemIdx !== '') {
      this.getHistoryLog()
    }
  },
  watch: {
    currentSystemIdx() {
      this.searchs()
    },
    eyesightIndex() {
      this.searchs()
    }
  },
  methods: {
    toDetail(item) {
      let url = window.location.origin + '/#/detail/' + item.knowledge_id
      window.open(url, '_blank')
    },
    handleChange() {
      this.currentIndex = null
    },
    async getHistoryLog() {
      this.isloading = true
      this.params.start_time = this.$moment(this.times[0]).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      this.params.end_time = this.$moment(this.times[1]).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      this.params.product_id = this.currentSystemIdx
      this.params.eyesight_id = this.eyesightIndex
      try {
        let { data } = await getHistoryLog(this.params)
        this.noMore = data.length < this.params.pageSize ? true : false
        this.list = [...this.list, ...data]
      } catch (error) {
        this._message(error)
      }
      this.isloading = false
    },
    searchs() {
      this.list = []
      this.params.page = 1
      this.getHistoryLog()
    },
    changeSearch(item, i) {
      this.currentIndex = i
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * item.type)
      this.times = [start, new Date()]
      this.searchs()
    },
    loadMore() {
      this.params.page++
      this.getHistoryLog()
    }
  },
  components: {
    LeftScroll
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.box-title {
  padding: 10px 10px;
  background: #f0f4f3;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  margin-bottom: 10px;
  min-width: 900px;
  span {
    margin-left: 10px;
    cursor: pointer;
    &.active {
      color: #409eff;
    }
  }
  .searchicon {
    margin-left: 30px;
    cursor: pointer;
    font-size: 20px;
    color: #409eff;
  }
}

.list-box {
  margin-top: 20px;
  height: calc(100vh - 180px);
  .name {
    font-size: 16px;
    color: #409eff;
    cursor: pointer;
  }
  .cont {
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
    -webkit-line-clamp: 5;
    line-height: 20px;
    text-align: justify;
  }
  .update-time {
    font-size: 13px;
    text-align: right;
    color: #999;
  }
  /deep/ .el-timeline-item {
    padding-bottom: 40px;
  }
}
</style>
