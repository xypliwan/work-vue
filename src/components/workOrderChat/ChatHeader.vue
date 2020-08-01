<template>
  <div>
    <div class="detail-wrapper" v-loading="detailLoading">
      <div class="left">
        <div class="user-avatar">
          <el-avatar fit="cover" :src="detail.show_headimg"></el-avatar>
<<<<<<< HEAD
          <i
            class="iconfont counterpart-icon"
            :class="
              getMappingVal(
                statusList,
                'status_code',
                detail.show_headimg_online_status,
                'icon'
              )
            "
          ></i>
        </div>
        <div class="outher-info">
          <div class="top-title">
            <span
              class="question-id copy-class"
              @click="copyAddress('复制成功', detail.question_num)"
              >{{ detail.question_num }}</span
            >
            <el-tooltip
              placement="bottom"
              effect="light"
              v-show="detail.file.length"
            >
              <div slot="content">
                <div
                  style="margin-bottom:10px;font-size:14px;"
                  v-for="(item, i) in detail.file"
                  :key="i"
                >
                  <a :href="item.path" target="_blank">{{ item.name }}</a>
=======
          <i class="iconfont counterpart-icon" :class="getMappingVal(statusList,'status_code',detail.show_headimg_online_status,'icon')"></i>
        </div>
        <div class="outher-info">
          <div class="top-title">
            <span class="question-id copy-class" @click="copyAddress('复制成功',detail.question_num)">{{detail.question_num}}</span>
            <el-tooltip placement="bottom" effect="light" v-show="detail.file.length">
              <div slot="content">
                <div style="margin-bottom:10px;font-size:14px;" v-for="(item,i) in detail.file">
                  <a :href="item.path" target="_blank">{{item.name}}</a>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
                </div>
              </div>
              <i class="iconfont icon-icon-fujian"></i>
            </el-tooltip>
<<<<<<< HEAD
            <span>{{ detail.title }}</span>
=======
            <span>{{detail.title}}</span>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            <el-link type="primary" @click="dialogDetail = true">
              详情
              <i class="el-icon-caret-bottom"></i>
            </el-link>
          </div>
          <div class="botton-desc">
<<<<<<< HEAD
            <el-tag
              type="warning"
              size="mini"
              :disable-transitions="true"
              v-if="chatService == '1'"
              >{{ detail.range_level }}</el-tag
            >
            <span>[{{ detail.company_name }}]{{ detail.username }}</span>
            <span>提出：{{ detail.created_at }}</span>
            <el-tag :disable-transitions="true" effect="dark" size="mini">{{
              detail.question_type == '1' ? '异常' : '咨询'
            }}</el-tag>
            <el-tag
              :disable-transitions="true"
              effect="dark"
              size="mini"
              type="danger"
              v-show="rangeList.length"
              >{{
                getMappingVal(rangeList, 'range_id', detail.range_id, 'name')
              }}</el-tag
            >
            <el-tag
              :disable-transitions="true"
              effect="dark"
              size="mini"
              @click="seeAdoption"
              >{{
                detail.question_status == '0'
                  ? '未处理'
                  : detail.question_status == '1'
                  ? '处理中'
                  : '已采纳'
              }}</el-tag
            >
            <!-- 责任人名 -->
            <el-tag
              type="info"
              effect="dark"
              v-if="detail.resolve_question_user_name.length"
              size="mini"
              >{{ detail.resolve_question_user_name }}
              {{ chatService == '0' ? '' : detail.responsibility_rank }}</el-tag
            >
