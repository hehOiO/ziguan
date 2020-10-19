<template>
  <div class="klinedata">
    <div class="klinetitle1">
      <span>{{stockdetail.name}}</span>
      <span>{{stockdetail.symbol}}</span>
    </div>
    <div class="klineshuju" ref="klineshuju">
      <div class="buykline">
        <div>
          <span>卖五</span>
          <span :class="Number(stockdetail.sellFivePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellFivePri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.sellFivePri}}</span>
          <span class="blue">{{stockdetail.sellFive}}</span>
        </div>
        <div>
          <span>卖四</span>
          <span :class="Number(stockdetail.sellFourPri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellFourPri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.sellFourPri}}</span>
          <span class="blue">{{stockdetail.sellFour}}</span>
        </div>
        <div>
          <span>卖三</span>
          <span :class="Number(stockdetail.sellThreePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellThreePri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.sellThreePri}}</span>
          <span class="blue">{{stockdetail.sellThree}}</span>
        </div>
        <div>
          <span>卖二</span>
          <span :class="Number(stockdetail.sellTwoPri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellTwoPri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.sellTwoPri}}</span>
          <span class="blue">{{stockdetail.sellTwo}}</span>
        </div>
        <div>
          <span>卖一</span>
          <span :class="Number(stockdetail.sellOnePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.sellOnePri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.sellOnePri}}</span>
          <span class="blue">{{stockdetail.sellOne}}</span>
        </div>
      </div>
      <div class="buykline">
        <div>
          <span>买一</span>
          <span :class="Number(stockdetail.buyOnePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyOnePri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.buyOnePri}}</span>
          <span class="red">{{stockdetail.buyOne}}</span>
        </div>
        <div>
          <span>买二</span>
          <span :class="Number(stockdetail.buyTwoPri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyTwoPri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.buyTwoPri}}</span>
          <span class="red">{{stockdetail.buyTwo}}</span>
        </div>
        <div>
          <span>买三</span>
          <span :class="Number(stockdetail.buyThreePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyThreePri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.buyThreePri}}</span>
          <span class="red">{{stockdetail.buyThree}}</span>
        </div>
        <div>
          <span>买四</span>
          <span :class="Number(stockdetail.buyFourPri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyFourPri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.buyFourPri}}</span>
          <span class="red">{{stockdetail.buyFour}}</span>
        </div>
        <div>
          <span>买五</span>
          <span :class="Number(stockdetail.buyFivePri) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.buyFivePri) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.buyFivePri}}</span>
          <span class="red">{{stockdetail.buyFive}}</span>
        </div>
      </div>
      <div class="botkline">
        <div>
          <div>
            <span>最新</span>
            <span :class="stockdetail.gainValue>0?'red':stockdetail.gainValue<0?'green':'fff'">{{stockdetail.latestPrice}}</span>
          </div>
          <div>
            <span>开盘</span>
            <span :class="Number(stockdetail.open) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.open) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.open}}</span>
          </div>
          <div>
            <span>涨跌</span>
            <span :class="stockdetail.gainValue>0?'red':stockdetail.gainValue<0?'green':'fff'">{{stockdetail.gainValue}}</span>
          </div>
          <div>
            <span>最高</span>
            <span :class="Number(stockdetail.high) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.high) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.high}}</span>
          </div>
          <div>
            <span>涨幅</span>
            <span :class="stockdetail.gain>0?'red':stockdetail.gain<0?'green':'fff'">{{stockdetail.gain}}%</span>
          </div>
          <div>
            <span>最低</span>
            <span :class="Number(stockdetail.low) - Number(stockdetail.preClose)>0?'red':Number(stockdetail.low) - Number(stockdetail.preClose)<0?'green':'fff'">{{stockdetail.low}}</span>
          </div>
          <div>
            <!-- 没有字段 -->
            <span>振幅</span>
            <span class="blue">{{(parseFloat(stockdetail.amplitude)*100).toFixed(2)}}%</span>
          </div>
          <div>
            <!-- 没有字段 -->
            <span>总手</span>
            <span class="blue">{{stockdetail.volume| sum}}</span>
          </div>
          <div>
            <!-- 没有字段 -->
            <span>金额</span>
            <span class="blue">{{stockdetail.amount != ''?parseFloat(stockdetail.amount) < 10000 ? parseFloat(stockdetail.amount).toFixed(2) + '万': (parseFloat(stockdetail.amount)/10000).toFixed(2)+'亿':0}}</span>
          </div>
          <div>
            <span>总市值</span>
            <span class="blue">{{stockdetail.totalMarketValue| sum}}亿</span>
          </div>
          <div>
            <span>涨停</span>
            <span class="blue">{{stockdetail.limitUpValue}}</span>
          </div>
          <div>
            <span>跌停</span>
            <span class="blue">{{stockdetail.limitDownValue}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // code: {
    //   type: Number,
    //   default: true
    // },
    height: {
      type: Number,
      default: true
    },
    stockdetail: {
      type: Object,
      default: true
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$refs.klineshuju.style.height = this.height + "px";
  },
  watch: {
    height() {
      this.$refs.klineshuju.style.height = this.height + "px";
    }
  }
};
</script>
<style lang="less">
.klinedata {
  height: 100%;
  .klinetitle1 {
    text-align: center;
    padding: 5px 0;
  }
  color: #fff;
  .klineshuju {
    font-size: 14px;
    border: 1px solid #f60000;
    margin-left: 1px;
    margin-right: 1px;
    // height: 90.3%;
    background: black;
    overflow: auto;
    .buykline {
      border-bottom: 1px dashed #f60000;
      padding: 2px 0;
      > div {
        min-width: 180px;
        display: flex;
        justify-content: flex-start;
        span {
          padding: 0 13px;
        }
      }
      .red{
        color: @red
      }
      .green{
        color: @green
      }
    }
    .botkline {
      display: flex;
      > div {
        width: 100%;
        > div {
          display: inline-block;
          // padding: 0 5px;
          span {
            display: inline-block;
            text-align: right;
            padding: 0 7px;
          }
        }
      }
    }
  }
}
</style>