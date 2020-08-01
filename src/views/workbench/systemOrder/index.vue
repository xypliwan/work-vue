<template>
<<<<<<< HEAD
  <div class="system-table">
    <div class="filter-wrapper">
      <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
        <el-popover placement="bottom" width="160" v-model="exportVisible">
          <p>是否按当前筛选条件导出数据？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="exportVisible = false"
              >否</el-button
            >
            <el-button type="primary" size="mini" @click="exportExcel"
              >是</el-button
            >
          </div>
          <i class="iconfont icon-daochu" slot="reference" title="导出"></i>
        </el-popover>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="过滤" placement="bottom">
        <el-popover placement="bottom-end" width="800" trigger="click">
          <search-condit
            :filterData="filterData"
            @search="search"
            ref="searchRef"
          ></search-condit>
          <i class="iconfont icon-guolv" slot="reference"></i>
        </el-popover>
      </el-tooltip>
    </div>

    <div class="table-box">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        :row-style="this.$root.tableContentStyle"
        :header-cell-style="this.$root.tableTitileStyle"
        stripe
        @sort-change="handleSort"
      >
        <el-table-column
          label="工单号"
          prop="question_num"
          width="100"
          fixed
        ></el-table-column>
        <el-table-column label="优先级" width="80" fixed>
          <template slot-scope="scope">
            <div>{{ scope.row.range_level.level }}</div>
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="100" prop="title">
          <template slot-scope="scope">
<<<<<<< HEAD
            <div class="order-title" @click="handleRowClick(scope.row)">
              {{ scope.row.title }}
            </div>
=======
            <div class="order-title" @click="handleRowClick(scope.row)">{{scope.row.title}}</div>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </template>
        </el-table-column>

        <el-table-column label="类型" width="50">
          <template slot-scope="scope">
<<<<<<< HEAD
            <div>{{ scope.row.question_type }}</div>
=======
            <div>{{scope.row.question_type}}</div>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </template>
        </el-table-column>
        <el-table-column label="发起人">
          <template slot-scope="scope">
