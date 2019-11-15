<template>
  <div class="support-chat-box" :style="{'height':height}">
    <div class="support-chat-title">
      <div class="left">
        <span class="support-txt">{{supportDetail.support_id}}</span>
        {{supportDetail.resolve_user_name}}
        <el-tag size="mini" effect="dark" :type="getMappingVal(supportRes,'index',supportDetail.deal_status,'type')">{{getMappingVal(supportRes,'index',supportDetail.deal_status,'title')}}</el-tag>&nbsp;
        <el-link type="primary" @click="dialogDetail = true">
          详情
          <i class="el-icon-caret-bottom"></i>
        </el-link>
      </div>
      <div class="right">
        <el-tooltip content="催办" placement="bottom">
          <i class="iconfont icon-chuizi" v-if="chatService == '1' && supportDetail.deal_status !== '2'" @click="urgent"></i>
        </el-tooltip>
        <el-tooltip content="未解决" placement="bottom">
          <i class="iconfont icon-zhuanfa1" v-if="supportDetail.deal_status == '2'" @click="reprocessVisible = true"></i>
        </el-tooltip>
      </div>
    </div>
    <chat-box ref="chatBox" :chatItemId="supportId" :hasMore="hasMore" :isLoadings="isLoadings" :direction="direction" :dataList="dataList" @loadingData="loadingData" @canCancel="canCancelInfo"></chat-box>
    <reprocessing :reprocessVisible.sync="reprocessVisible" @unsolved="unsolved" :supportId="supportId"></reprocessing>

    <support-detail :dialogDetail.sync="dialogDetail" :detail="supportDetail"></support-detail>
  </div>
</template>

<script>
import { getSupportAnswer, cancelSend, getSupportDetail, getSupportNotify, setAnswerRead } from '@/api/conversation';
import Scroll from '_c/common/Scroll';
import Reprocessing from './Reprocessing';
import { mapGetters } from 'vuex';
import ChatBox from '_c/common/ChatBox';
import SupportDetail from '_c/supportOrderChat/dialog/Detail';
export default {
  props: {
    supportId: String,
    height: String
  },
  data() {
    return {
      params: {
        support_id: '',
        page: 1,
        pageSize: 10
      },
      hasMore: false,
      isLoadings: false,
      direction: false,
      dataList: [],
      isFirstEnter: false,
      supportDetail: {
        support_id: '',
        title: '',
        support_type: '',
        deal_status: '', //0未处理 1处理中 2已解决 3未解决
        resolve_user_name: '' //解决技术支持的人名
      },
      supportRes: [
        { title: '未处理', index: '0', type: 'info' },
        { title: '处理中', index: '1', type: '' },
        { title: '已解决', index: '2', type: 'success' },
        { title: '未解决', index: '3', type: 'danger' }
      ],
      reprocessVisible: false,
      dialogDetail: false
    };
  },
  created() {
    this.getSupportDetail();
    this.getSupportAnswer();
  },

  async mounted() {
    // let titleHeight = this.$refs.scrolls.$refs.wrapper.clientHeight;
    // this.$refs.scrolls.$refs.wrapper.style.height = titleHeight - 40 + 'px';
    // this.getSupportDetail();
    // await this.getSupportAnswer();
    // this.$nextTick(() => {
    // this.$refs.chatBox.setScrollTops();
    // });
  },
  computed: {
    ...mapGetters(['support', 'cancelAnswer', 'dealStatusInfo', 'answerReadSupport', 'chatService'])
  },
  watch: {
    answerReadSupport(newVal) {
      if (newVal.support_id == this.supportId) {
        this.dataList.forEach(el => {
          if (el.answer_id == newVal.answer_id) {
            el.is_read = 1;
          }
        });
      }
    },
    supportId(newVal) {
      if (newVal !== '') {
        this.params.page = 1;
        this.dataList = [];
        this.getSupportDetail();
        this.getSupportAnswer();
      }
    },
    dealStatusInfo(newVal) {
      if (newVal.support_id == this.supportId) {
        this.supportDetail.deal_status = newVal.deal_status;
      }
    },
    support(newVal) {
      //添加对方输入的消息
      if (newVal.support_id == this.supportId) {
        this.pushCont(newVal);
        this.setAnswerRead(newVal.answer_id);
      }
    },
    cancelAnswer(newVal) {
      //删除对方测回的消息
      if (newVal.answer_type == 'support' && newVal.support_id == this.supportId) {
        this.dataList.forEach((el, i) => {
          if (el.answer_id == newVal.answer_id) {
            this.dataList.splice(i, 1);
          }
        });
      }
    }
  },
  methods: {
    async setAnswerRead(id) {
      try {
        let { data } = await setAnswerRead({ answer_id: id });
      } catch (error) {
        this._message(error);
      }
    },
    unsolved(obj) {
      //未解决重开技术支持
      this.supportDetail.deal_status = obj.deal_status;
      this.pushCont(obj.answer);
    },
    pushCont(item) {
      //发送信息
      item.msgLoading = false;
      this.dataList.push(item);
      this.$nextTick(() => {
        this.$refs.chatBox.setScrollTops();
      });
    },
    canCancelInfo(obj) {
      //测回消息
      this.cancelSend(obj.id, obj.index);
    },
    urgent() {
      //催办
      this.$confirm('确定需要催办吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.getSupportNotify();
        })
        .catch(() => {});
    },
    //客服催办技术支持
    async getSupportNotify() {
      try {
        let { message, data } = await getSupportNotify({ support_id: this.supportId });
        this._message(message, 'success');
        this.$emit('supportUrgent', data.answer);
      } catch (error) {
        this_message(error);
      }
    },
    async getSupportDetail() {
      try {
        let { data } = await getSupportDetail({ support_id: this.supportId });
        Object.assign(this.supportDetail, data);
      } catch (error) {
        this._message(error);
      }
    },
    async cancelSend(answerId, i) {
      this.$set(this.dataList[i], 'msgLoading', true);
      try {
        let { data } = await cancelSend({ answer_id: answerId, answer_type: 'support' });
        this.dataList.splice(i, 1);
      } catch (error) {
        this.$set(this.dataList[i], 'msgLoading', false);
        this._message(error);
      }
    },
    loadingData(oldHeight) {
      this.params.page++;
      this.getSupportAnswer(oldHeight);
    },
    async getSupportAnswer(oldHeight = null) {
      this.isLoadings = true;
      this.params.support_id = this.supportId;
      try {
        let { data } = await getSupportAnswer(this.params);
        let snapData = data.reverse();
        this.hasMore = data.length < this.params.pageSize;
        this.dataList = [...snapData, ...this.dataList];

        this.dataList.forEach(el => {
          el.msgLoading = false;
        });

        if (this.$refs['chatBox'] !== undefined) {
          this.$refs.chatBox.resetScrollHeight(oldHeight);
        }
      } catch (error) {
        this._message(error);
      }
      this.isLoadings = false;
    }
  },
  components: {
    Scroll,
    Reprocessing,
    ChatBox,
    SupportDetail
  }
};
</script>

<style lang="scss" scoped>
.support-chat-box {
  width: 400px;
  .support-chat-title {
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    height: 40px;
    line-height: 40px;
    .left {
      flex: 1;
      font-size: 15px;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .support-txt {
        color: #409eff;
        font-size: 14px;
      }
    }
    .right {
      width: 80px;
      text-align: right;
      i {
        margin-left: 15px;
        cursor: pointer;
        color: #777;
        font-size: 20px;
      }
    }
  }
}
</style>