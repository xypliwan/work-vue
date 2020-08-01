<template>
  <div class="chat-box" ref="imageWrapper">
    <div class="chat-btn">
      <el-tooltip content="表情" placement="bottom">
        <el-popover placement="top" width="480" trigger="click">
          <expression @selectExpression="selectExpression"></expression>
          <i slot="reference" class="iconfont icon-biaoqing1"></i>
        </el-popover>
      </el-tooltip>
      <el-tooltip content="上传文件" placement="bottom">
        <i class="iconfont icon-wenjianshangchuan" @click="uoloadFile"></i>
      </el-tooltip>
      <slot name="icon"></slot>
    </div>

    <div class="chat-info">
<<<<<<< HEAD
      <editor
        ref="editors"
        @sendInfo="sendInfo"
        @changeVal="changeVal"
      ></editor>
      <div class="opren-box">
        <div class="file-box">
          <div class="item" v-for="(item, i) in fileBox" :key="i">
            <span>{{ item.file_name }}</span>
            <i class="iconfont icon-guanbi" @click="delFile(i)"></i>
          </div>
        </div>
        <el-button
          :disabled="disabledBtn"
          class="send-btn"
          size="mini"
          type="primary"
          @click="sendInfo"
          >发送 (ctrl+enter)</el-button
        >
      </div>
    </div>
    <div class="upload-box">
      <upload
        ref="uploads"
        :list="[]"
        :limit="50"
        @successOk="successOk"
      ></upload>
    </div>
  </div>
</template>

<script>
import Editor from './Editor'
import Expression from './expression'
import Upload from '_c/common/Upload'
=======
      <editor ref="editors" @sendInfo="sendInfo" @changeVal="changeVal"></editor>
      <div class="opren-box">
        <div class="file-box">
          <div class="item" v-for="(item,i) in fileBox">
            <span>{{item.file_name}}</span>
            <i class="iconfont icon-guanbi" @click="delFile(i)"></i>
          </div>
        </div>
        <el-button :disabled="disabledBtn" class="send-btn" size="mini" type="primary" @click="sendInfo">发送 (ctrl+enter)</el-button>
      </div>
    </div>
    <div class="upload-box">
      <upload ref="uploads" :list="[]" :limit="50" @successOk="successOk"></upload>
    </div>
  </div>
</template> 

