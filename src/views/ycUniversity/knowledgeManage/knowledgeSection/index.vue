<template>
  <div class="plate-box">
    <div class="left">
      <div class="box-title">
        一级板块
        <i class="iconfont icon-plus-square" @click="editPlate('0',{})" v-if="hasPermissionBtn('first-model-add')"></i>
      </div>
      <div class="list" v-loading="palteLoading">
        <ul>
          <li v-for="(item,i) in palteList" :key="item.km_id" class="item" :class="currentIndex == item.km_id ? 'item-active' : ''" @click.stop="changeItem(item.km_id)">
            {{item.title}}
            <span class="operat-btn" v-show="i !== 0">
              <i class="iconfont icon-xiugai-landi-" @click="editPlate('1',item)" v-if="hasPermissionBtn('first-model-edit')"></i>
              <i class="iconfont icon-minus-square" @click="deleteItem(item)" v-if="hasPermissionBtn('first-model-del')"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <secondary-plate :forthStatus="forthStatus" :openStatus="openStatus" :palteList="palteList" :currentIndex="currentIndex"></secondary-plate>
    </div>

    <edit-plate :forthStatus="forthStatus" :openStatus="openStatus" :flg="flg" :detailItem="detailItem" :dialogPlate="dialogPlate" @close="close" @saveOk="getFirstModelLists"></edit-plate>
  </div>
</template>

<script>
import EditPlate from './EditPlate';
import SecondaryPlate from './SecondaryPlate';
import { getFirstModelList, deleteFirstModel } from '@/api/ycUniversity';
export default {
  props: {
    forthStatus: [Array], //是否面向客户
    openStatus: [Array] //是否停用
  },
  data() {
    return {
      flg: '',
      detailItem: {},
      dialogPlate: false,
      palteList: [],
      palteLoading: false,
      currentIndex: ''
    };
  },
  created() {
    this.getFirstModelLists();
  },
  methods: {
    deleteItem(item) {
      this.$confirm(`确定删除一级板块标题为 ${item.title} 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteFirstModel(item.km_id);
        })
        .catch(() => {});
    },
    async deleteFirstModel(id) {
      try {
        let { message } = await deleteFirstModel({ km_id: id });
        this._message(message, 'success');
        this.getFirstModelLists();
      } catch (error) {
        this._message(error);
      }
    },
    changeItem(id) {
      this.currentIndex = id;
    },
    async getFirstModelLists() {
      this.palteLoading = true;
      try {
        let { data } = await getFirstModelList();
        this.palteList = data;
      } catch (error) {
        this._message(error);
      }
      this.palteLoading = false;
    },
    editPlate(flg, item) {
      this.flg = flg;
      this.detailItem = item;
      this.dialogPlate = true;
    },
    close() {
      this.flg = '';
      this.detailItem = {};
      this.dialogPlate = false;
    }
  },
  components: {
    EditPlate,
    SecondaryPlate
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.plate-box {
  display: flex;
  overflow: hidden;
  height: calc(100vh - 205px);
  .left {
    float: left;
    width: 250px;
    border-right: 2px solid #f1f1f1;
    margin-right: 15px;
    padding-bottom: 10px;
    overflow-y: auto;
    padding: 0px 10px;
    @include scrollBar;
    overflow-x: hidden;
    .box-title {
      padding: 10px 10px;
      background: #f0f4f3;
      border-radius: 3px;
      font-size: 14px;
      color: #333;
      overflow: hidden;
      margin-bottom: 10px;
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
  }
  .right {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    @include scrollBar;
  }
}
</style>

