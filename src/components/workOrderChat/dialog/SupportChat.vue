<template>
<<<<<<< HEAD
  <div class="support-chat-box" :style="{ height: height }">
    <div class="support-chat-title">
      <div class="left">
        <span
          class="support-txt copy-class"
          @click="copyAddress('复制成功', supportDetail.support_id)"
          >{{ supportDetail.support_id }}</span
        >
        {{ supportDetail.resolve_user_name }}
        <el-tag
          size="mini"
          effect="dark"
          :type="
            getMappingVal(
              supportRes,
              'index',
              supportDetail.deal_status,
              'type'
            )
          "
          >{{
            getMappingVal(
              supportRes,
              'index',
              supportDetail.deal_status,
              'title'
            )
          }}</el-tag
        >&nbsp;
=======
  <div class="support-chat-box" :style="{'height':height}">
    <div class="support-chat-title">
      <div class="left">
        <span class="support-txt">{{supportDetail.support_id}}</span>
        {{supportDetail.resolve_user_name}}
        <el-tag size="mini" effect="dark" :type="getMappingVal(supportRes,'index',supportDetail.deal_status,'type')">{{getMappingVal(supportRes,'index',supportDetail.deal_status,'title')}}</el-tag>&nbsp;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        <el-link type="primary" @click="dialogDetail = true">
          详情
          <i class="el-icon-caret-bottom"></i>
        </el-link>
      </div>
      <div class="right">
        <el-tooltip content="催办" placement="bottom">
<<<<<<< HEAD
          <i
            class="iconfont icon-chuizi"
            v-if="chatService == '1' && supportDetail.deal_status !== '2'"
            @click="urgent"
          ></i>
        </el-tooltip>
        <el-tooltip content="未解决" placement="bottom">
          <i
            class="iconfont icon-zhuanfa1"
            v-if="supportDetail.deal_status == '2'"
            @click="reprocessVisible = true"
          ></i>
        </el-tooltip>
        <el-tooltip content="技术评价" placement="bottom">
          <i
            class="iconfont icon-xingxing"
            v-if="
              supportDetail.deal_status == '2' &&
                supportDetail.tec_evaluate == 0
            "
            @click="supportInvitationVisible = true"
          ></i>
        </el-tooltip>
      </div>
    </div>
    <chat-box
      ref="chatBox"
      :chatItemId="supportId"
      :hasMore="hasMore"
      :isLoadings="isLoadings"
      :direction="false"
      :dataList="dataList"
      @loadingData="loadingData"
      @canCancel="canCancelInfo"
    ></chat-box>
    <reprocessing
      :reprocessVisible.sync="reprocessVisible"
      @unsolved="unsolved"
      :supportId="supportId"
    ></reprocessing>

    <support-detail
      :dialogDetail.sync="dialogDetail"
      :detail="supportDetail"
    ></support-detail>

    <support-evaluation
      v-if="supportDetail.deal_status == '2'"
      :questionId="supportDetail.question_id"
      :supportId="supportId"
      :invitationVisible.sync="supportInvitationVisible"
    ></support-evaluation>
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
import {
  getSupportAnswer,
  cancelSend,
  getSupportDetail,
  getSupportNotify,
  setAnswerRead
} from '@/api/conversation'
import Reprocessing from './Reprocessing'
import { mapGetters } from 'vuex'
import ChatBox from '_c/common/ChatBox'
import SupportDetail from '_c/supportOrderChat/dialog/Detail'
//发起技术邀评
import SupportEvaluation from './SupportEvaluation'

=======
import { getSupportAnswer, cancelSend, getSupportDetail, getSupportNotify, setAnswerRead } from '@/api/conversation';
import Scroll from '_c/common/Scroll';
import Reprocessing from './Reprocessing';
import { mapGetters } from 'vuex';
import ChatBox from '_c/common/ChatBox';
import SupportDetail from '_c/supportOrderChat/dialog/Detail';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
      dataList: [],
      isFirstEnter: false,
      supportDetail: {
        question_id: '',
=======
      direction: false,
      dataList: [],
      isFirstEnter: false,
      supportDetail: {
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
      dialogDetail: false,
      times: 0,
      supportInvitationVisible: false
    }
  },
=======
      dialogDetail: false
    };
  },
  created() {
    this.getSupportDetail();
    this.getSupportAnswer();
  },

>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
    ...mapGetters([
      'support',
      'cancelAnswer',
      'dealStatusInfo',
      'answerReadSupport',
      'chatService'
    ])
