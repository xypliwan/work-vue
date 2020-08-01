<template>
  <div class="submit-demand">
<<<<<<< HEAD
    <el-form
      :model="ruleForm"
      size="small"
      v-loading="formLoading"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
=======
    <el-form :model="ruleForm" size="small" v-loading="formLoading" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      <el-row v-if="checkAllNeed == 1">
        <el-col :span="6">
          <!-- <el-form-item label="所属公司" prop="extend_deal_company_id">
            <el-select clearable filterable @change="changeCompanyId" v-model="ruleForm.extend_deal_company_id" placeholder="请选择">
              <el-option :label="item.company_name" :value="item.company_id" v-for="(item,i) in companyList" :key="i"></el-option>
            </el-select>
          </el-form-item>-->

          <el-form-item label="所属公司" prop="extend_deal_company_id">
            <el-select
              v-model="ruleForm.extend_deal_company_id"
              @change="changeCompanyId"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入公司名称搜索"
              :remote-method="remoteCompany"
              :loading="cLoading"
            >
<<<<<<< HEAD
              <el-option
                v-for="item in companyList"
                :key="item.company_id"
                :label="item.company_name"
                :value="item.company_id"
              ></el-option>
=======
              <el-option v-for="item in companyList" :key="item.company_id" :label="item.company_name" :value="item.company_id"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="所属人" prop="extend_deal_user_id">
<<<<<<< HEAD
            <el-select
              :disabled="ruleForm.extend_deal_company_id == ''"
              clearable
              filterable
              v-model="ruleForm.extend_deal_user_id"
              placeholder="请先选择所属公司"
            >
              <el-option
                :label="item.username"
                :value="item.user_id"
                v-for="(item, i) in companyUserList"
                :key="i"
              ></el-option>
=======
            <el-select :disabled="ruleForm.extend_deal_company_id == ''" clearable filterable v-model="ruleForm.extend_deal_user_id" placeholder="请先选择所属公司">
              <el-option :label="item.username" :value="item.user_id" v-for="(item,i) in companyUserList" :key="i"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="需求标题" prop="title">
<<<<<<< HEAD
        <el-input
          v-model="ruleForm.title"
          clearable
          placeholder="请您简洁描述您的需求，或通过关键字进行知识库检索，也许已有功能呢？"
        >
          <el-button slot="append" type="primary" @click="toKnowledge"
            >检索知识库</el-button
          >
=======
        <el-input v-model="ruleForm.title" clearable placeholder="请您简洁描述您的需求，或通过关键字进行知识库检索，也许已有功能呢？">
          <el-button slot="append" type="primary" @click="toKnowledge">检索知识库</el-button>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="影响范围" prop="range_id">
<<<<<<< HEAD
            <el-select
              clearable
              filterable
              v-model="ruleForm.range_id"
              placeholder="请选择"
            >
              <el-option
                :label="item.name"
                :value="item.range_id"
                v-for="(item, i) in rangeList"
                :key="i"
              ></el-option>
=======
            <el-select clearable filterable v-model="ruleForm.range_id" placeholder="请选择">
              <el-option :label="item.name" :value="item.range_id" v-for="(item,i) in rangeList" :key="i"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="需求模块" prop="model_id">
<<<<<<< HEAD
            <el-select
              clearable
              filterable
              v-model="ruleForm.model_id"
              placeholder="请选择"
            >
              <el-option
                :label="item.model_name"
                :value="item.model_id"
                v-for="(item, i) in modelList"
                :key="i"
              ></el-option>
=======
            <el-select clearable filterable v-model="ruleForm.model_id" placeholder="请选择">
              <el-option :label="item.model_name" :value="item.model_id" v-for="(item,i) in modelList" :key="i"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label label-width="20px" prop="isPaly">
            <el-checkbox v-model="isPaly">紧急需求，愿意付费</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
<<<<<<< HEAD
          <el-form-item label prop="isBug" label-width="100px">
            <el-checkbox v-model="isBug">初步判定是BUG</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-show="isBug && checkAllNeed == 1">
