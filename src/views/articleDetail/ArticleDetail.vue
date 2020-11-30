<template>
  <div class="article-detail wrap">
    <div class="title">
      {{articleDetail.title}}
    </div>
    <div class="detail">
      {{articleDetail.content}}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      articleDetail: {}
    }
  },
  created() {
    this.articleDetail = this.$store.state.articleDetail
  },
}
</script>

<style scoped>
  .article-detail {
    color: #fff;
  }

  .title {
    width: 100%;
    font-size: 25px;
    font-weight: 700;
    margin-top: 70px;
    text-align: center;
  }

  .detail {
    width: 100%;
    line-height: 35px;
    border-radius: 12px;
    color: #000;
    background-color: antiquewhite;
    padding: 50px 70px;
    margin-top: 30px;
    font-size: 17px;
    text-indent: 2em;
    word-spacing: 5px;
  }
</style>
