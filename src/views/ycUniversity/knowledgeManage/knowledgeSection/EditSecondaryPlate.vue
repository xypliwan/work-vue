<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      :title="flg == '0' ? '新建二级板块' : '编辑二级板块'"
      :visible.sync="dialogSecondary"
      :modal-append-to-body="false"
      width="600px"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div>
        <el-form
          :model="ruleForm"
          :validate-on-rule-change="false"
          size="small"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-loading="formLoading"
        >
          <el-form-item label="视角状态" prop="open_status">
            <el-select
              v-model="ruleForm.open_status"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(item, i) in openStatus"
                :key="i"
                :label="item.status_name"
                :value="item.status_code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面向客户" prop="forth_status">
            <el-select
              v-model="ruleForm.forth_status"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(item, i) in forthStatus"
                :key="i"
                :label="item.status_name"
                :value="item.status_code"
              ></el-option>
=======
    <el-dialog :title="flg == '0' ? '新建二级板块' : '编辑二级板块'" :visible.sync="dialogSecondary" :modal-append-to-body="false" width="600px" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :validate-on-rule-change="false" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label="视角状态" prop="open_status">
            <el-select v-model="ruleForm.open_status" placeholder="请选择" clearable filterable>
              <el-option v-for="(item,i) in openStatus" :key="i" :label="item.status_name" :value="item.status_code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面向客户" prop="forth_status">
            <el-select v-model="ruleForm.forth_status" placeholder="请选择" clearable filterable>
              <el-option v-for="(item,i) in forthStatus" :key="i" :label="item.status_name" :value="item.status_code"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>

          <el-form-item label="一级板块" prop="pid">
<<<<<<< HEAD
            <el-select
              v-model="ruleForm.pid"
              :disabled="flg == '1'"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(item, i) in palteList"
                v-if="i !== 0"
                :key="i"
                :label="item.title"
                :value="item.km_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级板块" prop="title">
            <el-input
              v-model="ruleForm.title"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input
              v-model="ruleForm.sort"
              type="number"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="知识视角" prop="eyesight_ids">
            <el-select
              v-model="ruleForm.eyesight_ids"
              multiple
              placeholder="多选"
              clearable
              filterable
            >
              <el-option
                v-for="(item, i) in eyesightList"
                v-if="i !== 0"
                :key="i"
                :label="item.title"
                :value="item.eyesight_id"
              ></el-option>
=======
            <el-select v-model="ruleForm.pid" :disabled="flg == '1'" placeholder="请选择" clearable filterable>
              <el-option v-for="(item,i) in palteList" v-if="i !== 0" :key="i" :label="item.title" :value="item.km_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级板块" prop="title">
            <el-input v-model="ruleForm.title" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="ruleForm.sort" type="number" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="知识视角" prop="eyesight_ids">
            <el-select v-model="ruleForm.eyesight_ids" multiple placeholder="多选" clearable filterable>
              <el-option v-for="(item,i) in eyesightList" v-if="i !== 0" :key="i" :label="item.title" :value="item.eyesight_id"></el-option>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters } from 'vuex'
import { addSecondModel, updateSecondModel } from '@/api/ycUniversity'
=======
import { mapGetters } from 'vuex';
import { addSecondModel, updateSecondModel } from '@/api/ycUniversity';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    forthStatus: [Array], //是否面向客户
    openStatus: [Array], //是否停用
    palteList: [Array], //一级板块列表
    currentIndex: String,
    dialogSecondary: {
      type: Boolean,
      default: false
    },
    flg: String,
    detailItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        km_id: '',
        open_status: '', //是否停用
        forth_status: '', //面向客户状态
        pid: '', //一级模块id
        title: '', //标题
        sort: '', //排序
        eyesight_ids: [] //视角id, 多个用 , 隔开
      },
      rules: {
<<<<<<< HEAD
        open_status: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        forth_status: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        pid: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        title: [
          { required: true, message: '请填写', trigger: ['blur', 'change'] }
        ],
        eyesight_ids: [
          { required: true, message: '请填写', trigger: ['blur', 'change'] }
        ]
      },
      formLoading: false
    }
  },
  watch: {
    currentIndex(newVal) {
      this.ruleForm.pid = newVal
=======
        open_status: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        forth_status: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        pid: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        title: [{ required: true, message: '请填写', trigger: ['blur', 'change'] }],
        eyesight_ids: [{ required: true, message: '请填写', trigger: ['blur', 'change'] }]
      },
      formLoading: false
    };
  },
  watch: {
    currentIndex(newVal) {
      this.ruleForm.pid = newVal;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    dialogSecondary(newVal) {
      if (newVal) {
        switch (this.flg) {
          case '0': //新增
<<<<<<< HEAD
            this.ruleForm.km_id = ''
            break
=======
            this.ruleForm.km_id = '';
            break;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

          case '1': //编辑
            this.$nextTick(() => {
              for (let i in this.ruleForm) {
                for (let j in this.detailItem) {
                  if (i == j) {
<<<<<<< HEAD
                    this.ruleForm[i] = this.detailItem[j]
                  }
                }
              }
              this.ruleForm.title = this.detailItem.second_title
            })
            break
=======
                    this.ruleForm[i] = this.detailItem[j];
                  }
                }
              }
              this.ruleForm.title = this.detailItem.second_title;
            });
            break;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        }
      }
    }
  },
  computed: {
    ...mapGetters(['eyesightList'])
  },
  methods: {
    async updateSecondModel() {
<<<<<<< HEAD
      this.formLoading = true
      try {
        let { message } = await updateSecondModel(this.ruleForm)
        this._message(message, 'success')
        this.$emit('saveOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    async addSecondModel() {
      this.formLoading = true
      try {
        let { message } = await addSecondModel(this.ruleForm)
        this._message(message, 'success')
        this.$emit('saveOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
=======
      this.formLoading = true;
      try {
        let { message } = await updateSecondModel(this.ruleForm);
        this._message(message, 'success');
        this.$emit('saveOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    async addSecondModel() {
      this.formLoading = true;
      try {
        let { message } = await addSecondModel(this.ruleForm);
        this._message(message, 'success');
        this.$emit('saveOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          switch (this.flg) {
            case '0': //新增
<<<<<<< HEAD
              this.addSecondModel()
              break

            case '1': //编辑
              this.updateSecondModel()
              break
          }
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
=======
              this.addSecondModel();
              break;

            case '1': //编辑
              this.updateSecondModel();
              break;
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
