<template>
  <div class="article">
    <div class="title">
      <span v-for="(item,index) in title" 
            :key="index" 
            :class="{active: index === currentIndex}"
            @click="indexClick(index)"
            >
        {{item}}
      </span>
    </div>
    <div class="list">
      <div v-for="(item,index) in list" :key="index" class="list-item">
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
import { getMomentList, getMomentListLength } from "network/home"

export default {
  name: '',
  data() {
    return {
      title: ["最新文章","所有文章","留言"],
      currentIndex: 0,
      list: []
    }
  },
  methods: {
    async indexClick(index){
      this.currentIndex = index
      switch(index){
        case 0:
          break;
        case 1:
          const length = await getMomentListLength()
          this.list = await getMomentList(0,length)
          console.log(this.list);
          break;
        default:
          break;
      }
    }
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
    color: rgb(6, 177, 245);
    overflow-y: scroll;
    height: 305px;
    background-color: #f5f5f5;
  }

  /* 滑轮样式 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #999;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(6, 177, 245);
  }

  .list .list-item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
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