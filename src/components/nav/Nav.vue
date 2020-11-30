<template>
  <div class="nav">
    <div class="title">skyblog</div>
    <div class="nav-item">
      <a href="" @click="home">
        <i>&#xe600;</i>
        <span>首页</span>
      </a>
      <a href="" @click="writeArticle">
        <i>&#xe792;</i>
        <span>写文章</span>
      </a>
      <a href="">
        <i>&#xe651;</i>
        <span>文章列表</span>
        <i class="list"></i>
        <span class="list-item">
          <a href="" @click="myArticle">个人文章</a>
          <a href="" @click="allArticle">全部文章</a>
        </span>
      </a>
      <a>
        <i>&#xe617;</i>
        <span @click="login">{{loginTitle}}</span>
      </a>
    </div>
    </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      loginTitle: "",
    }
  },
  methods: {
    myArticle(e){
      e.preventDefault();
      this.$emit("article",0)
    },
    allArticle(e){
      e.preventDefault();
      this.$emit("article",1)
    },
    home(e){
      e.preventDefault();
      this.$router.push("/home")
    },
    login(){
      this.$router.replace("/login")
    },
    writeArticle(e){
      e.preventDefault()
      this.$router.push("/writeArticle")
    }
  },
  created() {
    if(this.$store.state.userInfo.id){
      this.loginTitle = "退出"
    } else {
      this.loginTitle = "登录"
    }
  },
}
</script>

<style scoped>
  .nav {
  font-family: "iconfont";
  display: flex;
  height: 49px;
  line-height: 49px;
  text-align: center;
  background-color: rgba(0, 0, 0, .4);
  border: 1px solid rgb(6, 177, 245);
  color: #fff;
}

.nav .title {
  width: 300px;
  font-size: 20px;
  font-weight: 700;
  text-shadow: 0 0 10px rgb(6, 177, 245),
               0 0 20px rgb(6, 177, 245),
               0 0 30px rgb(6, 177, 245),
               0 0 40px rgb(6, 177, 245);
}

.nav .nav-item {
  display: flex;
  width: 800px;
}

.nav .nav-item a {
  height: 49px;
  line-height: 49px;
  color: #fff;
  padding: 0 30px;
}

.nav .nav-item a:nth-child(3) {
  position: relative;
}

.nav .nav-item a .list-item {
  position: absolute;
  display: none;
  left: 0;
  top: 49px;
}

.nav .nav-item a:nth-child(3):hover .list-item {
  display: block;
  width: 100%;
  z-index: 9;
}

.nav .nav-item a:nth-child(3):hover .list-item a {
  color: #fff;
  display: block;
  background-color: rgba(0, 0, 0, 1);
  border-top: 1px solid #666;
}

.nav .nav-item a:nth-child(3) .list-item a:hover {
  color: #ff2337;
  background-color: #fff;
}

.nav .nav-item a:hover {
  background: #fff;
  color: #ff2337;
}

.nav .nav-item a:hover .list {
  transform-origin: center 3px;
  transform: rotate(180deg);
  border-top-color: #ff2337;
}

.nav .nav-item a .list {
  transition: transform 0.3s linear;
  position: relative;
  top: 3px;
  display: inline-block;
  border: 6px solid #fff;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}

.nav .nav-item a span:first-of-type {
  margin: 0 12px;
}

</style>
