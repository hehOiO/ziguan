<template>
  <div class="Market">
    <QuanXuan
      :dialogVisible="dialogVisible"
      :hide="'dialogVisible'"
      :liushui="liushui"
      @closeNode="close"
    ></QuanXuan>
    <JiaoYi
      :dialogVisible="dialogVisible1"
      :BorS="BorS"
      :hide="'dialogVisible1'"
      :BorSdata="BorSdata"
      @closeNode="close"
      @getdetail="getdatadetail"
      @getaccinfo="getaccinfo"
    ></JiaoYi>
    <SetPass :dialogVisible="dialogVisible2" :hide="'dialogVisible2'" @closeNode="close"></SetPass>
    <AddAccound :dialogVisible="dialogVisible4" :hide="'dialogVisible4'" @closeNode="close"></AddAccound>
    <DetailYe
      :dialogVisible="dialogVisible3"
      :hide="'dialogVisible3'"
      @closeNode="close"
      :mingxi="mingxi"
    ></DetailYe>
    <VHeader
      @passEdit="passEdit"
      @getaccinfo="getaccinfo"
      :zichan="zichan"
      @getdetail="getdatadetail"
      @addAccount="addA"
    />
    <div class="content">
      <div v-show="tabledis" ref="TabLeft" class="tableft">
        <el-tabs type="border-card">
          <el-tab-pane
            :label="item.label"
            class="Concontent"
            v-for="(item,index) in fiveCon"
            :key="index"
            :lazy="true"
          >
            <div class="Smtab">
              <VTable
                :tableHeight="klineheight"
                :index="String(index)"
                :zichan="zichan"
                @getdetail="getdatadetail"
              />
              <div class="extendimg">
                <img v-if="imgflag" @click="extendTab" src="@/assets/xiangy.png" alt />
                <img v-if="!imgflag" @click="reback" src="@/assets/xiangz.png" alt />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="SmTab" ref="SmTab" v-show="tabdis">
        <div class="fivezhan" v-show="tabledis"></div>
        <div class="klineimg">
          <img v-if="!imgflag" @click="reback" src="@/assets/xiangy.png" alt />
          <img v-if="imgflag" @click="extendEchart" src="@/assets/xiangz.png" alt />
        </div>
        <div class="klineCon">
          <div class="klineleft" :style="{'width':imgflag?'100%':'85%'}">
            <Vue-kline
              :width="klinewidth"
              :height="klineheight"
              :stockdetail="stockdetail"
              :biaosuoflag="biaosuoflag"
            />
          </div>
          <div class="klineright" v-if="!imgflag">
            <Vue-klinedata :height="klineheight" :stockdetail="stockdetail" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <!-- <div class="disposi"> -->
      <div class="suoxiaobot" ref="suoxiaobot" @click="moveBot">
        <img v-if="!biaosuoflag" src="@/assets/suoxiao.png" alt />
        <img v-if="biaosuoflag" src="@/assets/fangda.png" alt />
      </div>
      <div class="suodetail" v-if="biaosuoflag">
        <div>
          <img src="@/assets/botaccount.png" alt />
          <span>{{zichan.name}}&#x3000;&#x3000;您好！</span>
        </div>
        <div>
          <span>总资产：{{zichan.allMoney}}</span>
          <span>可用资金：{{zichan.canMoney}}</span>
          <span>自有资金：{{zichan.myhaveMoney}}</span>
          <span>可取资金：{{zichan.drawMoney}}</span>
        </div>
      </div>
      <!-- </div> -->
      <div ref="xiabot" class="xiabot">
        <el-tabs type="border-card">
          <el-tab-pane label="买入" :lazy="true">
            <div class="disposi">
              <div class="bottomdis">
                <Operation
                  class="botoper"
                  :stockdetail="stockdetail"
                  :type="'1'"
                  @buyOrsale="buyOrsale"
                  @getdetail="getdatadetail"
                />
                <el-tabs type="border-card" class="BotTab">
                  <el-tab-pane label="持仓" :lazy="true">
                    <OperTable :url="'1'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                  </el-tab-pane>
                  <el-tab-pane label="委托" :lazy="true">
                    <OperTable :url="'2'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                  </el-tab-pane>
                  <el-tab-pane label="成交" :lazy="true">
                    <OperTable
                      :url="'3'"
                      :stockdetail="stockdetail"
                      @lookdetail="lookdetail"
                      @getdetail="getdatadetail"
                    />
                  </el-tab-pane>
                  <el-tab-pane label="资金" :lazy="true">
                    <OperTable :url="'4'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="卖出" :lazy="true">
            <div class="disposi">
              <div class="bottomdis">
                <Operation
                  class="botoper"
                  :stockdetail="stockdetail"
                  :type="'2'"
                  @buyOrsale="buyOrsale"
                  @getdetail="getdatadetail"
                />
                <el-tabs type="border-card" class="BotTab">
                  <el-tab-pane label="持仓" :lazy="true">
                    <OperTable :url="'5'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                  </el-tab-pane>
                  <el-tab-pane label="委托" :lazy="true">
                    <OperTable :url="'6'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                  </el-tab-pane>
                  <el-tab-pane label="成交" :lazy="true">
                    <OperTable
                      :url="'7'"
                      :stockdetail="stockdetail"
                      @lookdetail="lookdetail"
                      @getdetail="getdatadetail"
                    />
                  </el-tab-pane>
                  <el-tab-pane label="资金" :lazy="true">
                    <OperTable :url="'8'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="撤单" :lazy="true">
            <OperTable :url="'9'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
          </el-tab-pane>
          <el-tab-pane label="查询" :lazy="true">
            <div class="disposi">
              <el-tabs type="border-card">
                <el-tab-pane label="当日委托" :lazy="true">
                  <OperTable :url="'10'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                </el-tab-pane>
                <el-tab-pane label="当日成交" :lazy="true">
                  <OperTable
                    :url="'11'"
                    :stockdetail="stockdetail"
                    @lookdetail="lookdetail"
                    @getdetail="getdatadetail"
                  />
                </el-tab-pane>
                <el-tab-pane label="历史委托" :lazy="true">
                  <OperTable :url="'12'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                </el-tab-pane>
                <el-tab-pane label="历史成交" :lazy="true">
                  <OperTable
                    :url="'13'"
                    :stockdetail="stockdetail"
                    @lookdetail="lookdetail"
                    @getdetail="getdatadetail"
                  />
                </el-tab-pane>
                <el-tab-pane label="资产" :lazy="true">
                  <OperTable :url="'14'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                </el-tab-pane>
                <el-tab-pane label="资金流水" :lazy="true">
                  <OperTable
                    :url="'15'"
                    :stockdetail="stockdetail"
                    @liushuimodel="liushuimodel"
                    @getdetail="getdatadetail"
                  />
                </el-tab-pane>
                <el-tab-pane label="交割单" :lazy="true">
                  <OperTable :url="'16'" :stockdetail="stockdetail" @getdetail="getdatadetail" />
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import VHeader from "@/components/header/header";
import VTable from "@/components/table/table";
import Operation from "@/components/transtion/operation";
import OperTable from "@/components/transtion/operationtable";
import VueKline from "@/components/echarts/kline";
import VueKlinedata from "@/components/echarts/klinedata";

