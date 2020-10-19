  <template>
  <div class="Operation">
    <div class="left">
      <div
        class="codeName"
        :style="{'color':type=='1'?'#DE403F':'#0A6BDE'}"
      >{{type=='1'?'买入':'卖出'}}股票：{{stockdetail.name}}</div>
      <div>
        <span>股票代码：</span>
        <el-input v-model="form.symbol" @input="yanzheng" maxlength="6"></el-input>
      </div>
      <div class="inputNum">
        <span>委托价格：</span>
        <div class="inputNum_box">
          <el-input-number
            v-model="form.latestPrice"
            controls-position="right"
            @change="handleChange"
            :min="0"
            :step="0.01"
            :disabled="form.checked"
          ></el-input-number>
          <span class="title" v-show="form.checked">市价</span>
        </div>
        
        <el-checkbox @change="tabcheck" v-model="form.checked">市价</el-checkbox>
      </div>
      <div>
        <span>可用资金：</span>
        <el-input v-model="form.canMoney" disabled></el-input>
      </div>
      <div>
        <span>可{{type=='1'?'买':'卖'}}数量：</span>
        <el-input v-model="form.canNum" disabled></el-input>
      </div>
      <div>
        <el-radio-group v-model="form.radio" @change="radiochange">
          <el-radio label="1">全部</el-radio>
          <el-radio label="2">1/2</el-radio>
          <el-radio label="3">1/3</el-radio>
          <el-radio label="4">1/4</el-radio>
        </el-radio-group>
      </div>
      <div class="inputNum">
        <span>{{type=='1'?'买入':'卖出'}}数量：</span>
        <el-input-number
          v-model="form.buyNum"
          @change="buychange"
          controls-position="right"
          :min="0"
          :max="parseInt(Number(form.canNum)/100)*100"
          :step="100"
        ></el-input-number>
        <span style="margin-left:7px">股</span>
      </div>
      <div class="btnGroup">
        <el-button @click="reback">复位</el-button>
        <el-button type="primary" v-if="type=='1'" @click="buy">买入</el-button>
        <el-button type="info" v-if="type=='2'" @click="sale">卖出</el-button>
      </div>
    </div>
    <div class="right">
      <div>
        <div>
          <span>卖五</span>
          <span
            :class="Number(stockdetail.sellFivePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellFivePri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.sellFivePri}}</span>
          <span class="blue">{{stockdetail.sellFive}}</span>
        </div>
        <div>
          <span>卖四</span>
          <span
            :class="Number(stockdetail.sellFourPri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellFourPri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.sellFourPri}}</span>
          <span class="blue">{{stockdetail.sellFour}}</span>
        </div>
        <div>
          <span>卖三</span>
          <span
            :class="Number(stockdetail.sellThreePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellThreePri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.sellThreePri}}</span>
          <span class="blue">{{stockdetail.sellThree}}</span>
        </div>
        <div>
          <span>卖二</span>
          <span
            :class="Number(stockdetail.sellTwoPri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellTwoPri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.sellTwoPri}}</span>
          <span class="blue">{{stockdetail.sellTwo}}</span>
        </div>
        <div>
          <span>卖一</span>
          <span
            :class="Number(stockdetail.sellOnePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellOnePri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.sellOnePri}}</span>
          <span class="blue">{{stockdetail.sellOne}}</span>
        </div>
      </div>
      <div>
        <div>
          <span>买一</span>
          <span
            :class="Number(stockdetail.buyOnePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyOnePri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.buyOnePri}}</span>
          <span class="red">{{stockdetail.buyOne}}</span>
        </div>
        <div>
          <span>买二</span>
          <span
            :class="Number(stockdetail.buyTwoPri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyTwoPri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.buyTwoPri}}</span>
          <span class="red">{{stockdetail.buyTwo}}</span>
        </div>
        <div>
          <span>买三</span>
          <span
            :class="Number(stockdetail.buyThreePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyThreePri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.buyThreePri}}</span>
          <span class="red">{{stockdetail.buyThree}}</span>
        </div>
        <div>
          <span>买四</span>
          <span
            :class="Number(stockdetail.buyFourPri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyFourPri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.buyFourPri}}</span>
          <span class="red">{{stockdetail.buyFour}}</span>
        </div>
        <div>
          <span>买五</span>
          <span
            :class="Number(stockdetail.buyFivePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyFivePri) - Number(stockdetail.preClose)<0?'green':'fff'"
          >{{stockdetail.buyFivePri}}</span>
          <span class="red">{{stockdetail.buyFive}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
export default {
  name: "Operation",
  props: {
    stockdetail: {
      type: Object,
      default: true
    },
    type: {
      type: String,
      default: true
    }
  },
  data() {
    return {
      form: {},
      limitTime: 200,
      requesting: [],
      changetype: 1, //判断是否改变类型 ：1 否 2 是
      changemoney: 1, //判断是否改变价格 ：1 否 2 是
      changenum: 1, //判断是否改变数量：1 否 2 是
      symbolchange: 1 //判断是否改变：1 否 2 是
    };
  },
  created() {
    let _this = this;
    this.$nextTick(() => {
      setTimeout(function(){
        if (_this.type == "1") {
          _this.form.canMoney = _this.stockdetail.canMoney.toFixed(2);
          if (_this.symbolchange == 1) {
            _this.form.symbol = _this.stockdetail.symbol;
          }
          if (_this.changetype == 1) {
            _this.form.checked = true;
          }
          if (_this.changemoney == 1) {
            _this.form.latestPrice = _this.stockdetail.latestPrice;
          }
          if (_this.changenum == 1) {
            _this.form.canNum =
              parseInt(
                Number(_this.stockdetail.canMoney.toFixed(2)) /
                  Number(_this.stockdetail.latestPrice) /
                  100
              ) * 100;
          }
        } else {
          _this.form.canMoney = _this.stockdetail.canMoney.toFixed(2);
          if (_this.symbolchange == 1) {
              _this.form.symbol = _this.stockdetail.symbol;
          }
          if (_this.changetype == 1) {
            _this.form.checked = true;
          }
          if (_this.changemoney == 1) {
            _this.form.latestPrice = _this.stockdetail.latestPrice;
          }
          if (_this.changenum == 1) {
            _this.form.canNum = _this.stockdetail.canSellNumber;
          }
        }
      }, 5000);
    });
  },
  methods: {
    radiochange(val) {
      if (val == 1) {
        //股数 100 整数倍
        this.form.buyNum = parseInt(Number(this.form.canNum) / 100) * 100;
      } else if (val == 2) {
        this.form.buyNum = parseInt(Number(this.form.canNum) / 2 / 100) * 100;
      } else if (val == 3) {
        this.form.buyNum = parseInt(Number(this.form.canNum) / 3 / 100) * 100;
      } else {
        this.form.buyNum = parseInt(Number(this.form.canNum) / 4 / 100) * 100;
      }
    },
    yanzheng() {
      // clearTimeout(time);
      let _this = this;
      this.$store.state.index1.symbolchange = 2;
      _this.$forceUpdate();
      // console.log(_this.form.symbol);
      let nowTime = new Date().getTime();
      _this.requesting.push({ startTime: nowTime });
      // var time = setTimeout(function() {
      // if (
      //   new Date().getTime() -
      //     _this.requesting[_this.requesting.length - 1].startTime >=
      //   _this.limitTime
      // ) {
      if (_this.form.symbol == "") {
        return false;
      } else {
        //输入结束后，请求 新股票代码详情 6开头 sh，否则sz
        let patt = /^\d{6}$/;
        if (patt.test(_this.form.symbol)) {
          let symbol = "";
          if (_this.form.symbol[0] == "6") {
            symbol = "sh" + _this.form.symbol;
          } else {
            symbol = "sz" + _this.form.symbol;
          }
          _this.$emit("getdetail", symbol);
        } else {
          // _this.$message({
          //   message: "请输入正确的股票代码!",
          //   type: "warning"
          // });
        }
      }
      // } else {
      //   return false;
      // }
      // }, _this.limitTime);
    },
    handleChange(val) {
      this.changemoney = 2;
      this.changenum = 2;
      this.form.latestPrice = val;
      console.log(this.form.latestPrice);
      if (this.type == "1") {
        //买入 自己算可买数量  卖出取后端值
        this.form.canNum =
          parseInt(
            Number(this.stockdetail.canMoney.toFixed(2)) /
              Number(this.stockdetail.latestPrice) /
              100
          ) * 100;
      }
    },
    tabcheck(val) {
      console.log(val);
      if (val) {
        this.changetype = 1;
        this.changemoney = 1;
        this.changenum = 1;
        this.$store.state.index1.symbolchange = 1;
        this.form.latestPrice = this.stockdetail.latestPrice;
        if (this.type == "1") {
          //买入 自己算可买数量  卖出取后端值
          this.form.canNum =
            parseInt(
              Number(this.stockdetail.canMoney.toFixed(2)) /
                Number(this.stockdetail.latestPrice) /
                100
            ) * 100;
          this.form.radio = "";
          this.form.buyNum = "";
        }
      } else {
        this.changetype = 2;
        if (this.type == "1") {
          this.form.radio = "";
          this.form.buyNum = "";
        }
      }
    },
    buychange() {
      this.form.radio = "";
      this.form.buyNum = parseInt(this.form.buyNum / 100) * 100;
      console.log(this.form.buyNum, "买入、卖出数量");
    },
    buy() {
      this.form.name = this.stockdetail.name;
      this.form.gid = this.stockdetail.gid;
      if (
        this.form.buyNum == 0 ||
        this.form.buyNum == undefined ||
        this.form.buyNum == null
      ) {
        this.$message({
          message: "买入手数 必须大于0!",
          type: "warning"
        });
      } else {
        this.$emit("buyOrsale", 1, this.form);
      }
    },
    sale() {
      this.form.name = this.stockdetail.name;
      this.form.gid = this.stockdetail.gid;
      if (
        this.form.buyNum == 0 ||
        this.form.buyNum == undefined ||
        this.form.buyNum == null
      ) {
        this.$message({
          message: "卖出手数 必须大于0!",
          type: "warning"
        });
      } else {
        this.$emit("buyOrsale", 2, this.form);
      }
    },
    reback() {
      this.form.radio = "";
      this.form.buyNum = "";
    }
  },
  watch: {
    '$store.state.index1.code':function(commit,data){
      // 第一次 或者 变股票时才渲染
      // console.log('detail',val.symbol,oldval.symbol,this.type)
      // if (oldval.symbol==undefined || val.symbol != oldval.symbol) {
      if (this.type == "1") {
        this.form.canMoney = this.stockdetail.canMoney.toFixed(2);
        if (this.symbolchange == 1) {
          this.form.symbol = this.stockdetail.symbol;
        }
        if (this.changetype == 1) {
          this.form.checked = true;
        }
        if (this.changemoney == 1) {
          this.form.latestPrice = this.stockdetail.latestPrice;
        }
        if (this.changenum == 1) {
          this.form.canNum =
            parseInt(
              Number(this.stockdetail.canMoney.toFixed(2)) /
                Number(this.stockdetail.latestPrice) /
                100
            ) * 100;
        }
      } else {
        this.form.canMoney = this.stockdetail.canMoney.toFixed(2);
        if (this.symbolchange == 1) {
            this.form.symbol = this.stockdetail.symbol;
        }
        if (this.changetype == 1) {
          this.form.checked = true;
        }
        if (this.changemoney == 1) {
          this.form.latestPrice = this.stockdetail.latestPrice;
        }
        if (this.changenum == 1) {
          this.form.canNum = this.stockdetail.canSellNumber;
        }
      }
      // }
    },
    '$store.state.index1.symbolchange':function(commit,data){
      console.log(data,'symbolchange')
      data == 1?this.symbolchange=2:this.symbolchange=1;
      //this.symbolchange = data
    }
  }
};
</script>
<style lang="less">
.Operation {
  // width: 20%;
  min-width: 370px;
  // max-width: 400px;
  display: flex;
  justify-content: space-between;
  padding: 0 7px;
  font-size: 12px;
  border-right: 1px solid #a7a6a6;
  .left {
    width: 60%;
  }
  .left > div {
    padding: 1.5px 0;
  }
  .left .codeName {
    font-weight: 600;
    padding: 3px 0;
    font-size: 16px;
  }
  .left .btnGroup {
    padding: 5px 0 15px 0;
  }
  .el-input {
    width: 60%;
  }
  .el-input__inner {
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
  }
  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 5px;
    padding-right: 25px;
  }
  .el-input-number {
    width: 85px;
    line-height: 20px;
  }
  .inputNum {
    .el-input {
      width: 85px;
    }
    .inputNum_box{
      width: 85px;
      position: relative;
      display: inline-block;
      .title{
        position: absolute;
        background-color: #F5F7FA;
        border-color: #E4E7ED;
        color: #C0C4CC;
        top: 1px;
        left: 1px;
        display: block;
        width: 64px;
        text-align: center;
        line-height: 20px;
        padding-bottom: 0;
        margin-top: 0;
      }
    }
  }
  .el-input-number.is-controls-right .el-input-number__decrease,
  .el-input-number.is-controls-right .el-input-number__increase {
    height: 10px;
    line-height: 10px;
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    width: 20px;
  }
  .el-checkbox__label {
    padding-left: 5px;
    font-size: 12px;
  }
  .el-radio__label {
    font-size: 12px;
    padding-left: 3px;
  }
  .el-radio {
    margin-right: 13px;
  }
  .el-button {
    font-size: 12px;
  }
  .el-button--default,
  .el-button--default:focus,
  .el-button--default:hover {
    padding: 5px 10px;
    background: #a7a6a6;
    border-color: #a7a6a6;
    color: #333;
  }
  .el-button--primary,
  .el-button--primary:focus,
  .el-button--primary:hover {
    padding: 5px 50px;
    background: #c82324;
    border-color: #c82324;
  }
  .el-button--info,
  .el-button--info:focus,
  .el-button--info:hover {
    padding: 5px 50px;
    background: #0a6bde;
    border-color: #0a6bde;
  }
  .right {
    // width: 30%;
    > div {
      padding: 2px 0;
      > div {
        display: flex;
        justify-content: space-between;
        padding: 1.7px 0;
        > span {
          padding-right: 20px;
          // width: 33.33%;
        }
      }
    }
  }
}
</style>