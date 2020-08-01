<template>
  <div @click.stop>
    <img
      class="img-item"
      @click.stop="handleClick(item)"
      :src="getImgUrl(item)"
      v-for="(item, i) in 104"
      :key="i"
      alt
    />
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    handleClick(item) {
      this.$emit('selectExpression', item)
    },
    getImgUrl(url) {
      return `http://img.ecgtool.com/ecs/ec/gif/2019/08/27//default/${url}.gif`
    }
  }
}
</script>

<style lang="scss" scoped>
.img-item {
  margin: 0 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
