<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      title="历史日志"
      :append-to-body="true"
      :visible.sync="logVisible"
      width="1000px"
      :before-close="handleClose"
      v-dialogDrag
    >
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
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="变更时间"
            prop="created_at"
            width="170"
          ></el-table-column>
          <el-table-column
            label="变更人"
            prop="user_name"
            width="100"
          ></el-table-column>
          <el-table-column
            label="变更字段"
            prop="field"
            width="120"
          ></el-table-column>
          <el-table-column label="变更前" prop="before"></el-table-column>
          <el-table-column label="变更后" prop="after"></el-table-column>
          <el-table-column label="说明" prop="mark"></el-table-column>
=======
    <el-dialog title="历史日志" :append-to-body="true" :visible.sync="logVisible" width="1000px" :before-close="handleClose">
      <div class="table-box">
        <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" :row-style="this.$root.tableContentStyle" :header-cell-style="this.$root.tableTitileStyle" stripe>
          <el-table-column header-align="center" align="center" label="NO" width="50" fixed>
            <template slot-scope="scope">
              <div>{{scope.$index + 1}}</div>
            </template>
          </el-table-column>
          <el-table-column label="变更时间" prop="created_at" width="170"></el-table-column>
          <el-table-column label="变更人" prop="user_name" width="100"></el-table-column>
          <el-table-column label="变更字段" prop="field" width="120"></el-table-column>
          <el-table-column label="变更前" prop="before"></el-table-column>
          <el-table-column label="变更后" prop="after"></el-table-column>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        </el-table>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
<<<<<<< HEAD
import { needCheckLog } from '@/api/demandConversation'
=======
import { needCheckLog } from '@/api/demandConversation';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    logVisible: Boolean,
    chatItemId: String
  },
  data() {
    return {
      tableLoading: false,
      tableData: []
<<<<<<< HEAD
    }
  },
  watch: {
    chatItemId() {
      this.needCheckLog()
    },
    logVisible(newVal) {
      if (newVal) {
        this.needCheckLog()
=======
    };
  },
  watch: {
    chatItemId(newVal) {
      this.needCheckLog();
    },
    logVisible(newVal) {
      if (newVal) {
        this.needCheckLog();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },
  methods: {
    async needCheckLog() {
<<<<<<< HEAD
      this.tableLoading = true
      try {
        let { data } = await needCheckLog({ list_id: this.chatItemId })
        this.tableData = data
      } catch (error) {
        this._message(error)
      }
      this.tableLoading = false
    },
    handleClose() {
      this.$emit('update:logVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
=======
      this.tableLoading = true;
      try {
        let { data } = await needCheckLog({ list_id: this.chatItemId });
        this.tableData = data;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    handleClose() {
      this.$emit('update:logVisible', false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
