<template>
  <div @click.stop>
<<<<<<< HEAD
    <img
      class="img-item"
      @click.stop="handleClick(item)"
      :src="getImgUrl(item)"
      v-for="(item, i) in 104"
      :key="i"
      alt
    />
=======
    <img class="img-item" @click.stop="handleClick(item)" :src="getImgUrl(item)" v-for="(item,i) in 104" alt />
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    handleClick(item) {
<<<<<<< HEAD
      this.$emit('selectExpression', item)
    },
    getImgUrl(url) {
      return `http://img.ecgtool.com/ecs/ec/gif/2019/08/27//default/${url}.gif`
    }
  }
}
=======
      this.$emit('selectExpression', item);
    },
    getImgUrl(url) {
      return `http://img.ecgtool.com/ecs/ec/gif/2019/08/27//default/${url}.gif`;
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.img-item {
  margin: 0 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
