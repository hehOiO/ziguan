<template>
  <div>
    <div class="Vheader">
      <div class="leftLogo">
        <img :src="logo" alt />
        <span>{{name}}</span>
      </div>
      <div class="rightCon">
        <div class="Tomoney">
          <div>
            <img src="@/assets/zongzc.png" alt />
            <span>总资产：{{zichan.allMoney}}</span>
          </div>
          <div>
            <img src="@/assets/keyzj.png" alt />
            <span>可用资金：{{zichan.canMoney}}</span>
          </div>
        </div>
        <div class="topright">
          <img class="yonghu" src="@/assets/yongh.png" alt />
          <!-- <span v-if="options.length==1">{{options[0].name}}</span> -->
          <el-select class="deselect" v-model="value" placeholder="请选择" @change="selchange">
            <el-option v-for="item in options" :key="item.id" :label="item.account" :value="item.id"></el-option>
          </el-select>
          <!-- <el-button class="addAccount" type="primary" @click="addAccount">增加账户</el-button> -->
          <el-button class="addAccount" type="primary" @click="addAccount">账户管理</el-button>
          <img src="@/assets/shezhi.png" alt @click="editpass" style="cursor: pointer" />
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入名称代码/拼音/首字母"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div class="gupiao">
                <span class="seaname">{{ item.name }}</span>
                <span class="seastmbol">{{item.symbol}}</span>
              </div>
            </template>
            <span slot="suffix">
              <img src="@/assets/sou.png" alt />
            </span>
          </el-autocomplete>
          <div @click="exit" class="exitlogin"><img class="yonghu" src="@/assets/tuichu.png" alt /></div>
        </div>
      </div>
    </div>
    <div style="height:60px"></div>
  </div>
</template>
<script>
import { acclist, swiaccount, searchstock, logout} from "@/API/transtion";
export default {
  name: "Vheader",
  props: ["zichan"],
  data() {
    return {
      value: "",
      options: [],
      state: "",
      timeout: null,
      logo:'',
      name:""
    };
  },
  created() {
    this.logo = JSON.parse(localStorage.getItem("getLogo")).logo
    this.name = JSON.parse(localStorage.getItem("getLogo")).name
    // this.lang = lang;
    // this.uage = localStorage.getItem("lang");
    this.getacclist();
  },
  methods: {
    getacclist() {
      let _this = this;
      //账户列表
      acclist()
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            _this.options = data.data;
            _this.value = sessionStorage.getItem("id")
              ? Number(sessionStorage.getItem("id"))
              : "";
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
    querySearchAsync(queryString, cb) {
      var _this = this;
      searchstock({
        content: queryString
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            // var results = queryString
            //   ? data.data.filter(_this.SearchCreateFilter(queryString))
            //   :data.data;
            var results = data.data;
            // 调用 callback 返回建议列表的数据
            cb(results);
          } else {
            _this.$message.error(data.msg);
          }
        })
        .catch(error => {
          _this.$message.error(error);
        });
    },
    // SearchCreateFilter(queryString) {
    //   return restaurant => {
    //     return restaurant;
    //   };
    // },
    selchange(val) {
      let _this = this;
      //切换 账户
      swiaccount({
        id: val
      })
        .then(response => {
          let data = response.data;
          if (data.code == 1) {
            sessionStorage.setItem("token", data.data.userinfo.token);
            sessionStorage.setItem("id", data.data.userinfo.id);
            sessionStorage.setItem("account", data.data.userinfo.account);
            sessionStorage.setItem("telphone", data.data.userinfo.tel);
            _this.$emit("getaccinfo");
            // sessionStorage.setItem('stockCode','sz000001')
            _this.$emit("getdetail");
            _this.$message({
              message: data.msg,
              type: "success"
            });
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
    exit(){
      let _this = this;
      _this.$confirm("是否要退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        logout()
          .then(response => {
            let data = response.data;
            if (data.code == 1) {
              _this.$router.push("/login");
              // localStorage.clear();
              //sessionStorage.clear()
              //window.location.href = '/#/login';
              _this.$message({
                message:'退出成功',
                type: "success"
              });
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
    handleSelect(item) {
      this.state = item.name;
      this.$emit("getdetail", item.symbol);
    },
    editpass() {
      this.$emit("passEdit");
    },
    addAccount() {
      // this.$router.push({
      //   path: "/",
      //   query: { type: "add" }
      // });
      this.$emit("addAccount");
    }
  },
  watch:{
    '$store.state.index1.listchange':function(commit,data){
      let _this = this;
      _this.getacclist();
      _this.$emit("getaccinfo");
      _this.$emit("getdetail");
    }
  }
};
</script>
<style lang='less'>
.Vheader {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  background: #404040;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.leftLogo {
  display: flex;
  align-items: center;
  color: #fcc800;
  font-size: 20px;
  img {
    margin: 0 15px 0 35px;
    max-height: 37px;
  }
}
.rightCon {
  display: flex;
  align-items: center;
  .Tomoney,
  .topright {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Tomoney {
    padding-right: 20px;
    margin-right: 20px;
    border-right: 1px solid #ffffff;
    color: #fcc800;
    font-size: 14px;
    img {
      margin: 0 10px;
    }
  }
  .exitlogin{
    margin-right: 20px;
    cursor: pointer;
    img{
      margin:6px 10px;
    }
  }
  .topright > img {
    margin: 0 10px;
  }
  .topright > .yonghu {
    margin: 0;
  }
  .Tomoney > div {
    display: flex;
    align-items: center;
  }
  .deselect {
    width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .el-input__inner {
      border: 1px solid transparent;
      color: #ffffff;
    }
  }
  .el-autocomplete {
    .el-input__inner {
      font-size: 14px;
      color: #ffffff;
    }
  }
  .el-select .el-input__inner:focus,
  .el-select:hover .el-input__inner {
    border-color: transparent;
  }
  .el-input__inner {
    background-color: transparent;
    border: 1px solid rgba(151, 159, 182, 1);
    padding: 0 10px;
    color: #979fb6;
  }
  .el-autocomplete {
    width: 240px;
    margin-right: 20px;
    .el-input__inner {
      font-size: 12px;
      height: 32px;
      line-height: 32px;
      letter-spacing: 1.5px;
    }
  }
  .el-button--primary {
    background-color: #707070;
    border-color: #707070;
    padding: 7px 10px;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 35px;
  }
  .el-input__suffix {
    right: 10px;
    display: flex;
    align-items: center;
  }
}
.el-select-dropdown__list {
  background-color: rgba(64, 64, 64, 0.3);
}
.el-select-dropdown__item.hover,
.el-autocomplete-suggestion li:hover {
  background-color: rgba(64, 64, 64, 0.8) !important;
}
.el-select-dropdown__item.selected {
  color: #fcc800;
}
.el-select-dropdown__item,
.el-autocomplete-suggestion li {
  color: #efefef;
}
.el-select-dropdown,
.el-autocomplete-suggestion {
  background-color: rgba(64, 64, 64, 0.8);
  .gupiao {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .seastmbol {
      font-size: 13px;
      margin-right: 50px;
    }
  }
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(64, 64, 64, 0.3);
}
.rightCon .el-input--suffix .el-input__inner{
  font-size: 12px;
}
</style>