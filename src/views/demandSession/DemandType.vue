<template>
  <div class="demand-box-type">
<<<<<<< HEAD
    <el-select
      size="small"
      @change="changeType"
      v-model="activeName"
      placeholder="请选择"
      filterable
    >
      <el-option
        v-for="item in typeList"
        :key="item.status_code"
        :label="item.status_name"
        :value="item.status_code"
      >
        <span style="float: left">{{ item.status_name }}</span>
        <span
          style="float: right; color: #8492a6; font-size: 12px"
          v-show="item.num > 0"
          >共 {{ item.num }} 条新消息</span
        >
=======
    <el-select size="small" @change="changeType" v-model="activeName" placeholder="请选择" filterable>
      <el-option v-for="item in typeList" :key="item.status_code" :label="item.status_name" :value="item.status_code">
        <span style="float: left">{{ item.status_name }}</span>
        <span style="float: right; color: #8492a6; font-size: 12px" v-show="item.num > 0">共 {{ item.num }} 条新消息</span>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </el-option>
    </el-select>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getNeedStatus } from '@/api/demandConversation'
import { mapGetters } from 'vuex'
import { getDealLabel, getDoneLabel } from '@/api/conversation'
=======
import { getNeedStatus } from '@/api/demandConversation';
import { mapGetters } from 'vuex';
import { getChatListNum, getDealLabel, getDoneLabel } from '@/api/conversation';
import ProcessList from '_c/common/ProcessList';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      typeList: [
        // {
        //   status_name: '全部',
        //   status_code: '0'
        // },
      ],
      newNum: '', //未处理
      processingNum: '', //处理中
      activeName: '0',
      processListData: [], //处理中data
      infoType: '',
      processListDoneData: [], //已采纳data
      processingVisible: false,
      doneVisible: false
<<<<<<< HEAD
    }
  },
  created() {
    this.getNeedStatus()
  },
  mounted() {
    this.typeList = this.demandInfoCount
=======
    };
  },
  created() {
    this.getNeedStatus();
  },
  mounted() {
    this.typeList = this.demandInfoCount;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    // document.addEventListener('click', this.handelLister);
    // let msgType = this.$route.query;
    // if (msgType && msgType.message_type == '1') {
    //   this.activeName = 'processing';
    //   this.$emit('changeQuestionStatus', {
    //     index: '1',
    //     ids: ''
    //   });
    // }
  },
  computed: {
    ...mapGetters(['chatService', 'demandInfoCount'])
  },
  watch: {
    demandInfoCount(newVal) {
<<<<<<< HEAD
      this.typeList = newVal
=======
      this.typeList = newVal;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    handelLister() {
<<<<<<< HEAD
      this.processingVisible = false
      this.doneVisible = false
    },
    async getDoneLabels() {
      this.processingVisible = false
      this.doneVisible = true
      this.infoType = 'adopted'
      try {
        let { data } = await getDoneLabel()
        this.processListDoneData = data
      } catch (error) {
        this._message(error)
=======
      this.processingVisible = false;
      this.doneVisible = false;
    },
    async getDoneLabels() {
      this.processingVisible = false;
      this.doneVisible = true;
      this.infoType = 'adopted';
      try {
        let { data } = await getDoneLabel();
        this.processListDoneData = data;
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    changeType() {
      this.$emit('changeDemandStatus', {
        index: this.activeName,
        ids: ''
<<<<<<< HEAD
      })
    },
    async getDealLabels() {
      this.doneVisible = false
      this.processingVisible = true
      this.infoType = 'processing'
      try {
        let { data } = await getDealLabel()
        this.processListData = data
      } catch (error) {
        this._message(error)
      }
    },
    handleClick() {
      this.$emit('changeDemandStatus', {
        index: this.activeName,
        ids: ''
      })
    },
    async getNeedStatus() {
      try {
        let { data } = await getNeedStatus()
        this.typeList = data
      } catch (error) {
        this._message(error)
      }
    }
  },
  components: {}
}
=======
      });
    },
    async getDealLabels() {
      this.doneVisible = false;
      this.processingVisible = true;
      this.infoType = 'processing';
      try {
        let { data } = await getDealLabel();
        this.processListData = data;
      } catch (error) {
        this._message(error);
      }
    },
    handleClick(tab, event) {
      this.$emit('changeDemandStatus', {
        index: this.activeName,
        ids: ''
      });
    },
    async getNeedStatus() {
      try {
        let { data } = await getNeedStatus();
        this.typeList = data;
      } catch (error) {
        this._message(error);
      }
    }
  },
  components: {
    ProcessList
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.demand-box-type {
  height: 40px;
  margin-top: 20px;
  /deep/ .el-input__inner {
    background: #fff !important;
  }
  // /deep/ .el-tabs__nav {
  //   /deep/ .el-tabs__item {
  //     text-align: center !important;
  //     line-height: 50px !important;
  //     height: 50px !important;
  //   }
  //   /deep/ .el-badge__content {
  //     top: 10px !important;
  //     line-height: 17px !important;
  //   }
  //   /deep/ .el-tabs__nav-next {
  //     line-height: 50px;
  //   }
  //   /deep/.el-tabs__item.is-top:last-child {
  //     padding-right: 20px !important;
  //   }
  // }
  // /deep/ .el-tabs__header {
  //   margin: 0 !important;
  //   margin-top: 10px !important;
  // }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
