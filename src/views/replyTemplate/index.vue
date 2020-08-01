<template>
  <div class="reply-box">
    <view-layout headerHeight="80px">
      <div slot="header">
        <el-tabs v-model="activeName">
          <el-tab-pane label="个人" name="0"></el-tab-pane>
          <el-tab-pane label="公共" name="1"></el-tab-pane>
        </el-tabs>
      </div>
      <div slot="content">
        <div class="content-wrapper">
          <div class="left cont-item">
<<<<<<< HEAD
            <template-list
              @changeCategoryId="changeCategoryId"
              :isPublicCategory="activeName"
              @sendPlate="getPlate"
            ></template-list>
          </div>
          <dir class="right cont-item">
            <content-list
              :plateList="plateList"
              :activeName="activeName"
              :categoryId="categoryId"
            ></content-list>
=======
            <template-list @changeCategoryId="changeCategoryId" :isPublicCategory="activeName" @sendPlate="getPlate"></template-list>
          </div>
          <dir class="right cont-item">
            <content-list :plateList="plateList" :activeName="activeName" :categoryId="categoryId"></content-list>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </dir>
        </div>
      </div>
    </view-layout>
  </div>
</template>

<script>
<<<<<<< HEAD
import ViewLayout from '_c/common/Layout'
import TemplateList from './TemplateList'
import ContentList from './ContentList'
=======
import ViewLayout from '_c/common/Layout';
import TemplateList from './TemplateList';
import ContentList from './ContentList';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  data() {
    return {
      activeName: '0',

      plateList: [],
      categoryId: ''
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },

  methods: {
    getPlate(list) {
<<<<<<< HEAD
      this.plateList = list
    },
    changeCategoryId(id) {
      this.categoryId = id
=======
      this.plateList = list;
    },
    changeCategoryId(id) {
      this.categoryId = id;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    ViewLayout,
    TemplateList,
    ContentList
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>
<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.reply-box {
  /deep/ .el-tabs__item {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    width: 80px;
    text-align: center;
  }
  .content-wrapper {
    display: flex;
    .cont-item {
      height: calc(100vh - 80px - 55px);
      padding: 0px 10px;
      @include scrollBar;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .left {
      float: left;
      width: 250px;
      border-right: 2px solid #f1f1f1;
      margin-right: 15px;
      padding-bottom: 10px;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
