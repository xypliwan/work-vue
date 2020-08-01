<template>
  <div>
    <div class="box-title">
      产品模块
      <i
        class="iconfont icon-plus-square add-icon"
        @click="toDetail('0', '')"
        v-if="hasPermissionBtn('knowledge-center-add')"
      ></i>
    </div>
    <div class="table-box">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        :row-style="this.$root.tableContentStyle"
        :header-cell-style="this.$root.tableTitileStyle"
        stripe
      >
        <el-table-column
          header-align="center"
          align="center"
          label="NO"
          width="50"
          fixed
        >
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 + (params.page - 1) * params.pageSize }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="知识标题">
          <template slot-scope="scope">
            <div class="knowledge-title" @click="lookDetail(scope.row)">
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="点击数"
          width="100"
          prop="click_num"
        ></el-table-column>
        <el-table-column
          label="最后更新时间"
          prop="updated_at"
          width="200"
        ></el-table-column>
        <el-table-column
          label="最后修改人"
          prop="last_update_user"
          width="100"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="120"
          header-align="center"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="special-btn">
              <i
                class="iconfont icon-fuzhi1 copy-class"
                @click="
                  copyAddress(
                    '链接复制成功',
                    `${locations}/#/detail/${scope.row.knowledge_id}`
                  )
                "
              ></i>
              <!-- <i class="iconfont icon-xiangqing" @click="lookDetail(scope.row)"></i> -->
              <i
                class="iconfont icon-xiugai-landi-"
                @click="toDetail('1', scope.row.knowledge_id)"
                v-if="hasPermissionBtn('knowledge-center-del')"
              ></i>
              <i
                class="iconfont icon-minus-square"
                @click="confimDelItem(scope.row)"
                v-if="hasPermissionBtn('knowledge-center-edit')"
              ></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[15, 30, 50, 100]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <edit-knowledge
      @close="close"
      :dialogKnowledge="dialogKnowledge"
      :onePlateAll="onePlateAll"
      :pid="pid"
      :secondId="secondId"
      :flg="flg"
      @saveOk="getKnowledgeList"
      :id="knowledgeId"
    ></edit-knowledge>
  </div>
</template>

<script>
import EditKnowledge from './EditKnowledge'
import { getKnowledgeList, delKnowledge } from '@/api/ycUniversity'
export default {
  props: {
    onePlateAll: [Array],
    pid: String,
    secondId: String
  },
  data() {
    return {
      dialogKnowledge: false,
      flg: '',
      params: {
        page: 1,
        pageSize: 15,
        first_km_id: this.pid, //一级模块id
        second_km_id: this.secondId, //二及模块id
        order_by: '' //desc 倒序  asc 正序
      },
      tableData: [],
      tableLoading: false,
      total: null,
      knowledgeId: '',
      locations: window.location.origin
    }
  },
  watch: {
    pid(newVal) {
      this.params.first_km_id = newVal

      if (this.params.first_km_id !== '') {
        this.params.page = 1
        this.getKnowledgeList()
      }
    },
    secondId(newVal) {
      this.params.second_km_id = newVal
      this.params.page = 1
      this.getKnowledgeList()
    }
  },
  methods: {
    lookDetail(item) {
      let url = window.location.origin + '/#/detail/' + item.knowledge_id
      window.open(url, '_blank')
    },
    confimDelItem(item) {
      this.$confirm(`确定删除知识标题为为 ${item.title} 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteItem(item.knowledge_id)
        })
        .catch(() => {})
    },
    async deleteItem(id) {
      try {
        let { message } = await delKnowledge({ knowledge_id: id })
        this._message(message, 'success')
        this.getKnowledgeList()
      } catch (error) {
        this._message(error)
      }
    },
    async getKnowledgeList() {
      this.tableLoading = true
      try {
        let { data, paginator } = await getKnowledgeList(this.params)
        this.tableData = data
        this.total = paginator.totalCount
      } catch (error) {
        this._message(error)
      }
      this.tableLoading = false
    },
    toDetail(flg, id) {
      this.flg = flg
      this.knowledgeId = id
      this.dialogKnowledge = true
    },
    close() {
      this.dialogKnowledge = false
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e
      this.getKnowledgeList()
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e
      this.getKnowledgeList()
    }
  },
  components: {
    EditKnowledge
  }
}
</script>

<style lang="scss" scoped>
.icon-xiangqing {
  margin-right: 8px;
  font-size: 16px;
  color: #666;
}
.knowledge-title {
  cursor: pointer;
}
</style>
