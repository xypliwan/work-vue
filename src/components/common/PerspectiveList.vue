<template>
  <!-- 视角选择 -->
  <div>
    <i class="iconfont icon-icon_view"></i>
    <el-dropdown trigger="click" @command="selectItem">
      <span class="el-dropdown-link">
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
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created() {
    this.setEyesightList()
  },
  computed: {
    ...mapGetters(['eyesightList', 'eyesightIndex'])
  },
  methods: {
    ...mapActions(['setEyesightList', 'setEyesightIndex']),
    selectItem(e) {
      this.setEyesightIndex(e)
    }
  }
}
</script>

<style lang="scss" scope>
.icon-icon_view {
  color: #e16b06;
  font-size: 16px;
  margin-right: 15px;
  font-weight: bold;
}
</style>
