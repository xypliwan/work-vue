<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      :title="titles"
      :append-to-body="true"
      :visible.sync="adoptWorkOrderVisible"
      width="700px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
          :disabled="isDisable"
        >
          <el-form-item label v-show="!isDisable">
            <div class="adopt-title">
              感谢您使用工单，麻烦您给我们本次服务进行以下总结：
            </div>
          </el-form-item>
          <el-form-item label="服务评分" prop="score">
            <el-rate
              v-model="ruleForm.score"
              @change="hanldeRate"
              :texts="texts"
              show-text
            ></el-rate>
          </el-form-item>
          <el-form-item label="服务评价" prop="tag_ids">
            <el-checkbox-group v-model="ruleForm.tag_ids">
              <el-checkbox
                :label="item.tag_id"
                v-for="(item, i) in evaluationList"
                :key="i"
                >{{ item.tag_name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="建议改善" prop="sum">
            <el-input
              type="textarea"
              v-show="!isDisable"
              placeholder="请输入您的建议"
              v-model="ruleForm.sum"
              :autosize="{ minRows: 4, maxRows: 4 }"
            ></el-input>
=======
    <el-dialog :title="titles" :append-to-body="true" :visible.sync="adoptWorkOrderVisible" width="700px" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading" :disabled="isDisable">
          <el-form-item label v-show="!isDisable">
            <div class="adopt-title">感谢您使用工单，麻烦您给我们本次服务进行以下总结：</div>
          </el-form-item>
          <el-form-item label="服务评分" prop="score">
            <el-rate v-model="ruleForm.score" @change="hanldeRate" :texts="texts" show-text></el-rate>
          </el-form-item>
          <el-form-item label="服务评价" prop="tag_ids">
            <el-checkbox-group v-model="ruleForm.tag_ids">
              <el-checkbox :label="item.tag_id" v-for="(item,i) in evaluationList" :key="i">{{item.tag_name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="建议改善" prop="sum">
            <el-input type="textarea" v-show="!isDisable" placeholder="请输入您的建议" v-model="ruleForm.sum" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            <div v-html="ruleForm.sum" v-show="isDisable"></div>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer" v-show="!isDisable">
<<<<<<< HEAD
        <el-button size="mini" @click="causeVisible = true"
          >问题未解决</el-button
        >
        <el-button size="mini" type="primary" @click="submit"
          >确认采纳</el-button
        >
      </div>

      <unresolved-cause
        :causeVisible.sync="causeVisible"
        :questionId="questionId"
        @causeOk="causeOk"
      ></unresolved-cause>
=======
        <el-button size="mini" @click="causeVisible = true">问题未解决</el-button>
        <el-button size="mini" type="primary" @click="submit">确认采纳</el-button>
      </div>

      <unresolved-cause :causeVisible.sync="causeVisible" :questionId="questionId" @causeOk="causeOk"></unresolved-cause>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    </el-dialog>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getTags } from '@/api/common'
import { addQuestionSumByCustomer, getCustomerSum } from '@/api/conversation'
import UnresolvedCause from './UnresolvedCause'
=======
import { getTags } from '@/api/common';
import { addQuestionSumByCustomer, questionUndeal, getCustomerSum } from '@/api/conversation';
import UnresolvedCause from './UnresolvedCause';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    adoptWorkOrderVisible: Boolean,
    questionId: String,
    status: String
  },
  data() {
    return {
      tagsList: [], //标签列表
      texts: [], //评分描述
      evaluationList: [], //平均描述列表

      ruleForm: {
        question_id: '', //问题id
        tag_ids: [], //标签id
        sum: '', //总结内容
        score: null //评分值
      },
      rules: {
        // tag_ids: [{ type: 'array', required: true, message: '至少选择一个', trigger: 'change' }],
        sum: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      formLoading: false,
      isDisable: false,
      titles: '采纳工单',
<<<<<<< HEAD
      causeVisible: false
    }
  },
  created() {
    this.getTags()
=======
      causeVisible:false
    };
  },
  created() {
    this.getTags();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  mounted() {},
  watch: {
    adoptWorkOrderVisible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
<<<<<<< HEAD
          this.ruleForm.tag_ids = []
        })
        if (this.status == '2') {
          this.isDisable = true
          this.titles = '已采纳工单'
          this.getCustomerSum()
        } else {
          this.isDisable = false
          this.titles = '采纳工单'
=======
          this.ruleForm.tag_ids = [];
        });
        if (this.status == '2') {
          this.isDisable = true;
          this.titles = '已采纳工单';
          this.getCustomerSum();
        } else {
          this.isDisable = false;
          this.titles = '采纳工单';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        }
      }
    }
  },
  methods: {
<<<<<<< HEAD
    causeOk(data) {
      this.$emit('causeOk', data)
      this.handleClose()
    },
    async getCustomerSum() {
      try {
        let { data } = await getCustomerSum({ question_id: this.questionId })
        this.ruleForm.score = data.score
        if (this.ruleForm.score > 0) {
          this.evaluationList = this.tagsList[this.ruleForm.score - 1].arr
        } else {
          this.evaluationList = []
        }
        this.ruleForm.sum = data.sum.sum
        data.tag.forEach(el => {
          this.ruleForm.tag_ids.push(el.tag_id)
        })
      } catch (error) {
        this._message(error)
      }
    },

    async addQuestionSumByCustomer() {
      this.formLoading = true
      this.ruleForm.question_id = this.questionId
      try {
        let { message } = await addQuestionSumByCustomer(this.ruleForm)
        this._message(message, 'success')
        this.$emit('cancelAdoptionOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    submit() {
      if (this.ruleForm.score == null) {
        this._message('请选择评分', 'warning')
        return
      } else if (this.ruleForm.tag_ids.length <= 0) {
        this._message('请选择服务评价', 'warning')
        return
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.addQuestionSumByCustomer()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    hanldeRate() {
      this.evaluationList = this.tagsList[this.ruleForm.score - 1].arr
      this.ruleForm.tag_ids = []
=======
    causeOk(data){
      this.$emit('causeOk',data)
      this.handleClose();
    },
    async getCustomerSum() {
      try {
        let { data } = await getCustomerSum({ question_id: this.questionId });
        this.ruleForm.score = data.score;
        if (this.ruleForm.score > 0) {
          this.evaluationList = this.tagsList[this.ruleForm.score - 1].arr;
        } else {
          this.evaluationList = [];
        }
        this.ruleForm.sum = data.sum.sum;
        data.tag.forEach(el => {
          this.ruleForm.tag_ids.push(el.tag_id);
        });
      } catch (error) {
        this._message(error);
      }
    },
    
    async addQuestionSumByCustomer() {
      this.formLoading = true;
      this.ruleForm.question_id = this.questionId;
      try {
        let { message } = await addQuestionSumByCustomer(this.ruleForm);
        this._message(message, 'success');
        this.$emit('cancelAdoptionOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    submit() {
      if (this.ruleForm.score == null) {
        this._message('请选择评分', 'warning');
        return;
      } else if (this.ruleForm.tag_ids.length <= 0) {
        this._message('请选择服务评价', 'warning');
        return;
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.addQuestionSumByCustomer();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    hanldeRate() {
      this.evaluationList = this.tagsList[this.ruleForm.score - 1].arr;
      this.ruleForm.tag_ids = [];
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    //只有客服身份才调用
    async getTags() {
      try {
<<<<<<< HEAD
        let { data } = await getTags({ tc_code: 'customer_tag' })
        data.forEach(el => {
          this.texts.push(el.tc_name)
        })
        this.tagsList = data
      } catch (error) {
        this._message(error)
      }
    },
    handleClose() {
      this.evaluationList = []
      this.$refs.ruleForm.resetFields()
      this.$emit('update:adoptWorkOrderVisible', false)
    }
  },
  components: {
    UnresolvedCause
  }
}
=======
        let { data } = await getTags({ tc_code: 'customer_tag' });
        data.forEach(el => {
          this.texts.push(el.tc_name);
        });
        this.tagsList = data;
      } catch (error) {
        this._message(error);
      }
    },
    handleClose() {
      this.evaluationList = [];
      this.$refs.ruleForm.resetFields();
      this.$emit('update:adoptWorkOrderVisible', false);
    }
  },
  components:{
    UnresolvedCause
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
/deep/ .el-rate {
  margin-top: 10px;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
