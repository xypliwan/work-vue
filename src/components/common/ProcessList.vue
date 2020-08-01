<template>
  <div class="process-list-box">
<<<<<<< HEAD
    <div v-for="(item, i) in list" :key="i">
      <div class="list-title">{{ item.title }}</div>
      <div
        class="child"
        v-for="(every, j) in item.child"
        :key="j"
        @click="handleItem(every)"
      >
        <div class="every-title">
          {{ every.str }} ( <span>{{ every.num }}</span> )
        </div>
        <div class="every-desc">{{ every.desc }}</div>
=======
    <div v-for="(item,i) in list" :key="i">
      <div class="list-title">{{item.title}}</div>
      <div class="child" v-for="(every,j) in item.child" @click="handleItem(every)">
        <div class="every-title">
          {{every.str}} (
          <span>{{every.num}}</span> )
        </div>
        <div class="every-desc">{{every.desc}}</div>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: [Array],
    infoType: String
  },
  methods: {
    handleItem(item) {
<<<<<<< HEAD
      this.$emit('selectInfoType', { item, infoType: this.infoType })
    }
  }
}
=======
      this.$emit('selectInfoType', { item, infoType: this.infoType });
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.process-list-box {
  max-height: 500px;
  overflow-y: auto;
  @include scrollBar;
  .list-title {
    padding: 5px 10px;
    background: #409eff;
    font-size: 14px;
    color: #fff;
    border-radius: 3px;
  }
  .child {
    margin: 10px 0;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
    .every-title {
      font-size: 14px;
      color: #333;
      span {
        color: #409eff;
      }
    }
    .every-desc {
      color: #666;
      font-size: 12px;
      margin-top: 5px;
      margin-bottom: 10px;
    }
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
