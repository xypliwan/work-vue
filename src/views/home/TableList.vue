<template>
  <div class="table-box">
    <el-table
      :data="contlist"
      style="width: 100%"
      :row-style="this.$root.tableContentStyle"
      :header-cell-style="this.$root.tableTitileStyle"
      stripe
    >
      <el-table-column
        v-for="(item, i) in titleList"
        :key="i"
        :label="item.label"
        :width="item.width"
        fixed
      >
        <template slot-scope="scope">
          <div
            v-html="scope.row[item.prop]"
            :class="item.prop == 'title' ? 'user_name_process' : ''"
            @click="handleTitle(scope.row, item.prop)"
          ></div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        fixed="right"
        v-if="titleList.length > 0"
        align="center"
      >
        <template slot-scope="scope">
          <el-link type="primary" @click="processDetailFn(scope.row)"
            >查看进度</el-link
          >
        </template>
      </el-table-column>
    </el-table>

    <process-detail
      :homeTab="homeTab"
      :id="id"
      :visible.sync="processVisible"
    ></process-detail>

    <question-dialog-chat
      :chatDialogVisible.sync="questionDialogVisible"
      :chatItemId="questionChatItemId"
    ></question-dialog-chat>

    <support-dialog-chat
      :chatDialogVisible.sync="supportChatDialogVisible"
      :chatItemId="supportChatItemId"
    ></support-dialog-chat>

    <demand-dialog-chat
      :chatDialogVisible.sync="demandDialogVisible"
      :chatItemId="demandChatItemId"
    ></demand-dialog-chat>
  </div>
</template>
<script>
import ProcessDetail from './ProcessDetail'
import QuestionDialogChat from '_v/workbench/systemOrder/DialogChat'
import SupportDialogChat from '_v/workbench/technicalSupport/DialogChat'
import DemandDialogChat from '_v/workbench/demandManagement/DialogChat'
export default {
  props: {
    contlist: Array,
    titleList: Array,
    homeTab: String
  },
  data() {
    return {
      id: '',
      processVisible: false,
      questionChatItemId: '',
      questionDialogVisible: false,
      supportChatItemId: '',
      supportChatDialogVisible: false,
      demandChatItemId: '',
      demandDialogVisible: false
    }
  },
  methods: {
    handleTitle(item, title) {
      if (title !== 'title') return
      switch (this.homeTab) {
        case 'question':
          this.questionChatItemId = item.question_id
          this.questionDialogVisible = true
          break
        case 'need':
          this.demandChatItemId = item.list_id
          this.demandDialogVisible = true
          break
        case 'support':
          this.supportChatItemId = item.support_id
          this.supportChatDialogVisible = true
          break
        case 'default':
          this.questionChatItemId = item.question_id
          this.questionDialogVisible = true
          break
      }
    },
    processDetailFn(item) {
      this.id = item.id
      this.processVisible = true
    }
  },
  components: {
    ProcessDetail,
    QuestionDialogChat,
    SupportDialogChat,
    DemandDialogChat
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  ::v-deep .user_name_process {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
