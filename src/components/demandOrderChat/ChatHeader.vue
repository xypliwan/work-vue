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
              @click="copyAddress('复制成功', detail.list_id)"
              >{{ detail.list_id }}</span
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
            <span class="question-id copy-class" @click="copyAddress('复制成功',detail.list_id)">{{detail.list_id}}</span>
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
<<<<<<< HEAD
            <el-tooltip
              class="item"
              effect="dark"
              :content="`${detail.question_num}--${detail.question_title}`"
              placement="bottom"
            >
              <el-link
                type="success"
                :underline="false"
                v-show="detail.question_id !== ''"
                @click="toQuestionUrl"
                class="link-question"
              >
                【{{ detail.question_num }}--{{ detail.question_title }}】
              </el-link>
            </el-tooltip>
          </div>
          <div class="botton-desc">
            <span>[{{ detail.company_name }}] {{ detail.username }}</span>
            <span>提出：{{ detail.created_at }}</span>
            <el-tag :disable-transitions="true" effect="dark" size="mini">{{
              detail.need_status_name
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
              type="success"
              >{{ detail.is_pay == '1' ? '付费' : '不付费' }}</el-tag
            >
            <el-tag
              :disable-transitions="true"
              effect="dark"
              type="info"
              size="mini"
              >{{ detail.is_bug == '1' ? 'BUG' : '非BUG' }}</el-tag
            >
            <el-tag
              v-if="detail.tapd_id == '0' && checkAllNeed == 1"
=======
          </div>
          <div class="botton-desc">
            <span>[{{detail.company_name}}] {{detail.username}}</span>
            <span>提出：{{detail.created_at}}</span>
            <el-tag :disable-transitions="true" effect="dark" size="mini">{{detail.need_status_name}}</el-tag>
            <el-tag :disable-transitions="true" effect="dark" size="mini" type="danger" v-show="rangeList.length">{{ getMappingVal(rangeList,'range_id',detail.range_id,'name') }}</el-tag>
            <el-tag :disable-transitions="true" effect="dark" size="mini" type="success">{{detail.is_pay == '1' ? '付费' : '不付费'}}</el-tag>
            <el-tag :disable-transitions="true" effect="dark" type="info" size="mini">{{detail.is_bug == '1' ? 'BUG' : '非BUG'}}</el-tag>
            <el-tag v-if="detail.tapd_id == '0' && checkAllNeed == 1" :disable-transitions="true" class="has-tapd" effect="dark" size="mini" type="info" @click="tapdVisible = true">未关联TAPD</el-tag>
            <el-tag
              v-if="detail.tapd_id !== '0' && checkAllNeed == 1"
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
              :disable-transitions="true"
              class="has-tapd"
              effect="dark"
              size="mini"
<<<<<<< HEAD
              type="info"
              @click="eidtTapd(0)"
              >未关联TAPD</el-tag
            >
            <label v-if="detail.tapd_id !== '0' && checkAllNeed == 1">
              <el-popover placement="bottom" width="50" trigger="hover">
                <el-link type="primary" @click="eidtTapd(1)">修改</el-link>
                <el-tag
                  slot="reference"
                  :disable-transitions="true"
                  class="has-tapd"
                  effect="dark"
                  size="mini"
                  @click="toTapd"
                  >TAPD {{ detail.tapd_id }} {{ detail.tapd_status }}</el-tag
                >
              </el-popover>
            </label>
            <el-tag
              :disable-transitions="true"
              type="warning"
              effect="dark"
              size="mini"
              >{{ detail.deal_user_name }}</el-tag
            >
            <el-tag
              :disable-transitions="true"
              effect="dark"
              size="mini"
              v-if="detail.question_num.length > 0"
              @click="toQuestionPage"
              >关联工单 {{ detail.question_num }}</el-tag
            >
=======
              @click="toTapd"
            >TAPD {{detail.tapd_id}} {{detail.tapd_status}}</el-tag>
            <el-tag :disable-transitions="true" type="warning" effect="dark" size="mini">{{detail.deal_user_name}}</el-tag>
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
        <el-tooltip content="易仓大学" placement="bottom">
          <i
            class="iconfont icon-icon_yinhang"
            @click="showComp('YcUniversity')"
          ></i>
        </el-tooltip>
        <el-tooltip
          content="查看日志"
          placement="bottom"
          v-if="productor == '1'"
        >
          <i
            class="iconfont icon-chakanrizhi"
            v-if="productor == '1'"
            @click="logVisible = true"
          ></i>
        </el-tooltip>
        <el-tooltip
          content="需求变更"
          placement="bottom"
          v-if="productor == '1'"
        >
          <el-popover placement="right" trigger="click" @hide="hideSetStatus">
            <demand-change
              ref="demandChangeRef"
              :chatItemId="chatItemId"
              :status="detail.need_status"
              @updateOk="getNeedDetail"
            ></demand-change>
            <i
              slot="reference"
              class="iconfont icon-zhuangtaibiangeng"
              v-if="productor == '1'"
            ></i>
=======
        <el-tooltip content="回复模板" placement="bottom" v-if="chatService == '1'">
          <i class="iconfont icon-icon_talk_bujinyan" v-if="chatService == '1'" @click="showComp('QuickReply')"></i>
        </el-tooltip>
        <el-tooltip content="易仓大学" placement="bottom">
          <i class="iconfont icon-icon_yinhang" @click="showComp('YcUniversity')"></i>
        </el-tooltip>
        <el-tooltip content="查看日志" placement="bottom" v-if="productor == '1'">
          <i class="iconfont icon-chakanrizhi" v-if="productor == '1'" @click="logVisible = true"></i>
        </el-tooltip>
        <el-tooltip content="需求变更" placement="bottom" v-if="productor == '1'">
          <el-popover placement="right" trigger="click" @hide="hideSetStatus">
            <demand-change ref="demandChangeRef" :chatItemId="chatItemId" :status="detail.need_status" @updateOk="getNeedDetail"></demand-change>
            <i slot="reference" class="iconfont icon-zhuangtaibiangeng" v-if="productor == '1'"></i>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </el-popover>
        </el-tooltip>
        <el-tooltip content="更多" placement="bottom">
          <el-dropdown trigger="click" @command="handeleMore">
            <span class="el-dropdown-link">
              <i class="iconfont icon-gengduo1"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0" v-if="productor == '1'">
                <i class="iconfont icon-zhuanfa"></i> 转交责任人
              </el-dropdown-item>
<<<<<<< HEAD
              <el-dropdown-item
                command="1"
                v-if="detail.tapd_id == '0' && checkAllNeed == 1"
              >
                <i class="iconfont icon-TAPD__icon"></i> 创建TAPD
              </el-dropdown-item>
              <el-dropdown-item command="2" v-if="chatService != '0'">
                <i class="iconfont icon-TAPD__icon"></i> 创建TAPD缺陷
              </el-dropdown-item>
=======
              <el-dropdown-item command="1" v-if="detail.tapd_id == '0' && checkAllNeed == 1">
                <i class="iconfont icon-TAPD__icon"></i> 创建TAPD
              </el-dropdown-item>
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
      @updateOk="getNeedDetail"
    ></detail>
    <transfer-person
      :productId="detail.product_id"
      :dealUserId="detail.deal_user_id"
      :chatItemId="chatItemId"
      :personVisible.sync="personVisible"
      @submitOk="getNeedDetail"
    ></transfer-person>
    <history-log
      :chatItemId="chatItemId"
      :logVisible.sync="logVisible"
    ></history-log>

    <association-tapd
      :id="detail.list_id"
      :tapdWorkspaceList="tapdWorkspaceList"
      :tapdVisible.sync="tapdVisible"
      @associationOk="getNeedDetail"
      :isEdit="isEdit"
      :editInfo="editInfo"
    ></association-tapd>

    <created-demand
      :id="detail.list_id"
      @submitOk="getNeedDetail"
      :addtapdVisible.sync="addtapdVisible"
      :detail="detail"
      :tapdWorkspaceList="tapdWorkspaceList"
    ></created-demand>

    <create-tapd-defect
      :id="detail.list_id"
      @submitOk="getNeedDetail"
      :visible.sync="defectVisible"
      :detail="detail"
      :tapdWorkspaceList="tapdWorkspaceList"
    ></create-tapd-defect>
=======
    <detail :dialogDetail.sync="dialogDetail" :detail="detail" :rangeList="rangeList" @updateOk="getNeedDetail"></detail>
    <transfer-person :productId="detail.product_id" :dealUserId="detail.deal_user_id" :chatItemId="chatItemId" :personVisible.sync="personVisible" @submitOk="getNeedDetail"></transfer-person>
    <history-log :chatItemId="chatItemId" :logVisible.sync="logVisible"></history-log>

    <association-tapd :id="detail.list_id" :tapdWorkspaceList="tapdWorkspaceList" :tapdVisible.sync="tapdVisible" @associationOk="getNeedDetail"></association-tapd>

    <created-demand :id="detail.list_id" @submitOk="getNeedDetail" :addtapdVisible.sync="addtapdVisible" :detail="detail" :tapdWorkspaceList="tapdWorkspaceList"></created-demand>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
// chatService  >>> 0客户  1客服

<<<<<<< HEAD
import { getQuestionRange, getTapdWorkspace } from '@/api/common'
import { mapGetters } from 'vuex'
import { getNeedDetail } from '@/api/demandConversation'

import Detail from './dialog/Detail'
//转交责任人
import TransferPerson from './dialog/TransferPerson'
//查看历史日志
import HistoryLog from './dialog/HistoryLog'
import DemandChange from './dialog/DemandChange'
//关联tapd
import AssociationTapd from './dialog/AssociationTapd'
//创建tapd需求
import CreatedDemand from './dialog/CreatedDemand'
//创建tapd缺陷
import CreateTapdDefect from './dialog/CreateTapdDefect'
=======
import { getQuestionRange, getTapdWorkspace } from '@/api/common';
import { mapGetters } from 'vuex';
import { getNeedDetail } from '@/api/demandConversation';

import Detail from './dialog/Detail';
//转交责任人
import TransferPerson from './dialog/TransferPerson';
//查看历史日志
import HistoryLog from './dialog/HistoryLog';
import DemandChange from './dialog/DemandChange';
//关联tapd
import AssociationTapd from './dialog/AssociationTapd';
//创建tapd需求
import CreatedDemand from './dialog/CreatedDemand';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  props: {
    chatItemId: String
  },
  data() {
    return {
      detail: {
        list_id: '', //需求id
        title: '', //标题
        user_id: '', //用户id
        deal_user_id: '', //责任人id
        range_id: '', //范围id
        model_id: '', //模块id
        product_id: '', //系统产品id
        is_pay: '', //是否付费
        backgroup: '', //背景
        adjust: '', //调整
        contact_name: '', //联系人
        phone: '', //电话
        email: '', //邮箱
        need_status: '', //1：未受理 2：需求打回 3：分析中 4：规划中 5：研发中 6：测试中 7：已发布 8：已拒绝
        is_bug: '', //是否为bug
        created_at: '', //开始时间
        updated_at: '', //最后更新时间
        range_name: '', //范围名
        model_name: '', //模块名
        need_status_name: '', //状态名
        show_headimg_user_id: '',
        show_headimg_username: '', //展示头像名
        show_headimg_online_status: '', //展示头像工作状态
        company_name: '', //公司名
        username: '',
        file: [],
        hours: '',
        tapd_id: '0', //关联的tapdID
        tapd_url: '', //关联的url
<<<<<<< HEAD
        tapd_status: '', //tapd状态名
        workspace_id: '',
        question_id: '', //关联 的工单id
        question_num: '',
        support_id: ''
=======
        tapd_status: '' //tapd状态名
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      },
      rangeList: [], //影响范围列表
      tapdWorkspaceList: [], //tapd项目列表
      detailLoading: false,
      dialogDetail: false,
      personVisible: false,
      logVisible: false,
      tapdVisible: false,
<<<<<<< HEAD
      addtapdVisible: false,
      isEdit: 0,
      editInfo: {
        list_id: '', //需求id
        workspace_id: '', //tapd项目id
        tapd_id: '', //tapd id
        is_bug: 0
      },
      defectVisible: false
    }
  },
  created() {
    this.getTapdWorkspace()
=======
      addtapdVisible: false
    };
  },
  created() {
    this.getTapdWorkspace();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  watch: {
    chatItemId: {
      immediate: true,
      handler: function(newVal) {
        if (newVal !== '') {
<<<<<<< HEAD
          this.getNeedDetail()
=======
          this.getNeedDetail();
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
<<<<<<< HEAD
    ...mapGetters([
      'chatService',
      'statusList',
      'onlineStatusInfo',
      'productor',
      'checkAllNeed'
    ])
  },
  methods: {
    toQuestionUrl() {
      let url = `${window.location.origin}/#/conversation?id=${this.detail.question_id}&num=${this.detail.question_num}&supportId=${this.detail.support_id}`
      window.open(url, '_blank')
    },
    toQuestionPage() {
      // this.$router.push(`/demand-session?demandid=${this.detail.list_id}`);
      this.$router.push(
        `/conversation?id=${this.detail.question_id}&num=${this.detail.question_num}&supportId=${this.detail.support_id}`
      )
    },
    eidtTapd(flg) {
      this.tapdVisible = true
      this.isEdit = flg
      if (flg) {
        this.editInfo.workspace_id = this.detail.workspace_id
        this.editInfo.tapd_id = this.detail.tapd_id
        this.editInfo.is_bug = Number(this.detail.is_bug)
      } else {
        this.editInfo.workspace_id = ''
        this.editInfo.tapd_id = ''
        this.editInfo.is_bug = 0
      }
    },
    handeleMore(e) {
      if (e == '0') {
        this.personVisible = true
      } else if (e == '1') {
        this.addtapdVisible = true
      } else if (e == '2') {
        this.defectVisible = true
      }
    },

    toTapd() {
      window.open(this.detail.tapd_url, '_blank')
    },
    async getTapdWorkspace() {
      try {
        let { data } = await getTapdWorkspace()
        this.tapdWorkspaceList = data
      } catch (error) {
        this._message(error)
      }
    },
    hideSetStatus() {
      this.$refs.demandChangeRef.setStatus()
    },
    showComp(name) {
      this.$emit('getComponentName', name)
    },
    async getNeedDetail() {
      this.detailLoading = true
      try {
        let { data } = await getNeedDetail({ list_id: this.chatItemId })
        Object.assign(this.detail, data)
        this.$emit('sendInfo', {
          productId: this.detail.product_id,
          hours: this.detail.hours
        })
        this.getQuestionRange()
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
    ...mapGetters(['chatService', 'statusList', 'onlineStatusInfo', 'productor', 'checkAllNeed'])
  },
  methods: {
    handeleMore(e) {
      if (e == '0') {
        this.personVisible = true;
      } else if (e == '1') {
        this.addtapdVisible = true;
      }
    },
    toTapd() {
      window.open(this.detail.tapd_url, '_blank');
    },
    async getTapdWorkspace() {
      try {
        let { data } = await getTapdWorkspace();
        this.tapdWorkspaceList = data;
      } catch (error) {
        this._message(error);
      }
    },
    hideSetStatus() {
      this.$refs.demandChangeRef.setStatus();
    },
    showComp(name) {
      this.$emit('getComponentName', name);
    },
    async getNeedDetail() {
      this.detailLoading = true;
      try {
        let { data } = await getNeedDetail({ list_id: this.chatItemId });
        Object.assign(this.detail, data);
        this.$emit('sendInfo', {
          productId: this.detail.product_id,
          hours: this.detail.hours
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
    TransferPerson,
    HistoryLog,
    DemandChange,
    AssociationTapd,
<<<<<<< HEAD
    CreatedDemand,
    CreateTapdDefect
  }
}
=======
    CreatedDemand
  }
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
<<<<<<< HEAD
=======

>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
      .link-question {
        display: inline-block;
        max-width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
=======
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
    .botton-desc {
      margin-top: 10px;
      font-size: 13px;
      color: #999;
      span {
        margin-right: 10px;
      }
      .has-tapd {
        cursor: pointer;
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
