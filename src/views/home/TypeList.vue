<template>
  <div class="list-box">
    <div
      v-for="item in list"
      :key="item.sub_type"
      class="list-item"
      @click="handleClick(item)"
      :class="selectType == item.sub_type ? 'active-border' : ''"
    >
      <div class="left inner-item">
        <span
          class="left-span"
          :style="{ background: getAttrs(item.sub_type).color }"
        >
          <i class="iconfont" :class="getAttrs(item.sub_type).icon"></i>
        </span>
      </div>
      <div class="right inner-item">
        <div class="count">{{ item.count }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import typeListData from './typeListData.js'
export default {
  props: {
    list: Array,
    selectType: String
  },
  computed: {
    getAttrs() {
      return type => {
        return typeListData.find(el => el.sub_type == type)
      }
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('handleClick', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-box {
  display: flex;
  height: 100px;
  // padding: 20px 0;
  .list-item {
    flex: 1;
    display: flex;
    cursor: pointer;
    border-bottom: 2px solid #fff;
    &.active-border {
      border-bottom: 2px solid #409eff;
    }
    .inner-item {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 10px;
    }
    .left {
      justify-content: flex-end;
      .left-span {
        width: 50px;
        display: inline-block;
        height: 50px;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        .iconfont {
          font-size: 27px;
          color: #fff;
        }
      }
    }
    .right {
      flex-direction: column;
      align-items: baseline;
      display: flex;
      justify-content: center;
      .count {
        font-size: 21px;
        font-weight: 600;
        color: #333;
      }
      .desc {
        font-size: 15px;
        color: #888;
        margin-top: 5px;
      }
    }
  }
  .list-item + .list-item {
    border-left: 1px solid #eaeaea;
  }
}
</style>
