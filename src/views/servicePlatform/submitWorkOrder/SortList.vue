<template>
  <div>
    <ul class="type-box">
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
      </li>
    </ul>
    <div class="no-data" v-if="!list.length">暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    list: [Array],
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // id: ''
    }
  },
  methods: {
    handleItem(id) {
      // this.id = id;
      this.$emit('selectId', id)
    },
    resetId() {
      // this.id = '';
    }
  }
}
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
</style>
