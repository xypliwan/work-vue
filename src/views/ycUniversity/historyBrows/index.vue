<template>
  <div>
    <div class="history-brows-wrapper">
      <div class="left">
        <div v-show="!isSearch">
          <browse-record></browse-record>
        </div>
        <dir v-show="isSearch">
          <search-list></search-list>
        </dir>
      </div>
      <div class="right">
        <hot-help></hot-help>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import HotHelp from './HotHelp'
import BrowseRecord from './BrowseRecord'
import SearchList from './SearchList'
import { mapGetters, mapActions } from 'vuex'
=======
import HotHelp from './HotHelp';
import BrowseRecord from './BrowseRecord';
import SearchList from './SearchList';
import { mapGetters, mapActions } from 'vuex';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  computed: {
    ...mapGetters(['isSearch'])
  },
  created() {},
  methods: {
    ...mapActions(['setIsSearch'])
  },
  components: {
    HotHelp,
    BrowseRecord,
    SearchList
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>
<style lang="scss" scoped>
.history-brows-wrapper {
  display: flex;
  overflow: hidden;
  .left {
    flex: 1;
    padding: 0px 10px;
  }
  .right {
    float: right;
    width: 300px;
    padding: 0px 10px;
    border-left: 2px solid #f1f1f1;
  }
}
</style>
