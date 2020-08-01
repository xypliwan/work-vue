<template>
  <div class="status-box" v-loading="statusLoading">
    <el-radio-group v-model="selectStatus">
<<<<<<< HEAD
      <el-radio
        v-for="item in needStatusList"
        :key="item.status_code"
        :label="item.status_code"
        v-if="item.status_code !== '0'"
        >{{ item.status_name }}</el-radio
      >
    </el-radio-group>
    <div class="save-box">
      <el-button size="mini" type="primary" @click="needDetailUpdate"
        >保存</el-button
      >
=======
      <el-radio v-for="item in needStatusList" :key="item.status_code" :label="item.status_code" v-if="item.status_code !== '0'">{{item.status_name}}</el-radio>
    </el-radio-group>
    <div class="save-box">
      <el-button size="mini" type="primary" @click="needDetailUpdate">保存</el-button>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getNeedStatus, needDetailUpdate } from '@/api/demandConversation'
=======
import { getNeedStatus, needDetailUpdate } from '@/api/demandConversation';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    chatItemId: String,
    status: String
  },
  data() {
    return {
      needStatusList: [],
      selectStatus: '',
      statusLoading: false
<<<<<<< HEAD
    }
  },
  mounted() {
    this.setStatus()
    this.getNeedStatus()
  },
  watch: {
    chatItemId() {
      this.setStatus()
    },
    status() {
      this.setStatus()
=======
    };
  },
  mounted() {
    this.setStatus();
    this.getNeedStatus();
  },
  watch: {
    chatItemId(newVal) {
      this.setStatus();
    },
    status(newval) {
      this.setStatus();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    setStatus() {
<<<<<<< HEAD
      this.selectStatus = this.status
    },
    async needDetailUpdate() {
      this.statusLoading = true
      try {
        let { message } = await needDetailUpdate({
          list_id: this.chatItemId,
          need_status: this.selectStatus
        })
        this._message(message, 'success')
        this.$emit('updateOk')
      } catch (error) {
        this._message(error)
      }
      this.statusLoading = false
    },
    async getNeedStatus() {
      this.statusLoading = true
      try {
        let { data } = await getNeedStatus()
        this.needStatusList = data
      } catch (error) {
        this._message(error)
      }
      this.statusLoading = false
    }
  }
}
=======
      this.selectStatus = this.status;
    },
    async needDetailUpdate() {
      this.statusLoading = true;
      try {
        let { data, message } = await needDetailUpdate({ list_id: this.chatItemId, need_status: this.selectStatus });
        this._message(message, 'success');
        this.$emit('updateOk');
      } catch (error) {
        this._message(error);
      }
      this.statusLoading = false;
    },
    async getNeedStatus() {
      this.statusLoading = true;
      try {
        let { data } = await getNeedStatus();
        this.needStatusList = data;
      } catch (error) {
        this._message(error);
      }
      this.statusLoading = false;
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.status-box {
  /deep/ .el-radio {
    display: block;
    margin: 15px 0;
  }
  .save-box {
    padding-top: 10px;
    border-top: 1px solid #f1f1f1;
    text-align: center;
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
