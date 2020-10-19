<template>
  <div class="klineheight">
    <div class="klinetitle">
      <div>
        <span>{{stockinfo.name}}</span>
        <span class="pricekline">最新:{{stockinfo.latestPrice}}</span>
        <!-- 没有字段 -->
        <span class="pricekline">均价:{{stockinfo.avgPrice}}</span>
      </div>
      <div class="rightzixuan">
        <div v-if="flag==false" @click="add">
          <img src="@/assets/jiazix.png" alt />
          <span class="pricekline">加自选</span>
        </div>
        <div v-if="flag==true" @click="cancel">
          <img src="@/assets/yitianjia.png" alt />
          <span class="pricekline" style="color:#FCC800">已添加</span>
        </div>
      </div>
    </div>
    <div class="Kline">
      <div class="linetitle">
        <span
          v-for="(item,index) in linetitle"
          :key="index"
          :class="{'hover':key == index}"
          @click="changelink(item.name,item.type,index)"
        >{{item.name}}</span>
      </div>
      <div class="Kline-box" ref="Kline" :class="{'hover':biaosuoflag == true}">
        <div class="m-line" id="m-line" :class="{'on':key == 0}"></div>
        <!-- 分时 -->
        <div class="k-content" id="k-content1" :class="{'on':key == 1}"></div>
        <!-- 日K -->
        <div class="k-content" id="k-content2" :class="{'on':key == 2}"></div>
        <!-- 周K -->
        <div class="k-content" id="k-content3" :class="{'on':key == 3}"></div>
        <!-- 月K -->
        <div class="k-content" id="k-content4" :class="{'on':key == 4}"></div>
        <!-- 1分钟 -->
        <div class="k-content" id="k-content5" :class="{'on':key == 5}"></div>
        <!-- 5分钟 -->
        <div class="k-content" id="k-content6" :class="{'on':key == 6}"></div>
        <!-- 15分钟 -->
        <div class="k-content" id="k-content7" :class="{'on':key == 7}"></div>
        <!-- 30分钟 -->
      </div>
    </div>
  </div>
