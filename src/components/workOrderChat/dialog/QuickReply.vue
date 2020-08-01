<template>
  <div class="quick-reply-box" :style="{ height: height }">
    <scroll>
      <div slot="dataList">
        <div class="template-title">
          <div class="left">
            <el-tabs v-model="params.is_public_category">
              <el-tab-pane label="个人" name="0"></el-tab-pane>
              <el-tab-pane label="公共" name="1"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="right">
            <el-link
              type="primary"
              class="add-template"
              @click="editVisible = true"
              >添加快捷模板</el-link
            >
            <i class="el-icon-close icon-close" @click="close"></i>
          </div>
        </div>
        <div>
          <el-select
            size="small"
            @change="handleChange"
            filterable
            v-model="templateParams.category_id"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, i) in typeList"
              :key="i"
              :label="item.category_name"
              :value="item.category_id"
            ></el-option>
          </el-select>
        </div>
        <div v-loading="boxLoading" class="template-list">
          <div class="item" v-for="(ev, j) in templateList" :key="j">
            <div class="category-name">{{ ev.category_name }}</div>
            <div
              class="category-list"
              v-for="(item, index) in ev.arr"
              :key="index"
            >
              {{ item.content }}
              <span class="send-btn">
                <el-link type="primary" @click="getCont(item.content)"
                  >发送</el-link
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <edit-cont
      :editVisible="editVisible"
      @close="addClose"
      @saveOk="saveOk"
      :plateList="typeList"
      :flg="flg"
    ></edit-cont>
  </div>
</template>

<script>
import Scroll from '_c/common/Scroll'
import { getTemplateList, getTemplateFormat } from '@/api/replyTemplate'
import EditCont from '@/views/replyTemplate/EditCont'
export default {
  props: {
    height: String,
    productId: String //产品id/系统id
  },
  data() {
    return {
      editVisible: false,
      visible: false,
      flg: '0',
      params: {
        is_public_category: '0', ////是否公共分类 1是 0否
        page: 1,
        pageSize: 1000
      },
      templateParams: {
        page: 1,
        pageSize: 1000,
        is_public_category: '0', //是否公共分类 1是 0否
        category_id: '' //分类id
      },
      typeList: [],
      templateList: [],
      boxLoading: false
    }
  },
  created() {
    this.getTemplateList()
  },
  computed: {
    is_public_category() {
      return this.params.is_public_category
    }
  },
  watch: {
    is_public_category() {
      this.templateParams.category_id = ''
      this.getTemplateList()
    }
  },
  methods: {
    addClose() {
      this.editVisible = false
    },
    saveOk() {
      this.editVisible = false
      this.getTemplateList()
    },
    close() {
      this.$emit('close')
    },
    getCont(cont) {
      this.$emit('getSelectCont', cont)
    },
    handleChange() {
      this.getTemplateFormat()
    },
    async getTemplateFormat() {
      //获取回复列表
      this.boxLoading = true
      try {
        let { data } = await getTemplateFormat(this.templateParams)
        this.templateList = data
      } catch (error) {
        this._message(error)
      }
      this.boxLoading = false
    },
    async getTemplateList() {
      //获取分类列表
      this.templateParams.is_public_category = this.params.is_public_category
      try {
        let { data } = await getTemplateList(this.params)
        this.typeList = data
        this.getTemplateFormat()
      } catch (error) {
        this._message(error)
      }
    }
  },
  components: {
    Scroll,
    EditCont
  }
}
</script>

<style lang="scss" scoped>
.quick-reply-box {
  width: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  .template-title {
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    /deep/ .el-tabs__nav-wrap::after {
      display: none;
    }
    .left {
      flex: 1;
    }
    .right {
      width: auto;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      .add-template {
      }
      .icon-close {
        margin-left: 15px;
      }
    }
  }
  .template-list {
    margin: 10px 0;
    .item {
      .category-name {
        background: #ececec;
        padding: 5px 10px;
        font-size: 12px;
        display: inline-block;
        margin-top: 20px;
        color: #555;
      }
      .category-list {
        font-size: 15px;
        line-height: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f1;
        color: #666;
        position: relative;
        &:hover {
          .send-btn {
            display: inline;
          }
        }
        .send-btn {
          display: none;
          /deep/ .el-link--inner {
            font-size: 15px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>
