<template>
    <el-dialog
        class="elDialog"
        :before-close="closeChild"
        center
        :visible.sync="dialogVisible"
        width="500px"
    >
    <ul class="title f-cb">
      <li @click="Switch_account(1)" :class="{'hover':show == 1}">新增账号</li>
      <li @click="Switch_account(2)" :class="{'hover':show == 2}">删除账号</li>
    </ul>
    <div class="cont">
      <div class="index" v-if="show == 1">
        <div>
          <div class="editCon">
              <span class="label">账号名</span>
              <el-input v-model="username"></el-input>
          </div>
          <div class="editCon">
              <span class="label">新密码</span>
              <el-input v-model="password" show-password></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确认</el-button>
          <el-button @click="closeChild">取消</el-button>
        </span>
      </div>
      <div class="index" v-if="show == 2">
          <div v-for="item in option" :key="item.id" :id="item.id" class="account_li" @click="delet_account(item.id)" v-show="my_id != item.id">{{item.account}} <span class="close"></span></div>
      </div>
    </div>
    
    </el-dialog>
</template>
<script>
import { addaccount, acclist, delAccount} from "@/API/transtion";
export default {
    name: "addaccount",
    props: ["dialogVisible", "hide",'options'],
    data() {
        return {
            username:'',
            password:'',
            show:1,
            option:[],
            my_id:"",
        }
    },
    mounted() {
      this.my_id = sessionStorage.getItem("id");
      this.getacclist()
    },
    methods:{
        delet_account(id){
          var _this = this;
          var tokens = sessionStorage.getItem("token");
          _this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delAccount({
              id:id,
            })
            .then(response => {
            let data = response.data;
            if (data.code == 1) {
                _this.$message({type: 'success',message: '删除成功!'});
                _this.getacclist()
                 _this.$store.state.index1.listchange ++;
                 _this.closeChild()
                window.location.reload();
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
           
          }).catch(() => {
            this.$message({type: 'info',message: '已取消删除'});          
          });
        },
        getacclist() {
          let _this = this;
          //账户列表
          acclist()
            .then(response => {
              let data = response.data;
              if (data.code == 1) {
                console.log(data,'options')
                _this.option = data.data;
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
        Switch_account(data){
          this.show = data;
        },
        confirm(){
            let _this = this;
            addaccount({
              account: _this.username,
              password: _this.password
            })
              .then(response => {
                let data = response.data;
                if (data.code == 1) {
                    sessionStorage.setItem("token", data.data.userinfo.token);
                    sessionStorage.setItem("id", data.data.userinfo.id);
                    sessionStorage.setItem("account", data.data.userinfo.account);
                    sessionStorage.setItem("telphone", data.data.userinfo.tel);
                    sessionStorage.setItem("stockCode", "sz000001");
                    _this.$store.state.index1.listchange ++;
                    _this.my_id = data.data.userinfo.id
                    _this.closeChild()
                    _this.getacclist()
                    window.location.reload();
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
        closeChild() {
            this.username=''
            this.password=''
            this.$emit("closeNode", this.hide);
        }
    }
}
</script>
<style lang='less'>
ul, ol, li, dl, dd {
  margin: 0;
  padding: 0;
}

ul, ol {
  list-style: none outside none;
}
.title{
  width:100%;
  margin-top: -20px;
  padding-bottom: 30px;
  li{
    float: left;
    font-size: 18px;
    color:#888;
    margin-right: 40px;
    line-height: 24px;
    cursor: pointer;
  }
  li.hover{
    color:#fff;
  }
  
}
.f-cb {
  zoom: 1;
}
.f-cb:after {
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  overflow: hidden;
  content: ".";
}
.dialog-footer{
  height:42px;
  display: block;
  margin-top: 20px;
}
.account_li{
  font-size: 16px;
  color:#888;
  line-height: 36px;
  .close{
    width:36px;
    height:36px;
    float: right;
    cursor: pointer;
    background:url(../../assets/close.png) no-repeat center;
  }
}
</style>