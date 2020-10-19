<template>
  <div class="Opertable">
    <div class="chedan" v-if="url=='9'">
      <el-button plain @click="quanche">全撤</el-button>
    </div>
    <el-table :data="data" style="width: 100%" height="175" @row-click="rowClick">
      <el-table-column
        align="center"
        v-for="(item,index) in columns"
        :key="index"
        :prop="item.key"
        :label="item.title"
        :min-width="item.width"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <div v-if="item.render">
            <render :render="item.render" :params="scope" />
          </div>
          <span v-else>{{scope.row | itemFilter(item)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="tabBtn">
      <el-button
        v-if="url=='1'||url=='2'||url=='3'||url=='4'||url=='5'||url=='6'||url=='7'||url=='8'"
        plain
        @click="shuaxin"
      >刷新</el-button>
      <el-button v-if="url=='2'||url=='6'" plain @click="quanche">全撤</el-button>
      <span class="block" v-if="url=='12'||url=='13'||url=='15'||url=='16'">
        <span class="demonstration">起始时间：</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          value-format="timestamp"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </span>
      <span class="block" v-if="url=='12'||url=='13'||url=='15'||url=='16'">
        <span class="demonstration">终止时间：</span>
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="选择日期"
          value-format="timestamp"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </span>
      <el-button v-if="url=='15'" plain @click="liushimodel">流水类型</el-button>
      <el-button v-if="url=='12'||url=='13'||url=='15'||url=='16'" @click="chaxun" plain>查询</el-button>
      <el-button v-if="url=='15'" plain @click="exporttable">导出</el-button>
    </div>
  </div>
</template>
<script>
import render from "@/common/render.js";
import {
  checkStrategy,
  getStrategy,
  getStrategyHistory,
  getStrategyDeal,
  getStrategyDealHistory,
  cancelStrategy,
  getMoneyWater,
  getStrategyOrder,
  accinfo,
  cancelStrategy1,
  cancelAllStrategy
} from "@/API/transtion";

export default {
  name: "Opertable",
  props: {
    url: {
      type: String,
      default: true
    },
    stockdetail: {
      type: Object
    }
  },
  data() {
    return {
      columns: [], //表头
      data: [], //数据
      value1: "", //查询 起始日期
      value2: "", //查询终止日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }, //禁止选今天 以后的日期
      columnsListchicang: [
        //下方 买入卖出 持仓 title
        {
          title: "股票代码",
          align: "center",
          key: "stock_code",
          width: 100
        },
        {
          title: "股票名称",
          align: "center",
          key: "stockName",
          width: 130
        },
        {
          title: "总持仓数",
          align: "center",
          key: "stockNumber",
          width: 100
        },
        {
          title: "可卖数量",
          align: "center",
          key: "cansellNumber",
          width: 100
        },
        {
          title: "冻结数量",
          align: "center",
          key: "frozenNumber",
          width: 100
        },
        {
          title: "参考成本价",
          align: "center",
          key: "costPrice",
          width: 100
        },
        {
          title: "当前价",
          align: "center",
          key: "now_price",
          width: 100
        },
        {
          title: "参考盈亏",
          align: "center",
          key: "floatPrice",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  row.floatPrice > 0
                    ? "red"
                    : row.floatPrice < 0
                    ? "green"
                    : ""
              },
              row.floatPrice
            );
          }
        },
        {
          title: "持仓市值",
          align: "center",
          key: "holdMarketValue",
          width: 100
        },
        {
          title: "盈亏比例(%)",
          align: "center",
          key: "yingkuiRate",
          width: 110,
          render: (h, params) => {
            const row = params.row;
            let num = row.yingkuiRate.substr(0, row.yingkuiRate.length - 1);
            return h(
              "span",
              {
                class:
                  Number(num) > 0 ? "red" : Number(num) < 0 ? "green" : "fff"
              },
              row.yingkuiRate
            );
          }
        }
      ],
      columnsListweituo: [
        //下方 买入卖出委托 title
        {
          title: "委托编号",
          align: "center",
          key: "strategyNum",
          width: 150
        },
        {
          title: "委托时间",
          align: "center",
          key: "tradeTime",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distime(row.tradeTime));
          }
        },
        {
          title: "最后更新时间",
          align: "center",
          key: "dealTime",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, row.dealTime == 0?'--':this.distime(row.dealTime));
          }
        },
        {
          title: "股票代码",
          align: "center",
          key: "stock_code",
          width: 100
        },
        {
          title: "股票名称",
          align: "center",
          key: "stockName",
          width: 100
        },
        {
          title: "委托方向",
          align: "center",
          key: "strategyType",
          width: 80,
          render: (h, params) => {
            let row = params.row;
            return h(
              "span",
              {
                class: row.strategyType == 1 ? "red" : "blue"
              },
              row.strategyType == 1 ? "买" : "卖"
            );
          }
        },
        {
          title: "委托价格",
          align: "center",
          key: "tradePrice",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, row.buysellType == 1?Number(row.tradePrice).toFixed(2):'市价');
          }
        },
        {
          title: "委托数量",
          align: "center",
          key: "tradeNumber",
          width: 100
        },
        {
          title: "成交数量",
          align: "center",
          key: "dealNumber",
          width: 100
        },
        {
          title: "撤单数量",
          align: "center",
          key: "cancelNumber",
          width: 100
        },
        {
          title: "订单冻结总资金",
          align: "center",
          key: "tradeMoney",
          width: 110,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.tradeMoney).toFixed(2));
          }
        },
        {
          title: "下单类型",
          align: "center",
          key: "buysellType",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, row.buysellType == 1 ? "限价" : "市价");
          }
        },
        {
          title: "委托状态",
          align: "center",
          key: "state",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, row.state);
          }
        },
        {
          title: "备注",
          align: "center",
          key: "description"
        },
        {
          title: "操作",
          align: "center",
          fixed: "right",
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                style: {
                  color: "#448EF6",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.chedan(row);
                    // console.log(11);
                  }
                }
              },
              row.state=='买入委托'||row.state=='卖出委托'?"撤单":''
            );
          }
        }
      ],

      columnsListchengjiao: [
        //下方 买入卖出 成交title ，查询 里的当日成交 title
        {
          title: "成交编号",
          align: "center",
          key: "strategyNum",
          width: 150
        },
        {
          title: "成交时间",
          align: "center",
          key: "dealTime",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distime(row.dealTime));
          }
        },
        {
          title: "股票代码",
          align: "center",
          key: "stock_code",
          width: 100
        },
        {
          title: "股票名称",
          align: "center",
          key: "stockName",
          width: 100
        },
        {
          title: "交易方向",
          align: "center",
          key: "direction",
          width: 80,
          render: (h, params) => {
            let row = params.row;
            return h(
              "span",
              {
                class: row.direction == 1 ? "red" : "blue"
              },
              row.direction == 1 ? "买" : "卖"
            );
          }
        },
        {
          title: "成交数量",
          align: "center",
          key: "dealNumber",
          width: 100
        },
        {
          title: "成交价格",
          align: "center",
          key: "dealPrice",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealPrice).toFixed(2));
          }
        },
        {
          title: "成交金额",
          align: "center",
          key: "dealMarketValue",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealMarketValue).toFixed(2));
          }
        },
        {
          title: "佣金",
          align: "center",
          key: "dealCommission",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealCommission).toFixed(2));
          }
        },
        {
          title: "印花税",
          align: "center",
          key: "dealStamp",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealStamp).toFixed(2));
          }
        },
        {
          title: "过户费",
          align: "center",
          key: "dealTransfer",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealTransfer).toFixed(2));
          }
        },
        {
          title: "信息撮合费",
          align: "center",
          key: "dealInfo",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealInfo).toFixed(2));
          }
        },
        {
          title: "明细",
          align: "center",
          fixed: "right",
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                style: {
                  color: "#DE403F",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$emit("lookdetail", row);
                  }
                }
              },
              "点击查看"
            );
          }
        }
      ],

      columnsListzijin: [
        //下方 买入卖出 资金title ,查询里的资产 title
        {
          title: "账户名",
          align: "center",
          key: "account",
          width: 100
        },
        {
          title: "保证金",
          align: "center",
          key: "principal",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.principal).toFixed(2));
          }
        },
        // {
        //   title: "配资金额",
        //   align: "center",
        //   key: "principal_money",
        //   width: 100,
        //   render: (h, params) => {
        //     let row = params.row;
        //     return h("span", {}, Number(row.principal_money).toFixed(2));
        //   }
        // },
        {
          title: "自有资金",
          align: "center",
          key: "myhaveMoney",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.myhaveMoney).toFixed(2));
          }
        },
        {
          title: "总资产",
          align: "center",
          key: "allMoney",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.allMoney).toFixed(2));
          }
        },
        {
          title: "浮动盈亏",
          align: "center",
          key: "floatPrice",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  row.floatPrice > 0
                    ? "red"
                    : row.floatPrice < 0
                    ? "green"
                    : ""
              },
              row.floatPrice
            );
          }
        },
        {
          title: "持仓市值",
          align: "center",
          key: "holdMarketValue",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.holdMarketValue).toFixed(2));
          }
        },
        {
          title: "开仓成本",
          align: "center",
          key: "holdPrice",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.holdPrice).toFixed(2));
          }
        },
        {
          title: "冻结资金",
          align: "center",
          key: "frozenMoney",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.frozenMoney).toFixed(2));
          }
        },
        {
          title: "可用资金",
          align: "center",
          key: "canMoney",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.canMoney).toFixed(2));
          }
        },
        {
          title: "可取资金",
          align: "center",
          key: "drawMoney",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.drawMoney).toFixed(2));
          }
        },
        // {
        //   title: "保证金余额",
        //   align: "center",
        //   key: "bondBalance",
        //   width: 100,
        //   render: (h, params) => {
        //     let row = params.row;
        //     return h("span", {}, Number(row.bondBalance).toFixed(2));
        //   }
        // },
        // {
        //   title: "配资余额",
        //   align: "center",
        //   key: "principalBalance",
        //   width: 100,
        //   render: (h, params) => {
        //     let row = params.row;
        //     return h("span", {}, Number(row.principalBalance).toFixed(2));
        //   }
        // },
        {
          title: "占用保证金",
          align: "center",
          key: "occupyBaozheng",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.occupyBaozheng).toFixed(2));
          }
        },
        // {
        //   title: "占用配资",
        //   align: "center",
        //   key: "occupyPeizi",
        //   width: 100,
        //   render: (h, params) => {
        //     let row = params.row;
        //     return h("span", {}, Number(row.occupyPeizi).toFixed(2));
        //   }
        // },
        // {
        //   title: "T1占用配资",
        //   align: "center",
        //   key: "oneOccupyPeizi",
        //   width: 100,
        //   render: (h, params) => {
        //     let row = params.row;
        //     return h("span", {}, Number(row.oneOccupyPeizi).toFixed(2));
        //   }
        // },
        {
          title: "冻结管理费",
          align: "center",
          key: "frozenManage",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.frozenManage).toFixed(2));
          }
        },
        {
          title: "出入金合计",
          align: "center",
          key: "tradeMoney",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.tradeMoney).toFixed(2));
          }
        },
        {
          title: "累计盈亏",
          align: "center",
          key: "allYingkui",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.allYingkui).toFixed(2));
          }
        },
        {
          title: "平仓盈亏",
          align: "center",
          key: "sellYingkui",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.sellYingkui).toFixed(2));
          }
        },
        {
          title: "亏损比",
          align: "center",
          key: "kuisunRate",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.kuisunRate).toFixed(2)+'%');
          }
        },
        {
          title: "预警线",
          align: "center",
          key: "vigilance",
          width: 100
        },
        {
          title: "强平线",
          align: "center",
          key: "openLine",
          width: 100
        },
        {
          title: "禁开线",
          align: "center",
          key: "noOpening"
        }
      ],
      columnsListchedan: [
        //下方 撤单title
        {
          title: "委托编号",
          align: "center",
          key: "strategyNum",
          width: 150
        },
        {
          title: "委托时间",
          align: "center",
          key: "tradeTime",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distime(row.tradeTime));
          }
        },
        {
          title: "股票代码",
          align: "center",
          key: "stockCode",
          width: 100
        },
        {
          title: "股票名称",
          align: "center",
          key: "stockName",
          width: 100
        },
        {
          title: "委托方向",
          align: "center",
          key: "strategyType",
          width: 80,
          render: (h, params) => {
            let row = params.row;
            return h(
              "span",
              {
                class: row.strategyType == 1 ? "red" : "blue"
              },
              row.strategyType == 1 ? "买" : "卖"
            );
          }
        },
        {
          title: "委托价格",
          align: "center",
          key: "tradePrice",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.tradePrice).toFixed(2));
          }
        },
        {
          title: "委托数量",
          align: "center",
          key: "tradeNumber",
          width: 100
        },
        {
          title: "成交数量",
          align: "center",
          key: "dealNumber",
          width: 100
        },
        {
          title: "委托状态",
          align: "center",
          key: "status",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.disstatus(row.status));
          }
        },
        {
          title: "操作",
          align: "center",
          fixed: "right",
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                style: {
                  color: "#448EF6",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.chedan(row);
                    // console.log(11);
                  }
                }
              },
              "撤单"
            );
          }
        }
      ],
      columnsListChaweituo: [
        //下方 查询中的 当日委托和历史委托 title
        {
          title: "委托编号",
          align: "center",
          key: "strategyNum",
          width: 150
        },
        {
          title: "委托时间",
          align: "center",
          key: "tradeTime",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distime(row.tradeTime));
          }
        },
        {
          title: "最后更新时间",
          align: "center",
          key: "dealTime",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, row.dealTime == 0?'--':this.distime(row.dealTime));
          }
        },
        {
          title: "股票代码",
          align: "center",
          key: "stock_code",
          width: 100
        },
        {
          title: "股票名称",
          align: "center",
          key: "stockName",
          width: 100
        },
        {
          title: "委托方向",
          align: "center",
          key: "strategyType",
          width: 80,
          render: (h, params) => {
            let row = params.row;
            return h(
              "span",
              {
                class: row.strategyType == 1 ? "red" : "blue"
              },
              row.strategyType == 1 ? "买" : "卖"
            );
          }
        },
        {
          title: "委托价格",
          align: "center",
          key: "tradePrice",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {},row.buysellType == 1 ? Number(row.tradePrice).toFixed(2) :'市价');
          }
        },
        {
          title: "委托数量",
          align: "center",
          key: "tradeNumber",
          width: 100
        },
        {
          title: "成交数量",
          align: "center",
          key: "dealNumber",
          width: 100
        },
        {
          title: "撤单数量",
          align: "center",
          key: "cancelNumber",
          width: 100
        },
        {
          title: "订单冻结总资金",
          align: "center",
          key: "tradeMoney",
          width: 110,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.tradeMoney).toFixed(2));
          }
        },
        {
          title: "下单类型",
          align: "center",
          key: "buysellType",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, row.buysellType == 1 ? "限价" : "市价");
          }
        },
        {
          title: "委托状态",
          align: "center",
          key: "state",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, row.state);
          }
        },
        {
          title: "备注",
          align: "center",
          key: "description",
          width: 300
        }
      ],
      columnsListchengjiao1: [
        //下方 查询中的 历史成交 title
        {
          title: "成交编号",
          align: "center",
          key: "strategyNum",
          width: 150
        },
        {
          title: "成交时间",
          align: "center",
          key: "dealTime",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distime(row.dealTime));
          }
        },
        {
          title: "股票代码",
          align: "center",
          key: "stock_code",
          width: 100
        },
        {
          title: "股票名称",
          align: "center",
          key: "stockName",
          width: 100
        },
        {
          title: "交易方向",
          align: "center",
          key: "direction",
          width: 80,
          render: (h, params) => {
            let row = params.row;
            return h(
              "span",
              {
                class: row.direction == 1 ? "red" : "blue"
              },
              row.direction == 1 ? "买" : "卖"
            );
          }
        },
        {
          title: "成交数量",
          align: "center",
          key: "dealNumber",
          width: 100
        },
        {
          title: "成交价格",
          align: "center",
          key: "dealPrice",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealPrice).toFixed(2));
          }
        },
        {
          title: "成交金额",
          align: "center",
          key: "dealMarketValue",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealMarketValue).toFixed(2));
          }
        },
        {
          title: "佣金",
          align: "center",
          key: "dealCommission",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealCommission).toFixed(2));
          }
        },
        {
          title: "印花税",
          align: "center",
          key: "dealStamp",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealStamp).toFixed(2));
          }
        },
        {
          title: "过户费",
          align: "center",
          key: "dealTransfer",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealTransfer).toFixed(2));
          }
        },
        {
          title: "信息撮合费",
          align: "center",
          key: "dealInfo",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealInfo).toFixed(2));
          }
        },
        {
          title: "平仓盈亏",
          align: "center",
          key: "profitMoney",
          width: 100
        },
        {
          title: "明细",
          align: "center",
          fixed: "right",
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                style: {
                  color: "#DE403F",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$emit("lookdetail", row);
                  }
                }
              },
              "点击查看"
            );
          }
        }
      ],
      columnsListzijinliushui: [
        //下方 查询中的资金流水 title
        {
          title: "用户名",
          align: "center",
          key: "account",
          width: 150
        },
        {
          title: "资金变动",
          align: "center",
          key: "trade_price",
          width: 100
          // render: (h, params) => {
          //   let row = params.row;
          //   return h("span", {}, Number(row.trade_price).toFixed(2));
          // }
        },
        {
          title: "变动类型",
          align: "center",
          key: "trade_type",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distype(row.trade_type));
          }
        },
        {
          title: "变动原因",
          align: "center",
          key: "desc",
          width: 250,
          // render: (h, params) => {
          //   let row = params.row;
          //   return h(
          //     "div",
          //     () => {
          //       return h(
          //         "el-tooltip",
          //         {
          //           effect: "dark",
          //           content: row.desc,
          //           placement: "right-start"
          //         },
          //         row.desc
          //       );
          //     },
          //     row.desc
          //   );
          // }
        },
        // {
        //   title: "保证金余额(前)",
        //   align: "center",
        //   key: "befor_bond_balance",
        //   width: 120
        // },
        // {
        //   title: "保证金余额(后)",
        //   align: "center",
        //   key: "after_bond_balance",
        //   width: 120
        // },
        // {
        //   title: "配资余额(前)",
        //   align: "center",
        //   key: "befor_principal_balance",
        //   width: 100
        // },
        // {
        //   title: "配资余额(后)",
        //   align: "center",
        //   key: "after_principal_balance",
        //   width: 100
        // },
        {
          title: "变动时间",
          align: "center",
          key: "create_time",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distime(row.create_time));
          }
        }
      ],
      columnsListjiaoge: [
        //下方 查询中的 交割单 title
        {
          title: "成交编号",
          align: "center",
          key: "strategyNum",
          width: 150
        },
        {
          title: "成交时间",
          align: "center",
          key: "dealTime",
          width: 150,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distime(row.dealTime));
          }
        },
        {
          title: "股票代码",
          align: "center",
          key: "stock_code",
          width: 100
        },
        {
          title: "股票名称",
          align: "center",
          key: "stockName",
          width: 100
        },
        {
          title: "操作类型",
          align: "center",
          key: "strategyType",
          width: 80,
          render: (h, params) => {
            let row = params.row;
            return h(
              "span",
              {
                class: row.strategyType == 1 ? "red" : "blue"
              },
              row.strategyType == 1 ? "买" : "卖"
            );
          }
        },
        {
          title: "成交数量",
          align: "center",
          key: "dealNumber",
          width: 100
        },
        {
          title: "成交价格",
          align: "center",
          key: "dealPrice",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealPrice).toFixed(2));
          }
        },
        {
          title: "成交金额",
          align: "center",
          key: "dealMarketValue",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealMarketValue).toFixed(2));
          }
        },
        {
          title: "股票余额",
          align: "center",
          key: "surplusNum",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, row.surplusNum);
          }
        },
        {
          title: "佣金",
          align: "center",
          key: "dealCommission",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealCommission).toFixed(2));
          }
        },
        {
          title: "印花税",
          align: "center",
          key: "dealStamp",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealStamp).toFixed(2));
          }
        },
        {
          title: "过户费",
          align: "center",
          key: "dealTransfer",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealTransfer).toFixed(2));
          }
        },
        {
          title: "其他杂费",
          align: "center",
          key: "dealInfo",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            // 其他杂费 是 成交信息费 和 成交管理费 的和
            return h(
              "span",
              {},
              //(Number(row.dealInfo) + Number(row.dealManage)).toFixed(2)
              (Number(row.dealInfo)).toFixed(2)
            );
          }
        },
        {
          title: "发生金额",
          align: "center",
          key: "happen_money",
          width: 100,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.happen_money).toFixed(2));
          }
        },
        {
          title: "剩余金额",
          align: "center",
          key: "surplusMoney",
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.surplusMoney).toFixed(2));
          }
        }
      ]
    };
  },
  components: { render },
  created() {
    this.$nextTick(function() {
      this.getalldata();
    });
  },
  methods: {
    getalldata(val) {
      if (this.url == "1" || this.url == "5") {
        //持仓
        this.columns = this.columnsListchicang.concat();
        this.getchicang(val);
      } else if (this.url == "2" || this.url == "6" || this.url == "10") {
        //当日委托
        this.columns = this.columnsListweituo.concat();
        this.getweituo(val);
      } else if (this.url == "3" || this.url == "7" || this.url == "11") {
        //当日成交
        this.columns = this.columnsListchengjiao.concat();
        this.getchengjiao(val);
      } else if (this.url == "4" || this.url == "8" || this.url == "14") {
        //资金 资产
        this.columns = this.columnsListzijin.concat();
        this.getzichan(val);
      } else if (this.url == "9") {
        //撤单
        this.columns = this.columnsListchedan.concat();
        this.getchedan(val);
      } else if (this.url == "12") {
        //历史委托
        this.columns = this.columnsListChaweituo.concat();
        this.gethisweituo(val);
      } else if (this.url == "13") {
        //历史成交
        this.columns = this.columnsListchengjiao1.concat();
        this.gethischengjiao(val);
      } else if (this.url == "15") {
        // 资金流水
        this.columns = this.columnsListzijinliushui.concat();
        this.getliushui(val);
      } else if (this.url == "16") {
        // 交割单
        this.columns = this.columnsListjiaoge.concat();
        this.getjiaoge(val);
      }
    },
    getchicang(val) {
      let _this = this;
      //持仓 数据
      checkStrategy()
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = data.data;
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    getweituo(val) {
      let _this = this;
      //当日委托 数据
      getStrategy()
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = data.data;
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    gethisweituo(val) {
      let _this = this;
      //历史委托 数据
      getStrategyHistory({
        startTime:
          _this.value1 == "" ? _this.value1 : _this.distime(_this.value1, 3),
        endTime:
          _this.value2 == "" ? _this.value2 : _this.distime(_this.value2, 3)
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = data.data;
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    getchengjiao(val) {
      let _this = this;
      //当日成交 数据
      getStrategyDeal()
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = data.data;
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    gethischengjiao(val) {
      let _this = this;
      //历史成交 数据
      getStrategyDealHistory({
        startTime:
          _this.value1 == "" ? _this.value1 : _this.distime(_this.value1, 3),
        endTime:
          _this.value2 == "" ? _this.value2 : _this.distime(_this.value2, 3)
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = data.data;
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    getchedan(val) {
      let _this = this;
      //撤单 数据
      cancelStrategy()
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = data.data;
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    getliushui(val) {
      let _this = this;
      //资金流水 数据
      getMoneyWater({
        type: sessionStorage.getItem("selecttype")
          ? sessionStorage.getItem("selecttype")
          : "",
        startTime:
          _this.value1 == "" ? _this.value1 : _this.distime(_this.value1, 3),
        endTime:
          _this.value2 == "" ? _this.value2 : _this.distime(_this.value2, 3)
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = data.data;
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    getjiaoge(val) {
      let _this = this;
      //交割单 数据
      getStrategyOrder({
        startTime:
          _this.value1 == "" ? _this.value1 : _this.distime(_this.value1, 3),
        endTime:
          _this.value2 == "" ? _this.value2 : _this.distime(_this.value2, 3)
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = data.data;
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    getzichan(val) {
      let _this = this;
      //资产 数据
      accinfo()
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.data = [data.data];
            if (val == "shuaxin") {
              _this.$message({
                message: "刷新成功",
                type: "success"
              });
            }
            if (val == "chaxun") {
              _this.$message({
                message: "查询成功",
                type: "success"
              });
            }
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
    sumdanwei(number) {
      var num = Number(number);
      var abs = Math.abs(num);
      if (abs < 10000) {
        return num;
      } else if (10000 <= abs && abs < 100000000) {
        return (num / 10000).toFixed(2) + "万";
      } else {
        return (num / 100000000).toFixed(2) + "亿";
      }
    },
    disstatus(val) {
      if (val == 1) {
        return "委托成功";
      } else if (val == 3) {
        return "撤单中";
      } else if (val == 4) {
        return "撤单成功";
      } else if (val == 5) {
        return "半成半撤";
      } else if (val == 6) {
        return "买入成功";
      } else if (val == 8) {
        return "卖出成功";
      }
    },
    distype(val) {
      if (val == 1) {
        return "买股票";
      } else if (val == 2) {
        return "卖股票";
      } else if (val == 3) {
        return "扣除利息";
      } else if (val == 4) {
        return "除权派息";
      } else if (val == 5) {
        return "重置资金";
      } else if (val == 6) {
        return "重置配资";
      } else if (val == 7) {
        return "加保证金";
      } else if (val == 8) {
        return "加配资金额";
      } else if (val == 9) {
        return "扣保证金";
      } else if (val == 10) {
        return "扣配资金额";
      } else if (val == 11) {
        return "配资入金";
      } else if (val == 12) {
        return "蓝补";
      } else if (val == 13) {
        return "出金提现";
      } else if (val == 14) {
        return "提盈扣费";
      } else if (val == 21) {
        return "委托冻结资金";
      } else if (val == 22) {
        return "委托释放冻结资金";
      } else if (val == 23) {
        return "开仓佣金费";
      } else if (val == 24) {
        return "开仓信息撮合费";
      } else if (val == 25) {
        return "开仓过户费";
      } else if (val == 26) {
        return "平仓佣金费";
      } else if (val == 27) {
        return "平仓信息撮合费";
      } else if (val == 28) {
        return "平仓印花费";
      } else if (val == 29) {
        return "平仓过户费";
      }
    },
    distime(timestamp, number) {
      let timestamp1;
      if (String(timestamp).length == 10) {
        timestamp1 = Number(timestamp) * 1000;
      } else {
        timestamp1 = Number(timestamp);
      }
      const dateObj = new Date(+timestamp1); // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
      const year = dateObj.getFullYear(); // 获取年，
      const month = dateObj.getMonth() + 1; // 获取月，必须要加1，因为月份是从0开始计算的
      const date = dateObj.getDate(); // 获取日，记得区分getDay()方法是获取星期几的。
      const hours =
        dateObj.getHours() >= 10
          ? dateObj.getHours()
          : "0" + dateObj.getHours();
      const minutes =
        dateObj.getMinutes() >= 10
          ? dateObj.getMinutes()
          : "0" + dateObj.getMinutes(); // 获取分
      const seconds =
        dateObj.getSeconds() >= 10
          ? dateObj.getSeconds()
          : "0" + dateObj.getSeconds(); // 获取秒

      if (number == "3") {
        return year + "-" + month + "-" + date;
      } else {
        return (
          year +
          "-" +
          month +
          "-" +
          date +
          "\n" +
          hours +
          ":" +
          minutes +
          ":" +
          seconds
        );
      }
    },
    chedan(row) {
      let _this = this;
      _this
        .$confirm("确定撤单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          cancelStrategy1({
            id: row.id
          })
            .then(response => {
              let data = response.data;
              if (data.code == 1) {
                _this.$message({
                  message: data.msg,
                  type: "success"
                });
                _this.getalldata();
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
        })
        .catch(() => {});
    },
    quanche() {
      let _this = this;
      _this
        .$confirm("确定全撤?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          cancelAllStrategy()
            .then(response => {
              let data = response.data;
              if (data.code == 1) {
                _this.$message({
                  message: data.msg,
                  type: "success"
                });
                _this.getalldata();
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
        })
        .catch(() => {});
    },
    liushimodel() {
      this.$emit("liushuimodel");
    },
    shuaxin() {
      this.getalldata("shuaxin");
    },
    chaxun() {
      let _this = this;
      if (_this.value1 != "" && _this.value2 != "") {
        if (Number(_this.value1) > Number(_this.value2)) {
          _this.$message({
            message: "起始时间不能大于终止时间!",
            type: "error"
          });
        } else {
          _this.getalldata("chaxun");
        }
      } else {
        _this.getalldata("chaxun");
      }
    },
    exporttable() {
      //导出 资金流水
      window.open(
        process.env.API_ROOT +
          "/api/index/exportMoneyWater?token=" +
          sessionStorage.getItem("token") +
          "&type=" +
          (sessionStorage.getItem("selecttype")
            ? sessionStorage.getItem("selecttype")
            : "") +
          "&startTime=" +
          (this.value1 == "" ? this.value1 : this.distime(this.value1, 3)) +
          "&endTime=" +
          (this.value2 == "" ? this.value2 : this.distime(this.value2, 3))
      );
    },
    rowClick(row) {
      // 买入 卖出 持仓点击会更换 左侧交易股票代码
      if (this.url == "1" || this.url == "5") {
        this.$emit("getdetail", row.stock_code);
      }
    }
  },
  watch: {
    stockdetail() {
      //操作左边交易 委托时，切换账户，股票变动，右边 自动更新
      this.getalldata();
    }
  },
  filters: {
    itemFilter(value, column) {
      if (column.filter) {
        return column.filter(value[column.key]);
      }
      return value[column.key];
    }
  }
};
</script>
<style lang="less">
.Opertable {
  width: 100%;
  .el-table__body-wrapper {
    background-color: #f0f0f0;
  }
  .el-table thead {
    color: #888;
  }
  .el-table th {
    background-color: #d7d7d7;
  }
  .el-table tr {
    background-color: #f0f0f0;
  }
  .el-table td,
  .el-table th {
    padding: 3px 0;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: black;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #d7d7d7;
  }
  .el-table {
    font-size: 12px;
  }
  .el-table::before {
    background-color: transparent;
  }
  .el-table .cell {
    white-space: nowrap;
  }
}
</style>