<script>
import Editor from './Editor';
import Expression from './expression';
import Upload from '_c/common/Upload';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  data() {
    return {
      fileBox: [
        // { file_name: 'a.xsl', url: 'www.baidu.con' },
      ],
      disabledBtn: true
<<<<<<< HEAD
    }
  },
  watch: {
    fileBox(newVal) {
      let cont = this.$refs.editors.getHtml()
      this.disabledBtn = newVal.length <= 0 && cont.length <= 0 ? true : false
=======
    };
  },
  watch: {
    fileBox(newVal) {
      let cont = this.$refs.editors.getHtml();
      this.disabledBtn = newVal.length <= 0 && cont.length <= 0 ? true : false;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    setEditorHeight(height) {
<<<<<<< HEAD
      let editorDoms = document.getElementsByClassName('ql-editor')[0]
      editorDoms.style.height = height + 'px'
    },
    changeVal(val) {
      this.disabledBtn =
        val.length <= 0 && this.fileBox.length <= 0 ? true : false
    },
    delFile(i) {
      this.fileBox.splice(i, 1)
    },
    uoloadFile() {
      document.querySelector('.upload-box .lod').click()
    },
    successOk(data) {
      let imgType = ['jpg', 'bmp', 'gif', 'png', 'jpeg']
      let snapArr = data.file_name.split('.')
      let isImg = snapArr[snapArr.length - 1]
      if (imgType.includes(isImg)) {
        //是图片类型
        this.$refs.editors.concatVal(data.url)
      } else {
        //文件类型
        this.fileBox.push(data)
      }
    },
    sendInfo() {
      let cont = this.$refs.editors.getHtml()
      if (cont.length <= 0 && this.fileBox.length <= 0) {
        return
      }
      let str = ''
      this.fileBox.forEach(el => {
        // target='_blank'
        str += `<div class='file-special'><i class='iconfont icon-wenjian'></i><a href='${el.url}' download='${el.file_name}' target='_blank'>${el.file_name}</a></div>`
      })
      this.$emit('sendInfo', cont + str)
    },
    selectExpression(item) {
      let cont = `http://img.ecgtool.com/ecs/ec/gif/2019/08/27//default/${item}.gif`
      this.$refs.editors.concatVal(cont)
    },
    showHtml(val) {
      this.$refs.editors.showHtml(val)
    },
    getHtml() {
      return this.$refs.editors.getHtml()
    },
    clearHtml() {
      this.fileBox = []
      this.$refs.editors.clearHtml()
    },
    setFoucsEdit() {
      this.$refs.editors.setFoucsEdit()
=======
      let editorDoms = document.getElementsByClassName('ql-editor')[0];
      editorDoms.style.height = height + 'px';
    },
    changeVal(val) {
      this.disabledBtn = val.length <= 0 && this.fileBox.length <= 0 ? true : false;
    },
    delFile(i) {
      this.fileBox.splice(i, 1);
    },
    uoloadFile() {
      document.querySelector('.upload-box .lod').click();
    },
    successOk(data) {
      let imgType = ['jpg', 'bmp', 'gif', 'png', 'jpeg'];
      let snapArr = data.file_name.split('.');
      let isImg = snapArr[snapArr.length - 1];
      if (imgType.includes(isImg)) {
        //是图片类型
        this.$refs.editors.concatVal(data.url);
      } else {
        //文件类型
        this.fileBox.push(data);
      }
    },
    sendInfo() {
      let cont = this.$refs.editors.getHtml();
      if (cont.length <= 0 && this.fileBox.length <= 0) {
        return;
      }
      let str = '';
      this.fileBox.forEach(el => {
        // target='_blank'
        str += `<div class='file-special'><i class='iconfont icon-wenjian'></i><a href='${el.url}' download='${el.file_name}' target='_blank'>${el.file_name}</a></div>`;
      });
      this.$emit('sendInfo', cont + str);
    },
    selectExpression(item) {
      let cont = `http://img.ecgtool.com/ecs/ec/gif/2019/08/27//default/${item}.gif`;
      this.$refs.editors.concatVal(cont);
    },
    showHtml(val) {
      this.$refs.editors.showHtml(val);
    },
    getHtml() {
      return this.$refs.editors.getHtml();
    },
    clearHtml() {
      this.fileBox = [];
      this.$refs.editors.clearHtml();
    },
    setFoucsEdit() {
      this.$refs.editors.setFoucsEdit();
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  components: {
    Editor,
    Expression,
    Upload
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.chat-box {
  border: 1px solid #efefef;
  border-radius: 3px;
  height: 100%;
  overflow: hidden;
  position: relative;
  .chat-btn {
    padding: 5px 8px;
    border-top: 1px solid #efefef;
    background: #f0f4f3;
    border-radius: 3px;
    overflow: hidden;
    height: 35px;
    box-sizing: border-box;
    .iconfont {
      font-size: 20px;
      color: #555;
      margin-right: 7px;
      cursor: pointer;
    }
  }
  .chat-info {
    padding: 0 10px;
    height: 90%;
    // position: relative;
    .send-btn {
      float: right;
      margin-top: 10px;
    }
    .opren-box {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      display: flex;
      margin-top: 10px;
      margin-bottom: 10px;
<<<<<<< HEAD
      border-top: 1px solid #f1f1f1;
=======
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      .file-box {
        flex: 1;
        width: 200px;
        padding: 0 20px;
        line-height: 32px;
        overflow: hidden;
        overflow-x: auto;
        white-space: nowrap;
        @include scrollBar;
        .item {
          display: inline-block;
          margin-right: 20px;
          span {
            color: #333;
            font-size: 15px;
          }
          i {
            margin-left: 4px;
            font-size: 13px;
            color: #999;
            cursor: pointer;
          }
        }
      }
      .send-btn {
        float: right;
      }
    }
  }
  .upload-box {
    display: none;
  }
}
</style>
