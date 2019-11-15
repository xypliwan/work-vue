<template>
  <div>
    <div class="filter-wrapper">
      <i class="iconfont icon-daochu" title="导出" @click="exportExcel"></i>
      <el-popover placement="bottom-end" width="800" trigger="click">
        <search-condit :companyUserList="companyUserList" :filterData="filterData" @search="search" ref="searchRef" @selectCompany="selectCompany"></search-condit>
        <i class="iconfont icon-guolv" slot="reference" title="过滤"></i>
      </el-popover>
    </div>
    <div class="table-box">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" :row-style="this.$root.tableContentStyle" :header-cell-style="this.$root.tableTitileStyle" stripe>
        <el-table-column label="需求ID" prop="list_id" min-width="100"></el-table-column>
        <el-table-column label="付费" width="100">
          <template slot-scope="scope">
            <div>{{scope.row.is_pay == '1' ? '付费' : '不付费'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="问题影响" prop="range_name" min-width="100"></el-table-column>
        <el-table-column label="需求标题" min-width="150">
          <template slot-scope="scope">
            <div class="order-title" @click="handleRowClick(scope.row)">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column label="所属公司" prop="extend_deal_company_name" min-width="100" v-if="checkAllNeed == 1"></el-table-column>
        <el-table-column label="发起人" prop="user_name" min-width="100"></el-table-column>
        <el-table-column label="状态" prop="need_status_name" min-width="100"></el-table-column>
        <el-table-column label="需求模块" prop="model_name" min-width="150"></el-table-column>

        <el-table-column label="是否为BUG" width="100">
          <template slot-scope="scope">
            <div>{{scope.row.is_bug == '1' ? '是' : '否'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="责任人" prop="deal_user_name" min-width="100"></el-table-column>
        <el-table-column label="时间" width="260">
          <template slot-scope="scope">
            <div>需求发起时间：{{scope.row.created_at}}</div>
            <div>最后更新时间：{{scope.row.updated_at}}</div>
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
import { getNeedListFilter, getNeedList } from '@/api/workbench';
import { mapGetters } from 'vuex';
import { formateExcl } from '_u/utils';
import { getCompany, getCompanyUser } from '@/api/common';
import { getNeedStatus } from '@/api/demandConversation';
export default {
  props: {
    eventType: String
  },
  data() {
    return {
      filterData: {
        company: [], //公司
        dealUser: [], //责任人
        range: [], //影响范围
        model: [], //需求模块
        statusList: [] //需求状态
      },
      companyUserList: [], //公司下面的人  列表
      params: {
        product_id: '', //产品id/系统id
        deal_status: '', // 1处理中 2 已完成   all全部
        page: 1,
        pageSize: 20,
        export: '', //	1 表示导出操作
        time_type: 'created_at'
      },
      tableLoading: false,
      total: null,
      tableData: [],
      pageSizeArr: [20, 50, 80, 100]
    };
  },
  created() {
    if (this.currentSystemIdx !== '') {
      this.getNeedListFilter();
      this.getNeedList();
    }
    this.getNeedStatus();
  },
  // async mounted() {
  //   this.getNeedStatus();
  //   if (this.currentSystemIdx !== '') {
  //     await this.getNeedListFilter();
  //     this.getNeedList();
  //   }
  // },
  computed: {
    ...mapGetters(['currentSystemIdx', 'checkAllNeed'])
  },
  watch: {
    async currentSystemIdx(newVal) {
      this.params.page = 1;
      await this.getNeedListFilter();
      this.getNeedList();
    },
    eventType(newVal) {
      this.params.page = 1;
      this.getNeedList();
    }
  },
  methods: {
    selectCompany(id) {
      this.getCompanyUser(id);
    },
    async getNeedStatus() {
      try {
        let { data } = await getNeedStatus();
        this.filterData.statusList = data;
      } catch (error) {
        this._message(error);
      }
    },
    async getCompanyUser(id) {
      try {
        let { data } = await getCompanyUser({ company_id: id });
        this.companyUserList = data;
      } catch (error) {
        this._message(error);
      }
    },
    handleRowClick(row, column, event) {
      this.$router.push(`/demand-session?demandid=${row.list_id}`);
    },
    search(params) {
      Object.assign(this.params, params);
      this.getNeedList();
    },
    exportExcel() {
      this.params.export = '1';
      formateExcl('/need/list', 'get', this.params, '需求列表');
    },
    async getNeedList() {
      this.tableLoading = true;
      this.params.export = '';
      this.params.deal_status = this.eventType;
      this.params.product_id = this.currentSystemIdx;
      try {
        let { data, paginator } = await getNeedList(this.params);
        this.total = paginator.totalCount;
        this.tableData = data;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    async getNeedListFilter() {
      this.tableLoading = true;
      try {
        let { data } = await getNeedListFilter({ product_id: this.currentSystemIdx });
        this.filterData.company = data.company;
        this.filterData.dealUser = data.dealUser;
        this.filterData.range = data.range;
        this.filterData.model = data.model;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e;
      this.getNeedList();
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e;
      this.getNeedList();
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

