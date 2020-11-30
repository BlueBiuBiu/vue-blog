<template>
  <div class="wrap">
    <Nav @article="article"/>
    <div v-for="(item,index) in result" :key="index">
      <Article :content="item" :articlebgc="articlebgc[index]" />
    </div>
    <div class="footer">
      <a-pagination
        show-quick-jumper
        :default-current="1"
        :page-size="pageSize"
        :total="total"
        @change="onChange"
      />
    </div>
    <div class="right">
      <div class="search">
        <input type="text" />
        <a href="" class="icon">
          <img src="~assets/img/search.svg" alt="" />
        </a>
      </div>
      <Profile />
      <Music />
      <div class="article"></div>
    </div>
  </div>
</template>

<script>
import Article from "components/article/Article";
import Music from "components/music/Music"
import Nav from "components/nav/Nav"
import Profile from "components/profile/Profile"

import { getMomentList, getMomentProfileList, getMomentListLength, getMomentProfileLength } from "network/home"

export default {
  name: "",
  data() {
    return {
      result: [],
      total: 0,
      pageSize: 3,
      type: 1,
      articlebgc: [
        "articlebgc2",
        "articlebgc3",
        "articlebgc1"
      ]
    };
  },
  components: {
    Article,
    Music,
    Nav,
    Profile
  },
  methods: {
    async onChange(pageNumber) {
      // console.log("Page: ", pageNumber);
      if (this.type) {
        this.result = await getMomentList((pageNumber-1)*3,3)
      } else {
        const token = localStorage.getItem("token")
        this.result = await getMomentProfileList((pageNumber-1)*3,3,token)
      }
    },
    async article(type){
      this.type = type
      this.onChange(1)
      if(!type){
        const token = localStorage.getItem("token")
        if(!token){
          alert("请先登录")
          this.$router.push("/login")
        } else {
          this.total = await getMomentProfileLength(token)
        }
      } else {
        this.total = await getMomentListLength()
      }
    }
  },
  async created(){
    this.result = await getMomentList(0,3)
    this.total = await getMomentListLength()
  }
};
</script>

<style scoped>
@import "~assets/css/home.css";
</style>
