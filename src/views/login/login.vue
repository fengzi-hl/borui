<!--<template>
    <div>
      用户名：<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
      <br>
      密 码：<input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
      <br><br>
      <button v-on:click="login">登录</button>
    </div>
</template>-->
<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="loginForm"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="loginForm.password" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" v-on:click="login">登录</el-button>
    </el-form>
  </div>
</template>
 
<script>
    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username:'brAdmin',
                    password:'brAdmin'
                },
                responseResult:[]
            }
        },
        methods:{
            login(){
                this.$axios
                    .post('/api/auth/login',{
                        username:this.loginForm.username,
                        password:this.loginForm.password
                    })
                    .then(res=> {
                            console.log(res.data);
                            
                            localStorage.setItem('token',res.data.token);
                            // this.userToken = 'X-Auth-Token ' + res.data.data.body.token;
                            // // 将用户token保存到vuex中
                            //  this.changeLogin({ Authorization: _this.userToken });
                            console.log("状态码为："+res.data.code);
                             if(res.data.code === 200) {
                               localStorage.setItem("hasLogin", true);
                                window.sessionStorage.setItem("token",res.data.token);
                                 //1、跳转home页面
                                 this.$router.push({path:'/main'});
                                 //2、提示成功
                                 console.log("登录成功！");
                                 this.$message({
                                     showClose: true,
                                     message: '登录成功',
                                     type: 'success'
                                 });
                             }else {
                                 this.$message({
                                    showClose: true,
                                     message: '用户名或密码错误',
                                     type: 'error'
                                 })
                             }
                    })
                    .then(successResponse=>{
                        if(successResponse.data.code === 200){
                           
                        }
                    })
                    .catch(failResponse => {
                    })
            }
        }
    }
</script>
 
<style scoped>
.login-wrap {
  height: 100%;
  width: 30%;
  /* background: #324152; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 6%;
}
.login-form {
  width: 400px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 2px 0px 4px 6px rgba(0, 0, 0, .1);
}
.login-btn {
  width: 100%;
}
</style>