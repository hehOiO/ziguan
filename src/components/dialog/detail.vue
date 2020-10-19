<template>
  <el-dialog
    class="elDialog chengdetail"
    :before-close="closeChild"
    title="成交明细"
    :visible.sync="dialogVisible"
    width="800px"
  >
    <div>
      <VChaTable :columns="columnsListdetail" :data="mingxi" />
    </div>
  </el-dialog>
</template>
<script>
import VChaTable from "@/components/table/tablechakan";
export default {
  name: "detailye",
  components: {
    VChaTable
  },
  props: ["dialogVisible", "hide", "mingxi"],
  data() {
    return {
      columnsListdetail: [
        //查看明细 表格 title
        {
          title: "成交编号",
          align: "center",
          key: "strategyNum",
          width: 170
        },
        {
          title: "股票代码",
          align: "center",
          key: "stock_code",
          width: 90
        },
        {
          title: "股票名称",
          align: "center",
          key: "stockName",
          width: 100
        },
        {
          title: "成交数量",
          align: "center",
          key: "dealNumber",
          width: 90
        },
        {
          title: "成交价格",
          align: "center",
          key: "dealPrice",
          width: 90,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealPrice).toFixed(2));
          }
        },
        {
          title: "成交金额",
          align: "center",
          key: "dealMarketValue",
          width: 90,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, Number(row.dealMarketValue).toFixed(2));
          }
        },
        {
          title: "成交时间",
          align: "center",
          key: "dealTime",
          width: 170,
          render: (h, params) => {
            let row = params.row;
            return h("span", {}, this.distime(row.dealTime));
          }
        }
      ]
    };
  },
  methods: {
    closeChild() {
      this.$emit("closeNode", this.hide);
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
    }
  }
};
</script>