=======
    ...mapGetters(['support', 'cancelAnswer', 'dealStatusInfo', 'answerReadSupport', 'chatService'])
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  watch: {
    answerReadSupport(newVal) {
      if (newVal.support_id == this.supportId) {
        this.dataList.forEach(el => {
          if (el.answer_id == newVal.answer_id) {
<<<<<<< HEAD
            el.is_read = 1
          }
        })
      }
    },
    supportId: {
      immediate: true,
      handler: function(newVal) {
        if (newVal !== '') {
          this.dataList = []
          this.params.page = 1
          this.getSupportDetail()
          this.getSupportAnswer()
        }
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    dealStatusInfo(newVal) {
      if (newVal.support_id == this.supportId) {
<<<<<<< HEAD
        this.supportDetail.deal_status = newVal.deal_status
=======
        this.supportDetail.deal_status = newVal.deal_status;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    support(newVal) {
      //添加对方输入的消息
      if (newVal.support_id == this.supportId) {
<<<<<<< HEAD
        this.pushCont(newVal)
        this.setAnswerRead(newVal.answer_id)
=======
        this.pushCont(newVal);
        this.setAnswerRead(newVal.answer_id);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    cancelAnswer(newVal) {
      //删除对方测回的消息
<<<<<<< HEAD
      if (
        newVal.answer_type == 'support' &&
        newVal.support_id == this.supportId
      ) {
        this.dataList.forEach((el, i) => {
          if (el.answer_id == newVal.answer_id) {
            this.dataList.splice(i, 1)
          }
        })
=======
      if (newVal.answer_type == 'support' && newVal.support_id == this.supportId) {
        this.dataList.forEach((el, i) => {
          if (el.answer_id == newVal.answer_id) {
            this.dataList.splice(i, 1);
          }
        });
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },
  methods: {
<<<<<<< HEAD
    clearDataList() {
      this.dataList = []
    },
    async setAnswerRead(id) {
      try {
        await setAnswerRead({ answer_id: id })
      } catch (error) {
        this._message(error)
=======
    async setAnswerRead(id) {
      try {
        let { data } = await setAnswerRead({ answer_id: id });
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    unsolved(obj) {
      //未解决重开技术支持
<<<<<<< HEAD
      this.supportDetail.deal_status = obj.deal_status
      this.pushCont(obj.answer)
    },
    pushCont(item) {
      //发送信息
      item.msgLoading = false
      this.dataList.push(item)
      this.$nextTick(() => {
        this.$refs.chatBox.setScrollTops()
      })
    },
    canCancelInfo(obj) {
      //测回消息
      this.cancelSend(obj.id, obj.index)
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    urgent() {
      //催办
      this.$confirm('确定需要催办吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
<<<<<<< HEAD
          this.getSupportNotify()
        })
        .catch(() => {})
=======
          this.getSupportNotify();
        })
        .catch(() => {});
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    //客服催办技术支持
    async getSupportNotify() {
      try {
<<<<<<< HEAD
        let { message, data } = await getSupportNotify({
          support_id: this.supportId
        })
        this._message(message, 'success')
        this.$emit('supportUrgent', data.answer)
      } catch (error) {
        this._message(error)
=======
        let { message, data } = await getSupportNotify({ support_id: this.supportId });
        this._message(message, 'success');
        this.$emit('supportUrgent', data.answer);
      } catch (error) {
        this_message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    async getSupportDetail() {
      try {
<<<<<<< HEAD
        let { data } = await getSupportDetail({
          support_id: this.supportId
        })
        if (this.supportId == data.support_id) {
          Object.assign(this.supportDetail, data)
        }
      } catch (error) {
        this._message(error)
      }
    },
    async cancelSend(answerId, i) {
      this.$set(this.dataList[i], 'msgLoading', true)
      try {
        await cancelSend({
          answer_id: answerId,
          answer_type: 'support'
        })
        this.dataList.splice(i, 1)
      } catch (error) {
        this.$set(this.dataList[i], 'msgLoading', false)
        this._message(error)
      }
    },
    loadingData(oldHeight) {
      if (this.isLoadings) return
      this.params.page++
      this.getSupportAnswer(oldHeight)
    },
    async getSupportAnswer(oldHeight = null) {
      this.isLoadings = true
      this.params.support_id = this.supportId
      let temTime = new Date().getTime()
      this.times = temTime
      try {
        let { data, extend } = await getSupportAnswer(this.params)
        if (this.supportId == extend.support_id) {
          if (temTime == this.times) {
            //解决网络慢，前一个请求会覆盖掉当前请求结果的情况
            let snapData = data.reverse()
            this.hasMore = data.length < this.params.pageSize
            // this.dataList = [...snapData, ...this.dataList];
            this.dataList = snapData.concat(this.dataList)
            this.dataList.forEach(el => {
              el.msgLoading = false
            })
            if (this.$refs['chatBox'] !== undefined) {
              this.$refs.chatBox.resetScrollHeight(oldHeight)
            }
          }
        }
      } catch (error) {
        this._message(error)
      }
      this.isLoadings = false
    }
  },
  components: {
    Reprocessing,
    ChatBox,
    SupportDetail,
    SupportEvaluation
  }
}
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
        cursor: pointer;
        margin-left: 0 !important;
=======
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
