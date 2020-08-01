<template>
  <div class="nav-bar">
<<<<<<< HEAD
    <router-link
      v-for="item in menuNav"
      class="item"
      :key="item.id"
      :to="item.path"
      tag="div"
    >
      <el-badge
        :value="
          (item.id == '2' ? conversationNum : '') ||
            (item.id == '3' ? num2 : '') ||
            (item.id == '11' ? supportNum : '') ||
            (item.id == '10' ? msgNum : '') ||
            (item.id == '12' ? demandNum : '')
        "
        :hidden="
          (item.id !== '2' || conversationNum <= 0) &&
            (item.id !== '3' || num2 <= 0) &&
            (item.id !== '11' || supportNum <= 0) &&
            (item.id !== '10' || msgNum == '-') &&
            (item.id !== '12' || demandNum <= 0)
        "
=======
    <router-link v-for="(item,i) in menuNav" class="item" :key="item.id" :to="item.path" tag="div">
      <el-badge
        :value="(item.id == '2' ? conversationNum : '') || (item.id == '3' ? num2 : '') || (item.id == '11' ? supportNum : '') || (item.id == '10' ? msgNum : '') || (item.id == '12' ? demandNum : '')  "
        :hidden="(item.id !== '2' || conversationNum<=0) && (item.id !== '3' || num2<=0) && (item.id !== '11' || supportNum<= 0) && (item.id !=='10' || msgNum == '-') && (item.id !== '12' || demandNum<=0)"
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      >
        <el-tooltip effect="dark" :content="item.title" placement="right">
          <i class="iconfont nav-icon" :class="item.icon"></i>
        </el-tooltip>
      </el-badge>
    </router-link>

    <router-link class="item" to="/order-search" tag="div">
      <el-tooltip effect="dark" content="旧工单查询" placement="right">
<<<<<<< HEAD
        <i
          class="iconfont nav-icon icon-xingtaiduICON_sousuo--"
          style="font-size:23px;"
        ></i>
=======
        <i class="iconfont nav-icon icon-xingtaiduICON_sousuo--" style="font-size:23px;"></i>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </el-tooltip>
    </router-link>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters } from 'vuex'
=======
import { mapGetters } from 'vuex';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  data() {
    return {
      conversationNum: 0, //工单会话条数
      supportNum: 0, //支持会话条数
      num2: 0, //我的工作台   后续删除
      msgNum: '-', //消息中心
      demandNum: 0 //需求会话条数
<<<<<<< HEAD
    }
  },
  mounted() {},
  computed: {
    ...mapGetters([
      'menuNav',
      'infoCount',
      'supportInfoCount',
      'msgCenter',
      'msgCount',
      'demandInfoCount'
    ])
=======
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(['menuNav', 'infoCount', 'supportInfoCount', 'msgCenter', 'msgCount', 'demandInfoCount'])
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  watch: {
    $route(to) {
      if (to.path == '/message-center') {
<<<<<<< HEAD
        this.msgNum = '-'
      }
    },
    msgCount(newVal) {
      this.msgNum = Number(newVal) > 0 ? '*' : '-'
    },
    msgCenter() {
      this.msgNum = '*'
    },
    infoCount(newVal) {
      this.conversationNum = Number(newVal[0].num) + Number(newVal[1].num)
    },
    supportInfoCount(newVal) {
      this.supportNum = Number(newVal[0].num) + Number(newVal[1].num)
=======
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
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    demandInfoCount(newVal) {
      newVal.forEach(el => {
        if (el.status_code == '0') {
<<<<<<< HEAD
          this.demandNum = Number(el.num)
        }
      })
    }
  },
  methods: {}
}
=======
          this.demandNum = Number(el.num);
        }
      });
    }
  },
  methods: {}
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