=======
            <el-tag type="warning" size="mini" :disable-transitions="true" v-if="chatService == '1'">{{detail.range_level}}</el-tag>
            <span>[{{detail.company_name}}]{{detail.username}}</span>
            <span>提出：{{detail.created_at}}</span>
            <el-tag :disable-transitions="true" effect="dark" size="mini">{{detail.question_type == '1' ? '异常' : '咨询'}}</el-tag>
            <el-tag :disable-transitions="true" effect="dark" size="mini" type="danger" v-show="rangeList.length">{{ getMappingVal(rangeList,'range_id',detail.range_id,'name') }}</el-tag>
            <el-tag :disable-transitions="true" effect="dark" size="mini" @click="seeAdoption">{{detail.question_status == '0' ? '未处理' : (detail.question_status == '1' ? '处理中' : '已采纳' )}}</el-tag>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            <!-- //转交他人原因 -->
            <el-tag
              v-if="detail.change_question_username.length"
              type="info"
              :disable-transitions="true"
              effect="dark"
              size="mini"
              @click="reasonTransferDialog = true"
<<<<<<< HEAD
              >{{ `${detail.change_question_username}转交` }}</el-tag
            >
            <el-tag type="info" size="mini">{{
              detail.third_category_name
            }}</el-tag>
            <el-tag type="warning" size="mini" v-if="chatService == '1'">{{
              detail.difficulty_level
            }}</el-tag>
=======
            >{{`${detail.change_question_username}转交`}}</el-tag>
            <el-tag type="info" size="mini">{{detail.first_category_name}}</el-tag>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </div>
        </div>
      </div>
      <div class="right">
<<<<<<< HEAD
        <el-tooltip
          content="回复模板"
          placement="bottom"
          v-if="chatService == '1'"
        >
          <i
            class="iconfont icon-icon_talk_bujinyan"
            v-if="chatService == '1'"
            @click="showComp('QuickReply')"
          ></i>
        </el-tooltip>
        <el-tooltip
          content="采纳工单"
          placement="bottom"
          v-if="chatService == '0' && detail.question_status !== '2'"
        >
          <i
            class="iconfont icon-duigou"
            v-if="chatService == '0' && detail.question_status !== '2'"
            @click="adoptWorkOrderVisible = true"
          ></i>
        </el-tooltip>
        <el-tooltip content="易仓大学" placement="bottom">
          <i
            class="iconfont icon-icon_yinhang"
            @click="showComp('YcUniversity')"
          ></i>
        </el-tooltip>
        <el-tooltip
          content="转交他人"
          placement="bottom"
          v-if="chatService == '1'"
        >
          <i
            class="iconfont icon-zhuanfa"
            @click="dialogTransferOthers = true"
            v-if="chatService == '1'"
          ></i>
        </el-tooltip>
        <el-tooltip
          content="技术支持"
          placement="bottom"
          v-if="chatService == '1'"
          v-show="detail.support_id == '0'"
        >
          <i
            class="iconfont icon-weibiaoti-"
            @click="supportVisible = true"
            v-if="chatService == '1'"
            v-show="detail.support_id == '0'"
          ></i>
=======
        <el-tooltip content="回复模板" placement="bottom" v-if="chatService == '1'">
          <i class="iconfont icon-icon_talk_bujinyan" v-if="chatService == '1'" @click="showComp('QuickReply')"></i>
        </el-tooltip>
        <el-tooltip content="采纳工单" placement="bottom" v-if="chatService == '0' && detail.question_status !== '2'">
          <i class="iconfont icon-duigou" v-if="chatService == '0' && detail.question_status !== '2'" @click="adoptWorkOrderVisible = true"></i>
        </el-tooltip>
        <el-tooltip content="易仓大学" placement="bottom">
          <i class="iconfont icon-icon_yinhang" @click="showComp('YcUniversity')"></i>
        </el-tooltip>
        <el-tooltip content="转交他人" placement="bottom" v-if="chatService == '1'">
          <i class="iconfont icon-zhuanfa" @click="dialogTransferOthers = true" v-if="chatService == '1'"></i>
        </el-tooltip>
        <el-tooltip content="技术支持" placement="bottom" v-if="chatService == '1'" v-show="detail.support_id == '0'">
          <i class="iconfont icon-weibiaoti-" @click="supportVisible = true" v-if="chatService == '1'" v-show="detail.support_id == '0'"></i>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        </el-tooltip>
        <el-tooltip content="更多" placement="bottom">
          <el-dropdown trigger="click" @command="handeleMore">
            <span class="el-dropdown-link">
              <i class="iconfont icon-gengduo1"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0" v-if="Number(detail.list_id) == 0">
                <i class="iconfont icon-ziyuan1"></i> 转需求
              </el-dropdown-item>
