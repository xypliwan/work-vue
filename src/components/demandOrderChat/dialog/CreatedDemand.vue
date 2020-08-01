<template>
  <div>
    <el-dialog
      title="创建TAPD需求"
      :append-to-body="true"
      :visible.sync="addtapdVisible"
      width="1000px"
      :before-close="handleClose"
      v-dialogDrag
      fullscreen
      center
    >
      <div class="wrapper-form">
        <el-form
          :model="ruleForm"
          size="small"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                label="TAPD项目"
                prop="workspace_id"
                :rules="{
                  required: true,
                  message: '请选择',
                  trigger: 'change'
                }"
              >
                <el-select
                  @change="handleTapdChange"
                  clearable
                  filterable
                  v-model="ruleForm.workspace_id"
                  placeholder="请选择"
                >
                  <el-option
                    :label="item.name"
                    :key="item.workspace_id"
                    :value="item.workspace_id"
                    v-for="item in tapdWorkspaceList"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="需求分类" prop="category_id">
                <el-select
                  :disabled="!ruleForm.workspace_id"
                  v-model="ruleForm.category_id"
                  clearable
                  filterable
                  placeholder="请先选择TAPD项目"
                >
                  <el-option
                    :label="item.name"
                    :key="item.id"
                    :value="item.id"
                    v-for="item in tapdCategorysList"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="来源" prop="source">
                <el-select
                  :disabled="!ruleForm.workspace_id"
                  v-model="ruleForm.source"
                  clearable
                  filterable
                  placeholder="请先选择TAPD项目"
                >
                  <el-option
                    :label="item.name"
                    :key="item.name"
                    :value="item.name"
                    v-for="item in sourceList"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="责任人" prop="owner">
                <el-select
                  :disabled="!ruleForm.workspace_id"
                  v-model="ruleForm.owner"
                  clearable
                  filterable
                  placeholder="请先选择TAPD项目"
                >
                  <el-option
                    :label="item.UserWorkspace.user"
                    :key="i"
                    :value="item.UserWorkspace.user"
                    v-for="(item, i) in tapdUserList"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模块" prop="module">
                <el-select
                  :disabled="!ruleForm.workspace_id"
                  v-model="ruleForm.module"
                  clearable
                  filterable
                  placeholder="请先选择TAPD项目"
                >
                  <el-option
                    :label="item.name"
                    :key="item.name"
                    :value="item.name"
                    v-for="item in moduleList"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优先级" prop="priority">
                <el-select
                  v-model="ruleForm.priority"
                  clearable
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                    v-for="item in priorityList"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- :prop="`${item.custom_field}`" :prop="'customFieldsList.' + i + '.custom_field'"-->
          <el-row :gutter="24" v-if="ruleForm.workspace_id == '20106611'">
            <el-col :span="12" v-for="(item, i) in customFieldsList" :key="i">
              <el-form-item
                :label="item.name"
                :rules="{
                  required: item.is_must == 1,
                  message: '请选择',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="ruleForm[`'${item.custom_field}'`]"
                  @change="e => handleChangeSelect(e, item.custom_field)"
                  clearable
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    :label="optionItem.key"
                    :value="optionItem.val"
                    :key="optionItem.val"
                    v-for="optionItem in item.options"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="标题"
            prop="name"
            :rules="{ required: true, message: '请输入', trigger: 'blur' }"
          >
            <el-input
              placeholder="请输入标题"
              clearable
              v-model="ruleForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="需求描述" prop="name">
            <editor
              id="editDemand"
              :contentDefault="ruleForm.description"
              ref="descRef"
              placeholders="需求描述"
            ></editor>
          </el-form-item>
          <el-form-item label="需求分析" prop="demand_desc">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入需求分析"
              v-model="ruleForm.demand_desc"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">取消</el-button>
        <el-button size="mini" type="primary" @click="submit">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTapdUsers,
  getTapdCategorys,
  getTapdSource,
  getTapdModules,
  addTapdStories
} from '@/api/tapd'
import { getPriority } from '@/api/common'
import Editor from '_c/editor/LightEditor'
import { getCustomFieldsSettings } from '@/api/demandConversation'
export default {
  props: {
    addtapdVisible: Boolean,
    detail: Object,
    tapdWorkspaceList: Array,
    id: String
  },
  data() {
    return {
      ruleForm: {
        list_id: '', //需求id
        name: '', //标题
        description: '', //内容
        category_id: '', //分类id
        source: '', //来源
        type: '', //类型
        module: '', //模块
        priority: '', //优先级
        owner: '', //责任人
        workspace_id: '', //tapd项目id
        demand_desc: '' //需求分析的备注字段
      },
      // rules: {
      //   name: [{ required: true, message: '请输入', trigger: 'blur' }],
      //   workspace_id: [{ required: true, message: '请选择', trigger: 'change' }]
      // },
      tapdUserList: [], //责任人列表
      tapdCategorysList: [], //需求分类
      sourceList: [], //来源列表
      typeList: [], //类型列表
      moduleList: [], //模块列表
      priorityList: [], //优先级列表
      formLoading: false,
      customFieldsList: [] //erp需求附加自定义字段
    }
  },
  mounted() {
    this.getPrioritys()
    this.getCustomFieldsSettingsFn()
  },
  watch: {
    addtapdVisible(newVal) {
      if (newVal) {
        this.ruleForm.name = this.detail.title
        this.ruleForm.description = `
        需求ID:【${this.detail.list_id}】<br/>需求标题:【${
          this.detail.title
        }】<br/><br/>需求联系信息:<br/>发起人:【${
          this.detail.contact_name
        }】&nbsp;&nbsp;&nbsp;电话:【${
          this.detail.phone
        }】&nbsp;&nbsp;&nbsp;邮箱:【${
          this.detail.email
        }】<br/><br/>紧急需求是否愿意付费: ${
          this.detail.is_pay == '1' ? '付费' : '不付费'
        }<br/><br/>是否为BUG: ${
          this.detail.is_bug == '1' ? 'BUG' : '非BUG'
        }<br/><br/>影响范围: ${this.detail.range_name}<br/>需求目的: ${
          this.detail.backgroup
        }<br/><br/>改动细节: ${this.detail.adjust}`
      }
    }
  },
  methods: {
    handleChangeSelect(e, attr) {
      this.ruleForm[attr] = e
    },
    async getCustomFieldsSettingsFn() {
      try {
        const { data } = await getCustomFieldsSettings({
          workspace_id: '20106611'
        })
        data.forEach(el => {
          this.ruleForm[el.custom_field] = null
        })
        this.customFieldsList = data
      } catch (error) {
        this._message(error)
      }
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let arr = []
          this.customFieldsList.forEach(el => {
            if (el.is_must == 1 && !this.ruleForm[el.custom_field])
              arr.push(el.name)
          })
          if (this.ruleForm.workspace_id == '20106611' && arr.length > 0) {
            this._message(`${arr.join('、')} 必填`, 'warning')
            return
          }
          this.addTapdStories()
        } else {
          return false
        }
      })
    },
    async addTapdStories() {
      this.formLoading = true
      this.ruleForm.list_id = this.id
      try {
        let { message } = await addTapdStories(this.ruleForm)
        this._message(message, 'success')
        this.$emit('submitOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    handleTapdChange() {
      this.tapdUserList = []
      this.tapdCategorysList = []
      this.sourceList = []
      this.moduleList = []
      if (this.ruleForm.workspace_id) {
        this.getTapdUsers()
        this.getTapdCategorys()
        this.getTapdSource()
        this.getTapdModules()
      }
      this.ruleForm.category_id = ''
      this.ruleForm.source = ''
      this.ruleForm.module = ''
      this.ruleForm.owner = ''
    },
    async getPrioritys() {
      try {
        let { data } = await getPriority()
        this.priorityList = data
      } catch (error) {
        this._message(error)
      }
    },
    async getTapdModules() {
      //获取模块
      try {
        let { data } = await getTapdModules({
          workspace_id: this.ruleForm.workspace_id
        })
        if (data.length > 0) {
          data.forEach(el => {
            el.name = el.Module.name
          })
        }

        this.moduleList = data
      } catch (error) {
        this._message(error)
      }
    },
    async getTapdSource() {
      //获取来源
      try {
        let { data } = await getTapdSource({
          workspace_id: this.ruleForm.workspace_id
        })
        this.sourceList = data
      } catch (error) {
        this._message(error)
      }
    },
    async getTapdCategorys() {
      //需求分类
      try {
        let { data } = await getTapdCategorys({
          workspace_id: this.ruleForm.workspace_id
        })
        if (Array.isArray(data)) {
          data.forEach(el => {
            el.name = el.Category.name
            el.id = el.Category.id
          })
          this.tapdCategorysList = data
        } else {
          this.tapdCategorysList = []
        }
      } catch (error) {
        this._message(error)
      }
    },
    async getTapdUsers() {
      //责任人
      try {
        let { data } = await getTapdUsers({
          workspace_id: this.ruleForm.workspace_id
        })
        this.tapdUserList = data
      } catch (error) {
        this._message(error)
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('update:addtapdVisible', false)
    }
  },
  components: {
    Editor
  }
}
</script>

<style lang="scss" scoped>
.wrapper-form {
  width: 1200px;
  margin: 0 auto;
}
/deep/ .el-select {
  display: block;
}
</style>
