<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
<<<<<<< HEAD
      <el-tab-pane
        label="知识板块"
        name="knowledgeSection"
        v-if="hasPermissionBtn('knowledge-model')"
      ></el-tab-pane>
      <el-tab-pane
        label="视角管理"
        name="perspectiveManage"
        v-if="hasPermissionBtn('eyesight-manage')"
      ></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component
        :is="activeName"
        :forthStatus="forthStatus"
        :openStatus="openStatus"
      ></component>
=======
      <el-tab-pane label="知识板块" name="knowledgeSection" v-if="hasPermissionBtn('knowledge-model')"></el-tab-pane>
      <el-tab-pane label="视角管理" name="perspectiveManage" v-if="hasPermissionBtn('eyesight-manage')"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component :is="activeName" :forthStatus="forthStatus" :openStatus="openStatus"></component>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    </keep-alive>
  </div>
</template>
<script>
<<<<<<< HEAD
import knowledgeSection from './knowledgeSection'
import perspectiveManage from './perspectiveManage'
import { getKnowledgeStatusData } from '@/api/ycUniversity'
=======
import knowledgeSection from './knowledgeSection';
import perspectiveManage from './perspectiveManage';
import { getKnowledgeStatusData, getEyesight } from '@/api/ycUniversity';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  data() {
    return {
      activeName: 'knowledgeSection',
      forthStatus: [], //是否面向客户,
      openStatus: [] //是否停用
<<<<<<< HEAD
    }
  },
  created() {
    this.getKnowledgeStatusData()
  },
  mounted() {
    this.activeName = this.hasPermissionBtn('knowledge-model')
      ? 'knowledgeSection'
      : 'perspectiveManage'
=======
    };
  },
  created() {
    this.getKnowledgeStatusData();
  },
  mounted() {
    this.activeName = this.hasPermissionBtn('knowledge-model') ? 'knowledgeSection' : 'perspectiveManage';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },

  methods: {
    async getKnowledgeStatusData() {
      try {
<<<<<<< HEAD
        let { data } = await getKnowledgeStatusData()
        this.forthStatus = data.forth_status
        this.openStatus = data.open_status
      } catch (error) {
        this._message(error)
=======
        let { data } = await getKnowledgeStatusData();
        this.forthStatus = data.forth_status;
        this.openStatus = data.open_status;
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    handleClick() {}
  },
  components: {
    knowledgeSection,
    perspectiveManage
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__nav-wrap::after {
  height: 1px;
}
</style>
