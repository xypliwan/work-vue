<template>
  <div>
    <div class="filter-wrapper">
      <i class="iconfont icon-daochu" title="导出" @click="exportExcel"></i>
      <el-popover placement="bottom-end" width="400" trigger="click">
        <search-condit :filterData="filterData" @search="search" ref="searchRef"></search-condit>
        <i class="iconfont icon-guolv" slot="reference" title="过滤"></i>
      </el-popover>
    </div>

    <div class="table-box">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" :row-style="this.$root.tableContentStyle" :header-cell-style="this.$root.tableTitileStyle" stripe>
        <el-table-column label="工单号" prop="question_num" width="100" fixed></el-table-column>
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

        <el-table-column label="类型" width="50">
          <template slot-scope="scope">
            <div>{{scope.row.question_type}}</div>
          </template>
        </el-table-column>
        <el-table-column label="发起人">
          <template slot-scope="scope">
            <div>发起人: {{scope.row.user_name}}</div>
            <div>责任人: {{scope.row.resolve_question_user_name}}</div>
          </template>
        </el-table-column>

        <el-table-column label="时间" width="270">
          <template slot-scope="scope">
            <div>工单发起时间: {{scope.row.created_at}}</div>
            <div>首次响应时间: {{scope.row.first_service_answer_time}}</div>
            <div>最后响应时间: {{scope.row.last_service_answer_time}}</div>
          </template>
        </el-table-column>
        <el-table-column label="问题影响">
          <template slot-scope="scope">
            <div>{{scope.row.range_level.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="question_status"></el-table-column>
        <el-table-column label="耗时" prop="spend_time"></el-table-column>
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

    <dialog-chat :chatDialogVisible.sync="chatDialogVisible" :chatItemId="chatItemId"></dialog-chat>
  </div>
</template>

<script>
import SearchCondit from './SearchCondit';
import { mapGetters } from 'vuex';
import { getQuestionListFilter, getQuestionList } from '@/api/workbench';
import { formateExcl } from '_u/utils';
import DialogChat from './DialogChat';


export default {
  props: {
    eventType: String
  },
  data() {
    return {
      filterData: {
        resolveUser: [], //责任人
        range: [] //影响范围
      },
      params: {
        // resolve_question_user_id: '', //责任人id
        product_id: '', //产品id/系统id
        question_status: '', // 1处理中 2 已完成   all全部
        page: 1,
        pageSize: 20,
        export: '' //	1 表示导出操作
      },
      tableLoading: false,
      tableData: [],
      total: null,
      pageSizeArr: [20, 50, 80, 100],
      chatDialogVisible: false,
      chatItemId: ''
    };
  },
  created() {
    if (this.currentSystemIdx !== '') {
      this.getQuestionListFilter();
      this.getQuestionList();
    }
  },
  // async mounted() {

  // },
  computed: {
    ...mapGetters(['currentSystemIdx'])
  },
  watch: {
    eventType(newVal) {
      this.params.page = 1;
      this.getQuestionList();
    },
    async currentSystemIdx(newVal) {
      this.params.page = 1;
      await this.getQuestionListFilter();
      this.getQuestionList();
    },
    chatDialogVisible(newVal) {
      if (!newVal) {
        this.chatItemId = '';
      }
    }
  },
  methods: {
    exportExcel() {
      this.params.export = '1';
      formateExcl('/question/list', 'get', this.params, '系统工单');
    },
    handleRowClick(row) {
      this.chatItemId = row.question_id;
      this.chatDialogVisible = true;
      // this.$router.push(`/conversation?id=${row.question_id}&num=${row.question_num}&supportId=${row.support_id}`);
    },

    search(params) {
      Object.assign(this.params, params);
      this.getQuestionList();
    },
    async getQuestionList() {
      this.tableLoading = true;
      this.params.export = '';
      this.params.question_status = this.eventType;
      this.params.product_id = this.currentSystemIdx;
      try {
        let { data, paginator } = await getQuestionList(this.params);
        this.total = paginator.totalCount;
        this.tableData = data;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    async getQuestionListFilter() {
      this.tableLoading = true;
      try {
        let { data } = await getQuestionListFilter({ product_id: this.currentSystemIdx });
        this.filterData.company = data.company;
        this.filterData.resolveUser = data.resolveUser;
        this.filterData.range = data.range;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e;
      this.getQuestionList();
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e;
      this.getQuestionList();
    }
  },

  components: {
    SearchCondit,
    DialogChat
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