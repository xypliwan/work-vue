<template>
  <!-- 系统类型选择 -->
  <div>
    <el-dropdown trigger="click" @command="selectItemSys">
      <span class="el-dropdown-link">
<<<<<<< HEAD
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
=======
        {{getMappingVal(systemList,'product_id',currentSystemIdx,'product_name')}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, i) in systemList" :key="i" :command="item.product_id">{{item.product_name}}</el-dropdown-item>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters, mapActions } from 'vuex'
=======
import { mapGetters, mapActions } from 'vuex';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  computed: {
    ...mapGetters(['systemList', 'currentSystemIdx'])
  },
  methods: {
    ...mapActions(['setCurrentSystemIdx']),
    selectItemSys(e) {
<<<<<<< HEAD
      this.setCurrentSystemIdx(e)
    }
  }
}
</script>

<style lang="scss" scope></style>
=======
      console.log(e)
      this.setCurrentSystemIdx(e);
    }
  }
};
</script>

<style lang="scss" scope>
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