<<<<<<< HEAD
              <el-dropdown-item
                command="1"
                v-if="Number(detail.list_id) == 0 && chatService == '1'"
              >
                <i class="iconfont icon-ico-bug"></i> 转BUG
              </el-dropdown-item>
              <el-dropdown-item command="2" v-if="Number(detail.list_id) !== 0"
                >跳转 关联需求ID {{ detail.list_id }}</el-dropdown-item
              >
=======
              <el-dropdown-item command="1" v-if="Number(detail.list_id) == 0">
                <i class="iconfont icon-ico-bug"></i> 转BUG
              </el-dropdown-item>
              <el-dropdown-item command="2" v-if="Number(detail.list_id) !== 0">关联需求ID {{detail.list_id}}</el-dropdown-item>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </div>
    </div>
<<<<<<< HEAD
    <detail
      :dialogDetail.sync="dialogDetail"
      :detail="detail"
      :rangeList="rangeList"
      @updateOk="getChatDetail"
    ></detail>

    <transfer-others
      v-if="chatService == '1'"
      @transferOk="transferOk"
      :dialog.sync="dialogTransferOthers"
      :questionId="detail.question_id"
      :productId="detail.product_id"
    ></transfer-others>

    <technical-support
      v-if="chatService == '1'"
      @submitOk="getChatDetail"
      :supportVisible.sync="supportVisible"
      :questionId="detail.question_id"
      :productId="detail.product_id"
    ></technical-support>
    <adopt-work-order
      :adoptWorkOrderVisible.sync="adoptWorkOrderVisible"
      :questionId="detail.question_id"
      :status="detail.question_status"
      @cancelAdoptionOk="getChatDetail"
      @causeOk="causeOk"
    ></adopt-work-order>

    <reason-transfer
      :reasonTransferDialog.sync="reasonTransferDialog"
      :reasonTransferText="detail.change_question_log"
    ></reason-transfer>
=======
    <detail :dialogDetail.sync="dialogDetail" :detail="detail" :rangeList="rangeList" @updateOk="getChatDetail"></detail>

    <transfer-others v-if="chatService == '1'" @transferOk="transferOk" :dialog.sync="dialogTransferOthers" :questionId="detail.question_id"></transfer-others>

    <technical-support v-if="chatService == '1'" @submitOk="getChatDetail" :supportVisible.sync="supportVisible" :questionId="detail.question_id"></technical-support>
    <adopt-work-order :adoptWorkOrderVisible.sync="adoptWorkOrderVisible" :questionId="detail.question_id" :status="detail.question_status" @cancelAdoptionOk="getChatDetail" @causeOk="causeOk"></adopt-work-order>

    <reason-transfer :reasonTransferDialog.sync="reasonTransferDialog" :reasonTransferText="detail.change_question_log"></reason-transfer>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
// chatService  >>> 0客户  1客服

