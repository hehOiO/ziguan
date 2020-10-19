<template>
  <el-dialog
    class="elDialog"
    :before-close="closeChild"
    title="流水类型"
    center
    :visible.sync="dialogVisible"
    width="580px"
  >
    <div>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in liushui" :label="city" :key="city.value">{{city.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="closeChild">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "quanxuan",
  props: ["dialogVisible", "hide", "liushui"],
  data() {
    return {
      // 流水资金 弹出框  全选
      checkAll: false,
      checkedCities: [], //选中值的绑定
      isIndeterminate: true
    };
  },
  methods: {
    // 成交明细 全选操作
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.liushui : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.liushui.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.liushui.length;
    },
    closeChild() {
      this.$emit("closeNode", this.hide);
    },
    confirm() {
      if (this.checkedCities.length != 0) {
        let select = this.checkedCities[0].value;
        for (var i = 1; i < this.checkedCities.length; i++) {
          select += "," + this.checkedCities[i].value;
        }
        sessionStorage.setItem("selecttype", select);
        this.$emit("closeNode", this.hide);
      } else {
        sessionStorage.removeItem("selecttype");
        this.$emit("closeNode", this.hide);
      }
    }
  },
  watch: {
    liushui() {
      if (sessionStorage.getItem("selecttype")) {
        //填充 初始选中值
        let type = sessionStorage.getItem("selecttype");
        let typeArr = type.split(",");
        let checked = [];
        for (var m = 0; m < typeArr.length; m++) {
          for (var n = 0; n < this.liushui.length; n++) {
            if (Number(typeArr[m]) == Number(this.liushui[n].value)) {
              checked.push(this.liushui[n]);
            }
          }
        }
        this.checkedCities = checked.concat();
        // 判断全选 是否选
        let checkedCount = typeArr.length;
        this.checkAll = checkedCount === this.liushui.length;
      }
    }
  }
};
</script>