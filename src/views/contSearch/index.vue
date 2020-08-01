<template>
  <div class="cont-search">
    <view-layout headerHeight="125px">
      <div slot="header">
        <div class="search-header">
          <el-input
            clearable
            placeholder="请输入搜索关键词"
            @keyup.enter.native="getSearchPageList"
            v-model="params.keyword"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getSearchPageList"
            ></el-button>
          </el-input>
          <div class="sys-box">
            <system-list></system-list>
          </div>
        </div>
      </div>
      <div slot="content" v-loading="contLoding">
        <div class="cont-list">
          <div
            v-for="(item, i) in contList"
            :key="i"
            class="list-item"
            @click="toDetail(item)"
          >
            <div class="cont-page-title" v-html="item.title"></div>
            <div class="cont-page-cont" v-html="item.desc"></div>
          </div>

          <div
            v-show="contList.length <= 0"
            style="text-align:center;font-size:14px;color:#888;margin:50px 0;"
          >
            暂无数据
          </div>
        </div>

        <div
          style="text-align:right;margin:30px 0;"
          v-show="contList.length > 0"
        >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-sizes="pageSizeArr"
            :page-size="params.pageSize"
            layout="total, sizes,slot, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </view-layout>

    <detail :id="orderId" :dialogDetail.sync="dialogDetail"></detail>
  </div>
</template>

<script>
import ViewLayout from '_c/common/Layout'
import SystemList from '_c/common/SystemList'
import { getSearchPageList } from '@/api/common'
import { mapGetters } from 'vuex'
import Detail from './Detail'
export default {
  data() {
    return {
      params: {
        keyword: '',
        page: 1,
        pageSize: 10,
        product_id: ''
      },
      contList: [],
      pageSizeArr: [10, 20, 50, 100],
      total: null,
      contLoding: false,
      dialogDetail: false,
      orderId: ''
    }
  },
  watch: {
    currentSystemIdx() {
      if (this.params.keyword.trim().length <= 0) return
      this.params.page = 1
      this.getSearchPageList()
    }
  },
  computed: {
    ...mapGetters(['currentSystemIdx'])
  },
  methods: {
    toDetail(item) {
      this.orderId = item.question_id
      this.dialogDetail = true
    },
    async getSearchPageList() {
      if (this.params.keyword.trim().length <= 0) return
      this.contLoding = true
      this.params.product_id = this.currentSystemIdx
      try {
        let { data, paginator } = await getSearchPageList(this.params)
        this.total = paginator.totalCount
        this.contList = data
      } catch (error) {
        this._message(error)
      }
      this.contLoding = false
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e
      this.getSearchPageList()
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e
      this.getSearchPageList()
    }
  },
  components: {
    ViewLayout,
    SystemList,
    Detail
  }
}
</script>

<style lang="scss" scoped>
.search-header {
  width: 50%;
  box-shadow: 0px 4px 10px 3px #f1f1f1;
  margin: 40px auto;
}
.sys-box {
  position: fixed;
  right: 50px;
  top: 50px;
}
.cont-list {
  padding: 0px 20px;
  min-height: 100px;
  .list-item {
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
    margin-top: 15px;
    cursor: pointer;
    .cont-page-title {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
      /deep/ em {
        color: #dd4b39;
        font-style: normal;
        font-weight: normal;
        margin: 0 3px;
      }
    }
    .cont-page-cont {
      font-size: 14px;
      color: #666;
      /deep/ em {
        color: #dd4b39;
        font-style: normal;
        font-weight: normal;
        margin: 0 3px;
      }
    }
  }
}
</style>
