<template>
  <div class="article" :style="bgcImg" @click="detail">
    <div class="contain">
      <div class="content">{{content.title}}</div>
      <div class="create">创建时间：{{content.createAt | timeHandle}}</div>
      <div class="update">更新时间：{{content.updateAt | timeHandle}}</div>
      <div class="author">作者：{{content.user.username}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      bgcImg: {
        backgroundImage: "url(" + require('assets/img/'+ this.articlebgc + '.jpg') + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    }
  },
  methods: {
    detail(){
      this.$router.push("/articleDetail")
      this.$store.commit({
        type: "article",
        detail: this.content
      })
    }
  },
  props: {
    content: {
      type: Object,
      default(){
        return {}
      }
    },
    articlebgc: {
      type: String,
      default(){
        return ""
      }
    }
  },
  filters: {
    timeHandle(value){
      return value.split("T")[0]
    }
  },
}
</script>

<style scoped>
  .article {
    width: 600px;
    height: 300px;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 15px;
    margin: 10px 20px;
    color: rgb(16, 229, 233);
    text-align: center;
    font-style: italic;
  }

  .article:hover {
    cursor: pointer;
  }

  .article .contain {
    width: 450px;
    margin: 0 auto;
    position: relative;
    top: 40%;
  }

  .article .content {
    width: 300px;
    font-size: 24px;
    font-weight: 700;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .article .create {
    margin-top: 30px;
    margin-bottom: 5px;
  }

  .article .update {
    margin-bottom: 5px;
  }


</style>
