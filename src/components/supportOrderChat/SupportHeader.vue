<template>
  <div>
    <div class="detail-wrapper" v-loading="detailLoading">
      <div class="left">
        <div class="user-avatar">
          <el-avatar fit="cover" :src="detail.show_headimg"></el-avatar>
        </div>
        <div class="outher-info">
          <div class="top-title">
            <span class="support-id copy-class" @click="copyAddress('复制成功',detail.support_id)">{{detail.support_id}}</span>
            <span>{{detail.title}}</span>
            <el-tag type="info" size="mini">{{detail.deal_status_name}}</el-tag>
            <el-link type="primary" @click="dialogDetail = true">
              详情
              <i class="el-icon-caret-bottom"></i>
            </el-link>
          </div>
          <div class="botton-desc">
            <el-tag type="warning" :disable-transitions="true" size="mini">{{detail.range_level}}</el-tag>
            <el-tag :disable-transitions="true" effect="dark" size="mini" type="danger">{{detail.range_name}}</el-tag>
            <el-tag type="info" :disable-transitions="true" size="mini">{{detail.company_name}}</el-tag>
          </div>
        </div>
      </div>
      <div class="right">
        <el-tooltip content="转交" placement="bottom">
          <i class="iconfont icon-zhuanfa" v-if="isTec == 1" @click="dialogTransferOthers=true"></i>
        </el-tooltip>
        <el-tooltip content="催办" placement="bottom">
          <i class="iconfont icon-chuizi" v-if="isTec == 0" @click="urgent"></i>
        </el-tooltip>
        <el-tooltip content="未解决" placement="bottom">
          <i class="iconfont icon-zhuanfa1" v-if="detail.deal_status == '2'" @click="reprocessVisible = true"></i>
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
              <el-dropdown-item command="1" v-if="Number(detail.list_id) == 0">
                <i class="iconfont icon-ico-bug"></i> 转BUG
              </el-dropdown-item>
              <el-dropdown-item command="2" v-if="Number(detail.list_id) !== 0">关联需求ID {{detail.list_id}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </div>
    </div>

    <detail :dialogDetail.sync="dialogDetail" :detail="detail"></detail>

    <transfer-others @transferOk="transferOk" :dialog.sync="dialogTransferOthers" :supportId="detail.support_id"></transfer-others>

    <reprocessing :reprocessVisible.sync="reprocessVisible" :supportId="detail.support_id"></reprocessing>
  </div>
</template>

<script>
import { getSupportDetail, getSupportNotify } from '@/api/conversation';
import { getQuestionRange } from '@/api/common';
import { mapGetters } from 'vuex';
import Detail from './dialog/Detail';
//转交他人
import TransferOthers from './dialog/TransferOthers';
//重开技术支持
import Reprocessing from '_c/workOrderChat/dialog/Reprocessing';
export default {
  props: {
    chatItemId: String
  },
  data() {
    return {
      detailLoading: false,
      dialogDetail: false,
      dialogTransferOthers: false,
      reprocessVisible: false,
      detail: {
        question_id: '',
        support_id: '', //支持id
        list_id: '', //已需求id
        title: '', //标题
        first_category: '', //一级分类
        second_category: '', //二级分类
        third_category: '', //三级分类
        support_type: '', //1异常 2咨询
        deal_status: '', //0未处理 1处理中 2已解决 3未解决
        resolve_user_name: '', //解决技术支持的人名
        demand_user_name: '', //提出技术支持的人名
        range_level: '', //优先级
        range_name: '', //影响范围名
        company_name: '' //公司名
      }
    };
  },
  watch: {
    chatItemId: {
      immediate: true,
      handler: function(newVal) {
        if (newVal !== '') {
          this.getSupportDetail();
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isTec'])
  },
  methods: {
    handeleMore(e) {
      if (e == '0' || e == '1') {
        let urls = `/service-platform/submit-demand?questionId=${this.detail.question_num}&supportId=${this.detail.support_id}&isBug=${e}`;
        this.$router.push(urls);
      }
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
        let { message, data } = await getSupportNotify({ support_id: this.detail.support_id });
        this._message(message, 'success');
        this.$emit('supportUrgent', data.answer);
      } catch (error) {
        this._message(error);
      }
    },
    transferOk() {
      this.$emit('changeOk');
    },
    async getSupportDetail() {
      this.detailLoading = true;
      try {
        let { data } = await getSupportDetail({ support_id: this.chatItemId });
        Object.assign(this.detail, data);
        this.$emit('sendDealStatus', {
          dealStatus: data.deal_status,
          dealButton: data.deal_button
        });
      } catch (error) {
        this._message(error);
      }
      this.detailLoading = false;
    }
  },
  components: {
    Detail,
    TransferOthers,
    Reprocessing
  }
};
</script>
<style lang="scss" scoped>
.detail-wrapper {
  display: flex;
  height: 90px;
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
      overflow: hidden;
      /deep/ .el-avatar {
        width: 50px;
        height: 50px;
        line-height: 50px;
      }
    }
    .top-title {
      margin-top: 10px;
      font-size: 15px;
      color: #333;
      span {
        margin-right: 10px;
      }
      .support-id {
        font-size: 14px;
        font-weight: bold;
        color: #666;
        cursor: pointer;
        margin-left: 0px !important;
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
</style>