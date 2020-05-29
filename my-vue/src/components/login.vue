<template>
  <div class="mylogin" >

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
  </div>
</template>

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
</style>
