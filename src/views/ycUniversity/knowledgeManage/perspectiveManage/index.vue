<template>
  <div class="box-wrapper">
    <div class="box-title">
      <i class="iconfont icon-plus-square" @click="toDetail('0', {})"></i>
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
        <el-table-column label="系统类型">
          <template slot-scope="scope">
            <div>
              {{
                getMappingVal(
                  systemList,
                  'product_id',
                  scope.row.product_id,
                  'product_name'
                )
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="视角状态">
          <template slot-scope="scope">
            <div>
              {{
                getMappingVal(
                  forthStatus,
                  'status_code',
                  scope.row.forth_status,
                  'status_name'
                )
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="面向客户">
          <template slot-scope="scope">
            <div>
              {{
                getMappingVal(
                  openStatus,
                  'status_code',
                  scope.row.open_status,
                  'status_name'
                )
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="视角标题"
          prop="title"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="建立人"
          prop="username"
          min-width="150"
        ></el-table-column>
        <el-table-column label="时间" width="220">
          <template slot-scope="scope">
            <div>建立时间: {{ scope.row.created_at }}</div>
            <div>修改时间: {{ scope.row.updated_at }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80"
          header-align="center"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="special-btn">
              <i
                class="iconfont icon-xiugai-landi-"
                @click="toDetail('1', scope.row)"
              ></i>
              <i
                class="iconfont icon-minus-square"
                @click="deleteItem(scope.row)"
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <edit-perspective
      :dialogVisible="dialogVisible"
      @close="close"
      :forthStatus="forthStatus"
      :openStatus="openStatus"
      @saveOk="getEyesightList"
      :flg="flg"
      :detailItem="detailItem"
    ></edit-perspective>
  </div>
</template>

<script>
import EditPerspective from './EditPerspective'
import { getEyesightList, deleteEyesight } from '@/api/ycUniversity'
import { mapGetters } from 'vuex'
export default {
  props: {
    forthStatus: [Array], //是否面向客户
    openStatus: [Array] //是否停用
  },
  data() {
    return {
      dialogVisible: false,
      flg: '0',
      detailItem: {},
      tableLoading: false,
      params: {
        page: 1,
        pageSize: 10
      },
      tableData: [],
      total: null
    }
  },
  created() {
    this.getEyesightList()
  },
  computed: {
    ...mapGetters(['systemList'])
  },
  methods: {
    deleteItem(item) {
      this.$confirm(`确定删除标题为 ${item.title} 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteEyesights(item.eyesight_id)
        })
        .catch(() => {})
    },
    async deleteEyesights(id) {
      try {
        let { message } = await deleteEyesight({ eyesight_id: id })
        this._message(message, 'success')
        this.getEyesightList()
      } catch (error) {
        this._message(error)
      }
    },
    async getEyesightList() {
      this.tableLoading = true
      try {
        let { data, paginator } = await getEyesightList(this.params)
        this.tableData = data
        this.total = paginator.totalCount
      } catch (error) {
        this._message(error)
      }
      this.tableLoading = false
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e
      this.getEyesightList()
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e
      this.getEyesightList()
    },
    toDetail(flg, item) {
      this.flg = flg
      this.detailItem = item
      this.dialogVisible = true
    },
    close() {
      this.flg = ''
      this.detailItem = {}
      this.dialogVisible = false
    }
  },
  components: {
    EditPerspective
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.box-wrapper {
  height: calc(100vh - 205px);
  overflow-y: auto;
  @include scrollBar;
  .box-title {
    padding: 10px 10px;
    background: #f0f4f3;
    border-radius: 3px;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    margin-bottom: 20px;
    i {
      font-size: 14px;
      color: #00d208;
      float: right;
      cursor: pointer;
    }
  }
}
</style>
