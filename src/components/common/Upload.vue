<template>
  <div>
    <el-upload
      class="upload-demo"
      :headers="headers"
      name="upload_file"
      :action="uploadUrl"
      :on-success="handleSuccess"
      :on-error="hanldeError"
      :before-upload="handleBefore"
      :accept="accept"
      multiple
      :show-file-list="false"
    >
      <!-- :disabled="list.length >= limit" -->
<<<<<<< HEAD
      <el-button
        size="small"
        type="primary"
        class="lod"
        v-show="list.length < limit"
        >上传</el-button
      >
      <div slot="tip" class="el-upload__tip desc-tip">{{ desc }}</div>
    </el-upload>
    <ul class="file-wrapper">
      <li class="file-item" v-for="(item, i) in list" :key="i">
        {{ item.name }}
=======
      <el-button size="small" type="primary" class="lod" v-show="list.length < limit">上传</el-button>
      <div slot="tip" class="el-upload__tip desc-tip">{{desc}}</div>
    </el-upload>
    <ul class="file-wrapper">
      <li class="file-item" v-for="(item,i) in list" :key="i">
        {{item.name}}
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        <i class="iconfont icon-guanbi" @click="deleteItem(i)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage'
import baseURL from '@/config/baseUrl'
=======
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage';
import baseURL from '@/config/baseUrl';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    limit: Number,
    list: [Array],
    desc: String,
    accept: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: null
<<<<<<< HEAD
    }
  },
  computed: {
    uploadUrl() {
      return baseURL.requestUrl + '/common/upload'
    },
    headers() {
      return { 'Access-Token': getLocalStorage('Access-Token') }
=======
    };
  },
  computed: {
    uploadUrl() {
      return baseURL.requestUrl + '/common/upload';
    },
    headers() {
      return { 'Access-Token': getLocalStorage('Access-Token') };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    handleBefore() {
      this.isLoading = this.$loading({
        lock: true,
        text: '上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0)'
<<<<<<< HEAD
      })
    },
    deleteItem(i) {
      this.$emit('deleteFile', i)
    },
    handleSuccess(res) {
      this.isLoading.close()
      if (res.code == 200) {
        if (res.error == 0) {
          this.$emit('successOk', res.data)
        } else if (res.error == 1001) {
          removeLocalStorage('Access-Token')
          setTimeout(() => {
            window.open('http://crm.ecgtool.com/login', '_self')
          }, 800)
        } else {
          this._message(`上传失败：${res.message}`)
        }
      } else {
        this._message(`上传失败：${res.message}`)
      }
    },
    hanldeError(res) {
      this.isLoading.close()
      this._message(`上传失败：${res.message}`)
    }
  }
}
=======
      });
    },
    deleteItem(i) {
      this.$emit('deleteFile', i);
    },
    handleSuccess(res) {
      this.isLoading.close();
      if (res.code == 200) {
        if (res.error == 0) {
          this.$emit('successOk', res.data);
        } else if (res.error == 1001) {
          removeLocalStorage('Access-Token');
          setTimeout(() => {
            window.open('http://crm.ecgtool.com/login', '_self');
          }, 800);
        } else {
          this._message(`上传失败：${res.message}`);
        }
      } else {
        this._message(`上传失败：${res.message}`);
      }
    },
    hanldeError(err) {
      this.isLoading.close();
      this._message(`上传失败：${res.message}`);
    }
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scope>
.desc-tip {
  line-height: 18px !important;
}
.file-wrapper {
  margin-top: 10px;
  .file-item {
    font-size: 13px;
    color: #333;
    padding-right: 20px;
    position: relative;
    border-bottom: 1px solid #13f524;
    .iconfont {
      font-size: 13px;
      color: #999;
      position: absolute;
      top: 5px;
      right: 0px;
      cursor: pointer;
    }
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
