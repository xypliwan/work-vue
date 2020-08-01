<template>
  <div>
<<<<<<< HEAD
    <el-form
      :model="ruleForm"
      size="small"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      v-loading="formLoading"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="ruleForm.title"
          clearable
          placeholder="请将您所遇到的问题进行简述，或通过关键字进行知识库检索，寻找您满意的答案。"
        >
          <el-button slot="append" type="primary" @click="toKnowledge"
            >检索知识库</el-button
          >
=======
    <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" clearable placeholder="请将您所遇到的问题进行简述，或通过关键字进行知识库检索，寻找您满意的答案。">
          <el-button slot="append" type="primary" @click="toKnowledge">检索知识库</el-button>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        </el-input>
      </el-form-item>
      <el-form-item label="类型" prop="support_type">
        <el-radio-group v-model="ruleForm.support_type">
          <el-radio label="1">异常</el-radio>
          <el-radio label="2">咨询</el-radio>
        </el-radio-group>
      </el-form-item>
<<<<<<< HEAD
      <!-- <el-form-item label="是否内部发起" prop="support_usr_type">
        <el-radio-group v-model="ruleForm.support_usr_type">
          <el-radio :label="0">普通提交</el-radio>
          <el-radio :label="1">内部人员提交</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-row>
        <el-col :span="7">
          <el-form-item label="影响范围" prop="range_id">
            <el-select
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
      <el-row>
        <el-col :span="7">
          <el-form-item label="影响范围" prop="range_id">
            <el-select filterable v-model="ruleForm.range_id" placeholder="请选择">
              <el-option :label="item.name" :value="item.range_id" v-for="(item,i) in rangeList" :key="i"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="所属公司" prop="company_id">
<<<<<<< HEAD
            <el-select
              v-model="ruleForm.company_id"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入公司名称搜索"
              :remote-method="remoteCompany"
              :loading="cLoading"
            >
              <el-option
                v-for="item in companyList"
                :key="item.company_id"
                :label="item.company_name"
                :value="item.company_id"
              ></el-option>
=======
            <el-select v-model="ruleForm.company_id" filterable clearable remote reserve-keyword placeholder="请输入公司名称搜索" :remote-method="remoteCompany" :loading="cLoading">
              <el-option v-for="item in companyList" :key="item.company_id" :label="item.company_name" :value="item.company_id"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
<<<<<<< HEAD
          <el-form-item label="项目" prop="sp_id">
            <el-select filterable v-model="ruleForm.sp_id" placeholder="请选择">
              <el-option
                v-for="(item, i) in supportProjectList"
                :key="i"
                :label="item.project"
                :value="item.sp_id"
              ></el-option>
=======
          <el-form-item label="线上支持" prop="resolve_user_id">
            <el-select filterable v-model="ruleForm.resolve_user_id" placeholder="请选择">
              <el-option :label="item.username" :value="item.user_id" v-for="(item,i) in resolveUserList" :key="i"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
<<<<<<< HEAD
      <el-form-item label>问题分类选择 :</el-form-item>
      <div class="fl-box">
        <el-form-item label="一级分类" prop="first_category">
          <el-select
            @change="firstLevelId"
            v-model="ruleForm.first_category"
            placeholder="请选择"
          >
            <el-option
              :label="item.name"
              :value="item.category_id"
              v-for="(item, i) in firstLevelList"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_category">
          <el-select
            @change="secondLevelId"
            :disabled="!ruleForm.first_category"
            v-model="ruleForm.second_category"
            placeholder="请先选择一级分类"
          >
            <el-option
              :label="item.name"
              :value="item.category_id"
              v-for="(item, i) in secondaryList"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类" prop="third_category">
          <el-select
            :disabled="!ruleForm.second_category"
            v-model="ruleForm.third_category"
            placeholder="请先选择二级分类"
          >
            <el-option
              :label="`${item.name} 【${item.difficulty_level}】`"
              :value="item.category_id"
              v-for="(item, i) in threeLevelList"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
