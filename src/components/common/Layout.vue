<template>
  <div class="view-layout">
<<<<<<< HEAD
    <div class="layout-header" :style="{ height: headerHeight }">
      <slot name="header"></slot>
    </div>
    <!-- 'height':buttonHeader, -->
    <div
      class="layout-button"
      :style="{ top: headerHeight, height: buttonHeader }"
    >
=======
    <div class="layout-header" :style="{'height':headerHeight}">
      <slot name="header"></slot>
    </div>
    <!-- 'height':buttonHeader, -->
    <div class="layout-button" :style="{'top':headerHeight,'height':buttonHeader}">
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
<<<<<<< HEAD
      return this.hasPadding ? `100vh` : `calc(100vh - ${this.headerHeight})`
    }
  }
}
=======
      return this.hasPadding ? `100vh` : `calc(100vh - ${this.headerHeight})`;
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
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
