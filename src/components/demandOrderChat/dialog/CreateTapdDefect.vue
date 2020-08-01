<template>
  <div>
    <el-dialog
      title="创建TAPD缺陷"
      :append-to-body="true"
      :visible.sync="visible"
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
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="TAPD项目" prop="workspace_id">
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
              <el-form-item label="发现版本" prop="version_report">
                <el-input
                  v-model="ruleForm.version_report"
                  placeholder="请输入"
                ></el-input>
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
            <el-col :span="12">
              <el-form-item label="严重程度" prop="severity">
                <el-select
                  v-model="ruleForm.severity"
                  clearable
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    :label="item.value"
                    :key="i"
                    :value="item.key"
                    v-for="(item, i) in severityList"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处理人" prop="current_owner">
                <el-select
                  :disabled="!ruleForm.workspace_id"
                  v-model="ruleForm.current_owner"
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
          </el-row>
          <el-form-item label="标题" prop="title">
            <el-input
              placeholder="请输入标题"
              clearable
              v-model="ruleForm.title"
            ></el-input>
          </el-form-item>
          <el-form-item label="缺陷描述" prop="description">
            <editor
              id="editDemand"
              :contentDefault="ruleForm.description"
              ref="descRef"
              placeholders="缺陷描述"
            ></editor>
          </el-form-item>
          <el-form-item label="缺陷实现步骤" prop="demand_desc">
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
  getTapdModules,
  addTapdBug,
  getBugFilter,
  getTapdUsers
} from '@/api/tapd'
import { getPriority } from '@/api/common'
import Editor from '_c/editor/LightEditor'
export default {
  props: {
    visible: Boolean,
    detail: Object,
    tapdWorkspaceList: Array,
    id: String
  },
  data() {
    return {
      ruleForm: {
        list_id: '', //需求id
        title: '', //标题
        workspace_id: '', //tapd项目id
        version_report: '', //发现版本
        description: '', //缺陷描述
        module: '', //模块
        priority: '', //优先级
        severity: '', //缺陷程度
        demand_desc: '', //缺陷实现步骤
        current_owner: '' //处理人
      },
      rules: {
        workspace_id: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        title: [{ required: true, message: '请输入', trigger: 'blur' }],
        version_report: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        module: [{ required: true, message: '请选择', trigger: 'change' }],
        severity: [{ required: true, message: '请选择', trigger: 'change' }],
        priority: [{ required: true, message: '请选择', trigger: 'change' }],
        current_owner: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        description: [{ required: true, message: '请输入' }],
        demand_desc: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      moduleList: [], //模块列表
      priorityList: [], //优先级列表
      severityList: [], //缺陷程度
      resolutionList: [], //缺陷解决方法
      tapdUserList: [], //处理人列表
      formLoading: false
    }
  },
  mounted() {
    this.getPrioritys()
    this.getBugFilter()
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.ruleForm.title = `[${this.detail.username}] ${this.detail.title}`
        this.ruleForm.description = `需求联系信息:<br/>发起人:【${
          this.detail.contact_name
        }】&nbsp;&nbsp;&nbsp;电话:【${
          this.detail.phone
        }】<br/><br/><br/>紧急需求是否愿意付费: ${
          this.detail.is_pay == '1' ? '付费' : '不付费'
        }<br/><br/><br/>是否为BUG: ${
          this.detail.is_bug == '1' ? 'BUG' : '非BUG'
        }<br/><br/><br/>影响范围: ${
          this.detail.range_name
        }<br/><br/><br/>需求目的: ${
          this.detail.backgroup
        }<br/><br/><br/>改动细节: ${this.detail.adjust}`
      }
    }
  },
  methods: {
    async getTapdUsers() {
      //处理人
      try {
        let { data } = await getTapdUsers({
          workspace_id: this.ruleForm.workspace_id
        })
        this.tapdUserList = data
      } catch (error) {
        this._message(error)
      }
    },
    async getBugFilter() {
      try {
        let {
          data: { priority, severity, resolution }
        } = await getBugFilter()
        this.priorityList = priority
        this.severityList = severity
        this.resolutionList = resolution
      } catch (error) {
        this._message(error)
      }
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.addTapdBug()
        } else {
          return false
        }
      })
    },
    async addTapdBug() {
      this.formLoading = true
      this.ruleForm.list_id = this.id
      try {
        let { message } = await addTapdBug(this.ruleForm)
        this._message(message, 'success')
        this.$emit('submitOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    handleTapdChange() {
      this.moduleList = []
      this.tapdUserList = []
      if (this.ruleForm.workspace_id) {
        this.getTapdUsers()
        this.getTapdModules()
      }
      this.ruleForm.module = ''
      this.ruleForm.current_owner = ''
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
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('update:visible', false)
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
