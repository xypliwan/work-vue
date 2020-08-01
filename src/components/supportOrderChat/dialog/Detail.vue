<template>
  <div>
    <!-- v-dialogDrag -->
    <el-dialog
      :title="title"
      top="50px"
      :append-to-body="true"
      :visible.sync="dialogDetail"
      width="1000px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          :model="ruleForm"
          size="small"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题">
            <div>{{ ruleForm.title }}</div>
          </el-form-item>
          <el-form-item label="类型">
            <div>
              <el-tag type="info" size="mini">{{
                ruleForm.support_type == '1' ? '异常' : '咨询'
              }}</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="公司名称">
            <div>{{ ruleForm.company_name }}</div>
          </el-form-item>
          <el-form-item label="提出时间">
            <div>{{ ruleForm.created_at }}</div>
          </el-form-item>
          <el-form-item label="客户类型">
            <div>{{ ruleForm.customer_type }}</div>
          </el-form-item>
          <el-form-item label="附件">
            <div v-for="(item, i) in ruleForm.file" :key="i">
              <a :href="item.path" target="_blank">{{ item.name }}</a>
            </div>
          </el-form-item>

          <el-form-item label="问题分类">
            <el-tag type="info" size="mini">{{
              ruleForm.first_category_name
            }}</el-tag
            >&nbsp;&nbsp;
            <el-tag type="info" size="mini">{{
              ruleForm.second_category_name
            }}</el-tag
            >&nbsp;&nbsp;
            <el-tag type="info" size="mini">{{
              ruleForm.third_category_name
            }}</el-tag>
          </el-form-item>

          <el-form-item label="问题描述">
            <div v-viewer v-html="ruleForm.desc" class="cont-box-wrapper"></div>
          </el-form-item>
          <el-form-item label="工单ID" v-if="ruleForm.question_id !== '0'">
            <div>{{ ruleForm.question_num }}</div>
          </el-form-item>
          <el-form-item
            label="客服历史聊天"
            v-if="ruleForm.question_id !== '0'"
          >
            <div class="history-chat">
              <chat-box
                ref="chatBox"
                :chatItemId="ruleForm.question_id"
                :hasMore="hasMore"
                :isLoadings="isLoadings"
                :direction="direction"
                :dataList="dataList"
                @loadingData="loadingData"
              ></chat-box>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ChatBox from '_c/common/ChatBox'
import { getAnswer } from '@/api/conversation'
export default {
  props: {
    dialogDetail: Boolean,
    detail: Object
    // rangeList: [Array] //范围列表
  },
  data() {
    return {
      ruleForm: {
        support_id: '', //支持id
        title: '', //标题
        first_category: '', //一级分类
        second_category: '', //二级分类
        third_category: '', //三级分类
        support_type: '', //1异常 2咨询
        deal_status: '', //0未处理 1处理中 2已解决 3未解决
        resolve_user_name: '', //解决技术支持的人名
        demand_user_name: '', //提出技术支持的人名
        first_category_name: '',
        second_category_name: '',
        third_category_name: '',
        desc: '',
        file: [],
        question_id: '', //是否有关联问题， 问题的id   0为没有
        question_num: '',
        company_name: '', //公司名称
        customer_type: '' //客户标签
      },
      height: '400px',
      hasMore: false,
      isLoadings: false,
      direction: false,
      dataList: [],
      params: {
        question_id: '',
        page: 1,
        pageSize: 50
      }
    }
  },
  watch: {
    dialogDetail(newVal) {
      if (newVal) {
        this.dataList = []
        this.params.page = 1
        Object.assign(this.ruleForm, this.detail)
        if (this.ruleForm.question_id !== '0') {
          this.getAnswer()
        }
      }
    }
  },
  computed: {
    title() {
      return `支持ID: ${this.ruleForm.support_id} 详情`
    }
  },
  methods: {
    async getAnswer(oldHeight = null) {
      this.isLoadings = true
      this.params.question_id = this.ruleForm.question_id
      try {
        let { data } = await getAnswer(this.params)
        let snapData = data.reverse()
        this.hasMore = data.length < this.params.pageSize
        this.dataList = [...snapData, ...this.dataList]
        this.dataList.forEach(el => {
          el.msgLoading = false
        })

        if (this.$refs['chatBox'] !== undefined) {
          this.$refs.chatBox.resetScrollHeight(oldHeight)
        }
      } catch (error) {
        this._message(error)
      }
      this.isLoadings = false
    },
    loadingData(oldHeight) {
      //加载更多列表数据
      this.params.page++
      this.getAnswer(oldHeight)
    },
    handleClose() {
      this.$emit('update:dialogDetail', false)
    }
  },
  components: {
    ChatBox
  }
}
</script>

<style lang="scss" scoped>
.cont-box-wrapper {
  /deep/ img {
    max-width: 100%;
  }
}
.history-chat {
  border: 1px solid #f1f1f1;
  height: 400px;
}
</style>
