<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="知识板块" name="knowledgeSection" v-if="hasPermissionBtn('knowledge-model')"></el-tab-pane>
      <el-tab-pane label="视角管理" name="perspectiveManage" v-if="hasPermissionBtn('eyesight-manage')"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component :is="activeName" :forthStatus="forthStatus" :openStatus="openStatus"></component>
    </keep-alive>
  </div>
</template>
<script>
import knowledgeSection from './knowledgeSection';
import perspectiveManage from './perspectiveManage';
import { getKnowledgeStatusData, getEyesight } from '@/api/ycUniversity';

export default {
  data() {
    return {
      activeName: 'knowledgeSection',
      forthStatus: [], //是否面向客户,
      openStatus: [] //是否停用
    };
  },
  created() {
    this.getKnowledgeStatusData();
  },
  mounted() {
    this.activeName = this.hasPermissionBtn('knowledge-model') ? 'knowledgeSection' : 'perspectiveManage';
  },

  methods: {
    async getKnowledgeStatusData() {
      try {
        let { data } = await getKnowledgeStatusData();
        this.forthStatus = data.forth_status;
        this.openStatus = data.open_status;
      } catch (error) {
        this._message(error);
      }
    },
    handleClick() {}
  },
  components: {
    knowledgeSection,
    perspectiveManage
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__nav-wrap::after {
  height: 1px;
}
</style>
