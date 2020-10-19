<template>
  <el-dialog
    class="elDialog"
    title="修改密码"
    :before-close="closeChild"
    center
    :visible.sync="dialogVisible"
    width="500px"
  >
    <div>
      <div class="editCon">
        <span class="label">原密码</span>
        <el-input v-model="oldPwd" show-password></el-input>
      </div>
      <div class="editCon">
        <span class="label">新密码</span>
        <el-input v-model="newPwd" show-password></el-input>
      </div>
      <div class="editCon">
        <span class="label">确认密码</span>
        <el-input v-model="reNewPwd" show-password></el-input>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="closeChild">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { setpass } from "@/API/transtion";
export default {
  name: "setpass",
  props: ["dialogVisible", "hide"],
  data() {
    return {
      oldPwd: "", //密码弹出框
      newPwd: "",
      reNewPwd: ""
    };
  },
  methods: {
    confirm() {
      let _this = this;
      if (_this.newPwd != _this.reNewPwd) {
        _this.$message({
          message: "两次输入密码不一致!",
          type: "warning"
        });
      } else {
        setpass({
          oldPwd: _this.oldPwd,
          newPwd: _this.newPwd,
          reNewPwd: _this.reNewPwd
        })
          .then(response => {
            let data = response.data;
            if (data.code == 1) {
              _this.$message({
                message: data.msg,
                type: "success"
              });
              _this.closeChild()
            } else {
              _this.$message({
                message: data.msg,
                type: "error"
              });
            }
          })
          .catch(error => {
            _this.$message.error(error);
          });
      }
    },
    closeChild() {
      this.oldPwd=''
      this.newPwd=''
      this.reNewPwd=''
      this.$emit("closeNode", this.hide);
    }
  }
};
</script>