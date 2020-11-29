<template>
  <div class="article">
    <div>{{content.content}}</div>
    <div>{{content.createAt}}</div>
    <div>{{content.updateAt}}</div>
    <div>{{content.user.username}}</div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    content: {
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .article {
    width: 600px;
    height: 300px;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 15px;
    margin: 10px 20px;
    color: #fff;
  }
</style>
