<template>
  <div class="profile">
    <div class="avatar">
      <img src="~assets/img/avatar.jpg" alt="">
    </div>
    <div class="username">{{username | login}}</div>
    <div class="divide"></div>
    <div class="desc">
      如果你给我的，和你给别人的是一样的，那我就不要了~
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      avatarSrc: "",
      username: "",
      content: ""
    }
  },
  created() {
    if(this.$store.state.userInfo.id){
      this.username = this.$store.state.userInfo.username
    }
  },
  filters: {
    login(value){
      if(!value) return "请先登录~"
      return value
    }
  }
}
</script>

<style scoped>
  .profile {
    width: 350px;
    height: 300px;
    border-radius: 5px;
    margin-top: 10px;
    text-align: center;
    background-color: rgba(0, 0, 0, .4);
    border: 1px solid rgb(6, 177, 245);
  }

.profile .avatar {
    width: 125px;
    height: 125px;
    position: relative;
    top: 40px;
    border-radius: 50%;
    background: url("~assets/img/toukuang.jpg") no-repeat;
    background-size: cover;
    background-position: center center;
    margin: 0 auto;
  }

.profile img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    position: relative;
    top: 19px;
  }

.profile .username {
    position: relative;
    top: 60px;
    left: 5px;
    color: #fff;
    font-size: 16px;
  }

.profile .divide {
    width: 96%;
    height: 2px;
    margin: 0 auto;
    position: relative;
    top: 75px;
    background-color: rgb(6, 177, 245);
    box-shadow: 0 0 10px rgb(6, 177, 245),
                0 0 20px rgb(6, 177, 245);
  }

.profile .desc {
    position: relative;
    color: #fff;
    font-weight: 500;
    width: 200px;
    font-size: 15px;
    top: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 0 auto;
    text-shadow: 0 0 10px rgb(6, 177, 245),
                0 0 30px rgb(6, 177, 245);
  }
</style>
