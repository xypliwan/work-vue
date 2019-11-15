<template>
  <div class="message-table">
    <el-button type="primary" size="mini" v-show="isRead == '0' && tableData.length > 0" @click="setReadsFromId">全部标记为已读</el-button>
    <div class="table-wrapper" v-loading="tableLoading">
      <div class="table-item" v-for="(item,i) in tableData" :key="i" @click="toDetail(item)">
        <div class="icon-box fl">
          <i class="iconfont" :class="isRead == '0' ? 'icon--yiduweidu' : 'icon-yidu'"></i>
        </div>
        <div class="info">
          <h5 class="top">{{item.label}}</h5>
          <!-- 【{{item.redirect_id}}】 -->
          <p class="center">{{item.title}}</p>
          <p class="bottom" v-html="item.content"></p>
        </div>
        <div class="times fr">{{item.created_at}}</div>
      </div>
      <div class="no-data" v-show="tableData.length <= 0">暂无数据</div>
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
import { getMessageList, setRead } from '@/api/messageCenter';
import { mapGetters } from 'vuex';
export default {
  props: {
    isRead: String
  },
  data() {
    return {
      params: {
        is_read: '0', //0未读 1已读
        page: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: null,
      pageSizeArr: [10, 20, 50, 100]
    };
  },
  mounted() {
    this.getMessageList();
  },
  watch: {
    isRead(newVal) {
      this.params.page = 1;
      this.getMessageList();
    }
  },
  computed: {
    ...mapGetters(['isTec'])
  },
  methods: {
    toDetail(item) {
      if (this.isRead == '0') {
        this.setRead(item.id);
      }
      if (item.message_type == '1') {
        //为工单
        //跳往会话窗口
        this.$router.push(`/conversation?message_type=1`);
      } else if (item.message_type == '2') {
        //为技术支持
        //跳往支持会话窗口
        this.$router.push(`/technical-conversation?message_type=1`);
      }
    },
    setReadsFromId() {
      let ids = this.tableData.map(el => el.id);
      this.setRead(ids);
    },
    async setRead(id) {
      this.tableLoading = true;
      try {
        let { message } = await setRead({ ids: id });
        // this._message(message, 'success');
        this.getMessageList();
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    async getMessageList() {
      this.params.is_read = this.isRead;
      this.tableLoading = true;
      try {
        let { data, paginator } = await getMessageList(this.params);
        this.tableData = data;
        this.total = paginator.totalCount;
      } catch (error) {
        this._message(error);
      }
      this.tableLoading = false;
    },
    handleSizeChange(e) {
      //设置显示一页展示多少条数
      this.params.pageSize = e;
      this.getMessageList();
    },
    handleCurrentChange(e) {
      //点击第几页
      this.params.page = e;
      this.getMessageList();
    }
  }
};
</script>

<style lang="scss" scoped>
.message-table {
  padding-bottom: 53px;
  .table-wrapper {
    margin-top: 15px;
    .no-data {
      text-align: center;
      font-size: 13px;
      color: #888;
      margin-top: 20px;
    }
    .table-item {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #f1f1f1;
      align-items: center;
      cursor: pointer;
      .icon-box {
        padding: 0px 20px;
        .icon--yiduweidu {
          color: #409eff;
        }
        .icon-yidu {
          color: #888;
        }
      }
      .info {
        flex: 1;
        .top {
          font-size: 15px;
          color: #409eff;
        }
        .center {
          font-size: 14px;
          color: #333;
          margin: 10px 0;
        }
        .bottom {
          font-size: 14px;
          color: #555;
        }
      }
      .times {
        padding: 0px 20px;
        color: #999;
        font-size: 13px;
      }
    }
  }
}
</style>