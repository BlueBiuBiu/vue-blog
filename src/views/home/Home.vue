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
        <input type="text" @change="searchInput"/>
        <a href="" class="icon" @click="search">
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
      totalResult: [],
      total: 0,
      fixTotal: 0,
      pageSize: 3,
      type: 1,
      pageNumber: 1,
      articlebgc: [
        "articlebgc2",
        "articlebgc3",
        "articlebgc1"
      ],
      searchContent: "",
      isSearch: false
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
      this.pageNumber = pageNumber
      if (this.type) {
        if(this.isSearch){
          this.threeResult()
        } else {
          this.result = await getMomentList((pageNumber-1)*3,3)
        }
      } else {
        const token = sessionStorage.getItem("token")
        if(this.isSearch){
          this.threeResult()
        } else {
          this.result = await getMomentProfileList((pageNumber-1)*3,3,token)
        }
      }
    },
    async article(type){
      this.type = type
      this.isSearch = false
      this.onChange(1)
      if(!type){
        const token = sessionStorage.getItem("token")
        if(!token){
          alert("请先登录")
          this.$router.push("/login")
        } else {
          this.total = await getMomentProfileLength(token)
        }
      } else {
        this.total = await getMomentListLength()
      }
    },
    searchInput(e){
      this.searchContent = e.target.value
    },
    async search(e){
      e.preventDefault();
      this.onChange(1)
      this.pageNumber = 1
      this.isSearch = true
      if(this.type){
        const length = await getMomentListLength()
        const result = await getMomentList(0,length)
        if(this.searchContent !== ""){
          const searchResult = result.filter(item => {
            if(item.title.includes(this.searchContent)){
              return item
            }
          })
          this.total = searchResult.length
          this.totalResult = searchResult
          this.threeResult()
        }
      } else {
        const token = sessionStorage.getItem("token")
        if(!token){
          alert("请先登录")
          this.$router.push("/login")
        } else {
          const length = await getMomentProfileLength(token)
          const result = await getMomentProfileList(0,length,token)
          if(this.searchContent !== ""){
            const searchResult = result.filter(item => {
              if(item.title.includes(this.searchContent)){
                return item
              }
            })
            this.total = searchResult.length
            this.totalResult = searchResult
            this.threeResult()
          }
        }  
      }
    },
    threeResult(){
      this.result = this.totalResult.slice((this.pageNumber-1)*3,this.pageNumber*3)
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