=======
      <el-row>
        <el-col :span="7">
          <el-form-item label="问题分类">
            <div class="classification">一级分类</div>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label-width="0px">
            <div class="classification">
              二级分类
              <span>(请先选择一级分类)</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label-width="0px">
            <div class="classification">
              三级分类
              <span>(请先选择二级分类)</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-loading="firstLevelLoading">
          <el-form-item prop="first_category">
            <sort-list :id="ruleForm.first_category" ref="firstLevel" :list="firstLevelList" @selectId="firstLevelId"></sort-list>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1" v-loading="secondaryLoading">
          <el-form-item label-width="0px" prop="second_category">
            <sort-list :id="ruleForm.second_category" ref="secondLevel" :list="secondaryList" @selectId="secondLevelId"></sort-list>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1" v-loading="threeLevelLoading">
          <el-form-item label-width="0px" prop="third_category">
            <sort-list :id="ruleForm.third_category" ref="threeLevel" :list="threeLevelList" @selectId="threeLevelId"></sort-list>
          </el-form-item>
        </el-col>
      </el-row>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

      <el-row>
        <el-col :span="16">
          <el-form-item label="问题描述">
<<<<<<< HEAD
            <editor
              ref="editor"
              id="editSupport"
              placeholder="请您详细描述问题，尽量提供相关的业务单号/截图/异常说明等，便于我们对问题的准确定位，节省双方的沟通成本，尽快解决您的问题。"
            ></editor>
=======
            <editor ref="editor" uploadUrl="/common/upload" placeholders="请您详细描述问题，尽量提供相关的业务单号/截图/异常说明等，便于我们对问题的准确定位，节省双方的沟通成本，尽快解决您的问题。"></editor>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="上传文件" prop="file">
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
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters } from 'vuex'
import {
  getQuestionSupportCategory,
  getQuestionRange,
  getCompanyBySearch,
  getSupportProject
} from '@/api/common'

