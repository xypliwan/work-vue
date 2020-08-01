<template>
  <div class="order-detail">
    <el-dialog
      :title="title"
      :append-to-body="true"
      top="50px"
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
          <el-form-item label="工单号" prop="question_num">
            <div>{{ ruleForm.question_num }}</div>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <div>{{ ruleForm.title }}</div>
          </el-form-item>
          <el-form-item label="类型" prop="question_type">
            <div>{{ ruleForm.question_type == '1' ? '异常' : '咨询' }}</div>
          </el-form-item>
          <el-form-item label="问题分类"></el-form-item>
          <el-form-item label="一级分类" prop="first_category">
            <div>{{ ruleForm.first_category_name }}</div>
          </el-form-item>
          <el-form-item label="二级分类" prop="second_category">
            <div>{{ ruleForm.second_category_name }}</div>
          </el-form-item>
          <el-form-item label="三级分类" prop="third_category">
            <div>{{ ruleForm.third_category_name }}</div>
          </el-form-item>

          <el-form-item label="问题描述" prop="desc">
            <div v-html="ruleForm.desc" class="editor-dom" v-viewer></div>
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
import { getChatDetail, getAnswer } from '@/api/conversation'
import ChatBox from '_c/common/ChatBox'
export default {
  props: {
    dialogDetail: Boolean,
    id: String
  },
  data() {
    return {
      ruleForm: {
        show_headimg: '',
        question_num: '',
        question_id: '', //问题id
        title: '', //标题
        question_type: '', //问题类型 1异常 2咨询
        first_category: '', //一级分类
        second_category: '', //二级分类
        third_category: '', //三级分类
        desc: '', //描述
        range_id: '', //范围id
        product_id: '', //产品id/系统id
        question_status: '', //问题状态 0 未处理 1处理中 2 已采纳
        created_at: '', //创建时间
        username: '', //用户名
        company_name: '', //公司名
        file: [], //文件
        responsibility: '', //责任人
        support_id: '', //技术支持id 如果为0 表示没有技术支持
        auto_customer_sum: '', //是否弹出用户采纳窗口 1是
        show_headimg_user_id: '', //展示在会话窗口，会话对方的id
        show_headimg_username: '', //展示在会话窗口，会话对方的名字
        show_headimg_online_status: '', //展示在会话窗口，会话对方的工作状态
        change_question_log: '', //转交的原因
        change_question_username: '', //转交人
        list_id: '', //    需求id   > 0 为已关联需求id
        resolve_question_user_name: '', //责任人名
        first_category_name: '',
        second_category_name: '',
        third_category_name: ''
      },

      formLoading: false,
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
    id(newVal) {
      if (newVal) {
        this.dataList = []
        this.params.page = 1
        this.getChatDetail()
        this.getAnswer()
      }
    }
  },
  mounted() {},
  computed: {
    title() {
      return `工单${this.ruleForm.question_id} 详情`
    }
  },
  methods: {
    async getAnswer(oldHeight = null) {
      if (this.isLoadings) return
      this.isLoadings = true
      this.params.question_id = this.id
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
    async getChatDetail() {
      this.formLoading = true
      try {
        let { data } = await getChatDetail({ question_id: this.id })
        Object.assign(this.ruleForm, data)
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
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
.editor-dom {
  /deep/ img {
    max-width: 100% !important;
  }
}
/deep/ .el-select {
  display: block;
}
.history-chat {
  border: 1px solid #f1f1f1;
  height: 400px;
}
</style>
