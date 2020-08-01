<template>
  <div>
    <div class="box-title">
      回复模板列表
<<<<<<< HEAD
      <i
        class="iconfont icon-plus-square add-icon"
        @click="eidtDetail('0', {})"
        v-if="addPermission"
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
        <el-table-column
          label="板块"
          min-width="100"
          fixed
          prop="category_name"
        ></el-table-column>
        <el-table-column
          label="模板标题"
          min-width="200"
          prop="template_name"
        ></el-table-column>
        <el-table-column
          label="模板内容"
          min-width="300"
          prop="content"
        ></el-table-column>
        <el-table-column
          label="建立人"
          width="100"
          prop="username"
        ></el-table-column>
        <el-table-column label="时间" width="250">
          <template slot-scope="scope">
            <div>修改时间: {{ scope.row.updated_at }}</div>
            <div>建立时间: {{ scope.row.created_at }}</div>
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
                @click="eidtDetail('1', scope.row)"
                v-if="updatePermission"
              ></i>
              <i
                class="iconfont icon-minus-square"
                @click="confimDelItem(scope.row)"
                v-if="delPermission"
              ></i>
=======
      <i class="iconfont icon-plus-square add-icon" @click="eidtDetail('0',{})" v-if="addPermission"></i>
    </div>

    <div class="table-box">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" :row-style="this.$root.tableContentStyle" :header-cell-style="this.$root.tableTitileStyle" stripe>
        <el-table-column header-align="center" align="center" label="NO" width="50" fixed>
          <template slot-scope="scope">
            <div>{{(scope.$index + 1) + (params.page-1)*params.pageSize}}</div>
          </template>
        </el-table-column>
        <el-table-column label="板块" min-width="100" fixed prop="category_name"></el-table-column>
        <el-table-column label="模板标题" min-width="200" prop="template_name"></el-table-column>
        <el-table-column label="模板内容" min-width="300" prop="content"></el-table-column>
        <el-table-column label="建立人" width="100" prop="username"></el-table-column>
        <el-table-column label="时间" width="250">
          <template slot-scope="scope">
            <div>修改时间: {{scope.row.updated_at}}</div>
            <div>建立时间: {{scope.row.created_at}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" header-align="center" align="center" fixed="right">
          <template slot-scope="scope">
            <div class="special-btn">
              <i class="iconfont icon-xiugai-landi-" @click="eidtDetail('1',scope.row)" v-if="updatePermission"></i>
              <i class="iconfont icon-minus-square" @click="confimDelItem(scope.row)" v-if="delPermission"></i>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
        :page-sizes="[10, 20, 30, 40]"
=======
        :page-sizes="[10,20,30,40]"
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

<<<<<<< HEAD
    <edit-cont
      :plateList="plateList"
      @close="closeVisib"
      :editVisible="editVisible"
      :flg="flg"
      @saveOk="getTemplateContList"
      :detailItem="detailItem"
      :categoryId="categoryId"
    ></edit-cont>
=======
    <edit-cont :plateList="plateList" @close="closeVisib" :editVisible="editVisible" :flg="flg" @saveOk="getTemplateContList" :detailItem="detailItem" :categoryId="categoryId"></edit-cont>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
import EditCont from './EditCont'
import { getTemplateContList, delTemplateCont } from '@/api/replyTemplate'
=======
import EditCont from './EditCont';
import { getTemplateContList, delTemplateCont } from '@/api/replyTemplate';
import { constants } from 'crypto';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    plateList: [Array],
    activeName: String,
    categoryId: String
  },
  data() {
    return {
      editVisible: false,
      flg: '',
      params: {
        is_public_category: '0', //0个人   1公共
        category_id: '', //分类id
        page: 1,
        pageSize: 10
      },
      total: null,
      tableLoading: false,
      tableData: [],
      detailItem: {},
      addPermission: true,
      updatePermission: true,
      delPermission: true
<<<<<<< HEAD
    }
  },
  watch: {
    activeName(newVal) {
      this.params.is_public_category = newVal
      this.params.page = 1
      this.getTemplateContList()
      if (newVal == '1') {
        this.addPermission = this.hasPermissionBtn('reply-template-add')
        this.updatePermission = this.hasPermissionBtn('reply-template-update')
        this.delPermission = this.hasPermissionBtn('reply-template-del')
      } else {
        this.addPermission = true
        this.updatePermission = true
        this.delPermission = true
      }
    },
    categoryId(newVal) {
      this.params.page = 1
      this.params.category_id = newVal
      this.getTemplateContList()
    }
  },
  mounted() {
    this.getTemplateContList()
=======
    };
  },
  watch: {
    activeName(newVal) {
      this.params.is_public_category = newVal;
      this.params.page = 1;
      this.getTemplateContList();
      if (newVal == '1') {
        this.addPermission = this.hasPermissionBtn('reply-template-add');
        this.updatePermission = this.hasPermissionBtn('reply-template-update');
        this.delPermission = this.hasPermissionBtn('reply-template-del');
      } else {
        this.addPermission = true;
        this.updatePermission = true;
        this.delPermission = true;
      }
    },
    categoryId(newVal) {
      this.params.page = 1;
      this.params.category_id = newVal;
      this.getTemplateContList();
    }
  },
  mounted() {
    this.getTemplateContList();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  methods: {
    confimDelItem(item) {
      this.$confirm(`确定删除模板标题为 ${item.template_name} 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
<<<<<<< HEAD
          this.deleteItem(item.template_id)
        })
        .catch(() => {})
    },
    async deleteItem(id) {
      try {
        let { message } = await delTemplateCont({ template_id: id })
        this._message(message, 'success')
        this.getTemplateContList()
      } catch (error) {
        this._message(error)
      }
    },
    async getTemplateContList() {
      this.tableLoading = true
      try {
        let { data, paginator } = await getTemplateContList(this.params)
        this.tableData = data
        this.total = paginator.totalCount
      } catch (error) {
        this._message(error)
      }
      this.tableLoading = false
    },
    eidtDetail(flg, item) {
      this.flg = flg
      this.detailItem = item
      this.editVisible = true
    },
    closeVisib() {
      this.flg = ''
      this.detailItem = {}
      this.editVisible = false
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e
      this.getTemplateContList()
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e
      this.getTemplateContList()
=======
          this.deleteItem(item.template_id);
        })
        .catch(() => {});
    },
    async deleteItem(id) {
      try {
        let { message } = await delTemplateCont({ template_id: id });
        this._message(message, 'success');
        this.getTemplateContList();
      } catch (error) {
        this._message(error);
      }
    },
    async getTemplateContList() {
      this.tableLoading = true;
      try {
        let { data, paginator } = await getTemplateContList(this.params);
        this.tableData = data;
        this.total = paginator.totalCount;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    eidtDetail(flg, item) {
      this.flg = flg;
      this.detailItem = item;
      this.editVisible = true;
    },
    closeVisib() {
      this.flg = '';
      this.detailItem = {};
      this.editVisible = false;
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e;
      this.getTemplateContList();
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e;
      this.getTemplateContList();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    EditCont
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>
<style lang="scss" scoped>
.oprent-btn {
  font-size: 14px;
  i {
    font-size: 14px;
    cursor: pointer;
  }
  .icon-xiugai-landi- {
    color: #409eff;
    margin-right: 8px;
  }
  .icon-minus-square {
    color: #e80303;
  }
}
</style>
<<<<<<< HEAD
=======


>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