import { addSupport, getTecPeople } from '@/api/servicePlatform'
import Upload from '_c/common/Upload'
import Editor from '_c/editor/LightEditor'
=======
import { mapGetters } from 'vuex';
import SortList from '../submitWorkOrder/SortList';
import { getQuestionSupportCategory, getQuestionRange, getProductUser, getCompanyBySearch } from '@/api/common';
import { addSupport, getTecPeople } from '@/api/servicePlatform';
import Upload from '_c/common/Upload';
import Editor from '_c/editor/LightEditor';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  data() {
    return {
      ruleForm: {
        title: '', //标题
        support_type: '1', //类型 1异常 2咨询
        company_id: '', //所属公司
        resolve_user_id: '', //线上支持人员id
        first_category: '', //一级分类id
        second_category: '', //二级分类id
        third_category: '', //三级分类id
        range_id: '', //范围id
        desc: '', //描述
        product_id: '', //产品id/系统id
<<<<<<< HEAD
        file: [], //文件,
        sp_id: '' //项目id
        // support_usr_type: 0 //提交者标记：0普通提交，1内部人员提交
=======
        file: [] //文件
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      },
      rules: {
        title: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
<<<<<<< HEAD
        question_type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        company_id: [{ required: true, message: '请选择', trigger: 'change' }],
        sp_id: [{ required: true, message: '请选择', trigger: 'change' }],
        first_category: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        second_category: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        third_category: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
=======
        question_type: [{ required: true, message: '请选择', trigger: 'change' }],
        company_id: [{ required: true, message: '请选择', trigger: 'change' }],
        resolve_user_id: [{ required: true, message: '请选择', trigger: 'change' }],
        first_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
        second_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
        third_category: [{ required: true, message: '请选择', trigger: 'blur change' }],
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        range_id: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      sortParams: {
        pid: '', //父类id 一级分类为0
        product_id: '' //产品id/系统id
      },
      firstLevelList: [], //一级分类列表
      secondaryList: [], //二级列表、
      threeLevelList: [], //三级列表
      firstLevelLoading: false,
      secondaryLoading: false,
      threeLevelLoading: false,
      rangeList: [], //影响范围列表
      formLoading: false,
      companyList: [], //公司列表
      resolveUserList: [], //线上支持人员列表
<<<<<<< HEAD
      cLoading: false,
      supportProjectList: []
    }
  },
  mounted() {
    if (this.currentSystemIdx !== '') {
      this.getQuestionSupportCategory('1', '0')
      this.getQuestionRange()
      this.getSupportProject()
    }
    this.getTecPeople()
  },
  watch: {
    currentSystemIdx() {
      this.ruleForm.range_id = ''
      this.ruleForm.company_id = ''
      this.ruleForm.resolve_user_id = ''
      this.ruleForm.sp_id = ''

      this.firstLevelList = []
      this.secondaryList = []
      this.threeLevelList = []
      this.ruleForm.first_category = ''
      this.ruleForm.second_category = ''
      this.ruleForm.third_category = ''
      this.$refs.firstLevel.resetId()
      this.$refs.secondLevel.resetId()
      this.$refs.threeLevel.resetId()
      this.getQuestionSupportCategory('1', '0')
      this.getQuestionRange()
      this.getSupportProject()
=======
      cLoading: false
    };
  },
  mounted() {
    if (this.currentSystemIdx !== '') {
      this.getQuestionSupportCategory('1', '0');
      this.getQuestionRange();
    }
    this.getTecPeople();
  },
  watch: {
    currentSystemIdx(newVal) {
      this.ruleForm.range_id = '';
      this.ruleForm.company_id = '';
      this.ruleForm.resolve_user_id = '';

      this.firstLevelList = [];
      this.secondaryList = [];
      this.threeLevelList = [];
      this.ruleForm.first_category = '';
      this.ruleForm.second_category = '';
      this.ruleForm.third_category = '';
      this.$refs.firstLevel.resetId();
      this.$refs.secondLevel.resetId();
      this.$refs.threeLevel.resetId();
      this.getQuestionSupportCategory('1', '0');
      this.getQuestionRange();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  computed: {
    ...mapGetters(['currentSystemIdx'])
  },
  methods: {
<<<<<<< HEAD
    async getSupportProject() {
      try {
        let { data } = await getSupportProject({
          product_id: this.currentSystemIdx
        })
        this.supportProjectList = data
      } catch (error) {
        this._message(error)
      }
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
    },
    toKnowledge() {
      if (!this.ruleForm.title.length) {
        this._message('请输入工单标题')
        return
      }
      let url = `${window.location.origin}/#/yc-university/history-brows?form=${this.ruleForm.title}`
      window.open(url, '_blank')
    },
    deleteFile(i) {
      this.ruleForm.file.splice(i, 1)
=======
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
    toKnowledge() {
      if (!this.ruleForm.title.length) {
        this._message('请输入工单标题');
        return;
      }
      let url = `${window.location.origin}/#/yc-university/history-brows?form=${this.ruleForm.title}`;
      window.open(url, '_blank');
    },
    deleteFile(i) {
      this.ruleForm.file.splice(i, 1);
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
    async addSupport() {
      this.formLoading = true
      this.ruleForm.product_id = this.currentSystemIdx
      try {
        let { data } = await addSupport(this.ruleForm)
        this._message(`提交成功,id为 ${data.support_id}`, 'success')
        this.$refs.ruleForm.resetFields()
        this.$refs.editor.clearHtml()
        this.$router.push(
          `/technical-conversation?id=0&supportId=${data.support_id}`
        )
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
=======
      };
      this.ruleForm.file.push(item);
    },
    async addSupport() {
      this.formLoading = true;
      this.ruleForm.product_id = this.currentSystemIdx;
      try {
        let { data } = await addSupport(this.ruleForm);
        this._message(`提交成功,id为 ${data.support_id}`, 'success');
        this.$refs.ruleForm.resetFields();
        this.$refs.editor.clearHtml();
        this.$router.push(`/technical-conversation?id=0&supportId=${data.support_id}`);
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
<<<<<<< HEAD
          this.ruleForm.desc = this.$refs.editor.getHtml()
          if (this.ruleForm.desc.length <= 0) {
            this._message('请输入问题描述', 'warning')
            return
          }
          this.addSupport()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    firstLevelId() {
      //一级
      this.ruleForm.third_category = ''
      this.ruleForm.second_category = ''
      this.getQuestionSupportCategory('2', this.ruleForm.first_category)
      this.threeLevelList = []
    },
    secondLevelId() {
      //二级
      this.ruleForm.third_category = ''
      this.getQuestionSupportCategory('3', this.ruleForm.second_category)
    },
    async getQuestionSupportCategory(type, pid) {
      //type 1一级  2二级  3三级
      this.sortParams.product_id = this.currentSystemIdx
      this.sortParams.pid = pid
      switch (type) {
        case '1': //一级
          this.firstLevelLoading = true
          break
        case '2': //二级
          this.secondaryLoading = true
          break
        case '3': //三级
          this.threeLevelLoading = true
          break
      }
      try {
        let { data } = await getQuestionSupportCategory(this.sortParams)
        switch (type) {
          case '1': //一级
            this.firstLevelList = data
            this.firstLevelLoading = false

            break
          case '2': //二级
            this.secondaryList = data
            this.secondaryLoading = false
            break
          case '3': //三级
            this.threeLevelList = data
            this.threeLevelLoading = false
            break
        }
      } catch (error) {
        this._message(error)
=======
          this.ruleForm.desc = this.$refs.editor.getHtml();
          if (this.ruleForm.desc.length <= 0) {
            this._message('请输入问题描述', 'warning');
            return;
          }
          this.addSupport();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    firstLevelId(id) {
      //一级
      this.ruleForm.first_category = id;
      this.getQuestionSupportCategory('2', this.ruleForm.first_category);
      this.threeLevelList = [];
    },
    secondLevelId(id) {
      //二级
      this.ruleForm.second_category = id;
      this.getQuestionSupportCategory('3', this.ruleForm.second_category);
    },
    threeLevelId(id) {
      //三级
      this.ruleForm.third_category = id;
    },
    async getQuestionSupportCategory(type, pid) {
      //type 1一级  2二级  3三级
      this.sortParams.product_id = this.currentSystemIdx;
      this.sortParams.pid = pid;
      switch (type) {
        case '1': //一级
          this.firstLevelLoading = true;
          break;
        case '2': //二级
          this.secondaryLoading = true;
          break;
        case '3': //三级
          this.threeLevelLoading = true;
          break;
      }
      try {
        let { data } = await getQuestionSupportCategory(this.sortParams);
        switch (type) {
          case '1': //一级
            this.firstLevelList = data;
            this.firstLevelLoading = false;

            break;
          case '2': //二级
            this.secondaryList = data;
            this.secondaryLoading = false;
            break;
          case '3': //三级
            this.threeLevelList = data;
            this.threeLevelLoading = false;
            break;
        }
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    async getTecPeople() {
      try {
<<<<<<< HEAD
        let { data } = await getTecPeople()
        this.resolveUserList = data
      } catch (error) {
        this._message(error)
=======
        let { data } = await getTecPeople();
        this.resolveUserList = data;
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
    }
  },
  components: {
<<<<<<< HEAD
    Upload,
    Editor
  }
}
</script>

<style lang="scss" scoped>
.fl-box /deep/ .el-select {
  width: 90%;
}
</style>
=======
    SortList,
    Upload,
    Editor
  }
};
</script>

<style lang="scss" scoped>
.sort-title {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  background: #daecff;
  font-size: 16px;
  color: #409eff;
}
.classification {
  height: 40px;
  line-height: 40px;
  background: #f0f0f1;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  color: #555;
  span {
    font-size: 13px;
    color: #666;
    margin-left: 15px;
    font-weight: 100;
  }
}
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
