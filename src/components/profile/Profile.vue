<template>
  <div class="profile">
    <a-modal
          title="温馨提醒"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel">
          <p>{{ ModalText }}</p>
    </a-modal>
    <div class="avatar">
      <img :src="avatar_url" alt="" @click="avatar">
      <input type="file" name="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="fileChange">
    </div>
    <div class="upload" @click="uploadAvatar">提交</div>
    <div class="username">{{username | login}}</div>
    <div class="divide"></div>
    <div class="desc">
      如果你给我的，和你给别人的是一样的，那我就不要了~
    </div>
  </div>
</template>

<script>
import { uploadAvatar } from "network/write"
import { getUserInfo } from "network/home"

export default {
  name: '',
  data() {
    return {
      avatarSrc: "",
      username: "",
      avatar_url: require("assets/img/avatar.jpg"),
      content: "",
      avatar: "",
      ModalText: '请先登录，是否前往登录?',
      visible: false,
      confirmLoading: false,
    }
  },
  methods: {
    fileChange(e){
      this.avatar = e.target.files[0]
    },
    async uploadAvatar(){
      if(!this.$store.state.userInfo.id){
        this.visible = true
      } else {
        let data = new FormData();
        data.append('avatar', this.avatar);
        const token = sessionStorage.getItem("token")
        await uploadAvatar(token,data)
        this.$message.success('上传成功!');
        const result = await getUserInfo(this.$store.state.userInfo.id)
        this.avatar_url = result.avatar_url + '?time=' + Date.now()
        // console.log(new Date().getTime());
      }
    },
    handleOk(e) {
      this.$router.push("/login")
    },
    handleCancel(e) {
      this.visible = false;
    }
  },
  async created() {
    if(this.$store.state.userInfo.id){
      const result = await getUserInfo(this.$store.state.userInfo.id)
      this.username = result.username
      this.avatar_url = result.avatar_url
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

.profile .avatar input {
  opacity: 0;
  position: absolute;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  margin: 0 auto;
  left: 0;
  right: 0;
}

.profile img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    position: relative;
    top: 19px;
  }

.profile .upload {
  position: relative;
  top: 45px;
  color: #fff;
  font-size: 13px;
  width: 105px;
  height: 22px;
  margin: 0 auto;
  padding: 3px 10px;
  background-color: rgba(6, 177, 245,.5);
}

.profile .upload:hover {
  cursor: pointer;
}

.profile .username {
    position: relative;
    top: 60px;
    color: #fff;
    font-size: 16px;
  }

.profile .divide {
    width: 96%;
    height: 2px;
    margin: 0 auto;
    position: relative;
    top: 70px;
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
    top: 80px;
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
