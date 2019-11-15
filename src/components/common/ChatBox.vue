<template>
  <scroll :hasMore="hasMore" ref="scrolls" :isLoadings="isLoadings" :direction="direction" @loadingData="loadingData">
    <div slot="downDataList" class="cont-parent">
      <div v-for="(item,i) in dataList" :key="i">
        <!-- 对方 -->
        <div class="history-box" v-if="item.is_myself == 0">
          <div class="fl avatar">
            <el-avatar fit="cover" :src="item.head_img"></el-avatar>
          </div>
          <div class="cont-wrapper other-side">
            <div class="time">{{item.user_name}}&nbsp;&nbsp;{{item.created_at}}</div>
            <div class="cont" v-html="item.content" v-viewer></div>
          </div>
        </div>
        <!-- 本人 -->
        <div class="history-box" v-if="item.is_myself == 1">
          <div class="cont-wrapper my-self">
            <div class="time">{{item.created_at}}&nbsp;&nbsp;{{item.user_name}}</div>
            <img class="info-img" v-show="item.msgLoading" src="@/assets/images/loading.gif" alt />
            <el-link type="info" class="withdraw-self" @click="withdrawInfo(item,i)" v-if="canCancelInfo(item.created_at)">撤回</el-link>
            <div class="cont my-self-count" v-html="item.content" v-viewer></div>
            <div
              v-if="chatService == 1"
              class="is-read"
              :class="item.is_read == 0 ? 'is-read-no' : (item.is_read == 1 ? 'is-read-yes' : '')"
            >{{item.is_read == 0 ? '未读' : (item.is_read == 1 ? '已读' : '')}}</div>
          </div>

          <div class="fr avatar">
            <el-avatar fit="cover" :src="item.head_img"></el-avatar>
          </div>
        </div>
      </div>
      <slot name="autoAdoptionOrder"></slot>
    </div>
  </scroll>
</template>

<script>
// 调用时，该最近的一层父级div一定要指定高度，否则无法滚动！！！

import Scroll from '_c/common/Scroll';
import { isCanCancel } from '_u/utils';
import { mapGetters } from 'vuex';
export default {
  props: {
    chatItemId: String, //问题id
    hasMore: Boolean, //是否有跟多
    isLoadings: Boolean, //是否加载状态
    dataList: [Array], //数据列表       is_read  -1不显示   0未读   1已读
    direction: Boolean //滚动加载方向   true往下滚   false往上滚
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['chatService']),
    canCancelInfo(times) {
      return times => {
        return isCanCancel(times);
      };
    }
  },
  watch: {},
  methods: {
    resetScrollHeight(oldHeight) {
      //重置scroll距离顶部的高度（一般用于新增消息，和加载更多时）
      this.$nextTick(() => {
        this.$refs.scrolls.resetHeight(oldHeight);
      });
    },
    setScrollTops() {
      //设置聊天内容初始化时距离顶部的高度
      // this.$nextTick(() => {
      this.$refs.scrolls.setScrollTop();
      // });
    },
    withdrawInfo(item, i) {
      //撤回消息
      let canCancel = isCanCancel(item.created_at);
      if (canCancel) {
        this.$emit('canCancel', { id: item.answer_id, index: i });
      } else {
        this._message('只能撤回一小时之内的消息!', 'warning');
      }
    },
    loadingData(oldHeight) {
      this.$emit('loadingData', oldHeight);
    }
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.history-box {
  overflow: hidden;
  display: flex;
  margin-bottom: 25px;
  padding: 0 10px;
  .avatar {
  }
  .cont-wrapper {
    flex: 1;
    .cont {
      display: inline-block;
      background: #fff;
      padding: 5px 10px;
      border-radius: 3px;
      border: 1px solid #f1f1f1;
      max-width: 70%;
      line-height: 20px;
      font-size: 14px;
      color: #333;
      text-align: justify;
      word-wrap: break-word !important;
      word-break: break-all !important;
      p {
        word-wrap: break-word !important;
        word-break: break-all !important;
      }
      /deep/ .file-special {
        margin-bottom: 3px;
        background: rgba(204, 204, 204, 0.5);
        padding: 5px 10px;
        border-radius: 3px;
        /deep/ i {
          font-size: 19px;
          color: #333;
        }
        /deep/ a {
          font-size: 14px;
          color: #1317e2;
        }
      }
    }
    /deep/ img {
      max-width: 150px !important;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
    }
    .info-img {
      width: 15px;
      margin-right: 5px;
      position: relative;
      top: 3px;
    }
  }
  .other-side {
    margin-left: 10px;
  }
  .my-self {
    margin-right: 10px;
    text-align: right;
    .withdraw-self {
      margin-right: 10px;
      font-size: 12px;
    }
    .my-self-count {
      background: #12b7f5;
      color: #fff;
    }
    .is-read {
      margin-top: 9px;
      font-size: 12px;
      &.is-read-yes {
        //已读
        color: #c5c0c0;
      }
      &.is-read-no {
        //未读
        color: #12b7f5;
      }
    }
  }
}
.cont-parent {
  padding: 20px 0;
}
</style>