=======
          <el-form-item label prop="isBug">
            <el-checkbox v-model="isBug">初步判定是BUG</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1" v-show="isBug && checkAllNeed == 1">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          <el-form-item label label-width="20px" prop="isConfirmBug">
            <el-checkbox v-model="isConfirmBug">确认走BUG处理流程</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div class="sort-title">
          请您录入详情信息:
          <span class="tip">
<<<<<<< HEAD
            (
            避免需求提交的内容不标准规范，导致产生需求打回的结果，从而增加更多的沟通成本，请
=======
            ( 避免需求提交的内容不标准规范，导致产生需求打回的结果，从而增加更多的沟通成本，请
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            <span class="tip-detail">认真查阅</span>需求提交内容格式标准 )
          </span>
        </div>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label-width="20px" prop="backgroup">
            <p>需求目的</p>
<<<<<<< HEAD
            <editor-purpose
              id="editPurpose"
              :contentDefault="ruleForm.backgroup"
              ref="backgroupRef"
              placeholder="您提的不是“需求”，而是“解决方案”，请您阐述需求的最终目的。"
            ></editor-purpose>
=======
            <editor-purpose :content="ruleForm.backgroup" ref="backgroupRef" uploadUrl="/common/upload" placeholders="您提的不是“需求”，而是“解决方案”，请您阐述需求的最终目的。"></editor-purpose>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="20px" prop="adjust">
            <p>改动细节</p>
<<<<<<< HEAD
            <editor-detail
              id="editDetail"
              :contentDefault="ruleForm.adjust"
              ref="adjustRef"
              placeholder="理解总有差异，您所提供的信息足够清晰，就足以降低差异化，同理减少重复沟通的烦恼。"
            ></editor-detail>
=======
            <editor-detail :content="ruleForm.adjust" ref="adjustRef" uploadUrl="/common/upload" placeholders="理解总有差异，您所提供的信息足够清晰，就足以降低差异化，同理减少重复沟通的烦恼。"></editor-detail>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="需求附件" prop="file">
<<<<<<< HEAD
            <upload
              desc="最多可以上传3个文件，每个附件大小不得超过5M,附件支持jpg、png、gif、zip、rar、doc、xls、txt、pdf格式"
              :limit="3"
              :list="ruleForm.file"
              @successOk="successOk"
              @deleteFile="deleteFile"
            ></upload>
=======
            <upload desc="最多可以上传3个文件，每个附件大小不得超过5M,附件支持jpg、png、gif、zip、rar、doc、xls、txt、pdf格式" :limit="3" :list="ruleForm.file" @successOk="successOk" @deleteFile="deleteFile"></upload>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </el-form-item>
        </el-col>
      </el-row>

<<<<<<< HEAD
      <h4 class="contact-info">
        请您留下联系方式，便于产品经理在分析需求过程中，主动联系您。
      </h4>
=======
      <h4 class="contact-info">请您留下联系方式，便于产品经理在分析需求过程中，主动联系您。</h4>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      <el-row>
        <el-col :span="8">
          <el-form-item label-width="20px" prop="contact_name">
            <p>姓名：</p>
            <el-input clearable v-model="ruleForm.contact_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="20px" prop="phone">
            <p>电话：</p>
            <el-input clearable v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="20px" prop="email">
            <p>邮箱：</p>
            <el-input clearable v-model="ruleForm.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="20px">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
<<<<<<< HEAD
import {
  getQuestionRange,
  getCompanyUser,
  getCompanyBySearch
} from '@/api/common'
import {
  needGetModel,
  submitDemand,
  getUserContact
} from '@/api/servicePlatform'
import { mapGetters } from 'vuex'
import EditorPurpose from '_c/editor/LightEditor'
import EditorDetail from '_c/editor/LightEditor'
import Upload from '_c/common/Upload'
import { getChatDetail } from '@/api/conversation'
=======
import { getQuestionRange, getCompanyUser, getCompanyBySearch } from '@/api/common';
import { needGetModel, submitDemand, getUserContact } from '@/api/servicePlatform';
import { mapGetters } from 'vuex';
import EditorPurpose from '_c/editor/LightEditor';
import EditorDetail from '_c/editor/LightEditor';
import Upload from '_c/common/Upload';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      ruleForm: {
        title: '', //标题
        range_id: null, //范围id
        model_id: null, //模块id
        product_id: null, //产品id/系统id
        is_pay: 0, //1付费需求
        is_bug: 0, //是否为bug
<<<<<<< HEAD
        backgroup: `<h3><strong>用户场景</strong></h3><p><p/>
        <span style="font-size:13px">-</span><br/><br/>
        <h3><strong style="font-size:17px">功能概述</strong></h3><p><p/>
        <span style="font-size:13px">-</span><br/><br/>
        <h3><strong style="font-size:15px">逻辑流程</strong></h3><p><p/>
        <span style="font-size:13px">-</span><br/><br/>`, //需求背景
        adjust: `<h3><strong>页面路径</strong></h3><p><p/>
        <span style="font-size:13px">-</span><br/><br/>
        <h3><strong style="font-size:17px">页面说明</strong></h3><p><p/>
        <span style="font-size:13px">-</span><br/><br/>
        <h3><strong style="font-size:15px">注意事项</strong></h3><p><p/>
        <span style="font-size:13px">-</span><br/><br/>`, //调整
=======
        backgroup: '', //需求背景
        adjust: '', //调整
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        contact_name: '', //联系人
        phone: '', //电话
        email: '', //邮箱
        file: [],
        extend_deal_company_id: '', //所属公司id
        extend_deal_user_id: '', //所属公司用户id
        is_confirm_bug: 0, //是否确认bug
        question_num: '', //需求id
        support_id: '' //支持id
      },
      rules: {
        title: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        range_id: [{ required: true, message: '请选择', trigger: 'change' }],
        model_id: [{ required: true, message: '请选择', trigger: 'change' }],
        contact_name: [{ required: true, message: '请输入', trigger: 'blur' }],
<<<<<<< HEAD
        phone: [{ required: true, message: '请输入', trigger: 'blur' }]
=======
        phone: [{ required: true, message: '请输入', trigger: 'blur' }],
        email: [{ required: true, message: '请输入', trigger: 'blur' }]
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      },
      formLoading: false,
      rangeList: [], //影响范围列表
      modelList: [], //需求模块列表
      isPaly: false,
      isBug: false,
      isConfirmBug: false,
      companyList: [], //所有公司列表
      companyUserList: [], //公司下所有人列表
      cLoading: false
<<<<<<< HEAD
    }
  },
  mounted() {
    let params = this.$route.query
    if (params.questionId && params.supportId) {
      this.ruleForm.question_num = params.questionId
      this.ruleForm.support_id = params.supportId
      this.isBug = Number(params.isBug) ? true : false
      this.ruleForm.is_bug = Number(params.isBug)
      if (this.checkAllNeed == 1) {
        this.isConfirmBug = Number(params.isBug) ? true : false
        this.ruleForm.is_confirm_bug = Number(params.isBug)
      } else {
        this.isConfirmBug = false
        this.ruleForm.is_confirm_bug = 0
      }
      if (this.chatService == 1) {
        // 客服身份需要带出默认内容
        this.getChatDetail(params.questionRealId)
      }
    }
    this.getUserContact()

    if (this.currentSystemIdx !== '') {
      this.getQuestionRange()
      this.getModel()
    }
  },
  watch: {
    currentSystemIdx() {
      ;(this.ruleForm.range_id = ''),
        (this.ruleForm.model_id = ''),
        this.getQuestionRange()
      this.getModel()
    },
    isPaly(newVal) {
      this.ruleForm.is_pay = newVal ? 1 : 0
    },
    isBug(newVal) {
      this.ruleForm.is_bug = newVal ? 1 : 0
      this.isConfirmBug = newVal ? this.isConfirmBug : false
    },
    isConfirmBug(newVal) {
      this.ruleForm.is_confirm_bug = newVal ? 1 : 0
    },
    userId() {
      this.ruleForm.extend_deal_company_id = this.companyId
      this.ruleForm.extend_deal_user_id = this.userId
    }
  },
  computed: {
    ...mapGetters([
      'currentSystemIdx',
      'userId',
      'companyId',
      'checkAllNeed',
      'chatService'
    ])
  },
  methods: {
    //获取工单详情
    async getChatDetail(id) {
      this.formLoading = true
      try {
        let { data } = await getChatDetail({ question_id: id })
        // Object.assign(this.ruleForm, data)
        this.ruleForm.title = data.title
        this.ruleForm.range_id = data.range_id
        await this.remoteCompany(data.company_name)
        let companyItem = this.companyList.find(
          el => el.company_name == data.company_name
        )
        if (companyItem) {
          this.ruleForm.extend_deal_company_id = companyItem.company_id
        }
        await this.changeCompanyId()
        let userItem = this.companyUserList.find(
          el => el.user_id == data.user_id
        )
        this.ruleForm.extend_deal_user_id = userItem ? userItem.user_id : ''

        let questionUrl = `${window.location.origin}/#/conversation?id=${data.question_id}&num=${data.question_num}&supportId=${data.support_id}`
        this.ruleForm.backgroup = `
        <h3><strong>工单ID:</strong> ${data.question_num}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标题: <a href="${questionUrl}" target="_blank">${data.title}</a></h3>
        <p><p/>${this.ruleForm.backgroup}`
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    async remoteCompany(query) {
      if (!query) return
      this.cLoading = true
      try {
        let { data } = await getCompanyBySearch({ keyword: query })
        this.companyList = data
      } catch (error) {
        this._message(error)
      }
      this.cLoading = false
=======
    };
  },
  mounted() {
    let params = this.$route.query;
    if (params) {
      this.ruleForm.question_num = params.questionId;
      this.ruleForm.support_id = params.supportId;
      this.isBug = Number(params.isBug) ? true : false;
      this.ruleForm.is_bug = Number(params.isBug);
      if (this.checkAllNeed == 1) {
        this.isConfirmBug = Number(params.isBug) ? true : false;
        this.ruleForm.is_confirm_bug = Number(params.isBug);
      } else {
        this.isConfirmBug = false;
        this.ruleForm.is_confirm_bug = 0;
      }
    }
    this.getUserContact();

    if (this.currentSystemIdx !== '') {
      this.getQuestionRange();
      this.getModel();
    }
  },
  watch: {
    currentSystemIdx(newVal) {
      (this.ruleForm.range_id = ''), (this.ruleForm.model_id = ''), this.getQuestionRange();
      this.getModel();
    },
    isPaly(newVal) {
      this.ruleForm.is_pay = newVal ? 1 : 0;
    },
    isBug(newVal) {
      this.ruleForm.is_bug = newVal ? 1 : 0;
      this.isConfirmBug = newVal ? this.isConfirmBug : false;
    },
    isConfirmBug(newVal) {
      this.ruleForm.is_confirm_bug = newVal ? 1 : 0;
    },
    userId(newVal) {
      this.ruleForm.extend_deal_company_id = this.companyId;
      this.ruleForm.extend_deal_user_id = this.userId;
    }
  },
  computed: {
    ...mapGetters(['currentSystemIdx', 'userId', 'companyId', 'checkAllNeed'])
  },
  methods: {
    async remoteCompany(query) {
      if (!query) return;
      this.cLoading = true;
      try {
        let { data } = await getCompanyBySearch({ keyword: query });
        this.companyList = data;
      } catch (error) {
        this._message(error);
      }
      this.cLoading = false;
    },
    uploadOk(data) {
      console.log(data, '333344');
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
<<<<<<< HEAD
          this.ruleForm.backgroup = this.$refs.backgroupRef.getHtml()
          this.ruleForm.adjust = this.$refs.adjustRef.getHtml()
          this.ruleForm.product_id = this.currentSystemIdx
          if (this.ruleForm.backgroup.length <= 0) {
            this._message('请输入需求目的', 'warning')
            return
          } else if (this.ruleForm.adjust.length <= 0) {
            this._message('请输入改动细节', 'warning')
            return
          }
          this.submitDemands()
        } else {
          return false
        }
      })
    },
    async changeCompanyId() {
      this.ruleForm.extend_deal_user_id = ''
      if (this.ruleForm.extend_deal_company_id) {
        await this.getCompanyUser()
=======
          this.ruleForm.backgroup = this.$refs.backgroupRef.getHtml();
          this.ruleForm.adjust = this.$refs.adjustRef.getHtml();
          this.ruleForm.product_id = this.currentSystemIdx;
          if (this.ruleForm.backgroup.length <= 0) {
            this._message('请输入需求目的', 'warning');
            return;
          } else if (this.ruleForm.adjust.length <= 0) {
            this._message('请输入改动细节', 'warning');
            return;
          }
          this.submitDemands();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeCompanyId() {
      this.ruleForm.extend_deal_user_id = '';
      if (this.ruleForm.extend_deal_company_id) {
        this.getCompanyUser();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },

    async getCompanyUser() {
      try {
<<<<<<< HEAD
        let { data } = await getCompanyUser({
          company_id: this.ruleForm.extend_deal_company_id
        })
        this.companyUserList = data
      } catch (error) {
        this._message(error)
      }
    },
    async submitDemands() {
      this.formLoading = true
      try {
        let { data, message } = await submitDemand(this.ruleForm)
        this._message(message, 'success')
        this.$refs.ruleForm.resetFields()
        this.$refs.backgroupRef.clearHtml()
        this.$refs.adjustRef.clearHtml()
        this.$router.push(`/demand-session?demandid=${data.list_id}`)
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
=======
        let { data } = await getCompanyUser({ company_id: this.ruleForm.extend_deal_company_id });
        this.companyUserList = data;
      } catch (error) {
        this._message(error);
      }
    },
    async submitDemands() {
      this.formLoading = true;
      try {
        let { data, message } = await submitDemand(this.ruleForm);
        this._message(message, 'success');
        this.$refs.ruleForm.resetFields();
        this.$refs.backgroupRef.clearHtml();
        this.$refs.adjustRef.clearHtml();
        this.$router.push(`/demand-session?demandid=${data.list_id}`);
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    successOk(data) {
      let item = {
        name: data.file_name,
        path: data.url
<<<<<<< HEAD
      }
      this.ruleForm.file.push(item)
    },
    deleteFile(i) {
      this.ruleForm.file.splice(i, 1)
    },
    toKnowledge() {
      if (!this.ruleForm.title.length) {
        this._message('请输入需求标题')
        return
      }
      let url = `${window.location.origin}/#/yc-university/history-brows?form=${this.ruleForm.title}`
      window.open(url, '_blank')
    },
    async getModel() {
      try {
        let { data } = await needGetModel({ product_id: this.currentSystemIdx })
        this.modelList = data
      } catch (error) {
        this._message(error)
=======
      };
      this.ruleForm.file.push(item);
    },
    deleteFile(i) {
      this.ruleForm.file.splice(i, 1);
    },
    toKnowledge() {
      if (!this.ruleForm.title.length) {
        this._message('请输入需求标题');
        return;
      }
      let url = `${window.location.origin}/#/yc-university/history-brows?form=${this.ruleForm.title}`;
      window.open(url, '_blank');
    },
    async getModel() {
      try {
        let { data } = await needGetModel({ product_id: this.currentSystemIdx });
        this.modelList = data;
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    async getQuestionRange() {
      try {
<<<<<<< HEAD
        let { data } = await getQuestionRange({
          product_id: this.currentSystemIdx
        })
        this.rangeList = data
      } catch (error) {
        this._message(error)
=======
        let { data } = await getQuestionRange({ product_id: this.currentSystemIdx });
        this.rangeList = data;
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    async getUserContact() {
      try {
<<<<<<< HEAD
        let { data } = await getUserContact()
        this.ruleForm.contact_name = data.contact_name
        this.ruleForm.phone = data.phone
        this.ruleForm.email = data.email
      } catch (error) {
        this._message(error)
=======
        let { data } = await getUserContact();
        this.ruleForm.contact_name = data.contact_name;
        this.ruleForm.phone = data.phone;
        this.ruleForm.email = data.email;
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },
  components: {
    EditorPurpose,
    EditorDetail,
    Upload
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.submit-demand {
  overflow: auto;
  .sort-title {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #daecff;
    font-size: 16px;
    color: #409eff;
    .tip {
      font-size: 13px;
      color: #666;
      .tip-detail {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .contact-info {
    margin-left: 20px;
    color: #666;
    margin-top: 20px;
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