import QuanXuan from "@/components/dialog/quanxuan";
import JiaoYi from "@/components/dialog/JiaoYi";
import SetPass from "@/components/dialog/setpass";
import AddAccound from "@/components/dialog/addaccount";
import DetailYe from "@/components/dialog/detail";
import {
  accinfo,
  getStockDetail,
  getStrategyDealDetail,
  waterType
} from "@/API/transtion";

export default {
  name: "Market",
  components: {
    VHeader,
    VTable,
    Operation,
    OperTable,
    VueKline,
    VueKlinedata,
    QuanXuan,
    JiaoYi,
    SetPass,
    AddAccound,
    DetailYe
  },
  data() {
    return {
      zichan: {},
      stockdetail: {}, //单股详情
      dialogVisible: false, //流水类型 model
      liushui: [], //流水数据
      dialogVisible1: false, //委托单 model
      dialogVisible2: false, //修改密码 model
      dialogVisible3: false, //成交明细 model
      dialogVisible4: false, //添加账户
      mingxi: [], //成交明细model 数据

      tabledis: true, //左边表格 的展示
      tabdis: true, //右边k线 的展示
      imgflag: true, //箭头展示 向左or向右

      klinewidth: 0, //k 线图宽度
      klineheight: 0, //k 线图高度
      BorS: "", //提交订单 买入或者卖出
      BorSdata: {}, //提交订单时 的数据
      biaosuoflag: false, //判断下方表格是否 缩小
      fiveCon: [
        //5个大Tab
        { label: "指数" },
        // { label: "沪深" },
        // { label: "中小板" },
        // { label: "创业板" },
        { label: "自选股" }
      ],
      time: null,
      intervelflag: true //请求时间太长 和 股票切换不及时
    };
  },
  created() {
    this.$nextTick(() => {
      this.getaccinfo();
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.initstyletable();
      this.getdatadetail();
      this.setval();
      window.onresize = () => {
        this.resize();
      };
    });
  },
  beforeDestroy() {
    clearInterval(this.time); //关闭
  },
  methods: {
    setval() {
      var _this = this;
      _this.time = setInterval(function() {
        if (_this.intervelflag) {
          _this.getdatadetail();
        }
      },3000);
    },
    getaccinfo() {
      let _this = this;
      //资产详情 111
      accinfo()
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.zichan = data.data;
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
    },
    getdatadetail(val) {
      let _this = this;

                

      if (val) {
      _this.intervelflag = false;
        //左下 搜索 单股 详情
        getStockDetail({
          stockCode: val
        })
          .then(response => {
            let data = response.data;
            if (data.code == 1) {
              _this.intervelflag = true;
              _this.stockdetail = data.data;

              sessionStorage.setItem("stockCode", val);
              _this.$store.state.index1.code = val;
              _this.$store.state.index1.symbolchange = 1;
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
        //单股 详情
        getStockDetail({
          stockCode: sessionStorage.getItem("stockCode")
        })
          .then(response => {
            let data = response.data;
            if (data.code == 1) {
              _this.stockdetail = data.data;

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
    getdetail(row) {
      let _this = this;
      //获取成交 明细
      getStrategyDealDetail({
        strategyNum: row.strategyNum
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.dialogVisible3 = true;
            _this.mingxi = data.data;
            
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
    },
    getliushui() {
      let _this = this;
      //资产流水
      waterType()
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            let contain = [];
            for (let key in data.data) {
              contain.push({
                value: key,
                label: data.data[key]
              });
            }
            _this.liushui = contain.concat();
            _this.dialogVisible = true;
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
    },
    initstyletable() {
      this.klinewidth = document.documentElement.clientWidth * 0.38 - 1;
      if (this.tabledis) {
        //没有 展开 右侧快线
        this.klineheight = document.documentElement.clientHeight - 405;
      } else {
        //展开 右侧 k线
        this.klineheight = document.documentElement.clientHeight - 365;
      }
    },
    liushuimodel() {
      this.getliushui();
    },
    buyOrsale(a, data) {
      this.BorS = a; //买入或者卖出
      //订单买入卖出 弹框
      this.BorSdata = data;
      this.dialogVisible1 = true;
    },
    passEdit() {
      //修改密码 弹框
      this.dialogVisible2 = true;
    },
    lookdetail(row) {
      // 查看明细 弹出框
      this.getdetail(row);
    },
    close(msg) {
      console.log(msg);
      this[msg] = false;
    },
    extendTab() {
      //展开表格
      this.tabledis = true;
      this.tabdis = false;
      this.imgflag = false;
      this.$refs.TabLeft.style.width = "100%";
      this.klinewidth = 0;
    },
    extendEchart() {
      //展开k线
      this.tabledis = false;
      this.tabdis = true;
      this.imgflag = false;
      this.$refs.SmTab.style.width = "100%";
      this.klinewidth = document.documentElement.clientWidth * 0.85 - 1;
      if (this.biaosuoflag) {
        this.klineheight = document.documentElement.clientHeight - 150;
        this.$refs.suoxiaobot.style.bottom = -1 + "px";
      } else {
        this.klineheight = document.documentElement.clientHeight - 365;
        this.$refs.suoxiaobot.style.bottom = 212 + "px";
      }
    },
    reback() {
      //表格和k线 回归原本 比例
      this.tabledis = true;
      this.tabdis = true;
      this.imgflag = true;
      this.$refs.TabLeft.style.width = "62%";
      this.$refs.SmTab.style.width = "38%";
      this.klinewidth = document.documentElement.clientWidth * 0.38 - 1;
      if (this.biaosuoflag) {
        this.klineheight = document.documentElement.clientHeight - 190;
        this.$refs.suoxiaobot.style.bottom = -1 + "px";
      } else {
        this.klineheight = document.documentElement.clientHeight - 405;
        this.$refs.suoxiaobot.style.bottom = 212 + "px";
      }
    },
    moveBot() {
      //下方表格 缩小
      if (this.biaosuoflag) {
        //表格没缩小
        this.biaosuoflag = false;
        this.$refs.xiabot.style.bottom = 0;
        this.$refs.suoxiaobot.style.bottom = 212 + "px";
        if (this.tabledis && this.tabdis) {
          //原始比例
          this.klinewidth = document.documentElement.clientWidth * 0.38 - 1;
          this.klineheight = document.documentElement.clientHeight - 405;
        } else if (!this.tabledis) {
          //展开 右侧 k线
          this.klinewidth = document.documentElement.clientWidth * 0.85 - 1;
          this.klineheight = document.documentElement.clientHeight - 365;
        } else {
          // 展开左侧表格
          this.klinewidth = 0;
          this.klineheight = document.documentElement.clientHeight - 405;
        }
      } else {
        //表格缩小
        this.biaosuoflag = true;
        this.$refs.xiabot.style.bottom = -215 + "px";
        this.$refs.suoxiaobot.style.bottom = -1 + "px";
        if (this.tabledis && this.tabdis) {
          //原始比例
          this.klinewidth = document.documentElement.clientWidth * 0.38 - 1;
          this.klineheight = document.documentElement.clientHeight - 190;
        } else if (!this.tabledis) {
          //展开 右侧 k线
          this.klinewidth = document.documentElement.clientWidth * 0.85 - 1;
          this.klineheight = document.documentElement.clientHeight - 150;
        } else {
          // 展开左侧表格
          this.klinewidth = 0;
          this.klineheight = document.documentElement.clientHeight - 190;
        }
      }
    },
    resize() {
      //窗口 resize
      if (this.biaosuoflag) {
        //表格缩小了
        this.$refs.xiabot.style.bottom = -215 + "px";
        this.$refs.suoxiaobot.style.bottom = -1 + "px";
        if (this.tabledis && this.tabdis) {
          //原始 比例
          this.klinewidth = document.documentElement.clientWidth * 0.38 - 1;
          this.klineheight = document.documentElement.clientHeight - 190;
        } else if (!this.tabledis) {
          //展开 右侧 k线
          this.klinewidth = document.documentElement.clientWidth * 0.85 - 1;
          this.klineheight = document.documentElement.clientHeight - 150;
        } else {
          // 展开左侧表格
          this.klinewidth = 0;
          this.klineheight = document.documentElement.clientHeight - 190;
        }
      } else {
        //表格没缩小
        this.$refs.xiabot.style.bottom = 0;
        this.$refs.suoxiaobot.style.bottom = 212 + "px";
        if (this.tabledis && this.tabdis) {
          //原始 比例
          this.klinewidth = document.documentElement.clientWidth * 0.38 - 1;
          this.klineheight = document.documentElement.clientHeight - 405;
        } else if (!this.tabledis) {
          //展开 右侧 k线
          this.klinewidth = document.documentElement.clientWidth * 0.85 - 1;
          this.klineheight = document.documentElement.clientHeight - 365;
        } else {
          // 展开左侧表格
          this.klinewidth = 0;
          this.klineheight = document.documentElement.clientHeight - 405;
        }
      }
    },
    addA() {
      //添加账户 弹框
      this.dialogVisible4 = true;
    }
  }
};
</script>
<style lang='less'>
.Market {
  .content {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #222222;
    background-color: black;
    .el-tabs--border-card {
      background: #333;
      border: 1px solid #393939;
    }
    .el-tabs--border-card > .el-tabs__header {
      background: #393939;
      border-bottom: 1px solid #222222;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      color: #fff;
      background-color: #393939;
      border-right-color: #595959;
      border-left-color: #595959;
    }
    .el-tabs--border-card
      > .el-tabs__header
      .el-tabs__item:not(.is-disabled):hover {
      color: #fff;
    }
    .el-tabs--border-card > .el-tabs__content {
      // padding: 0 15px;
      padding: 0;
    }
    .el-tabs__nav-scroll {
      padding-left: 30px;
    }
    .SmTab .el-tabs__nav-scroll {
      padding-left: 0;
    }
    .el-tabs__content {
      // height: 585px;
      background-color: black;
    }
  }
  .tableft {
    width: 62%;
    // display: flex;
  }
  .Smtab {
    width: 100%;
    position: relative;
  }
  .SmTab {
    width: 38%;
    position: relative;
    background-color: black;
    .el-tabs--border-card > .el-tabs__header {
      border-top: none;
    }
    .el-tabs__item {
      height: 29px;
      line-height: 29px;
      padding: 0 12.5px;
    }
  }
  .extendimg {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    z-index: 100;
  }
  .fivezhan {
    background-color: #393939;
    height: 39px;
  }
  .klineimg {
    background-color: #393939;
    text-align: right;
    border-top: 1px solid #222222;
  }
  .klinetitle {
    color: #fff;
    padding: 5px 10px 5px 0;
    display: flex;
    justify-content: space-between;
    span {
      margin: 0 10px;
    }
    .pricekline {
      font-size: 12px;
    }
    .rightzixuan > div {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
  }
  .klineCon {
    height: 100%;
    display: flex;
  }
  .klineright {
    width: 15%;
  }
  .bottom {
    .suoxiaobot {
      position: absolute;
      bottom: 212px;
      right: 12px;
      z-index: 1000;
      cursor: pointer;
    }
    .suodetail {
      position: absolute;
      bottom: 0;
      z-index: 999;
      color: #e60012;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 3px;
      background-color: #f0f0f0;
      font-size: 14px;
      > div {
        margin: 0 10px;
        display: flex;
        align-items: center;
        > img {
          width: 15px;
          height: auto;
          margin-left: 15px;
        }
        > span {
          margin: 0 10px;
        }
      }
    }
    .tabBtn {
      position: absolute;
      top: 1px;
      right: 20px;
      z-index: 1000;
      .el-button {
        font-size: 12px;
        padding: 7px 12px;
      }
      .block {
        margin: 0 10px;
      }
      .block,
      .el-input__inner,
      .el-input,
      .el-button {
        font-size: 12px;
      }
      .el-input__inner {
        background-color: #f0f0f0;
        height: 30px;
        line-height: 30px;
      }
      .el-input__icon {
        line-height: 30px;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 150px;
      }
      .el-picker-panel {
        background-color: #f0f0f0;
      }
      .el-popper[x-placement^="top"] .popper__arrow::after {
        border-top-color: #f0f0f0;
      }
    }
    > .xiabot {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
    }
    .el-tabs__nav-scroll {
      padding-left: 10px;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      color: #393939;
      background-color: #a7a6a6;
      border-right-color: #a7a6a6;
      border-left-color: #a7a6a6;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .el-tabs--border-card
      > .el-tabs__header
      .el-tabs__item:not(.is-disabled):hover {
      color: #393939;
    }
    .el-tabs__nav-wrap {
      height: 32px;
    }
    .el-tabs__item {
      padding: 0 17px;
      height: 28px;
      margin-top: 3px !important;
      line-height: 28px;
      font-weight: 600;
    }
    .el-tabs--border-card > .el-tabs__header {
      background: #f0f0f0;
      // border: 1px solid #f0f0f0;
      border-bottom: 1px solid #a7a6a6;
    }
    > .el-tabs--border-card > .el-tabs__content {
      padding: 0 0 0 15px;
    }
    .el-tabs--border-card > .el-tabs__content {
      padding: 0;
    }
    .bottomdis {
      display: flex;
      justify-content: space-between;
    }
    .BotTab {
      width: 79%;
      min-width: 500px;
    }
    .botoper {
      width: 20%;
      padding-left: 20px;
    }
    .el-tabs--border-card {
      border: none;
      background: #f0f0f0;
      z-index: 100;
      position: relative;
    }
    .el-tabs__content {
      position: static;
      height: 210px;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      color: #333;
    }
    .chedan {
      text-align: right;
      padding: 2px 40px 2px;
      border-bottom: 1px solid #333;
      .el-button {
        font-size: 12px;
        padding: 6px 10px;
      }
    }
  }
  .el-dialog {
    color: #fff;
    background-color: #202431;
    margin-top: 16vh !important;
    border-radius: 8px;
  }
  .el-dialog__title,
  .el-dialog__body {
    color: #fff;
  }
  .dialog-footer {
    .el-button {
      background-color: #888888;
      border-color: #888888;
      color: #fff;
      padding: 12px 55px;
    }
    .el-button + .el-button {
      margin-left: 55px;
    }
    .el-button--primary {
      background-color: #c82324;
      border-color: #c82324;
    }
  }
  .elDialog {
    .el-checkbox__inner {
      background-color: transparent;
      border: 1px solid #979fb6;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #fff;
    }
    .el-checkbox {
      width: 40%;
      overflow: hidden;
      padding: 5px 0;
      color: #fefefe;
      margin-left: 17px;
    }
    .el-checkbox__label {
      float: left;
    }
    .el-checkbox__label {
      text-align: left;
      width: 80%;
    }
    .el-checkbox__inner::after {
      border: 1px solid #e60012;
      border-left: 0;
      border-top: 0;
    }
    .el-dialog--center .el-dialog__body {
      padding: 15px 40px 30px;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      background-color: #e60012;
    }
    .el-input__inner {
      background-color: transparent;
      height: 35px;
      line-height: 35px;
      color: #fefefe;
    }
    .el-input {
      width: 80%;
    }
    .el-input.is-active .el-input__inner,
    .el-input__inner:focus {
      border: 1px solid #979fb6;
    }
    .editCon {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .label {
      color: #979fb6;
    }
    .dingread {
      padding: 8px 0;
      color: #888888;
      border-bottom: 1px solid #121212;
      > div {
        width: 49%;
        display: inline-block;
        margin: 8px 0;
        > div {
          display: flex;
          justify-content: space-between;
          padding-right: 25px;
        }
      }
    }
    .dingcode {
      margin: 8px 0;
    }
    .dingmsg {
      margin-top: 15px;
    }
  }
  .dingel {
    .el-dialog--center .el-dialog__body {
      padding: 0px 40px 30px;
    }
    .el-dialog {
      background-color: #212121;
      margin-top: 25vh !important;
    }
  }
  .chengdetail {
    .el-dialog__header {
      background-color: #141720;
      padding: 10px;
    }
    .el-dialog__body {
      padding: 0;
    }
    .Etable .el-table tr,
    .Etable .el-table th {
      background-color: #202431;
      color: #fff;
    }
    .el-table {
      height: 400px;
      overflow: auto;
      background-color: #202431;
      color: #fff;
    }
  }
}
.el-message-box {
  background-color: #202431;
  border: 1px solid #202431;
  .el-message-box__title,
  .el-message-box__content {
    color: #efefef;
  }
  .el-button {
    font-size: 14px;
  }
}
</style>