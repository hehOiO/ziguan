
  <template>
  <div class="Etable" ref="Etable">
    <el-table
      :data="tableData"
      style="width:100%;height:100%"
      v-loading="loading"
      v-el-table-infinite-scroll="load"
      infinite-scroll-immediate="true"
      infinite-scroll-delay="300"
      infinite-scroll-disabled="flag"
      infinite-scroll-distance="100"
      :height="maxHeight"
      @row-click="rowClick"
    >
      <el-table-column
        align="left"
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
  </div>
</template>
  <script>
import render from "@/common/render.js";
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { getexponent, getszStock } from "@/API/transtion";

export default {
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll
  },
  name: "Etable",
  props: {
    tableHeight: {
      type: Number,
      default: true
    },
    index: {
      type: String,
      default: true
    },
    zichan: {
      type: Object
    }
  },
  data() {
    return {
      columns: [], //表头
      maxHeight: 0,
      loading: false,
      page: 1,
      tableData: [], //左侧 表格数据
      flag: false, //是否 禁用滚动加载
      columnsList: [
        //左侧表格 title
        {
          title: "股票代码",
          align: "center",
          key: "symbol",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "yellow"
              },
              row.symbol
            );
          }
        },
        {
          title: "股票名称",
          align: "center",
          key: "name",
          width: 130,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "yellow"
              },
              row.name
            );
          }
        },
        {
          title: "涨幅%",
          align: "center",
          key: "gain",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: row.gain > 0 ? "red" : row.gain < 0 ? "green" : "fff"
              },
              row.gain
            );
          }
        },
        {
          title: "最新价",
          align: "center",
          key: "latestPrice",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  row.gainValue > 0
                    ? "red"
                    : row.gainValue < 0
                    ? "green"
                    : "fff"
              },
              row.latestPrice
            );
          }
        },
        {
          title: "涨跌",
          align: "center",
          key: "gainValue",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  row.gainValue > 0
                    ? "red"
                    : row.gainValue < 0
                    ? "green"
                    : "fff"
              },
              row.gainValue
            );
          }
        },
        {
          title: "成交手数",
          align: "center",
          key: "volume",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "blue"
              },
              this.sumdanwei(row.volume)
            );
          }
        },
        {
          title: "昨收",
          align: "center",
          key: "preClose",
          width: 100
        },
        {
          title: "开盘",
          align: "center",
          key: "open",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  Number(row.open) - Number(row.preClose) > 0
                    ? "red"
                    : Number(row.open) - Number(row.preClose) < 0
                    ? "green"
                    : "fff"
              },
              row.open
            );
          }
        },
        {
          title: "最高",
          align: "center",
          key: "high",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  Number(row.high) - Number(row.preClose) > 0
                    ? "red"
                    : Number(row.high) - Number(row.preClose) < 0
                    ? "green"
                    : "fff"
              },
              row.high
            );
          }
        },
        {
          title: "最低",
          align: "center",
          key: "low",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  Number(row.low) - Number(row.preClose) > 0
                    ? "red"
                    : Number(row.low) - Number(row.preClose) < 0
                    ? "green"
                    : "fff"
              },
              row.low
            );
          }
        },
        {
          title: "成交额",
          align: "center",
          key: "amount",
          width:100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "blue"
              },
              this.changedanwei(row.amount)
            );
          }
        },
        {
          title: " ",
          align: "right",
          fixed: "right",
          width: 30
        }
      ],
      columnsList1: [
        //左侧表格 title
        {
          title: "股票代码",
          align: "center",
          key: "symbol",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "yellow"
              },
              row.symbol
            );
          }
        },
        {
          title: "股票名称",
          align: "center",
          key: "name",
          width: 130,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "yellow"
              },
              row.name
            );
          }
        },
        {
          title: "涨幅%",
          align: "center",
          key: "gain",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: row.gain > 0 ? "red" : row.gain < 0 ? "green" : "fff"
              },
              row.gain
            );
          }
        },
        {
          title: "最新价",
          align: "center",
          key: "latestPrice",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  row.gainValue > 0
                    ? "red"
                    : row.gainValue < 0
                    ? "green"
                    : "fff"
              },
              row.latestPrice
            );
          }
        },
        {
          title: "涨跌",
          align: "center",
          key: "gainValue",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  row.gainValue > 0
                    ? "red"
                    : row.gainValue < 0
                    ? "green"
                    : "fff"
              },
              row.gainValue
            );
          }
        },
        {
          title: "买价",
          align: "center",
          key: "buyOnePri",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  Number(row.buyOnePri) - Number(row.preClose) > 0
                    ? "red"
                    : Number(row.buyOnePri) - Number(row.preClose) < 0
                    ? "green"
                    : "fff"
              },
              row.buyOnePri
            );
          }
        },
        {
          title: "卖价",
          align: "center",
          key: "sellOnePri",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  Number(row.sellOnePri) - Number(row.preClose) > 0
                    ? "red"
                    : Number(row.sellOnePri) - Number(row.preClose) < 0
                    ? "green"
                    : "fff"
              },
              row.sellOnePri
            );
          }
        },
        {
          title: "买量",
          align: "center",
          key: "buyOne",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "red"
              },
              row.buyOne
            );
          }
        },
        {
          title: "卖量",
          align: "center",
          key: "sellOne",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "green"
              },
              row.sellOne
            );
          }
        },
        {
          title: "总手",
          align: "center",
          key: "volume",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "blue"
              },
              this.sumdanwei(row.volume)
            );
          }
        },
        {
          title: "昨收",
          align: "center",
          key: "preClose",
          width: 100
        },
        {
          title: "开盘",
          align: "center",
          key: "open",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  Number(row.open) - Number(row.preClose) > 0
                    ? "red"
                    : Number(row.open) - Number(row.preClose) < 0
                    ? "green"
                    : "fff"
              },
              row.open
            );
          }
        },
        {
          title: "最高",
          align: "center",
          key: "high",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  Number(row.high) - Number(row.preClose) > 0
                    ? "red"
                    : Number(row.high) - Number(row.preClose) < 0
                    ? "green"
                    : "fff"
              },
              row.high
            );
          }
        },
        {
          title: "最低",
          align: "center",
          key: "low",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class:
                  Number(row.low) - Number(row.preClose) > 0
                    ? "red"
                    : Number(row.low) - Number(row.preClose) < 0
                    ? "green"
                    : "fff"
              },
              row.low
            );
          }
        },
        {
          title: "振幅%",
          align: "center",
          key: "amplitude",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "blue"
              },
              (parseFloat(row.amplitude)*100).toFixed(2)
            );
          }
        },
        {
          title: "成交额",
          align: "center",
          key: "amount",
          width:100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "blue"
              },
              this.changedanwei(row.amount)
            );
          }
        },
        {
          title: "总市值",
          align: "center",
          key: "totalMarketValue",
          width:100,
          render: (h, params) => {
            const row = params.row;
            return h(
              "span",
              {
                class: "blue"
              },
              row.totalMarketValue==''?0:parseFloat(row.totalMarketValue).toFixed(2)+'亿'
            );
          }
        },
        {
          title: " ",
          align: "right",
          fixed: "right",
          width: 30
        }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      this.getdata();
    });
  },
  mounted() {
    
    this.$nextTick(() => {
      this.maxHeight = this.tableHeight + 60;
    });
  },
  methods: {
    getlater() {
      let _this = this;
      console.log(_this.flag)
      if (!_this.flag) {
        //有数据继续加载时  请求数据
        _this.loading = true;
        getszStock({
          type: _this.index,
          page: _this.page
        })
          .then(response => {
            _this.loading = false;
            let data = response.data;
            if (data.code == 1) {
              _this.tableData = _this.tableData.concat(data.data.list);
              if (
               // data.data.list.length * 29 < _this.maxHeight ||
                data.data.list.length == 0
              ) {
                //不满屏 不滚动加载（主 针对横向滚动条） 或数据为空时
                _this.flag = true;
              }
            } else {
              _this.loading = false;
              _this.$message({
                message: data.msg,
                type: "error"
              });
            }
          })
          .catch(error => {
            _this.loading = false;
            _this.$message.error(error);
          });
      }
    },
    getdata() {
      let _this = this;
      if (_this.index == "0") {
        //指数 接口
        _this.columns = _this.columnsList.concat();
        _this.loading = true;
        getexponent()
          .then(response => {
            _this.loading = false;
            let data = response.data;
            if (data.code == 1) {
              _this.tableData = data.data.concat();
            } else {
              _this.loading = false;
              _this.$message({
                message: data.msg,
                type: "error"
              });
            }
          })
          .catch(error => {
            _this.loading = false;
            _this.$message.error(error);
          });
      } else {
        _this.columns = _this.columnsList1.concat();
        _this.getlater();
      }
    },
    load() {
      // this.$message.success("加载下一页");
      let _this = this;
      _this.page++;
      if (_this.index != "0") {
        _this.getlater();
      }
    },
     rowClick(row) {
      // 点击会更换 交易股票代码
      this.$emit("getdetail", row.symbol); 
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
    changedanwei(number){
      //前提是提供的数据是以万为单位的 
      var num = Number(number);
      var abs = Math.abs(num);
      if(abs < 10000){
        return num + "万";
      }else{
        return (num / 10000).toFixed(2) + "亿";
      }
    }
  },
  watch: {
    tableHeight() {
      this.maxHeight = this.tableHeight + 60;
    },
    zichan() {
      //切换账号
      this.page = 1;
      this.flag = false;
      this.tableData = [].concat();
      this.getdata();
    },
    '$store.state.index1.refresh':function(commit,data){
      console.log(data,111)
      let _this = this;
      if(_this.index == '4'){
        _this.page = 1;
        _this.flag = false;
        _this.tableData = [].concat();
        _this.getlater();
      }
    }
  },
  components: { render },
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
.Etable {
  .el-table__body-wrapper {
    background-color: black;
  }
  .el-table th {
    background-color: #393939;
  }
  .el-table tr {
    background-color: black;
    color: #fff;
  }
  .el-table thead tr {
    color: #888;
  }
  .el-table td,
  .el-table th {
    padding: 3px 0;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: black;
  }
  .el-table::before {
    background-color: transparent;
  }
  .el-table__fixed-right-patch {
    background-color: #393939;
    border-bottom: 1px solid #393939;
  }
  .el-table__fixed-right::before,
  .el-table__fixed::before {
    background-color: #000000;
  }
  // 改变左侧表格 高亮颜色
  .el-table__body .el-table__row.hover-row td {
    background-color: #393939 !important;
  }
  // 改变查看明细 高亮颜色
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #393939 !important;
  }
  .el-loading-mask {
    //loading 样式
    background-color: #393939 !important;
    opacity: 0.7;
  }
}
</style>