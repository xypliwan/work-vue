<template>
  <div>
    <img :src="setGreetings.url" class="greetings-img" />
<<<<<<< HEAD
    <p class="greetings-desc">{{ setGreetings.desc }}</p>
=======
    <p class="greetings-desc">{{setGreetings.desc}}</p>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </div>
</template>

<script>
<<<<<<< HEAD
import { isMorAorN } from '_u/utils'
=======
import { isMorAorN } from '_u/utils';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      greetings: [
        {
          desc: '上午好,美好的一天，加油哦。',
          url: require('@/assets/images/morning.png')
        },
        {
          desc: '下午好,喝杯茶吧,让精神抖擞起来。',
          url: require('@/assets/images/afternoon.png')
        },
        {
          desc: '晚上好,请注意休息。',
          url: require('@/assets/images/night.png')
        }
      ]
<<<<<<< HEAD
    }
  },
  computed: {
    setGreetings() {
      return this.greetings[isMorAorN()]
    }
  }
}
=======
    };
  },
  computed: {
    setGreetings() {
      return this.greetings[isMorAorN()];
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.greetings-img {
  width: 175px;
  margin: 0 auto;
  display: block;
}
.greetings-desc {
  font-size: 13px;
  color: #999;
  text-align: center;
  margin-top: 15px;
  font-weight: 800;
  font-family: cursive;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
