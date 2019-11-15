<template>
  <div class="home">
    <greetings-box></greetings-box>
  </div>
</template>

<script>
import GreetingsBox from '_c/common/Greetings';
export default {
  components: {
    GreetingsBox
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
