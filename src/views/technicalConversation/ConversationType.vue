<template>
  <div class="special-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="upcoming">
        <div slot="label">
<<<<<<< HEAD
          <el-badge
            :value="newNum"
            :hidden="newNum <= 0"
            :max="99"
            class="item"
          >
=======
          <el-badge :value="newNum" :hidden="newNum <= 0" :max="99" class="item">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            <span>待办</span>
          </el-badge>
        </div>
      </el-tab-pane>
      <el-tab-pane name="my">
        <span slot="label">与我有关</span>
      </el-tab-pane>

      <el-tab-pane name="completed">
        <div slot="label">
<<<<<<< HEAD
          <el-badge
            :value="processingNum"
            :hidden="processingNum <= 0"
            :max="99"
            class="item"
          >
=======
          <el-badge :value="processingNum" :hidden="processingNum <= 0" :max="99" class="item">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            <span>已完成</span>
          </el-badge>
        </div>
      </el-tab-pane>
      <el-tab-pane name="all">
        <span slot="label">全部</span>
      </el-tab-pane>
    </el-tabs>
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
      typeList: [
        {
          name: 'upcoming',
          index: '1'
        },
        {
          name: 'my',
          index: '10'
        },

        {
          name: 'completed',
          index: '2'
        },
        {
          name: 'all',
          index: ''
        }
      ],
      newNum: 0, //待办
      processingNum: 0, //已完成
      activeName: 'upcoming'
<<<<<<< HEAD
    }
  },
  mounted() {
    this.setNewInfo(this.supportInfoCount)

    let msgType = this.$route.query
    if (msgType && msgType.message_type == '1') {
      this.activeName = 'upcoming'
      this.$emit('changeSupportStatus', {
        index: '1',
        ids: ''
      })
=======
    };
  },
  mounted() {
    this.setNewInfo(this.supportInfoCount);

    let msgType = this.$route.query;
    if (msgType && msgType.message_type == '1') {
      this.activeName = 'upcoming';
      this.$emit('changeSupportStatus', {
        index: '1',
        ids: ''
      });
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  computed: {
    ...mapGetters(['chatService', 'supportInfoCount'])
  },
  watch: {
    supportInfoCount(newVal) {
<<<<<<< HEAD
      this.setNewInfo(newVal)
=======
      this.setNewInfo(newVal);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    setNewInfo(arr) {
      arr.forEach(el => {
        if (el.deal_status == '1') {
          //待办
<<<<<<< HEAD
          this.newNum = el.num
        } else if (el.deal_status == '2') {
          //已完成
          this.processingNum = el.num
        }
      })
    },
    handleClick() {
      let item = this.typeList.filter(el => el.name == this.activeName)
      this.$emit('changeSupportStatus', {
        index: item[0].index,
        ids: ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.special-box {
  .el-tabs__header {
    margin: 0 !important;
    margin-top: 10px !important;
  }
  .el-tabs__nav {
    width: 100% !important;
    display: flex !important;
    .el-tabs__item {
      flex: 1 !important;
      text-align: center !important;
      line-height: 50px !important;
      height: 50px !important;
    }
    .el-badge__content {
      top: 10px !important;
      line-height: 17px !important;
    }
  }
  .el-tabs__header {
    margin: 0 !important;
    margin-top: 10px !important;
  }
}
.el-notification {
  background: #d9e3f3 !important;
}
</style>
=======
          this.newNum = el.num;
        } else if (el.deal_status == '2') {
          //已完成
          this.processingNum = el.num;
        }
      });
    },
    handleClick(tab, event) {
      let item = this.typeList.filter(el => el.name == this.activeName);
      this.$emit('changeSupportStatus', {
        index: item[0].index,
        ids: ''
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// .special-box {
//   /deep/ .el-tabs__nav {
//     width: 100% !important;
//     display: flex !important;
//     /deep/ .el-tabs__item {
//       flex: 1 !important;
//       text-align: center !important;
//       line-height: 50px !important;
//       height: 50px !important;
//     }
//     /deep/ .el-badge__content {
//       top: 10px !important;
//       line-height: 17px !important;
//     }
//   }
//   /deep/ .el-tabs__header {
//     margin: 0 !important;
//     margin-top: 10px !important;
//   }
// }
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