</template>
<script>
import VueKline from "linkstock";
import { addChoose, deleteChoose, KLine, minLine } from "@/API/transtion";
import echarts from "@/js/echarts.min.js";
import { initMOption, initKOption } from "@/js/k-line.js";
export default {
  components: {
    VueKline
  },
  props: {
    width: Number,
    height: Number,
    stockdetail: Object,
    biaosuoflag: Boolean
  },
  data() {
    return {
      flag: "",
      key: 0,
      linetitle: [
        {
          name: "分时",
          type: "day"
        },
        {
          name: "日K",
          type: "day"
        },
        {
          name: "周K",
          type: "week"
        },
        {
          name: "月K",
          type: "month"
        },
        {
          name: "1分钟",
          type: "1min"
        },
        {
          name: "5分钟",
          type: "5min"
        },
        {
          name: "15分钟",
          type: "15min"
        },
        {
          name: "30分钟",
          type: "30min"
        }
      ],
      stockinfo:{},
    };
  },
  created() {
    let _this = this;
    this.$nextTick(function() {
      _this.getmdata();
      _this.KLine_day();
      _this.KLine_week();
      _this.KLine_month();
      _this.KLine_1min();
      _this.KLine_5min();
      _this.KLine_15min();
      _this.KLine_30min();
      setInterval(function() {
        _this.getmdata();
      },40000);
      setTimeout(function(){
        _this.flag = _this.stockdetail.isChoose === 1 ? true : false;
        _this.stockinfo = _this.stockdetail;
      },5000)
    });
  },
  mounted() {
  },
  methods: {
    changelink(name, types, index) {
      var _this = this;
      _this.key = index;
    },
    //分时
    getmdata() {
      let _this = this;
      minLine({
        stockCode: sessionStorage.getItem("stockCode"),
        type: "day"
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            var dataObj = data.data;
            var len = dataObj.items.length;
            var mdata = [];
            mdata["data"] = new Array();
            for (var i = 0; i < len; i++) {
              mdata["data"][i] = new Array();
              mdata["data"][i][0] = dataObj.items[i].time;
              mdata["data"][i][1] = dataObj.items[i].price;
              mdata["data"][i][2] = dataObj.items[i].avgPrice;
              mdata["data"][i][3] = dataObj.items[i].volume;
              mdata["yestclose"] = dataObj.preClose;
            }
            var mChart = echarts.init(document.getElementById("m-line"));
            mChart.setOption(initMOption(mdata, "us"));
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
    //日K
    KLine_day() {
      let _this = this;
      KLine({
        stockCode: sessionStorage.getItem("stockCode"),
        extends: 0,
        type: "day"
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            var dataObj = data.data;
            var len = dataObj.length;
            var kdata1 = [];
            for (var i = 0; i < len; i++) {
              kdata1[i] = new Array();
              kdata1[i][0] = dataObj[i].time;
              kdata1[i][1] = dataObj[i].open;
              kdata1[i][2] = dataObj[i].close;
              kdata1[i][3] = dataObj[i].low;
              kdata1[i][4] = dataObj[i].high;
              kdata1[i][5] = dataObj[i].volume;
            }
            var kChart1 = echarts.init(document.getElementById("k-content1"));
            kChart1.setOption(initKOption(kdata1));
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
    //周K
    KLine_week() {
      let _this = this;
      KLine({
        stockCode: sessionStorage.getItem("stockCode"),
        extends: 0,
        type: "week"
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            var dataObj = data.data;
            var len = dataObj.length;
            var kdata2 = [];
            for (var i = 0; i < len; i++) {
              kdata2[i] = new Array();
              kdata2[i][0] = dataObj[i].time;
              kdata2[i][1] = dataObj[i].open;
              kdata2[i][2] = dataObj[i].close;
              kdata2[i][3] = dataObj[i].low;
              kdata2[i][4] = dataObj[i].high;
              kdata2[i][5] = dataObj[i].volume;
            }
            var kChart2 = echarts.init(document.getElementById("k-content2"));
            kChart2.setOption(initKOption(kdata2));
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
    //月K
    KLine_month() {
      let _this = this;
      KLine({
        stockCode: sessionStorage.getItem("stockCode"),
        extends: 0,
        type: "month"
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            var dataObj = data.data;
            var len = dataObj.length;
            var kdata3 = [];
            for (var i = 0; i < len; i++) {
              kdata3[i] = new Array();
              kdata3[i][0] = dataObj[i].time;
              kdata3[i][1] = dataObj[i].open;
              kdata3[i][2] = dataObj[i].close;
              kdata3[i][3] = dataObj[i].low;
              kdata3[i][4] = dataObj[i].high;
              kdata3[i][5] = dataObj[i].volume;
            }
            var kChart3 = echarts.init(document.getElementById("k-content3"));
            kChart3.setOption(initKOption(kdata3));
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
    //1分钟
    KLine_1min() {
      let _this = this;
      KLine({
        stockCode: sessionStorage.getItem("stockCode"),
        extends: 0,
        type: "1min"
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            var dataObj = data.data;
            var len = dataObj.length;
            var kdata4 = [];
            for (var i = 0; i < len; i++) {
              kdata4[i] = new Array();
              kdata4[i][0] = dataObj[i].time;
              kdata4[i][1] = dataObj[i].open;
              kdata4[i][2] = dataObj[i].close;
              kdata4[i][3] = dataObj[i].low;
              kdata4[i][4] = dataObj[i].high;
              kdata4[i][5] = dataObj[i].volume;
            }
            var kChart4 = echarts.init(document.getElementById("k-content4"));
            kChart4.setOption(initKOption(kdata4));
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
    //5分钟
    KLine_5min() {
      let _this = this;
      KLine({
        stockCode: sessionStorage.getItem("stockCode"),
        extends: 0,
        type: "5min"
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            var dataObj = data.data;
            var len = dataObj.length;
            var kdata5 = [];
            for (var i = 0; i < len; i++) {
              kdata5[i] = new Array();
              kdata5[i][0] = dataObj[i].time;
              kdata5[i][1] = dataObj[i].open;
              kdata5[i][2] = dataObj[i].close;
              kdata5[i][3] = dataObj[i].low;
              kdata5[i][4] = dataObj[i].high;
              kdata5[i][5] = dataObj[i].volume;
            }
            var kChart5 = echarts.init(document.getElementById("k-content5"));
            kChart5.setOption(initKOption(kdata5));
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
    //15分钟
    KLine_15min() {
      let _this = this;
      KLine({
        stockCode: sessionStorage.getItem("stockCode"),
        extends: 0,
        type: "15min"
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            var dataObj = data.data;
            var len = dataObj.length;
            var kdata6 = [];
            for (var i = 0; i < len; i++) {
              kdata6[i] = new Array();
              kdata6[i][0] = dataObj[i].time;
              kdata6[i][1] = dataObj[i].open;
              kdata6[i][2] = dataObj[i].close;
              kdata6[i][3] = dataObj[i].low;
              kdata6[i][4] = dataObj[i].high;
              kdata6[i][5] = dataObj[i].volume;
            }
            var kChart6 = echarts.init(document.getElementById("k-content6"));
            kChart6.setOption(initKOption(kdata6));
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
    //30分钟
    KLine_30min() {
      let _this = this;
      KLine({
        stockCode: sessionStorage.getItem("stockCode"),
        extends: 0,
        type: "30min"
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            var dataObj = data.data;
            var len = dataObj.length;
            var kdata7 = [];
            for (var i = 0; i < len; i++) {
              kdata7[i] = new Array();
              kdata7[i][0] = dataObj[i].time;
              kdata7[i][1] = dataObj[i].open;
              kdata7[i][2] = dataObj[i].close;
              kdata7[i][3] = dataObj[i].low;
              kdata7[i][4] = dataObj[i].high;
              kdata7[i][5] = dataObj[i].volume;
            }
            var kChart7 = echarts.init(document.getElementById("k-content7"));
            kChart7.setOption(initKOption(kdata7));
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
    add() {
      let _this = this;
      //添加自选
      addChoose({
        stockCode: sessionStorage.getItem("stockCode")
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.$message({
              message: data.msg,
              type: "success"
            });
            _this.flag = true;
            _this.$store.state.index1.refresh = sessionStorage.getItem("stockCode")+'true';
            console.log(_this.$store.state.index1.refresh)
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
    cancel() {
      let _this = this;
      //删除 自选
      deleteChoose({
        stockCode: sessionStorage.getItem("stockCode")
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.$message({
              message: data.msg,
              type: "success"
            });
            _this.flag = false;
            _this.$store.state.index1.refresh = sessionStorage.getItem("stockCode")+'false';
            console.log(_this.$store.state.index1.refresh)
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
  watch: {
    width(val) {
      this.$refs.Kline.style.width = this.width + "px";
      var mChart = echarts.init(document.getElementById("m-line"));
      var kChart1 = echarts.init(document.getElementById("k-content1"));
      var kChart2 = echarts.init(document.getElementById("k-content2"));
      var kChart3 = echarts.init(document.getElementById("k-content3"));
      var kChart4 = echarts.init(document.getElementById("k-content4"));
      var kChart5 = echarts.init(document.getElementById("k-content5"));
      var kChart6 = echarts.init(document.getElementById("k-content6"));
      var kChart7 = echarts.init(document.getElementById("k-content7"));

      mChart.resize();
      kChart1.resize();
      kChart2.resize();
      kChart3.resize();
      kChart4.resize();
      kChart5.resize();
      kChart6.resize();
      kChart7.resize();
    },
    height(val) {
      this.$refs.Kline.style.height = (this.height - 30)+ "px";
      var mChart = echarts.init(document.getElementById("m-line"));
      var kChart1 = echarts.init(document.getElementById("k-content1"));
      var kChart2 = echarts.init(document.getElementById("k-content2"));
      var kChart3 = echarts.init(document.getElementById("k-content3"));
      var kChart4 = echarts.init(document.getElementById("k-content4"));
      var kChart5 = echarts.init(document.getElementById("k-content5"));
      var kChart6 = echarts.init(document.getElementById("k-content6"));
      var kChart7 = echarts.init(document.getElementById("k-content7"));

      mChart.resize();
      kChart1.resize();
      kChart2.resize();
      kChart3.resize();
      kChart4.resize();
      kChart5.resize();
      kChart6.resize();
      kChart7.resize();
    },
    // stockdetail() {
    //   this.flag = this.stockdetail.isChoose === 1 ? true : false;
    //   this.stockinfo = this.stockdetail;
    //   console.log(this.stockinfo,5556)
    //   // this.$emit("getdatadetail", this.stockdetail.symbol);
    // },
    '$store.state.index1.code':function(commit,data){
      console.log(data,111)
      this.flag = this.stockdetail.isChoose === 1 ? true : false;
      this.stockinfo = this.stockdetail;
      this.getmdata();
      this.KLine_day();
      this.KLine_week();
      this.KLine_month();
      this.KLine_1min();
      this.KLine_5min();
      this.KLine_15min();
      this.KLine_30min();
      setInterval(function() {
        _this.getmdata();
      },40000);
    },
  }
  
};
</script>
<style lang="less" scoped>
/deep/ #kline_container {
  .chart_container {
    border: none;
  }
}
.linetitle {
  width: 100%;
}
.linetitle span {
  font-size: 15px;
  color: #b2b2b2;
  line-height:26px;
  padding: 0 5px;
  display: inline-block;
  cursor: pointer;
}
.linetitle span.hover {
  color: #007aba;
}
.Kline-box {
  position: relative;
}
.Kline-box .m-line,
.Kline-box .k-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: black;
}
.Kline-box .m-line.on,
.Kline-box .k-content.on {
  z-index: 5;
}
</style>