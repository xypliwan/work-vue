<template>
  <div class="workbench-box">
    <view-layout headerHeight="125px">
      <div slot="header">
        <div class="header-wrapper">
          <div class="left">
            <el-tabs v-model="eventType">
              <el-tab-pane label="全部" name="all"></el-tab-pane>
              <el-tab-pane label="待办事项" name="1"></el-tab-pane>
              <el-tab-pane label="处理完成" name="2"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="right">
            <div class="system-box">
              <system-list></system-list>
            </div>
          </div>
        </div>
        <div class="components-wrapper">
          <el-tabs v-model="componentsType">
<<<<<<< HEAD
            <el-tab-pane
              label="系统工单"
              name="1"
              v-if="hasPermissionBtn('system-question')"
            ></el-tab-pane>
            <el-tab-pane
              label="技术支持"
              name="2"
              v-if="hasPermissionBtn('tec-support')"
            ></el-tab-pane>
            <el-tab-pane
              label="需求管理"
              name="3"
              v-if="hasPermissionBtn('need')"
            ></el-tab-pane>
=======
            <el-tab-pane label="系统工单" name="1" v-if="hasPermissionBtn('system-question')"></el-tab-pane>
            <el-tab-pane label="技术支持" name="2" v-if="hasPermissionBtn('tec-support')"></el-tab-pane>
            <el-tab-pane label="需求管理" name="3" v-if="hasPermissionBtn('need')"></el-tab-pane>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </el-tabs>
        </div>
      </div>
      <div slot="content">
        <div class="cont-box">
          <component :is="componentName" :eventType="eventType"></component>
        </div>
      </div>
    </view-layout>
  </div>
</template>

<script>
<<<<<<< HEAD
import ViewLayout from '_c/common/Layout'
import SystemList from '_c/common/SystemList'
import SystemOrder from './systemOrder'
import TechnicalSupport from './technicalSupport'
import DemandManagement from './demandManagement'
import { mapGetters } from 'vuex'
=======
import ViewLayout from '_c/common/Layout';
import SystemList from '_c/common/SystemList';
import SystemOrder from './systemOrder';
import TechnicalSupport from './technicalSupport';
import DemandManagement from './demandManagement';
import { mapGetters } from 'vuex';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  data() {
    return {
      eventType: 'all',
      componentsType: '1',
      checked: false,
      componentName: ''
<<<<<<< HEAD
    }
  },
  mounted() {
    if (this.permissionBtn.length > 0) {
      this.toRoute()
=======
    };
  },
  mounted() {
    if (this.permissionBtn.length > 0) {
      this.toRoute();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  watch: {
    componentsType(newVal) {
<<<<<<< HEAD
      this.componentName =
        newVal == '1'
          ? 'SystemOrder'
          : newVal == '2'
          ? 'TechnicalSupport'
          : 'DemandManagement'
    },
    permissionBtn() {
      this.toRoute()
=======
      this.componentName = newVal == '1' ? 'SystemOrder' : newVal == '2' ? 'TechnicalSupport' : 'DemandManagement';
    },
    permissionBtn(newVal) {
      this.toRoute();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  computed: {
    ...mapGetters(['permissionBtn'])
  },
  methods: {
    toRoute() {
      if (!this.hasPermissionBtn('system-question')) {
        if (!this.hasPermissionBtn('tec-support')) {
<<<<<<< HEAD
          if (this.hasPermissionBtn('need')) {
            this.componentName = 'DemandManagement'
            this.componentsType = '3'
          }
        } else {
          this.componentName = 'TechnicalSupport'
          this.componentsType = '2'
        }
      } else {
        this.componentName = 'SystemOrder'
        this.componentsType = '1'
=======
          if (!this.hasPermissionBtn('need')) {
          } else {
            this.componentName = 'DemandManagement';
            this.componentsType = '3';
          }
        } else {
          this.componentName = 'TechnicalSupport';
          this.componentsType = '2';
        }
      } else {
        this.componentName = 'SystemOrder';
        this.componentsType = '1';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    }
  },
  components: {
    ViewLayout,
    SystemList,
    SystemOrder,
    TechnicalSupport,
    DemandManagement
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.workbench-box {
  .header-wrapper {
    display: flex;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    .left {
      flex: 1;
      /deep/ .el-tabs__item {
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        text-align: center;
      }
    }
    .right {
      float: right;
      display: flex;
      padding: 0 20px;
      .system-box {
        flex: 1;
      }
    }
  }
  .components-wrapper {
    margin-top: 15px;
    /deep/ .el-tabs__nav-wrap::after {
      height: 0px;
    }
  }
  .cont-box {
    padding-bottom: 53px;
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
