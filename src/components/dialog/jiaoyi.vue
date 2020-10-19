<template>
  <el-dialog
    class="elDialog dingel"
    title="提交订单"
    center
    :before-close="closeChild"
    :visible.sync="dialogVisible"
    width="460px"
  >
    <div>
      <div class="dingcode">{{BorSdata.name}}&#x3000;{{BorSdata.gid}}</div>
      <div class="dingread">
        <div>
          <div>
            <span>方向</span>
            <span :style="{'color':BorS==1?'#C82324':'#0A6BDE'}">{{BorS==1?'买入':'卖出'}}</span>
          </div>
        </div>
        <div>
          <div>
            <span>订单类型</span>
            <span>{{BorSdata.checked?'市价单':'限价单'}}</span>
          </div>
        </div>
        <div>
          <div>
            <span>{{BorS==1?'买入':'卖出'}}价格</span>
            <span>{{BorSdata.checked?'市价':BorSdata.latestPrice}}</span>
          </div>
        </div>
        <div>
          <div>
            <span>{{BorS==1?'买入':'卖出'}}数量</span>
            <span>{{BorSdata.buyNum}}</span>
          </div>
        </div>
      </div>
      <div class="dingmsg">是否提交此笔委托单？</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :style="{'borderColor':BorS==1?'#C82324':'#0A6BDE','backgroundColor':BorS==1?'#C82324':'#0A6BDE'}"
        @click="confirm"
      >确认</el-button>
      <el-button @click="closeChild">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { createStrategy, sellStrategy } from "@/API/transtion";
export default {
  name: "jiaoyi",
  props: ["dialogVisible", "hide", "BorS", "BorSdata"],
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {});
  },
  methods: {
    closeChild() {
      this.$emit("closeNode", this.hide);
    },
    confirm() {
      let _this = this;
      if (_this.BorS == 1) {
        //买入委托
        createStrategy({
          stockCode: _this.BorSdata.gid,
          tradeNumber: _this.BorSdata.buyNum,
          tradePrice: _this.BorSdata.latestPrice,
          buysellType: _this.BorSdata.checked ? 2 : 1
        })
          .then(response => {
            let data = response.data;
            if (data.code == 1) {
              _this.$message({
                message: data.msg,
                type: "success"
              });
              _this.$emit("getdetail");
              _this.$emit("getaccinfo");
              _this.closeChild();
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
      } else {
        //卖出 委托
        sellStrategy({
          stockCode: _this.BorSdata.gid,
          tradeNumber: _this.BorSdata.buyNum,
          tradePrice: _this.BorSdata.latestPrice,
          buysellType: _this.BorSdata.checked ? 2 : 1
        })
          .then(response => {
            let data = response.data;
            if (data.code == 1) {
              _this.$message({
                message: data.msg,
                type: "success"
              });
              _this.$emit("getdetail");
              _this.$emit("getaccinfo");
              _this.closeChild();
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
    }
  }
};
</script>