<<<<<<< HEAD
import { getChatDetail, questionUpdateMark } from '@/api/conversation'
import { getQuestionRange } from '@/api/common'
import { mapGetters } from 'vuex'
import Detail from './dialog/Detail'
//转交他人
import TransferOthers from './dialog/TransferOthers'
//技术支持
import TechnicalSupport from '_c/workOrderChat/dialog/TechnicalSupport'
//采纳工单
import AdoptWorkOrder from '_c/workOrderChat/dialog/AdoptWorkOrder'
//转交原因
import ReasonTransfer from './dialog/ReasonTransfer'
=======
import { getChatDetail } from '@/api/conversation';
import { getQuestionRange } from '@/api/common';
import { mapGetters } from 'vuex';
import Detail from './dialog/Detail';
//转交他人
import TransferOthers from './dialog/TransferOthers';
//技术支持
import TechnicalSupport from '_c/workOrderChat/dialog/TechnicalSupport';
//采纳工单
import AdoptWorkOrder from '_c/workOrderChat/dialog/AdoptWorkOrder';
//转交原因
import ReasonTransfer from './dialog/ReasonTransfer';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  props: {
    chatItemId: String
  },
  data() {
    return {
      detail: {
        show_headimg: '',
        question_num: '',
        question_id: '', //问题id
        title: '', //标题
        question_type: '', //问题类型 1异常 2咨询
        first_category: '', //一级分类
        second_category: '', //二级分类
        third_category: '', //三级分类
        desc: '', //描述
        range_id: '', //范围id
        product_id: '', //产品id/系统id
        question_status: '', //问题状态 0 未处理 1处理中 2 已采纳
        created_at: '', //创建时间
        username: '', //用户名
        company_name: '', //公司名
        file: [], //文件
        responsibility: '', //责任人
        support_id: '', //技术支持id 如果为0 表示没有技术支持
        auto_customer_sum: '', //是否弹出用户采纳窗口 1是
        show_headimg_user_id: '', //展示在会话窗口，会话对方的id
        show_headimg_username: '', //展示在会话窗口，会话对方的名字
        show_headimg_online_status: '', //展示在会话窗口，会话对方的工作状态
        change_question_log: '', //转交的原因
        change_question_username: '', //转交人
<<<<<<< HEAD
        list_id: '', //    需求id   > 0 为已关联需求id
        resolve_question_user_name: '', //责任人名
        responsibility_rank: '', //责任人职级
        is_response_timeout: '0' //是否响应超时 1是  仅限工单时显示
=======
        list_id: '' //    需求id   > 0 为已关联需求id
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      },
      rangeList: [], //影响范围列表
      detailLoading: false,
      dialogDetail: false,
      dialogTransferOthers: false,
      supportVisible: false,
      adoptWorkOrderVisible: false,
      reasonTransferDialog: false
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  watch: {
    chatItemId: {
      immediate: true,
      handler: function(newVal) {
        if (newVal !== '') {
<<<<<<< HEAD
          this.getChatDetail()
=======
          this.getChatDetail();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        }
      }
    },
    onlineStatusInfo(newVal) {
      //修改在线状态
      if (this.detail.show_headimg_user_id == newVal.show_headimg_user_id) {
<<<<<<< HEAD
        this.detail.show_headimg_online_status =
          newVal.show_headimg_online_status
=======
        this.detail.show_headimg_online_status = newVal.show_headimg_online_status;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },
  computed: {
    ...mapGetters(['chatService', 'statusList', 'onlineStatusInfo'])
  },
  methods: {
<<<<<<< HEAD
    async questionUpdateMark(type) {
      //转工单，转bug标记
      try {
        await questionUpdateMark({
          question_id: this.detail.question_id,
          mark_type: type
        })
      } catch (error) {
        this._message(error)
      }
    },
    handeleMore(e) {
      if (e == '0' || e == '1') {
        let str = e == '0' ? '是否确认转需求' : '是否确认转BUG'
        let typeId = e == '0' ? '1' : '2'
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.questionUpdateMark(typeId)
            let urls = `/service-platform/submit-demand?questionId=${this.detail.question_num}&supportId=${this.detail.support_id}&isBug=${e}&questionRealId=${this.chatItemId}`
            this.$router.push(urls)
          })
          .catch(() => {})
      } else if (e == '2') {
        this.$router.push(`/demand-session?demandid=${this.detail.list_id}`)
=======
    handeleMore(e) {
      if (e == '0' || e == '1') {
        let urls = `/service-platform/submit-demand?questionId=${this.detail.question_num}&supportId=${this.detail.support_id}&isBug=${e}`;
        this.$router.push(urls);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    causeOk(data) {
      // this.detail.question_status = '3';
<<<<<<< HEAD
      this.$emit('causeOk', data)
    },
    seeAdoption() {
      //查看已采纳详情
      if (this.detail.question_status !== '2') return
      this.adoptWorkOrderVisible = true
    },
    showComp(name) {
      this.$emit('getComponentName', name)
    },
    transferOk() {
      this.$emit('transferOk')
    },
    async getChatDetail() {
      this.detailLoading = true
      try {
        let { data } = await getChatDetail({ question_id: this.chatItemId })
        if (this.chatItemId == data.question_id) {
          Object.assign(this.detail, data)
          this.$emit('sendInfo', {
            productId: this.detail.product_id,
            supportId: this.detail.support_id,
            autoCustomer: this.detail.auto_customer_sum,
            isResponseTimeout: this.detail.is_response_timeout
          })
          this.getQuestionRange()
        }
      } catch (error) {
        this._message(error)
      }
      this.detailLoading = false
    },
    async getQuestionRange() {
      //获取影响范围列表
      this.detailLoading = true
      try {
        let { data } = await getQuestionRange({
          product_id: this.detail.product_id
        })
        this.rangeList = data
      } catch (error) {
        this._message(error)
      }
      this.detailLoading = false
=======
      this.$emit('causeOk', data);
    },
    seeAdoption() {
      //查看已采纳详情
      if (this.detail.question_status !== '2') return;
      this.adoptWorkOrderVisible = true;
    },
    showComp(name) {
      this.$emit('getComponentName', name);
    },
    transferOk() {
      this.$emit('transferOk');
    },
    async getChatDetail() {
      this.detailLoading = true;
      try {
        let { data } = await getChatDetail({ question_id: this.chatItemId });
        Object.assign(this.detail, data);
        // this.adoptWorkOrderVisible = this.detail.auto_customer_sum == 1;
        this.$emit('sendInfo', {
          productId: this.detail.product_id,
          supportId: this.detail.support_id,
          autoCustomer: this.detail.auto_customer_sum
        });
        this.getQuestionRange();
      } catch (error) {
        this._message(error);
      }
      this.detailLoading = false;
    },
    async getQuestionRange() {
      //获取影响范围列表
      this.detailLoading = true;
      try {
        let { data } = await getQuestionRange({ product_id: this.detail.product_id });
        this.rangeList = data;
      } catch (error) {
        this._message(error);
      }
      this.detailLoading = false;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    Detail,
    TransferOthers,
    TechnicalSupport,
    AdoptWorkOrder,
    ReasonTransfer
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>
<style lang="scss" scoped>
.detail-wrapper {
  display: flex;
  height: 92px;
  border-bottom: 1px solid #f1f1f1;
  padding: 15px 0;
  .left {
    flex: 1;
    padding-left: 80px;
    position: relative;
    .user-avatar {
      position: absolute;
      left: 15px;
      top: 50%;
      margin-top: -25px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // overflow: hidden;
      /deep/ .el-avatar {
        width: 50px;
        height: 50px;
        line-height: 50px;
      }
      .counterpart-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 99;
        font-size: 12px;
      }
    }
    .top-title {
      margin-top: 10px;
      font-size: 15px;
      color: #333;

      span {
        margin-right: 10px;
      }
      .question-id {
        font-size: 14px;
        font-weight: bold;
        color: #666;
        cursor: pointer;
        margin-left: 0px !important;
      }
      .file-name {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
    .botton-desc {
      margin-top: 10px;
      font-size: 13px;
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }
  .right {
    float: right;
    width: 190px;
    padding: 15px 15px;
    text-align: right;
    i {
      font-size: 20px;
      margin-left: 11px;
      color: #777;
      cursor: pointer;
    }
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
