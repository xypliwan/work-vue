<template>
  <div>
    <div class="box-title">
      回复模板板块
      <i class="iconfont icon-plus-square" @click="editTemplate('0',{})" v-if="addPermission"></i>
    </div>
    <div class="list" v-loading="templateLoading">
      <ul>
        <li v-for="(item,i) in templateList" :key="item.category_id" class="item" :class="currentIndex == item.category_id ? 'item-active' : ''" @click.stop="handleItem(item)">
          {{item.category_name}}
          <span class="operat-btn" v-show="i !== 0">
            <i class="iconfont icon-xiugai-landi-" @click.stop="editTemplate('1',item)" v-if="updatePermission"></i>
            <i class="iconfont icon-minus-square" @click.stop="deleteTemplateItem(item)" v-if="delPermission"></i>
          </span>
        </li>
      </ul>
    </div>

    <edit-template :editVisible="editVisible" @close="closeTemplate" @saveOk="saveOk" :flg="flg" :templateItem="templateItem" :isPublicCategory="isPublicCategory"></edit-template>
  </div>
</template>

<script>
import EditTemplate from './EditTemplate';
import { getTemplateList, deleteTemplate } from '@/api/replyTemplate';
export default {
  props: {
    isPublicCategory: String
  },
  data() {
    return {
      list: [],
      currentIndex: '',
      editVisible: false,
      templateLoading: false,
      templateList: [],
      flg: '',
      templateItem: {},
      addPermission: true,
      updatePermission: true,
      delPermission: true
    };
  },
  watch: {
    isPublicCategory(newVal) {
      this.currentIndex = '';
      this.getTemplateLists();
      if (newVal == '1') {
        this.addPermission = this.hasPermissionBtn('reply-template-model-add');
        this.updatePermission = this.hasPermissionBtn('reply-template-model-update');
        this.delPermission = this.hasPermissionBtn('reply-template-model-del');
      } else {
        this.addPermission = true;
        this.updatePermission = true;
        this.delPermission = true;
      }
    },
    currentIndex(newVal) {
      this.$emit('changeCategoryId', newVal);
    }
  },
  mounted() {
    this.getTemplateLists();
  },
  methods: {
    deleteTemplateItem(item) {
      this.$confirm(`确定删除 ${item.category_name} 的模板板块吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteTemplate(item.category_id);
        })
        .catch(() => {});
    },
    async deleteTemplate(id) {
      try {
        let { message } = await deleteTemplate({ category_id: id });
        this._message(message, 'success');
        this.getTemplateLists();
      } catch (error) {
        this._message(error);
      }
    },
    async getTemplateLists() {
      this.templateLoading = true;
      let params = {
        is_public_category: this.isPublicCategory,
        page: 1,
        pageSize: 200
      };
      try {
        let { data } = await getTemplateList(params);
        this.templateList = data;
        this.$emit('sendPlate', this.templateList);
      } catch (error) {
        this._message(error);
      }
      this.templateLoading = false;
    },
    saveOk() {
      this.getTemplateLists();
    },
    editTemplate(flg, item) {
      this.flg = flg;
      this.templateItem = item;
      this.editVisible = true;
    },
    closeTemplate() {
      this.editVisible = false;
      this.templateItem = {};
      this.flg = '';
    },
    handleItem(item) {
      this.currentIndex = item.category_id;
    }
  },
  components: {
    EditTemplate
  }
};
</script>

<style lang="scss" scoped>
.box-title {
  padding: 10px 10px;
  background: #f0f4f3;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  margin-bottom: 20px;
  .iconfont {
    font-size: 14px;
    color: #00d208;
    float: right;
    cursor: pointer;
  }
}
.list {
  .item {
    padding: 10px 10px;
    font-size: 14px;
    overflow: hidden;
    color: #999;
    cursor: pointer;
    &.item-active {
      color: #333;
    }
  }
  .operat-btn {
    float: right;
    font-size: 14px;
    i {
      font-size: 14px;
      cursor: pointer;
    }
    .icon-xiugai-landi- {
      color: #409eff;
      margin-right: 8px;
    }
    .icon-minus-square {
      color: #e80303;
    }
  }
}
</style>
