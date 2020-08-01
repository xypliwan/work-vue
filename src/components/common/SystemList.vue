<template>
  <!-- 系统类型选择 -->
  <div>
    <el-dropdown trigger="click" @command="selectItemSys">
      <span class="el-dropdown-link">
        {{
          getMappingVal(
            systemList,
            'product_id',
            currentSystemIdx,
            'product_name'
          )
        }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, i) in systemList"
          :key="i"
          :command="item.product_id"
          >{{ item.product_name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['systemList', 'currentSystemIdx'])
  },
  methods: {
    ...mapActions(['setCurrentSystemIdx']),
    selectItemSys(e) {
      this.setCurrentSystemIdx(e)
    }
  }
}
</script>

<style lang="scss" scope></style>
