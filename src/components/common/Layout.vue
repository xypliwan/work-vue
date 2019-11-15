<template>
  <div class="view-layout">
    <div class="layout-header" :style="{'height':headerHeight}">
      <slot name="header"></slot>
    </div>
    <!-- 'height':buttonHeader, -->
    <div class="layout-button" :style="{'top':headerHeight,'height':buttonHeader}">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerHeight: String,
    hasPadding: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonHeader() {
      return this.hasPadding ? `100vh` : `calc(100vh - ${this.headerHeight})`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.view-layout {
  position: relative;
  .layout-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .layout-button {
    width: 100%;
    position: absolute;
    left: 0;
    // border-bottom: 55px solid #fff;
    overflow-y: auto;
    @include scrollBar;
  }
}
</style>
