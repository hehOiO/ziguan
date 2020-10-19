<template>
  <div class="login">
    <div class="loginCon">
      <div class="loginlogo">
        <img :src="getLogoList.logo" alt />
        <span>{{getLogoList.name}}</span>
      </div>
      <div class="loginModel">
        <div class="title">登录</div>
        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号">
              <span slot="prefix">
                <img src="@/assets/account.png" alt />
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prefix">
                <img src="@/assets/pass.png" alt />
              </span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="is_remember"><span style="color:#fff">记住账号密码</span></el-checkbox>
          </el-form-item>
        </el-form>
        <div style="margin-bottom: 15px">
          <el-button class="loginBtn" type="primary" @click="handleSubmit('loginForm')">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { passlogin, addaccount } from "@/API/transtion";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      is_remember:false,
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      getLogoList:{}
    };
  },
  created() {
    // this.lang = lang;
    // this.uage = localStorage.getItem("lang");

    this.getLogo()

  },
  mounted:function(){

    if(localStorage.getItem('zq_username') != '' && localStorage.getItem('zq_username') != null){
      this.form.username = localStorage.getItem('zq_username');
      this.form.password = localStorage.getItem('zq_password');
      // this.handleSubmit('loginForm')
    }
    this.is_remember = localStorage.getItem('remember') == 1?true:false;
  },
  methods: {
    handleSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.$route.query.type == "add") {
            addaccount({
              account: _this.form.username,
              password: _this.form.password
            })
              .then(response => {
                let data = response.data;
                if (data.code == 1) {
                  sessionStorage.setItem("token", data.data.userinfo.token);
                  sessionStorage.setItem("id", data.data.userinfo.id);
                  sessionStorage.setItem("account", data.data.userinfo.account);
                  sessionStorage.setItem("telphone", data.data.userinfo.tel);
                  sessionStorage.setItem("stockCode", "sz000001");

                  if(_this.is_remember){
                    
                    localStorage.setItem('zq_username',_this.form.username);
                    localStorage.setItem('zq_password',_this.form.password);
                    localStorage.setItem('remember',1);
                  }else{
                    localStorage.setItem('zq_account','');
                    localStorage.setItem('zq_password','');
                    localStorage.setItem('remember',0);
                  }

                  // sessionStorage.setItem("avatar", data.data.userinfo.avatar);
                  // sessionStorage.setItem("nickname", data.data.userinfo.nickname);
                  // sessionStorage.setItem("sex", data.data.userinfo.sex);
                  // sessionStorage.setItem(
                  //   "tradePass",
                  //   data.data.userinfo.tradePass
                  // );
                  _this.$router.push("/transtion");
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
            passlogin({
              account: _this.form.username,
              password: _this.form.password
            })
              .then(response => {
                let data = response.data;
                if (data.code == 1) {
                  sessionStorage.setItem("token", data.data.userinfo.token);
                  sessionStorage.setItem("id", data.data.userinfo.id);
                  sessionStorage.setItem("account", data.data.userinfo.account);
                  sessionStorage.setItem("telphone", data.data.userinfo.tel);
                  sessionStorage.setItem("stockCode", "sz000001");
                  // sessionStorage.setItem("avatar", data.data.userinfo.avatar);
                  // sessionStorage.setItem("nickname", data.data.userinfo.nickname);
                  // sessionStorage.setItem("sex", data.data.userinfo.sex);
                  // sessionStorage.setItem(
                  //   "tradePass",
                  //   data.data.userinfo.tradePass
                  // );
                  if(_this.is_remember){

                    localStorage.setItem('zq_username',_this.form.username);
                    localStorage.setItem('zq_password',_this.form.password);
                    localStorage.setItem('remember',1);
                  }else{
                    localStorage.setItem('zq_account','');
                    localStorage.setItem('zq_password','');
                    localStorage.setItem('remember',0);
                  }
                  _this.$router.push("/transtion");
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
        } else {
          return false;
        }
      });
    },
    getLogo(){
      var _this  = this;
      _this.$http.post('/api/index/getLogo')
      .then(function (response) {
        _this.getLogoList  = response.data.data;
        localStorage.setItem("getLogo",JSON.stringify(response.data.data))
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>
<style lang='less'>
.login {
  width: 100%;
  height: 100%;
  background: url("~@/assets/Bgimg.jpg") no-repeat center ;
  background-size: cover;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginCon {
    transform: translateY(-20%);
  }
  .loginlogo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #fcc800;
    padding: 60px 20px;
    img {
      margin-right: 20px;
    }
  }
  .loginModel {
    background: rgba(255, 255, 255, 0.35);
    padding: 40px 47px;
    width: 400px;
    border-radius: 10px;
    .title {
      text-align: center;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .el-input__prefix {
      display: flex;
      align-items: center;
      left: 10px;
      span {
        display: flex;
        align-items: center;
      }
    }
    .el-input__inner {
      height: 55px;
      line-height: 55px;
    }
    .el-input--prefix .el-input__inner {
      padding-left: 45px;
    }
    .el-button--primary {
      width: 100%;
      background-color: #fcc800;
      border-color: #fcc800;
    }
    .el-button {
      font-size: 20px;
      padding: 15px 20px;
    }
  }
}
</style>