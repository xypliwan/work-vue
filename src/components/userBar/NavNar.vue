<template>
  <div class="nav-bar">
    <router-link v-for="(item,i) in menuNav" class="item" :key="item.id" :to="item.path" tag="div">
      <el-badge
        :value="(item.id == '2' ? conversationNum : '') || (item.id == '3' ? num2 : '') || (item.id == '11' ? supportNum : '') || (item.id == '10' ? msgNum : '') || (item.id == '12' ? demandNum : '')  "
        :hidden="(item.id !== '2' || conversationNum<=0) && (item.id !== '3' || num2<=0) && (item.id !== '11' || supportNum<= 0) && (item.id !=='10' || msgNum == '-') && (item.id !== '12' || demandNum<=0)"
      >
        <el-tooltip effect="dark" :content="item.title" placement="right">
          <i class="iconfont nav-icon" :class="item.icon"></i>
        </el-tooltip>
      </el-badge>
    </router-link>

    <router-link class="item" to="/order-search" tag="div">
      <el-tooltip effect="dark" content="旧工单查询" placement="right">
        <i class="iconfont nav-icon icon-xingtaiduICON_sousuo--" style="font-size:23px;"></i>
      </el-tooltip>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      conversationNum: 0, //工单会话条数
      supportNum: 0, //支持会话条数
      num2: 0, //我的工作台   后续删除
      msgNum: '-', //消息中心
      demandNum: 0 //需求会话条数
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(['menuNav', 'infoCount', 'supportInfoCount', 'msgCenter', 'msgCount', 'demandInfoCount'])
  },
  watch: {
    $route(to) {
      if (to.path == '/message-center') {
        this.msgNum = '-';
      }
    },
    msgCount(newVal) {
      this.msgNum = Number(newVal) > 0 ? '*' : '-';
    },
    msgCenter(newVal) {
      this.msgNum = '*';
    },
    infoCount(newVal) {
      this.conversationNum = Number(newVal[0].num) + Number(newVal[1].num);
    },
    supportInfoCount(newVal) {
      this.supportNum = Number(newVal[0].num) + Number(newVal[1].num);
    },
    demandInfoCount(newVal) {
      newVal.forEach(el => {
        if (el.status_code == '0') {
          this.demandNum = Number(el.num);
        }
      });
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.nav-bar {
  .item {
    margin-bottom: 25px;
    text-align: center;
    .nav-icon {
      font-size: 26px;
      color: #fff;
      opacity: 0.5;
      cursor: pointer;
    }
    &.router-link-active {
      .nav-icon {
        opacity: 1;
      }
    }
  }
  .bottom-nav {
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 80px;
    text-align: center;
  }
}
</style>
