<template>
  <!-- 视角选择 -->
  <div>
    <i class="iconfont icon-icon_view"></i>
    <el-dropdown trigger="click" @command="selectItem">
      <span class="el-dropdown-link">
<<<<<<< HEAD
        {{ getMappingVal(eyesightList, 'eyesight_id', eyesightIndex, 'title') }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, i) in eyesightList"
          :key="i"
          :command="item.eyesight_id"
          >{{ item.title }}</el-dropdown-item
        >
=======
        {{getMappingVal(eyesightList,'eyesight_id',eyesightIndex,'title')}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, i) in eyesightList" :key="i" :command="item.eyesight_id">{{item.title}}</el-dropdown-item>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters, mapActions } from 'vuex'
export default {
  created() {
    this.setEyesightList()
=======
import { mapGetters, mapActions } from 'vuex';
export default {
  created() {
    this.setEyesightList();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  computed: {
    ...mapGetters(['eyesightList', 'eyesightIndex'])
  },
  methods: {
    ...mapActions(['setEyesightList', 'setEyesightIndex']),
    selectItem(e) {
<<<<<<< HEAD
      this.setEyesightIndex(e)
    }
  }
}
=======
      this.setEyesightIndex(e);
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scope>
.icon-icon_view {
  color: #e16b06;
  font-size: 16px;
  margin-right: 15px;
  font-weight: bold;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
