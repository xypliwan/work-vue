<template>
  <div>
    <el-dialog title="转交责任人" :append-to-body="true" :visible.sync="personVisible" width="500px" :before-close="handleClose">
      <div>
        <el-select size="small" filterable v-model="dealUserIdOwn" placeholder="请选择">
          <el-option v-for="item in personList" :key="item.user_id" :label="item.username" :value="item.user_id"></el-option>
        </el-select>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submitTransfer">转交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getNeedDealUserList, needChangeDealUser } from '@/api/demandConversation';
export default {
  props: {
    personVisible: Boolean,
    productId: [String, Number],
    chatItemId: String,
    dealUserId: [String, Number] //当前责任人
  },
  data() {
    return {
      personList: [],
      dealUserIdOwn: ''
    };
  },
  watch: {
    productId(newVal) {
      this.getNeedDealUserList();
    },
    dealUserId(newVal) {
      this.dealUserIdOwn = this.dealUserId;
    }
  },
  methods: {
    async submitTransfer() {
      try {
        let { message } = await needChangeDealUser({ list_id: this.chatItemId, change_user_id: this.dealUserIdOwn });
        this._message(message, 'success');
        this.$emit('submitOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
    },
    async getNeedDealUserList() {
      try {
        let { data } = await getNeedDealUserList({ product_id: this.productId });
        this.personList = data;
        this.dealUserIdOwn = this.dealUserId;
      } catch (error) {
        this._message(error);
      }
    },
    handleClose() {
      this.$emit('update:personVisible', false);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  display: block;
}
</style>