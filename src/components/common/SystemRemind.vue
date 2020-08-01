<template>
  <el-popover placement="top" trigger="hover">
    <div class="cont-box">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in list"
          :key="index"
          :timestamp="item.show_time"
        >
          {{ item.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
    <div slot="reference" class="system-remind">
      <span v-show="showSystemRemind">
        系统提醒:
        <span class="info-txt" v-if="list.length > 0">
          <i class="el-icon-warning"></i>
          {{ list[0].content }}
        </span>
      </span>
      <i
        class="el-icon-arrow-right close-icon"
        :class="showSystemRemind ? '' : 'active-icon'"
        @click="showInfo"
      ></i>
    </div>
  </el-popover>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    list: Array
  },
  computed: {
    ...mapGetters(['showSystemRemind'])
  },
  methods: {
    ...mapActions(['setSystemRemind']),
    showInfo() {
      this.setSystemRemind()
    }
  }
}
</script>
<style lang="scss" scoped>
.cont-box {
  max-height: 300px;
  overflow-y: auto;
}
.system-remind {
  display: inline-block;
  float: right;
  line-height: 19px;
  font-size: 14px;
  color: #9a9a9a;
  .close-icon {
    cursor: pointer;
    &.active-icon {
      transform: rotate(180deg);
    }
  }
  .info-txt {
    color: #e6a23c;
    background: #fdf6ec;
    padding: 3px 8px;
    border-radius: 3px;
  }
}
</style>
