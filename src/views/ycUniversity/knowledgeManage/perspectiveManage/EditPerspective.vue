<template>
  <div>
<<<<<<< HEAD
    <el-dialog
      :title="flg == '0' ? '新建视角' : '编辑视角'"
      :visible.sync="dialogVisible"
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
            </el-select>
          </el-form-item>
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
          <el-form-item label="系统类型" prop="product_id">
            <el-select
              :disabled="flg == '1'"
              v-model="ruleForm.product_id"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(item, i) in systemList"
                :key="i"
                :label="item.product_name"
                :value="item.product_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视角名称" prop="title">
            <el-input
              v-model="ruleForm.title"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="视角排序" prop="sort">
            <el-input
              v-model="ruleForm.sort"
              type="number"
              clearable
              placeholder="请输入"
            ></el-input>
=======
    <el-dialog :title="flg == '0' ? '新建视角' : '编辑视角'" :visible.sync="dialogVisible" :modal-append-to-body="false" width="600px" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :validate-on-rule-change="false" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="formLoading">
          <el-form-item label="面向客户" prop="forth_status">
            <el-select v-model="ruleForm.forth_status" placeholder="请选择" clearable filterable>
              <el-option v-for="(item,i) in forthStatus" :key="i" :label="item.status_name" :value="item.status_code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视角状态" prop="open_status">
            <el-select v-model="ruleForm.open_status" placeholder="请选择" clearable filterable>
              <el-option v-for="(item,i) in openStatus" :key="i" :label="item.status_name" :value="item.status_code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统类型" prop="product_id">
            <el-select :disabled="flg == '1'" v-model="ruleForm.product_id" placeholder="请选择" clearable filterable>
              <el-option v-for="(item,i) in systemList" :key="i" :label="item.product_name" :value="item.product_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视角名称" prop="title">
            <el-input v-model="ruleForm.title" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="视角排序" prop="sort">
            <el-input v-model="ruleForm.sort" type="number" clearable placeholder="请输入"></el-input>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button size="mini" @click="handleClose">关闭</el-button>
          <el-button size="mini" type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters } from 'vuex'
import { addEyesight, updateEyesight } from '@/api/ycUniversity'
=======
import { mapGetters } from 'vuex';
import { addEyesight, updateEyesight } from '@/api/ycUniversity';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
export default {
  props: {
    forthStatus: [Array],
    openStatus: [Array],
    dialogVisible: {
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
        open_status: '', //视觉状态
        forth_status: '', //是否面向客户
        product_id: '', //产品id/系统id
        title: '', //标题
        sort: '' //排序
      },
      rules: {
<<<<<<< HEAD
        open_status: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        forth_status: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        product_id: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        title: [
          { required: true, message: '请填写', trigger: ['blur', 'change'] }
        ]
      },
      formLoading: false
    }
=======
        open_status: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        forth_status: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        product_id: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        title: [{ required: true, message: '请填写', trigger: ['blur', 'change'] }]
      },
      formLoading: false
    };
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        switch (this.flg) {
          case '0': //新增
<<<<<<< HEAD
            break

          case '1': //编辑
            this.$nextTick(() => {
              Object.assign(this.ruleForm, this.detailItem)
            })
            break
=======
            break;

          case '1': //编辑
            this.$nextTick(() => {
              Object.assign(this.ruleForm, this.detailItem);
            });
            break;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        }
      }
    }
  },
  computed: {
    ...mapGetters(['systemList'])
  },
  methods: {
    async updateEyesight() {
<<<<<<< HEAD
      this.formLoading = true
      try {
        let { message } = await updateEyesight(this.ruleForm)
        this._message(message, 'success')
        this.$emit('saveOk')
        this.handleClose()
      } catch (error) {
        this._message(error)
      }
      this.formLoading = false
    },
    async addEyesight() {
      this.formLoading = true
      try {
        let { message } = await addEyesight(this.ruleForm)
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
        let { message } = await updateEyesight(this.ruleForm);
        this._message(message, 'success');
        this.$emit('saveOk');
        this.handleClose();
      } catch (error) {
        this._message(error);
      }
      this.formLoading = false;
    },
    async addEyesight() {
      this.formLoading = true;
      try {
        let { message } = await addEyesight(this.ruleForm);
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
              this.addEyesight()
              break

            case '1': //编辑
              this.updateEyesight()
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
              this.addEyesight();
              break;

            case '1': //编辑
              this.updateEyesight();
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
