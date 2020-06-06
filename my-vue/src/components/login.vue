<template>
  <div style="position: absolute;
    width: 100%;
    height: 100%;
    background-color: #93defe;">
    <div class="login_box">
      <div class="login_l_img"><img src="../images/login-img.png"/></div>
      <div class="login">
        <div class="login_logo"><a href="#"><img src="../images/login_logo.png"/></a></div>
        <div class="login_name">
          <p>后台管理系统</p>
        </div>
        <div>
          <el-form ref="form" v-model="from" label-width="40px">
            <el-form-item label="账号">
              <el-input v-model="from.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="margin-top: 18px">
              <el-input type="password" v-model="from.password"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-button class="bn" type="primary" @click="submitLogin">登录</el-button>
              <el-button class="bn" type="primary">重置</el-button>
            </el-form-item>
          </el-form>
          <el-link style="margin-top: 20px;margin-left: 200px" type="primary">没有账号?注册</el-link>
        </div>
      </div>
    </div>
  </div>
</template>
<!--<div class="mylogin"  >
    <div style=" margin: 50px 100px 100px; padding:10px;" >
      <el-form  ref="form"  v-model="from" label-width="80px">
        <el-form-item label="账号">
          <el-input  style="width: 250px" v-model="from.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"  style="width: 250px" v-model="from.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 45px">
          <el-button type="primary"  @click="submitLogin">登录</el-button>
          <el-button type="primary">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>-->
<script>
  export default {
    name: "login",
    data() {
      return {
        from: {
          name: '薛文良',
          password: '123456'
        }
      }
    },
    methods: {
      submitLogin() {
        console.log("s")
        if (!this.from.name.trim() || !this.from.password.trim()) {
          return this.$message({
            message: '用户名或密码不能为空',
            type: 'warning',
            duration: 2000,
            showClose: true
          })
        }
        this.$router.push("/myindex")
        // this.$post("/vLogin/LoginServer?name=" + this.from.name + "&password=" + this.from.password + "").then(res => {
        //   console.log(this.from)
        // })
      }
    }

  }
</script>

<style scoped>
  .bn {
    width: 80px;
    height: 30px;
    margin-left: 25px;
  }

  .mylogin {
    position: absolute;
    border-radius: 5px;
    width: 600px;
    height: 300px;
    border: 5px #ccc solid;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -300px;
  }

  * {
    font: 13px/1.5 '微软雅黑';
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    overflow: hidden;
  }

  body {
    background: #93defe;
    background-size: cover;
  }

  a {
    color: #27A9E3;
    text-decoration: none;
    cursor: pointer;
  }

  img {
    border: none;
  }

  .login_box {
    width: 1100px;
    margin: 120px auto 0;
  }

  .login_box .login_l_img {
    float: left;
    width: 432px;
    height: 440px;
    margin-left: 50px;
  }

  .login_box .login_l_img img {
    width: 500px;
    height: 440px;
  }

  .login {
    height: 360px;
    width: 400px;
    padding: 50px;
    background-color: #ffffff;
    border-radius: 6px;
    box-sizing: border-box;
    float: right;
    margin-right: 50px;
    position: relative;
    margin-top: 50px;
  }

  .login_logo {
    width: 120px;
    height: 120px;
    border: 5px solid #93defe;
    border-radius: 100px;
    background: #fff;
    text-align: center;
    line-height: 110px;
    position: absolute;
    top: -60px;
    right: 140px;
  }

  .login_name {
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 20px;
  }

  .login_name p {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #444;
    padding: 10px 0 20px;
  }

  .login_logo img {
    width: 60px;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
  }

  input[type=text], input[type=file], input[type=password], input[type=email], select {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 100%;
    margin-bottom: 15px;
    line-height: 50px;
    color: #888;
  }

  input[type=text]:focus, input[type=file]:focus, input[type=password]:focus, input[type=email]:focus, select:focus {
    border: 1px solid #27A9E3;
  }

  input[type=submit], input[type=button] {
    display: inline-block;
    vertical-align: middle;
    padding: 12px 24px;
    margin: 0px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    color: #ffffff;
    background-color: #27A9E3;
    border-radius: 3px;
    border: none;
    -webkit-appearance: none;
    outline: none;
    width: 100%;
  }

  .copyright {
    font-size: 14px;
    color: #fff;
    display: block;
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 60px;
  }

  #password_text {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #888;
    outline: none;
    width: 100%;
    margin-bottom: 15px;
    display: block;
    line-height: 50px;
  }
</style>
