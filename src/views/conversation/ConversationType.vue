<template>
  <div class="special-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="processing">
        <div slot="label">
          <el-badge
            :value="processingNum"
            :hidden="processingNum <= '0'"
            :max="99"
            class="item"
          >
            <span>处理中</span>
            <el-popover
              placement="bottom"
              trigger="manual"
              v-model="processingVisible"
            >
              <process-list
                :list="processListData"
                @selectInfoType="selectInfoType"
                :infoType="infoType"
              ></process-list>
              <i
                slot="reference"
                @click.stop="getDealLabels"
                class="el-icon-caret-bottom"
                v-show="chatService == 1"
              ></i>
            </el-popover>
          </el-badge>
        </div>
      </el-tab-pane>
      <el-tab-pane name="new">
        <div slot="label">
          <el-badge
            :value="newNum"
            :hidden="newNum <= 0"
            :max="99"
            class="item"
          >
            <span>新工单</span>
          </el-badge>
        </div>
      </el-tab-pane>
      <el-tab-pane name="adopted">
        <div slot="label">
          已采纳
          <el-popover placement="bottom" trigger="manual" v-model="doneVisible">
            <process-list
              :list="processListDoneData"
              @selectInfoType="selectInfoType"
              :infoType="infoType"
            ></process-list>
            <i
              slot="reference"
              @click.stop="getDoneLabels"
              class="el-icon-caret-bottom"
              v-show="chatService == 1"
            ></i>
          </el-popover>
        </div>
      </el-tab-pane>
      <el-tab-pane name="all">
        <span slot="label">全部</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDealLabel, getDoneLabel } from '@/api/conversation'
import ProcessList from '_c/common/ProcessList'
export default {
  data() {
    return {
      typeList: [
        {
          name: 'processing',
          index: '1'
        },
        {
          name: 'new',
          index: '0'
        },

        {
          name: 'adopted',
          index: '2'
        },
        {
          name: 'all',
          index: ''
        }
      ],
      newNum: '', //未处理
      processingNum: '', //处理中
      activeName: 'processing',
      processListData: [], //处理中data
      infoType: '',
      processListDoneData: [], //已采纳data
      processingVisible: false,
      doneVisible: false
    }
  },
  mounted() {
    this.setNewInfo(this.infoCount)
    document.addEventListener('click', this.handelLister)

    let msgType = this.$route.query
    if (msgType && msgType.message_type == '1') {
      this.activeName = 'processing'
      this.$emit('changeQuestionStatus', {
        index: '1',
        ids: ''
      })
    }
  },
  computed: {
    ...mapGetters(['chatService', 'infoCount'])
  },
  watch: {
    infoCount(newVal) {
      this.setNewInfo(newVal)
    }
  },
  methods: {
    handelLister() {
      this.processingVisible = false
      this.doneVisible = false
    },
    setNewInfo(arr) {
      arr.forEach(el => {
        if (el.question_status == '0') {
          //未处理
          this.newNum = el.num
        } else if (el.question_status == '1') {
          //处理中
          this.processingNum = el.num
        }
      })
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
      }
    },
    selectInfoType(obj) {
      this.activeName = obj.infoType
      let item = this.typeList.filter(el => el.name == this.activeName)
      this.$emit('changeQuestionStatus', {
        index: item[0].index,
        ids: obj.item.ids
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
      let item = this.typeList.filter(el => el.name == this.activeName)
      this.$emit('changeQuestionStatus', {
        index: item[0].index,
        ids: ''
      })
    }
  },
  components: {
    ProcessList
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
