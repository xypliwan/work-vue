<template>
  <div>
    <div class="knowledge-box">
      <div class="left">
<<<<<<< HEAD
        <el-select
          size="small"
          @change="handlePid"
          v-model="params.pid"
          placeholder="请选择"
        >
          <el-option
            v-for="item in onePlate"
            :key="item.km_id"
            :label="item.title"
            :value="item.km_id"
          ></el-option>
=======
        <el-select size="small" @change="handlePid" v-model="params.pid" placeholder="请选择">
          <el-option v-for="item in onePlate" :key="item.km_id" :label="item.title" :value="item.km_id"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        </el-select>

        <div class="second-plate" v-loading="secondPlateLoading">
          <ul>
<<<<<<< HEAD
            <li
              v-for="(item, i) in secondPlate"
              :key="i"
              :class="item.km_id == secondId ? 'active' : ''"
              @click="handleSecondPlate(item)"
            >
              {{ item.title }}
              <span class="num">{{ item.num }}</span>
=======
            <li v-for="(item, i) in secondPlate" :key="i" :class="item.km_id == secondId ? 'active' : ''" @click="handleSecondPlate(item)">
              {{item.title}}
              <span class="num">{{item.num}}</span>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </li>
          </ul>
          <div class="no-data" v-show="!this.secondPlate.length">暂无数据</div>
        </div>
      </div>
      <div class="right">
<<<<<<< HEAD
        <knowledge-list
          :onePlateAll="onePlateAll"
          :pid="params.pid"
          :secondId="secondId"
        ></knowledge-list>
=======
        <knowledge-list :onePlateAll="onePlateAll" :pid="params.pid" :secondId="secondId"></knowledge-list>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import KnowledgeList from './KnowledgeList'
import { getFirstKnowledgeModel, getSecondKnowledgeModel } from '@/api/common'
import { mapGetters } from 'vuex'
=======
import KnowledgeList from './KnowledgeList';
import { getFirstKnowledgeModel, getSecondKnowledgeModel } from '@/api/common';
import { mapGetters } from 'vuex';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      params: {
        pid: '', //模块id 一级模块选中的
        eyesight_id: '' //视角id
      },
      onePlate: [], //一级板块
      secondPlate: [], //二级板块
      secondId: '', //二级板块id
      secondPlateLoading: false,
<<<<<<< HEAD
      onePlateAll: [] //所有的一级板块
    }
  },
  mounted() {
    this.getFirstKnowledgeModelAll()
    if (this.currentSystemIdx !== '') {
      this.getFirstKnowledgeModels()
    }

    if (this.params.pid !== '') {
      this.getSecondKnowledgeModels()
    }
  },
  watch: {
    eyesightIndex() {
      if (this.params.pid !== '') {
        this.getSecondKnowledgeModels()
      }
    },
    currentSystemIdx() {
      this.getFirstKnowledgeModels()
=======
      onePlateAll:[],   //所有的一级板块
    };
  },
  mounted() {
    this.getFirstKnowledgeModelAll();
    if(this.currentSystemIdx !==''){
      this.getFirstKnowledgeModels();
    }
    
    if (this.params.pid !== '') {
        this.getSecondKnowledgeModels();
    }
  },
  watch: {
    eyesightIndex(newVal) {
      if (this.params.pid !== '') {
        this.getSecondKnowledgeModels();
      }
    },
    currentSystemIdx(newVal) {
      // if(this.params.pid !== ''){
        this.getFirstKnowledgeModels();
      // }
      
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  computed: {
    ...mapGetters(['eyesightIndex', 'currentSystemIdx'])
  },
  methods: {
<<<<<<< HEAD
    async getFirstKnowledgeModelAll() {
      //获取所有的一级板块
      try {
        let { data } = await getFirstKnowledgeModel()
        this.onePlateAll = data
      } catch (error) {
        this._message(error)
      }
    },
    handleSecondPlate(item) {
      this.secondId = item.km_id
    },
    handlePid() {
      this.getSecondKnowledgeModels()
=======
    async getFirstKnowledgeModelAll(){
      //获取所有的一级板块
      try {
        let { data } = await getFirstKnowledgeModel();
        this.onePlateAll = data;
      } catch (error) {
        this._message(error);
      }
    },
    handleSecondPlate(item) {
      this.secondId = item.km_id;
    },
    handlePid(e) {
      this.getSecondKnowledgeModels();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    async getFirstKnowledgeModels() {
      //获取一级板块
      try {
<<<<<<< HEAD
        let { data } = await getFirstKnowledgeModel({
          product_id: this.currentSystemIdx
        })
        this.onePlate = data
        if (this.onePlate.length > 0) {
          this.params.pid = this.onePlate[0].km_id
          await this.getSecondKnowledgeModels()
        } else {
          this.params.pid = ''
          this.secondPlate = []
        }
      } catch (error) {
        this._message(error)
=======
        let { data } = await getFirstKnowledgeModel({ product_id: this.currentSystemIdx });
        this.onePlate = data;
        if (this.onePlate.length > 0) {
          this.params.pid = this.onePlate[0].km_id;
          await this.getSecondKnowledgeModels();
        } else {
          this.params.pid = '';
          this.secondPlate = [];
        }
      } catch (error) {
        this._message(error);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
    },
    async getSecondKnowledgeModels() {
      //二级板块
<<<<<<< HEAD
      this.params.eyesight_id = this.eyesightIndex
      this.secondPlateLoading = true
      try {
        let { data } = await getSecondKnowledgeModel(this.params)
        this.secondPlate = data
        this.secondId = this.secondPlate.length ? this.secondPlate[0].km_id : ''
      } catch (error) {
        this._message(error)
      }
      this.secondPlateLoading = false
=======
      this.params.eyesight_id = this.eyesightIndex;
      this.secondPlateLoading = true;
      try {
        let { data } = await getSecondKnowledgeModel(this.params);
        this.secondPlate = data;
        this.secondId = this.secondPlate.length ? this.secondPlate[0].km_id : '';
      } catch (error) {
        this._message(error);
      }
      this.secondPlateLoading = false;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    KnowledgeList
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
.knowledge-box {
  display: flex;
  overflow: hidden;
  height: calc(100vh - 140px);
  .left {
    float: left;
    width: 250px;
    border-right: 2px solid #f1f1f1;
    margin-right: 15px;
    padding-bottom: 10px;
    overflow-y: auto;
    padding: 0px 10px;
    .no-data {
      padding: 30px 10px;
      text-align: center;
      font-size: 13px;
      color: #999;
    }
    .second-plate {
      padding: 20px 10px;
      ul {
        li {
          padding: 10px 0px;
          padding-right: 40px;
          font-size: 14px;
          overflow: hidden;
          color: #999;
          cursor: pointer;
          position: relative;
          &.active {
            color: #333;
          }
          .num {
            position: absolute;
            right: 0;
            top: 10px;
            padding: 3px 5px;
            border-radius: 10px;
            background: #409eff;
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }
  .right {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
