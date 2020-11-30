<template>
  <div>
    <div class="bgc">
      <img :src="imgUrl" alt="">
    </div>
    <div id="login">
      <div class="title">
        <span class="login"><a href="">登录</a></span>
        <span class="divide">/</span>
        <span><a href="" @click="register">注册</a></span>
      </div>
      <form action="" @submit="submit" method="POST">
        <div class="username">
          <span class="iconfont">&#xe67a;</span>
          <span class="input">
            <input type="text" name="username" placeholder="请输入用户名~" v-model="username" @blur="validate">
          </span> 
          <span class="validateUser">{{validateUser}}</span>
        </div>
        <div class="password">
          <span class="iconfont">&#xe652;</span>
          <span class="input">
            <input type="password" name="password" placeholder="请输入密码~" v-model="password" @blur="validate">
          </span>
          <span class="validatePsw">{{validatePsw}}</span>
        </div>
        <input class="btn" type="submit" value="登录">
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "network/login"
export default {
  name: '',
  data() {
    return {
      imgUrl: require("assets/img/background.jpg"),
      username: "",
      password: "",
      validateUser: "",
      validatePsw: ""
    }
  },
  methods: {
    validate(){
      if(this.username && this.password){
        this.validateUser = ""
        this.validatePsw = ""
        return 
      }
      if(!this.username){
        this.validateUser = "用户名不能为空~"
      } else {
        this.validateUser = ""
      }
      if(!this.password){
        return this.validatePsw = "密码不能为空~"
      } else {
        this.validatePsw = ""
      }
    },
    async submit(e){
      e.preventDefault();
      if(this.username && this.password){
        try {
          const res = await login(this.username,this.password)
          if(res.result == "ok"){
            localStorage.setItem("token",res.token)
            this.$store.commit("userInfo",res)
            this.$router.replace("/home")
          } else {
            switch (res.error) {
              case "用户不存在~":
                this.validateUser = "用户不存在~"
                break;
              case "密码不正确~":
                this.validatePsw = "密码不正确~"
              default:
                break;
            }
          }
        } catch (error) {
          console.log(error);
        }

      }
    },
    register(e){
      e.preventDefault()
      this.$router.replace("/register")
    }
  }
}
</script>

<style scoped>
  .bgc {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .bgc img {
    width: 100%;
    height: 100%;
  }

  #login {
    width: 400px;
    height: 200px;
    border-radius: 6px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(255, 255, 255, 0.2);
    padding: 50px;
    box-sizing: content-box;
  }

  .title {
    color: #fff;
  }

  .title a {
    color: #fff;
    padding: 5px;
  }

  .title .login, .title .divide {
    font-size: 25px;
    font-weight: 700;
  }

  .username {
    margin: 20px 0 10px;
  }

  .username, .password {
    margin: 20px 0 10px;
    position: relative;
    right: 20px;
  }

  .username .input, .password .input {
    display: inline-block;
    width: 220px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    border-radius: 50px;
    margin-left: 5px;
  }

  .username .iconfont, .password .iconfont {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 5px;
    color: #fff;
  }

  .username input, .password input {
    width: 200px;
    height: 25px;
    outline: none;
    border: none;
  }
  
  .username input::placeholder, .password input::placeholder {
    font-style: italic;
    font-size: 12px;
  }

  .username .validateUser, .password .validatePsw {
    position: absolute;
    height: 30px;
    line-height: 30px;
    color: #f00;
    right: -50px;
    font-size: 15px;
  }

  .btn {
    width: 200px;
    height: 30px;
    margin-top: 10px;
    border-radius: 100px;
    color: #fff;
    outline: none;
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  }

  .btn:hover {
    cursor: pointer;
  }

  
</style>
