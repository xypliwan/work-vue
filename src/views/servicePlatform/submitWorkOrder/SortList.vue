<template>
  <div>
    <ul class="type-box">
<<<<<<< HEAD
      <li
        v-for="(item, i) in list"
        class="item"
        :key="i"
        @click="handleItem(item.category_id)"
        :class="id == item.category_id ? 'active' : ''"
      >
        {{ item.name }}
        <i
          class="iconfont icon-arrfill_d-copy-copy"
          v-show="id == item.category_id"
        ></i>
=======
      <li v-for="(item,i) in list" class="item" :key="i" @click="handleItem(item.category_id)" :class="id == item.category_id ? 'active' : ''">
        {{item.name}}
        <i class="iconfont icon-arrfill_d-copy-copy" v-show="id == item.category_id"></i>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </li>
    </ul>
    <div class="no-data" v-if="!list.length">暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    list: [Array],
<<<<<<< HEAD
    id: {
      type: String,
      default: ''
    }
=======
    id: ''
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  data() {
    return {
      // id: ''
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  methods: {
    handleItem(id) {
      // this.id = id;
<<<<<<< HEAD
      this.$emit('selectId', id)
=======
      this.$emit('selectId', id);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    resetId() {
      // this.id = '';
    }
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.type-box {
  .item {
    padding: 5px 10px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 14px;
    padding-right: 20px;
    position: relative;
    line-height: 20px;
    cursor: pointer;
    margin-bottom: 10px;
    &.active {
      background: #f1f1f1;
    }
    .icon-arrfill_d-copy-copy {
      position: absolute;
      top: 24%;
      right: 5px;
      font-size: 12px;
      color: #409eff;
    }
  }
}
.no-data {
  font-size: 12px;
  color: #999;
  text-align: center;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
