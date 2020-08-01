<template>
  <div>
    <el-dialog
      :title="flg == '0' ? '新增知识' : '编辑知识'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :fullscreen="isFullscreen"
      :modal-append-to-body="false"
      :visible.sync="dialogKnowledge"
      width="1000px"
      :before-close="handleClose"
    >
      <div slot="title">
        {{ flg == '0' ? '新增知识' : '编辑知识' }}
        <i
          class="iconfont"
          @click="isFullscreen = !isFullscreen"
          :class="isFullscreen ? 'icon-zuixiaohua' : 'icon-icon_enlarge'"
        ></i>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          size="small"
          clearable
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
          v-loading="formLoding"
        >
          <el-form-item label="标题" prop="title">
            <el-autocomplete
              placeholder="请输入标题，支持模糊搜索"
              v-model="ruleForm.title"
              :fetch-suggestions="querySearchAsync"
              :hide-loading="autoSearchLoading"
              value-key="title"
            ></el-autocomplete>
          </el-form-item>
          <el-row>
            <el-col :span="11">
              <el-form-item label="一级板块" prop="first_km_id">
                <el-select
                  :disabled="flg == '1'"
                  v-model="ruleForm.first_km_id"
                  @change="handeleChangeFirst"
                  clearable
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, i) in onePlateAll"
                    :key="i"
                    :label="item.title"
                    :value="item.km_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="二级板块" prop="second_km_id">
                <el-select
                  :disabled="flg == '1'"
                  v-model="ruleForm.second_km_id"
                  clearable
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, i) in secondPlate"
                    :key="i"
                    v-if="item.km_id !== ''"
                    :label="item.title"
                    :value="item.km_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="允许客户查看" prop="is_customer_check">
                <el-switch
                  v-model="ruleForm.is_customer_check"
                  active-value="1"
                  inactive-value="0"
                  active-color="#409EFF"
                  inactive-color="#ccc"
                ></el-switch>
                &nbsp;&nbsp;{{
                  ruleForm.is_customer_check == '0' ? '否' : '是'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="排序" prop="sort">
                <el-input
                  v-model="ruleForm.sort"
                  clearable
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="页面路径">
            <el-cascader
              v-if="dialogKnowledge"
              v-model="pagePathValue"
              placeholder="请选择"
              :props="pathProps"
              :options="pagePathList"
              filterable
              ref="myCascader"
            ></el-cascader>
            <div class="page-path-box" v-show="pagePathTxtInfo.url.length">
              <a :href="pagePathTxtInfo.url" target="_blank">{{
                pagePathTxtInfo.name
              }}</a>
              <!-- <el-button type="primary" size="mini" class="copy-class" plain style="margin-left:15px;" @click="copyPagePath">复制路径</el-button> -->
            </div>
          </el-form-item>
          <el-form-item label="标签" prop="k_tag_id_arr">
            <el-tag
              class="tag-item"
              :type="tag.types"
              :key="i"
              v-for="(tag, i) in noSelectTagList"
              :disable-transitions="false"
              @click="selectTag(tag)"
              >{{ tag.k_tag_name }}</el-tag
            >
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ 标签</el-button
            >
          </el-form-item>

          <el-form-item label="视频链接" prop="video">
            <el-input v-model="ruleForm.video" clearable></el-input>
          </el-form-item>
          <el-form-item label="引导说明" prop="guide">
            <light-editor
              id="edit1"
              :contentDefault="ruleForm.guide"
              ref="editorGuide"
            ></light-editor>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <light-editor
              id="edit2"
              :contentDefault="ruleForm.content"
              ref="editor"
            ></light-editor>
          </el-form-item>

          <el-form-item label="上传图片">
            <el-upload
              ref="imgUpload"
              :action="uploadImgResUrl"
              name="upload_file"
              :headers="headersObj"
              accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .GIF"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSucess"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog
              :visible.sync="dialogVisible"
              :modal="false"
              :append-to-body="true"
            >
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button size="mini" type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LightEditor from '_c/editor/LightEditor'
import { getSecondKnowledgeModel } from '@/api/common'
import {
  addKnowledge,
  getKnowledgeDetail,
  updateKnowledgeDetail,
  getTagList,
  getPagePathList,
  searchByKeyword,
  addTag
} from '@/api/ycUniversity'
import { mapGetters } from 'vuex'
import baseURL from '@/config/baseUrl'
import { getLocalStorage } from '@/utils/localStorage'
export default {
  props: {
    dialogKnowledge: {
      type: Boolean,
      default: false
    },
    onePlateAll: [Array],
    pid: String,
    secondId: String,
    flg: String,
    id: String
  },
  data() {
    return {
      fileList: [],
      ruleForm: {
        knowledge_id: this.id,
        title: '', //标题
        content: '', //内容
        first_km_id: this.pid, //一级模块id
        second_km_id: this.secondId, //二级模块id
        sort: '', //排序
        is_customer_check: '1', //是否用户查看 1是  0否
        guide: '', //引导说明
        k_tag_id_arr: [], //标签数组
        img_arr: [], //图片数组
        video: '' //视频链接
      },
      rules: {
        title: [{ required: true, message: '请输入', trigger: 'blur change' }],
        first_km_id: [{ required: true, message: '请选择', trigger: 'change' }],
        second_km_id: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        sort: [{ required: true, message: '请输入', trigger: 'blur' }],
        content: [{ required: true, message: '请输入', trigger: 'blur' }],
        guide: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      secondPlate: [], //二级板块
      formLoding: false,
      isFullscreen: false,
      pagePathList: [],
      inputVisible: false,
      inputValue: '',
      dialogImageUrl: '',
      dialogVisible: false,
      actionUrl: '',
      pathProps: {
        value: 'faker_id',
        label: 'label',
        children: 'children'
        // emitPath: false
      },
      pagePathTxtInfo: {
        url: '',
        name: ''
      },
      autoSearchLoading: true,
      restaurants: [
        // { knowledge_id: '3', title: '冯绍峰发射点发射点父111' }
      ],
      noSelectTagList: [],
      pagePathValue: []
    }
  },
  watch: {
    pagePathValue(newVal) {
      this.forEachArr(this.pagePathList, newVal)
    },
    dialogKnowledge(newVal) {
      if (newVal) {
        this.getSecondKnowledgeModel()
        switch (this.flg) {
          case '0': //新增
            break
          case '1': //编辑
            this.getKnowledgeDetail()
            break
        }
      }
    },
    pid(newVal) {
      this.ruleForm.first_km_id = newVal
      if (this.ruleForm.first_km_id !== '') {
        this.getSecondKnowledgeModel()
      }
    },
    secondId(newVal) {
      this.ruleForm.second_km_id = newVal
    },
    currentSystemIdx() {
      this.getTagList()
      this.getPagePathList()
    }
  },
  computed: {
    ...mapGetters(['currentSystemIdx']),
    uploadImgResUrl() {
      return baseURL.requestUrl + '/common/upload'
    },
    headersObj() {
      return {
        'Access-Token': getLocalStorage('Access-Token')
      }
    }
  },
  mounted() {
    this.getTagList()
    this.getPagePathList()
  },
  methods: {
    handeleChangeFirst() {
      this.secondPlate = []
      this.ruleForm.second_km_id = ''
      this.getSecondKnowledgeModel()
    },
    forEachArr(arr, id) {
      let selectId = id[id.length - 1]
      arr.forEach(el => {
        if (el.children && el.children.length > 0) {
          this.forEachArr(el.children, this.pagePathValue)
        } else {
          if (selectId == el.faker_id) {
            this.pagePathTxtInfo.url = el.url
            this.pagePathTxtInfo.name = el.label
          }
        }
      })
    },
    selectTag(tag) {
      if (tag.types == 'info') {
        tag.types = 'success'
      } else if (tag.types == 'success') {
        tag.types = 'info'
      }
      this.ruleForm.k_tag_id_arr = this.noSelectTagList.filter(
        el => el.types == 'success'
      )
    },
    async querySearchAsync(str, cb) {
      if (!str.trim().length) return
      let params = {
        first_km_id: this.pid,
        second_km_id: this.secondId,
        keyword: str
      }
      this.autoSearchLoading = false
      try {
        let { data } = await searchByKeyword(params)
        this.restaurants = data
        cb(this.restaurants)
      } catch (error) {
        this._message(error)
      }
      this.autoSearchLoading = true
    },
    createStateFilter() {
      return () => {
        return this.restaurants
      }
    },
    handleSucess(res) {
      this.ruleForm.img_arr.push({
        name: res.data.file_name,
        path: res.data.url
      })
    },
    handleRemove(file) {
      let path = file.response.data.url
      let index = this.ruleForm.img_arr.findIndex(el => el.path == path)
      this.ruleForm.img_arr.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async addTag(tagName) {
      try {
        let { data } = await addTag({
          product_id: this.currentSystemIdx,
          k_tag_name: tagName
        })
        data.types = 'info'
        this.noSelectTagList.push(data)
      } catch (error) {
        this._message(error)
      }
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.addTag(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async getPagePathList() {
      try {
        let { data } = await getPagePathList({
          product_id: this.currentSystemIdx
        })
        this.pagePathList = data
      } catch (error) {
        console.log(error)
      }
    },
    async getTagList() {
      try {
        let { data } = await getTagList({ product_id: this.currentSystemIdx })
        data.forEach(el => {
          el.types = 'info'
        })
        this.noSelectTagList = data
      } catch (error) {
        console.log(error)
      }
    },
    async updateKnowledgeDetail() {
      this.formLoding = true
      try {
        let { message } = await updateKnowledgeDetail(this.ruleForm)
        this._message(message, 'success')
        this.$emit('saveOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoding = false
    },
    async getKnowledgeDetail() {
      this.formLoding = true
      try {
        let { data } = await getKnowledgeDetail({ knowledge_id: this.id })
        Object.assign(this.ruleForm, data)
        this.ruleForm.img_arr.forEach(el => {
          let item = {
            name: el.name,
            url: el.path
          }
          this.fileList.push(item)
        })
        this.ruleForm.k_tag_id_arr.forEach(el => {
          this.noSelectTagList.forEach(ev => {
            if (el.k_tag_id == ev.k_tag_id) {
              el.types = 'success'
              ev.types = 'success'
            }
          })
        })
      } catch (error) {
        this._message(error)
      }
      this.formLoding = false
    },
    async addKnowledge() {
      this.formLoding = true
      try {
        let { message } = await addKnowledge(this.ruleForm)
        this._message(message, 'success')
        this.$emit('saveOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoding = false
    },
    async getSecondKnowledgeModel() {
      try {
        let { data } = await getSecondKnowledgeModel({
          pid: this.ruleForm.first_km_id
        })
        this.secondPlate = data
      } catch (error) {
        this._message(error)
      }
    },
    submit() {
      this.ruleForm.content = this.$refs.editor.getHtml()
      this.ruleForm.guide = this.$refs.editorGuide.getHtml()
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          switch (this.flg) {
            case '0':
              this.addKnowledge()
              break

            case '1':
              this.updateKnowledgeDetail()
              break
          }
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.pagePathTxtInfo.url = ''
      this.pagePathTxtInfo.name = ''
      this.pagePathValue = []
      this.$refs.editor.clearHtml()
      this.$refs.editorGuide.clearHtml()
      this.$refs.ruleForm.resetFields()
      this.ruleForm.img_arr = []
      this.fileList = []
      this.$refs.imgUpload.clearFiles()
      this.noSelectTagList.forEach(el => {
        el.types = 'info'
      })
      this.$emit('close')
    }
  },
  components: {
    LightEditor
  }
}
</script>

<style lang="scss" scoped>
.tag-item {
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 10px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
  margin-top: 10px;
}
/deep/ .el-cascader {
  display: block;
}
.page-path-box {
  margin-top: 15px;
  font-size: 15px;
  color: #409eff;
}
.el-autocomplete {
  display: block;
}
</style>
