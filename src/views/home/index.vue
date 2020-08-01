<template>
  <div class="home">
<<<<<<< HEAD
    <view-layout headerHeight="220px">
      <div slot="header">
        <div class="header-box">
          <div class="left">
            <el-tabs v-model="eventType">
              <el-tab-pane label="工单概况" name="all"></el-tab-pane>
            </el-tabs>
            <div class="home-type">
              <el-select
                size="mini"
                v-model="params.home_tab"
                @change="getCountListFn"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in homeTab"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="right">
            <div class="system-box">
              <system-list></system-list>
            </div>
          </div>
        </div>
        <type-list
          :list="typeList"
          @handleClick="handleClick"
          v-loading="loading"
          :selectType="selectItem.sub_type"
        ></type-list>
        <div class="header-filter">
          <div class="filter-box">
            <client-search @search="search"></client-search>
          </div>
        </div>
      </div>
      <div slot="content">
        <div class="cont-box" v-loading="tableLoading">
          <table-list
            :contlist="tableList"
            :titleList="titleList"
            :homeTab="params.home_tab"
          ></table-list>
          <div class="pagination-box">
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
      </div>
    </view-layout>
=======
    <greetings-box></greetings-box>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
import ViewLayout from '_c/common/Layout'
import SystemList from '_c/common/SystemList'
import { mapGetters } from 'vuex'
import { getCountList, getHomeList } from '@/api/home'
import TypeList from './TypeList.vue'
import ClientSearch from './ClientSearch'
import TableList from './TableList'
import { formateExcl } from '_u/utils'
export default {
  data() {
    return {
      eventType: 'all',
      typeList: [],
      loading: false,
      selectItem: {},
      firstInit: true,
      params: {
        home_tab: '',
        sub_type: '',
        product_id: '',
        page: 1,
        pageSize: 10
      },
      tableList: [],
      titleList: [],
      total: null,
      pageSizeArr: [10, 20, 40, 80],
      tableLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentSystemIdx', 'homeTab', 'chatService'])
  },
  watch: {
    homeTab() {
      this.initContList()
    },
    currentSystemIdx() {
      this.params['export'] = '0'
      this.getCountListFn()
    },
    firstInit(newVal) {
      if (!newVal && this.typeList.length > 0) {
        this.selectItem = this.typeList[0]
      }
    },
    selectItem() {
      this.params.page = 1
      this.params['export'] = '0'
      this.getHomeListFn()
    }
  },
  created() {
    this.initContList()
  },
  methods: {
    async getHomeListFn() {
      this.tableLoading = true
      this.params.product_id = this.currentSystemIdx
      this.params.sub_type = this.selectItem.sub_type
      if (this.params.export == '1') {
        let tabName = this.homeTab.find(el => el.key == this.params.home_tab)
          .value
        let typeName = this.typeList.find(
          el => el.sub_type == this.params.sub_type
        ).desc
        formateExcl(
          '/home-page/get-list',
          'post',
          this.params,
          `${tabName}-${typeName}`
        )
      } else {
        try {
          let {
            data: { list, title },
            paginator
          } = await getHomeList(this.params)
          this.total = paginator.totalCount
          this.tableList = list
          this.titleList = title
        } catch (error) {
          this._message(error)
        }
      }

      this.tableLoading = false
    },
    search(params) {
      Object.assign(this.params, params)
      this.params.page = 1
      this.getHomeListFn()
    },
    handleClick(item) {
      this.selectItem = item
    },
    initContList() {
      if (this.homeTab.length > 0 && this.currentSystemIdx !== '') {
        this.params.home_tab = this.homeTab[0].key
        this.getCountListFn(this.params.home_tab)
      }
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e
      this.getHomeListFn()
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e
      this.getHomeListFn()
    },
    async getCountListFn() {
      this.loading = true
      try {
        let { data } = await getCountList({
          home_tab: this.params.home_tab,
          product_id: this.currentSystemIdx
        })
        this.typeList = data
        if (this.typeList.length > 0) {
          this.selectItem = this.typeList[0]
        }
        this.firstInit = false
      } catch (error) {
        this._message(error)
      }
      this.loading = false
    }
  },
  components: {
    ViewLayout,
    SystemList,
    TypeList,
    ClientSearch,
    TableList
  }
}
=======
import GreetingsBox from '_c/common/Greetings';
export default {
  components: {
    GreetingsBox
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.home {
<<<<<<< HEAD
  .header-box {
    display: flex;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    .left {
      flex: 1;
      position: relative;
      /deep/ .el-tabs__item {
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        text-align: center;
      }
      .home-type {
        position: absolute;
        top: 0;
        left: 100px;
      }
    }
    .right {
      float: right;
      display: flex;
      padding: 0 20px;
      .system-box {
        flex: 1;
      }
    }
  }
  .header-filter {
    height: 60px;
    border-top: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    background: #f1f1f1;
    padding: 0 10px;
    .filter-box {
      flex: 1;
    }
    .mini-filter {
      width: auto;
      .icon-guolv {
        font-size: 20px;
      }
    }
  }
  .cont-box {
    padding-bottom: 53px;
  }
=======
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
}
</style>
