<template>
  <div class="wrap">
    <Nav />
    <div class="write">
      <form action="">
        <a-input placeholder="标题~" allow-clear @change="onTitleChange" class="title"/>
        <a-textarea placeholder="写你所想~" :rows="20"  allow-clear class="content" @change="onContentChange"/>
        <div class="control">
          <a-button type="primary" class="submit" @click="submit">
            提交
          </a-button>
          <a-button>重置</a-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from "components/nav/Nav"
import { uploadArticle } from "network/write"

export default {
  name: '',
  data() {
    return {
      title: "",
      content: ""
    }
  },
  components: {
    Nav
  },
  methods: {
    onTitleChange(e){
      this.title = e.target.value
    },
    onContentChange(e){
      this.content = e.target.value
    },
    async submit(){
      if(this.title && this.content){
        const token = localStorage.getItem("token")
        if(!token){
          alert("请先登录")
          this.$router.push("/login")
        } else {
          const result = await uploadArticle(this.title,this.content,token)
          this.$message.success('上传成功啦!');
          this.$router.replace("/home")
        }
      } else {
        this.$message.error('标题和内容不能为空喔!');
      }
    }
  },
}
</script>

<style scoped>
  .write {
    width: 800px;
    margin: 50px auto;
    text-align: center;
    padding: 30px 0;
    background-color: rgba(0, 0, 0, .4);
  }

  .write .title {
    width: 500px;
    margin-bottom: 30px;
  }

  .write .content {
    width: 500px;
  }

  .write .alert {
    width: 500px;
    margin: 0 auto;
  }

  .write .control {
    width: 500px;
    margin: 10px auto;
    display: flex;
    justify-content: flex-end;
  }

  .write .control .submit {
    margin-right: 10px;
  }
</style>
