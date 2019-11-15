<template>
  <div>
    <el-row v-loading="editLoading">
      <quill-editor class="quill-text" v-model="contentOwn" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"></quill-editor>
    </el-row>

    <div class="upload-box" id="supportDom">
      <upload ref="uploads" :list="[]" :limit="50" accept=".jpg, .jpeg, .png" @successOk="successOk"></upload>
    </div>
  </div>
</template>
       


<script>
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage';
import { addQuillTitle } from '@/config/quillTitle';
import Upload from '_c/common/Upload';
import { commonUpload } from '@/api/common';
export default {
  props: {
    content: null,
    placeholders: {
      type: String,
      default: '请输入内容'
    }
  },
  data() {
    return {
      contentOwn: this.content,
      editorOption: {
        theme: 'snow',
        placeholder: this.placeholders
      },
      editLoading: false,
      isFocous: false
    };
  },
  watch: {
    content(newVal) {
      this.contentOwn = newVal;
    }
  },

  mounted() {
    addQuillTitle();
    var imgHandler = async function(state) {
      if (state) {
        document.querySelector('#supportDom .lod').click();
      }
    };
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', imgHandler);

    document.addEventListener('paste', e => {
      this.pasteInfo(e);
    });
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    successOk(data) {
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index;
      quill.insertEmbed(length, 'image', `${data.url}`);
      quill.setSelection(length + 1);
    },
    successOk1(data) {
      console.log(data,'2222222')
      this.$emit('uploadOk', data);
    },
    getHtml() {
      //获取html
      return this.contentOwn;
    },
    clearHtml() {
      this.contentOwn = '';
    },
    keydownCallback() {},
    pasteInfo(e) {
      const cbd = e.clipboardData;
      const ua = window.navigator.userAgent;
      // 如果是 Safari 直接 return
      if (!(e.clipboardData && e.clipboardData.items)) {
        return;
      }
      if (
        cbd.items &&
        cbd.items.length === 2 &&
        cbd.items[0].kind === 'string' &&
        cbd.items[1].kind === 'file' &&
        cbd.types &&
        cbd.types.length === 2 &&
        cbd.types[0] === 'text/plain' &&
        cbd.types[1] === 'Files' &&
        ua.match(/Macintosh/i) &&
        Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49
      ) {
        return;
      }
      for (let i = 0; i < cbd.items.length; i++) {
        let item = cbd.items[i];
        if (item.kind == 'file') {
          // blob 就是从剪切板获得的文件，可以进行上传或其他操作
          const blob = item.getAsFile();
          if (blob.size === 0) {
            return;
          }
          let formData = new FormData();
          formData.append('upload_file', blob);

          if (this.isFocous) {
            this.commonUpload(formData);
          }
        }
      }
    },
    async commonUpload(params) {
      this.editLoading = true;
      try {
        let { data } = await commonUpload(params);
        this.successOk(data);

        //此处只为解决SB火狐浏览器，粘贴时会产生额外一张图片（base64形式）的处理
        let editorDom = this.$refs.myQuillEditor.quill.root;
        let imgs = editorDom.getElementsByTagName('img');
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].style.width = '100px!important';
          imgs[i].style.maxHeight = '50%!important';
          let content = imgs[i].attributes['src'].value;
          if (content.search('base64') !== -1) {
            imgs[i].remove();
          }
        }
      } catch (error) {
        // this._message(error);
      }
      this.editLoading = false;
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {
      this.isFocous = false;
      document.removeEventListener('paste', this.pasteInfo(2));
    }, // 失去焦点事件
    onEditorFocus() {
      this.isFocous = true;
    } // 获得焦点事件
    // onEditorChange() {} // 内容改变事件
  },
  components: {
    Upload
  }
};
</script>

<style lang="scss" scoped>
/deep/ .ql-editor {
  min-height: 250px !important;
  // max-height: 300px !important;
}
/deep/ .ql-video {
  display: none !important;
}
.upload-box {
  display: none;
}
img {
  max-width: 100% !important;
}
</style>
