<template>
  <div>
    <div class="filter-wrapper">
      <i class="iconfont icon-daochu" title="导出" @click="exportExcel"></i>
      <el-popover placement="bottom-end" width="400" trigger="click">
        <search-condit :filterData="filterData" @search="search"></search-condit>
        <i class="iconfont icon-guolv" slot="reference" title="过滤"></i>
      </el-popover>
    </div>

    <div class="table-box">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" :row-style="this.$root.tableContentStyle" :header-cell-style="this.$root.tableTitileStyle" stripe>
        <el-table-column label="支持ID" prop="support_id" width="100" fixed></el-table-column>
        <el-table-column label="优先级" width="80" fixed>
          <template slot-scope="scope">
            <div>{{scope.row.range_level.level}}</div>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="100" prop="title">
          <template slot-scope="scope">
            <div class="order-title" @click="handleRowClick(scope.row)">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column label="问题影响">
          <template slot-scope="scope">
            <div>{{scope.row.range_level.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="客户" prop="customer_name"></el-table-column>
        <el-table-column label="状态" prop="deal_status"></el-table-column>

        <el-table-column label="类型" width="50">
          <template slot-scope="scope">
            <div>{{scope.row.support_type}}</div>
          </template>
        </el-table-column>
        <el-table-column label="发起人">
          <template slot-scope="scope">
            <div>发起人: {{scope.row.demand_user_name}}</div>
            <div>责任人: {{scope.row.resolve_user_name}}</div>
          </template>
        </el-table-column>

        <el-table-column label="耗时" prop="spend_time"></el-table-column>
        <el-table-column label="时间" width="270">
          <template slot-scope="scope">
            <div>创建时间: {{scope.row.created_at}}</div>
            <div>首次响应时间: {{scope.row.first_support_time}}</div>
            <div>最后响应时间: {{scope.row.last_support_time}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
</template>

<script>
import SearchCondit from './SearchCondit';
import { mapGetters } from 'vuex';
import { getQupportListFilter, getQupportList } from '@/api/workbench';
import { formateExcl } from '_u/utils';

export default {
  props: {
    eventType: String
  },
  data() {
    return {
      filterData: {},
      params: {
        product_id: '', //产品id/系统id
        deal_status: '', // 1处理中 2 已完成   all全部
        page: 1,
        pageSize: 20,
        export: '' //	1 表示导出操作
      },
      tableLoading: false,
      tableData: [],
      total: null,
      pageSizeArr: [20, 50, 80, 100]
    };
  },
  created() {
    if (this.currentSystemIdx !== '') {
      this.getQupportListFilter();
      this.getQupportList();
    }
  },
  // async mounted() {
  //   if (this.currentSystemIdx !== '') {
  //     await this.getQupportListFilter();
  //     this.getQupportList();
  //   }
  // },
  computed: {
    ...mapGetters(['currentSystemIdx', 'dealStatusInfo'])
  },
  watch: {
    async currentSystemIdx(newVal) {
      this.params.page = 1;
      await this.getQupportListFilter();
      this.getQupportList();
    },
    eventType(newVal) {
      this.params.page = 1;
      this.getQupportList();
    },
    dealStatusInfo(newVal) {
      let index = this.tableData.findIndex(item => item.support_id === newVal.support_id);
      this.tableData[index].deal_status = newVal.deal_status_name;
    }
  },
  methods: {
    exportExcel() {
      this.params.export = '1';
      formateExcl('/support/list', 'get', this.params, '技术支持');
    },

    handleRowClick(row, column, event) {
      this.$router.push(`/technical-conversation?id=${row.question_id}&supportId=${row.support_id}`);
    },
    search(params) {
      Object.assign(this.params, params);
      this.getQupportList();
    },
    async getQupportList() {
      this.tableLoading = true;
      this.params.export = '';
      this.params.deal_status = this.eventType;
      this.params.product_id = this.currentSystemIdx;
      try {
        let { data, paginator } = await getQupportList(this.params);
        this.total = paginator.totalCount;
        this.tableData = data;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    async getQupportListFilter() {
      this.tableLoading = true;
      try {
        let { data } = await getQupportListFilter({ product_id: this.currentSystemIdx });
        this.filterData = data;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e;
      this.getQupportList();
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e;
      this.getQupportList();
    }
  },

  components: {
    SearchCondit
  }
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  background: #f1f1f1;
  padding: 8px 10px;
  text-align: right;
  height: 36px;
  i {
    font-size: 20px;
    cursor: pointer;
    color: #333;
    margin-right: 15px;
  }
}
.order-title {
  color: #409eff;
  cursor: pointer;
}
/deep/ .el-drawer__header {
  display: none;
}
</style>