<template>
  <div class="wrap">
    <Nav />
    <div class="write">
      <a-input placeholder="标题~" allow-clear @change="onTitleChange" class="title"/>
      <quill-editor class="content" v-model="content" :options="editorOption"></quill-editor>
      <div class="control">
        <a-button type="primary" class="submit" @click="submit">
          提交
        </a-button>
        <a-button @click="reset">重置</a-button>
      </div>
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
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],     //引用，代码块
            
            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
            [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
            [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
            [{ 'direction': 'rtl' }],             // 文本方向
            
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
            
            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            [{ 'font': [] }],     //字体
            [{ 'align': [] }],    //对齐方式
            
            ['clean'],    //清除字体样式
            // ['image','video']    //上传图片、上传视频
          ]
        },
        placeholder: '请输入正文...'
      }
    }
  },
  components: {
    Nav
  },
  methods: {
    onTitleChange(e){
      this.title = e.target.value
    },
    async submit(){
      if(this.title && this.content){
        const token = sessionStorage.getItem("token")
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
    },
    reset(){
      this.content = ""
    }
  },
}
</script>

<style scoped>
  .write {
    width: 1000px;
    margin: 50px auto;
    padding: 30px 0;
    text-align: center;
    background-color: rgba(0, 0, 0, .4);
  }

  .write .title {
    width: 800px;
    margin-bottom: 30px;
  }

  .write .content {
    width: 800px;
    margin: 0 auto;
    text-align: left;
    background-color: #f5f5f5;
  }

  .write .content >>> .ql-container {
    height: 500px;
  }

  .write .alert {
    width: 800px;
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