<<<<<<< HEAD
            <div>发起人: {{ scope.row.user_name }}</div>
            <div>责任人: {{ scope.row.resolve_question_user_name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          width="270"
          sortable="custom"
          :render-header="renderSelect"
        >
          <template slot-scope="scope">
            <div>工单发起时间: {{ scope.row.created_at }}</div>
            <div>首次响应时间: {{ scope.row.first_service_answer_time }}</div>
            <div>最后响应时间: {{ scope.row.last_service_answer_time }}</div>
=======
            <div>发起人: {{scope.row.user_name}}</div>
            <div>责任人: {{scope.row.resolve_question_user_name}}</div>
          </template>
        </el-table-column>

        <el-table-column label="时间" width="270">
          <template slot-scope="scope">
            <div>工单发起时间: {{scope.row.created_at}}</div>
            <div>首次响应时间: {{scope.row.first_service_answer_time}}</div>
            <div>最后响应时间: {{scope.row.last_service_answer_time}}</div>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </template>
        </el-table-column>
        <el-table-column label="问题影响">
          <template slot-scope="scope">
<<<<<<< HEAD
            <div>{{ scope.row.range_level.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="question_status"></el-table-column>
        <el-table-column
          label="采纳类型"
          prop="accept_type_tips"
        ></el-table-column>

=======
            <div>{{scope.row.range_level.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="question_status"></el-table-column>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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

<<<<<<< HEAD
    <dialog-chat
      :chatDialogVisible.sync="chatDialogVisible"
      :chatItemId="chatItemId"
    ></dialog-chat>
=======
    <dialog-chat :chatDialogVisible.sync="chatDialogVisible" :chatItemId="chatItemId"></dialog-chat>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
import SearchCondit from './SearchCondit'
import { mapGetters } from 'vuex'
import { getQuestionListFilter, getQuestionList } from '@/api/workbench'
import { formateExcl } from '_u/utils'
import DialogChat from './DialogChat'
import { getQuestionSupportCategory } from '@/api/common'
=======
import SearchCondit from './SearchCondit';
import { mapGetters } from 'vuex';
import { getQuestionListFilter, getQuestionList } from '@/api/workbench';
import { formateExcl } from '_u/utils';
import DialogChat from './DialogChat';

>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  props: {
    eventType: String
  },
  data() {
    return {
<<<<<<< HEAD
      exportVisible: false,
      filterData: {
        resolveUser: [], //责任人
        range: [], //影响范围
        firstCategoryList: [], //一级分类
        acceptType: [] //采纳类型
=======
      filterData: {
        resolveUser: [], //责任人
        range: [] //影响范围
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      },
      params: {
        // resolve_question_user_id: '', //责任人id
        product_id: '', //产品id/系统id
        question_status: '', // 1处理中 2 已完成   all全部
        page: 1,
        pageSize: 20,
<<<<<<< HEAD
        export: '', //	1 表示导出操作
        order_column: 'last_service_answer_time', //排序字段 last_service_answer_time 为最后响应时间   created_at 发起时间
        order: '' //asc 正序  desc 倒序
=======
        export: '' //	1 表示导出操作
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      },
      tableLoading: false,
      tableData: [],
      total: null,
      pageSizeArr: [20, 50, 80, 100],
      chatDialogVisible: false,
<<<<<<< HEAD
      chatItemId: '',
      orderColumn: [
        { title: '最后响应时间', type: 'last_service_answer_time' },
        { title: '发起时间', type: 'created_at' }
      ]
    }
  },
  created() {
    if (this.currentSystemIdx !== '') {
      this.getQuestionListFilter()
      this.getQuestionSupportCategory()
      this.getQuestionList()
    }
  },

=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  computed: {
    ...mapGetters(['currentSystemIdx'])
  },
  watch: {
<<<<<<< HEAD
    eventType() {
      this.params.page = 1
      this.getQuestionList()
    },
    async currentSystemIdx() {
      this.params.page = 1
      this.getQuestionSupportCategory()
      await this.getQuestionListFilter()
      this.getQuestionList()
    },
    chatDialogVisible(newVal) {
      if (!newVal) {
        this.chatItemId = ''
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },
  methods: {
<<<<<<< HEAD
    renderSelect() {
      return (
        <el-select
          v-model={this.params.order_column}
          placeholder="默认时间"
          size="mini"
          on-change={this.getQuestionList}
        >
          {this.orderColumn.map(item => {
            return <el-option label={item.title} value={item.type}></el-option>
          })}
        </el-select>
      )
    },
    handleSort(column) {
      if (column.order == null) {
        this.params.order = ''
      } else if (column.order == 'descending') {
        //降序
        this.params.order = 'desc'
      } else if (column.order == 'ascending') {
        //升序
        this.params.order = 'asc'
      }
      this.getQuestionList()
    },
    //获取工单一级分类
    async getQuestionSupportCategory() {
      try {
        let { data } = await getQuestionSupportCategory({
          pid: 0,
          product_id: this.currentSystemIdx
        })
        this.filterData.firstCategoryList = data
      } catch (error) {
        this._message(error)
      }
    },
    exportExcel() {
      this.params.export = '1'
      formateExcl('/question/list', 'get', this.params, '系统工单')
    },
    handleRowClick(row) {
      this.chatItemId = row.question_id
      this.chatDialogVisible = true
      // this.$router.push(
      //   `/conversation?id=${row.question_id}&num=${row.question_num}&supportId=${row.support_id}`
      // )
    },

    search(params) {
      Object.assign(this.params, params)
      this.getQuestionList()
    },
    async getQuestionList() {
      this.tableLoading = true
      this.params.export = ''
      this.params.question_status = this.eventType
      this.params.product_id = this.currentSystemIdx
      try {
        let { data, paginator } = await getQuestionList(this.params)
        this.total = paginator.totalCount
        this.tableData = data
      } catch (error) {
        this._message(error)
      }
      this.tableLoading = false
    },
    async getQuestionListFilter() {
      this.tableLoading = true
      try {
        let { data } = await getQuestionListFilter({
          product_id: this.currentSystemIdx
        })
        this.filterData.company = data.company
        this.filterData.desc = data.desc
        this.filterData.resolveUser = data.resolveUser
        this.filterData.range = data.range
        this.filterData.acceptType = data.acceptType
      } catch (error) {
        this._message(error)
      }
      this.tableLoading = false
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e
      this.getQuestionList()
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e
      this.getQuestionList()
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },

  components: {
    SearchCondit,
    DialogChat
  }
<<<<<<< HEAD
}
</script>

<style lang="scss" scoped>
.system-table {
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
  /deep/ .el-select {
    display: inline-block !important;
    width: 155px;
    padding: 0;
    .el-input {
      padding: 0;
    }
  }
  /deep/ .el-table th > .cell {
    display: flex;
    align-items: center;
  }
}
</style>
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
