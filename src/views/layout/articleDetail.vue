<template>
<<<<<<< HEAD
  <div class="artic-wrapper">
    <div class="content-box" v-show="!isLoading">
      <div class="name">
        {{ title }}
        <label v-if="hasToken">
          <span
            v-for="(item, i) in awesomeType"
            :key="i"
            :class="item.isActive ? 'active' : ''"
            @click="handleItem(item)"
          >
            <i class="iconfont" :class="item.icon"></i>
            {{ item.name }}
          </span>
        </label>
        <el-tooltip
          class="item"
          effect="dark"
          content="复制文章链接"
          placement="bottom"
        >
          <i
            class="iconfont icon-fuzhi1 copy-class"
            @click="copyAddress('链接复制成功', `${locations}/#/detail/${id}`)"
          ></i>
        </el-tooltip>

        <p class="update-time">最后更新时间: {{ updateTime }}</p>
=======
  <div class="wrapper">
    <div class="content-box" v-show="!isLoading">
      <div class="name">
        {{title}}
        <label v-if="hasToken">
          <span v-for="(item,i) in awesomeType" :key="i" :class="item.isActive ? 'active' : ''" @click="handleItem(item)">
            <i class="iconfont" :class="item.icon"></i>
            {{item.name}}
          </span>
        </label>
        <i class="iconfont icon-fuzhi1 copy-class" @click="copyAddress('链接复制成功',`${locations}/#/detail/${id}`)"></i>
        <p class="update-time">最后更新时间: {{updateTime}}</p>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </div>
      <div v-html="content" class="content"></div>
    </div>
    <div class="loading" v-show="isLoading">
      <img src="@/assets/images/loading.gif" alt />
    </div>
  </div>
</template>

<<<<<<< HEAD
<script>
import {
  getKnowledgeDetailNoExtend,
  addEvaluateKnowledge
} from '@/api/ycUniversity'
import { getLocalStorage } from '@/utils/localStorage'
=======

<script>
import { getKnowledgeDetail, addEvaluateKnowledge } from '@/api/ycUniversity';
import { getLocalStorage } from '@/utils/localStorage';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      isLoading: false,
      content: '',
      title: '',
      updateTime: '',
      awesomeType: [
        { type: '1', icon: 'icon-iconup2', name: '有帮助', isActive: false },
        { type: '2', icon: 'icon-icondown2', name: '无帮助', isActive: false }
      ],
      id: '',
      locations: window.location.origin
<<<<<<< HEAD
    }
  },
  mounted() {
    let detailId = this.$route.params.id
    if (detailId) {
      this.id = this.$route.params.id
      this.getKnowledgeDetail(detailId)
=======
    };
  },
  mounted() {
    let detailId = this.$route.params.id;
    if (detailId) {
      this.id = this.$route.params.id;
      this.getKnowledgeDetail(detailId);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  computed: {
    hasToken() {
<<<<<<< HEAD
      return getLocalStorage('Access-Token')
=======
      return getLocalStorage('Access-Token');
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    handleItem(item) {
      switch (item.type) {
        case '1':
<<<<<<< HEAD
          this.awesomeType[1].isActive = false
          break

        case '2':
          this.awesomeType[0].isActive = false
          break
      }
      item.isActive = !item.isActive
      this.addEvaluateKnowledge(item.type)
=======
          this.awesomeType[1].isActive = false;
          break;

        case '2':
          this.awesomeType[0].isActive = false;
          break;
      }
      item.isActive = !item.isActive;
      this.addEvaluateKnowledge(item.type);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    async addEvaluateKnowledge(num) {
      let params = {
        knowledge_id: this.id,
        evaluate: num
<<<<<<< HEAD
      }
      try {
        await addEvaluateKnowledge(params)
      } catch (error) {
        this._message(error)
      }
    },
    async getKnowledgeDetail(id) {
      this.isLoading = true
      try {
        let { data } = await getKnowledgeDetailNoExtend({ knowledge_id: id })
        this.title = data.title
        this.content = data.content
        this.updateTime = data.updated_at
      } catch (error) {
        this._message(error)
      }
      this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scope>
.artic-wrapper {
  background: #f1f1f1;
  min-height: 100vh;
=======
      };
      try {
        let { data } = await addEvaluateKnowledge(params);
      } catch (error) {
        this._message(error);
      }
    },
    async getKnowledgeDetail(id) {
      this.isLoading = true;
      try {
        let { data } = await getKnowledgeDetail({ knowledge_id: id });
        this.title = data.title;
        this.content = data.content;
        this.updateTime = data.updated_at;
      } catch (error) {
        this._message(error);
      }
      this.isLoading = false;
    }
  }
};
</script>
<style lang="scss" scope>
.wrapper {
  //   background: #f0f4f3;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  .content-box {
    width: 1200px;
    margin: 0 auto;
    padding: 0px 10px;
    background: #fff;
<<<<<<< HEAD
    min-height: 100vh;
    .content {
      overflow: hidden;
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 10px !important;
      }
=======
    .content {
      overflow: hidden;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      img {
        max-width: 100% !important;
      }
    }
    .name {
      font-size: 24px;
      color: #333;
      padding: 30px 15px;
      background: #f7f7f7;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 20px;
      span {
        font-size: 12px;
        border: 1px solid #dadada;
        padding: 3px 10px;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 20px;
        .iconfont {
          margin-right: 5px;
        }
        &.active {
          border: 1px solid #409eff;
          color: #409eff;
        }
      }
      .update-time {
        font-size: 14px;
        font-weight: normal;
        margin-top: 15px;
        color: #666;
        position: relative;
        top: 10px;
      }
    }
  }
}

.copy-class {
  margin-left: 20px;
}

.loading {
  text-align: center;
  margin-top: 250px;
  img {
    width: 40px;
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
