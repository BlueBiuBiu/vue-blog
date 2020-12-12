<template>
  <div class="article">
    <a-modal
          title="温馨提醒"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel">
          <p>{{ ModalText }}</p>
    </a-modal>
    <div class="title">
      <span v-for="(item,index) in title" 
            :key="index" 
            :class="{active: index === currentIndex}"
            @click="indexClick(index)"
            >
        {{item}}
      </span>
    </div>
    <div class="list" v-if="list.length">
      <div v-for="(item,index) in list" :key="index" class="list-item" @click="detail(item.id)">
        <span class="list-title">{{item.title}}</span>
        <span class="author">作者:</span>
        <span class="username">
          <span>{{item.user.username}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMomentList, 
         getMomentListLength, 
         getMomentProfileList, 
         getMomentProfileLength, 
         getDetailMoment,
         getRecentMomentList 
        } from "network/home"

export default {
  name: '',
  data() {
    return {
      title: ["个人文章","所有文章","最新文章"],
      currentIndex: 1,
      list: [],
      ModalText: '请先登录，是否前往登录?',
      visible: false,
      confirmLoading: false,
    }
  },
  methods: {
    async indexClick(index){
      this.currentIndex = index
      switch(index){
        case 0:
          if(!this.$store.state.userInfo.id){
            this.visible = true
          } else {
            const token = sessionStorage.getItem("token")
            const profileLength = await getMomentProfileLength(token)
            this.list = await getMomentProfileList(0,profileLength,token)
          }
          break;
        case 1:
          const length = await getMomentListLength()
          this.list = await getMomentList(0,length)
          break;
        default:
          const recentLength = await getMomentListLength()
          this.list = await getRecentMomentList(0,recentLength)
          break;
      }
    },
    async detail(id){
      const result = await getDetailMoment(id)
      this.$router.push("/articleDetail")
      this.$store.commit({
      type: "article",
      detail: result
      })
    },
    handleOk(e) {
      this.$router.push("/login")
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
  async created() {
    const length = await getMomentListLength()
    this.list = await getMomentList(0,length)
  }
}
</script>

<style scoped>
  .article {
    width: 350px;
    height: 350px;
    border-radius: 5px;
    margin-top: 10px;
    text-align: center;
    background-color: rgba(0, 0, 0, .4);
    border: 1px solid rgb(6, 177, 245);
  }

  .article .title {
    display: flex;
    height: 45px;
    line-height: 45px;
    color: #fff;
    font-size: 15px;
    justify-content: space-around;
    border-bottom: 1px solid rgb(6, 177, 245);
  }

  .title span {
    padding: 0 8px;
  }

  .title span:hover {
    cursor: pointer;
  }

  .title .active {
    color: rgb(6, 177, 245);
    border-bottom: 3px solid rgb(6, 177, 245);
    margin-bottom: 5px;
  }

  .article .list {
    color: #fff;
    overflow-y: scroll;
    height: 305px;
    background-color: rgba(6, 177, 245,.7);
  }

  /* 滑轮样式 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgb(6, 177, 245);
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff;
  }

  .list .list-item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }

  .list .list-item:hover {
    cursor: pointer;
    color: rgb(6, 177, 245);
    background-color: #f5f5f5;
  }

  .list .list-item .list-title {
    position: absolute;
    left: 25px;
    width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list .list-item .username {
    position: absolute;
    right: 15px;
    width: 70px;
    height: 40px;
    text-align: left;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list .list-item .author {
    position: relative;
    left: 70px;
    margin-right: 20px;
  }
</style>