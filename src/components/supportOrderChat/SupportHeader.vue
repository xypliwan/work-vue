<template>
  <div>
    <div class="detail-wrapper" v-loading="detailLoading">
      <div class="left">
        <div class="user-avatar">
          <el-avatar fit="cover" :src="detail.show_headimg"></el-avatar>
        </div>
        <div class="outher-info">
          <div class="top-title">
            <span
              class="support-id copy-class"
              @click="copyAddress('复制成功', detail.support_id)"
              >{{ detail.support_id }}</span
            >
            <!-- v-show="detail.file.length > 0" -->

            <el-tooltip placement="bottom" effect="light">
              <div slot="content">
                <div
                  style="margin-bottom:10px;font-size:14px;"
                  v-for="(item, i) in detail.file"
                  :key="i"
                >
                  <a :href="item.path" target="_blank">{{ item.name }}</a>
                </div>
              </div>
              <i
                class="iconfont icon-icon-fujian"
                v-show="detail.file.length > 0"
              ></i>
            </el-tooltip>

            <span>{{ detail.title }}</span>
            <el-tag type="info" size="mini">{{
              detail.deal_status_name
            }}</el-tag>
            <el-link type="primary" @click="dialogDetail = true">
              详情
              <i class="el-icon-caret-bottom"></i>
            </el-link>
          </div>
          <div class="botton-desc">
            <el-tag type="warning" :disable-transitions="true" size="mini">{{
              detail.range_level
            }}</el-tag>
            <span>提出：{{ detail.created_at }}</span>
            <el-tag
              :disable-transitions="true"
              effect="dark"
              size="mini"
              type="danger"
              >{{ detail.range_name }}</el-tag
            >
            <el-tag type="info" :disable-transitions="true" size="mini">{{
              detail.company_name
            }}</el-tag>
            <el-tag
              type="info"
              v-show="detail.difficulty_level.length > 0"
              :disable-transitions="true"
              size="mini"
              >{{ detail.difficulty_level }}</el-tag
            >

            <el-tag
              :disable-transitions="true"
              v-show="detail.customer_type.length > 0"
              type="success"
              size="mini"
              >{{ detail.customer_type }}</el-tag
            >
            <el-tooltip placement="bottom" content="标记为疑难杂症">
              <i
                class="iconfont icon-biaoji difficult-icon"
                v-show="detail.mark_problem == '0'"
                @click="setMarkProblemFn('1', '确定将此工单标记为疑难杂症吗?')"
              ></i>
            </el-tooltip>

            <el-tooltip placement="bottom" content="取消标记疑难杂症">
              <i
                class="iconfont icon-weixian difficult-icon"
                v-show="detail.mark_problem == '1'"
                @click="
                  setMarkProblemFn('0', '确定将此工单取消标记疑难杂症吗?')
                "
              ></i>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="right">
        <el-tooltip content="转交" placement="bottom">
          <i
            class="iconfont icon-zhuanfa"
            v-if="isTec == 1"
            @click="dialogTransferOthers = true"
          ></i>
        </el-tooltip>
        <el-tooltip content="催办" placement="bottom">
          <i class="iconfont icon-chuizi" v-if="isTec == 0" @click="urgent"></i>
        </el-tooltip>
        <el-tooltip content="未解决" placement="bottom">
          <i
            class="iconfont icon-zhuanfa1"
            v-if="detail.deal_status == '2'"
            @click="reprocessVisible = true"
          ></i>
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
              <el-dropdown-item command="2" v-if="Number(detail.list_id) !== 0"
                >关联需求ID {{ detail.list_id }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </div>
    </div>

    <detail :dialogDetail.sync="dialogDetail" :detail="detail"></detail>

    <transfer-others
      @transferOk="transferOk"
      :dialog.sync="dialogTransferOthers"
      :supportId="detail.support_id"
      :productId="detail.product_id"
    ></transfer-others>

    <reprocessing
      :reprocessVisible.sync="reprocessVisible"
      :supportId="detail.support_id"
    ></reprocessing>
  </div>
</template>

<script>
import {
  getSupportDetail,
  getSupportNotify,
  setMarkProblem
} from '@/api/conversation'
import { mapGetters } from 'vuex'
import Detail from './dialog/Detail'
//转交他人
import TransferOthers from './dialog/TransferOthers'
//重开技术支持
import Reprocessing from '_c/workOrderChat/dialog/Reprocessing'
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
        created_at: '', //创建时间
        first_category: '', //一级分类
        second_category: '', //二级分类
        third_category: '', //三级分类
        support_type: '', //1异常 2咨询
        deal_status: '', //0未处理 1处理中 2已解决 3未解决
        resolve_user_name: '', //解决技术支持的人名
        demand_user_name: '', //提出技术支持的人名
        range_level: '', //优先级
        range_name: '', //影响范围名
        company_name: '', //公司名
        product_id: '',
        file: [],
        mark_problem: '0', //是否为疑难杂症  0是  1否
        customer_type: '', //客户标签
        difficulty_level: '' //分类难度
      }
    }
  },
  watch: {
    chatItemId: {
      immediate: true,
      handler: function(newVal) {
        if (newVal !== '') {
          this.getSupportDetail()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isTec'])
  },
  methods: {
    setMarkProblemFn(flg, txt) {
      this.$confirm(txt, flg == '1' ? '标记' : '取消标记', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: flg == '1' ? 'warning' : 'info'
      })
        .then(() => {
          this.setMarkProblem(flg)
        })
        .catch(() => {})
    },
    //标记/取消疑难杂症
    async setMarkProblem(flg) {
      this.detailLoading = true
      try {
        let { message } = await setMarkProblem({
          support_id: this.detail.support_id,
          mark_problem: flg
        })
        this._message(message, 'success')
        this.detail.mark_problem = flg
        let info = {
          question_id: this.detail.question_id,
          support_id: this.detail.support_id,
          mark_problem: flg
        }
        this.$emit('setMarkProblemOk', info)
      } catch (error) {
        this._message(error)
      }
      this.detailLoading = false
    },
    handeleMore(e) {
      if (e == '0' || e == '1') {
        let urls = `/service-platform/submit-demand?questionId=${this.detail.question_num}&supportId=${this.detail.support_id}&isBug=${e}`
        this.$router.push(urls)
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
          this.getSupportNotify()
        })
        .catch(() => {})
    },
    //客服催办技术支持
    async getSupportNotify() {
      try {
        let { message, data } = await getSupportNotify({
          support_id: this.detail.support_id
        })
        this._message(message, 'success')
        this.$emit('supportUrgent', data.answer)
      } catch (error) {
        this._message(error)
      }
    },
    transferOk() {
      this.$emit('changeOk')
    },
    async getSupportDetail() {
      this.detailLoading = true
      try {
        let { data } = await getSupportDetail({ support_id: this.chatItemId })
        Object.assign(this.detail, data)
        this.$emit('sendDealStatus', {
          dealStatus: data.deal_status,
          dealButton: data.deal_button
        })
      } catch (error) {
        this._message(error)
      }
      this.detailLoading = false
    }
  },
  components: {
    Detail,
    TransferOthers,
    Reprocessing
  }
}
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
      .difficult-icon {
        font-size: 16px;
        margin: 0 3px;
        cursor: pointer;
      }
      .icon-weixian {
        color: #f56c6c;
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
