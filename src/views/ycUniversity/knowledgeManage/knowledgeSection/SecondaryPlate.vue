<template>
  <div>
    <div class="box-title">
      二级板块
      <i
        class="iconfont icon-plus-square"
        @click="toDetail('0', {})"
        v-if="hasPermissionBtn('second-model-add')"
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
        <el-table-column label="状态" width="80">
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
        <el-table-column label="面向客户" width="120">
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
        <el-table-column
          label="一级板块标题"
          prop="first_title"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="二级板块标题"
          prop="second_title"
          min-width="150px"
        ></el-table-column>
        <el-table-column label="知识视角" min-width="200">
          <template slot-scope="scope">
            <div v-html="scope.row.eyesight.join('、<br/>')"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="建立人"
          prop="username"
          width="120"
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
                v-if="hasPermissionBtn('second-model-edit')"
              ></i>
              <i
                class="iconfont icon-minus-square"
                @click="deleteItem(scope.row)"
                v-if="hasPermissionBtn('second-model-del')"
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

    <edit-secondary-plate
      :forthStatus="forthStatus"
      :openStatus="openStatus"
      :palteList="palteList"
      :dialogSecondary="dialogSecondary"
      @close="close"
      :flg="flg"
      :currentIndex="currentIndex"
      :detailItem="detailItem"
      @saveOk="getSecondModelList"
    ></edit-secondary-plate>
  </div>
</template>

<script>
import EditSecondaryPlate from './EditSecondaryPlate'
import { getSecondModelList, delSecondModel } from '@/api/ycUniversity'
export default {
  props: {
    forthStatus: [Array], //是否面向客户
    openStatus: [Array], //是否停用
    palteList: [Array], //一级板块列表
    currentIndex: String
  },
  data() {
    return {
      dialogSecondary: false,
      flg: '',
      detailItem: {},
      params: {
        pid: '', //一级模块id,
        page: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: null
    }
  },
  created() {
    this.getSecondModelList()
  },
  watch: {
    currentIndex() {
      this.getSecondModelList()
    }
  },
  methods: {
    deleteItem(item) {
      this.$confirm(`确定删除二级板块名称为 ${item.second_title} 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delSecondModel(item.km_id)
        })
        .catch(() => {})
    },
    async delSecondModel(id) {
      try {
        let { message } = await delSecondModel({ km_id: id })
        this._message(message, 'success')
        this.getSecondModelList()
      } catch (error) {
        this._message(error)
      }
    },
    async getSecondModelList() {
      this.tableLoading = true
      this.params.pid = this.currentIndex
      try {
        let { data, paginator } = await getSecondModelList(this.params)
        this.tableData = data
        this.total = paginator.totalCount
      } catch (error) {
        this._message(error)
      }
      this.tableLoading = false
    },
    toDetail(flg, item) {
      this.flg = flg
      this.detailItem = item
      this.dialogSecondary = true
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e
      this.getSecondModelList()
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e
      this.getSecondModelList()
    },
    close() {
      this.flg = ''
      this.detailItem = {}
      this.dialogSecondary = false
    }
  },
  components: {
    EditSecondaryPlate
  }
}
</script>

<style lang="scss" scoped>
.box-title {
  padding: 10px 10px;
  background: #f0f4f3;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  margin-bottom: 20px;
  .iconfont {
    font-size: 14px;
    color: #00d208;
    float: right;
    cursor: pointer;
  }
}
</style>
