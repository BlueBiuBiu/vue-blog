<template>
  <div class="article-detail wrap">
    <Nav />
    <div class="title">
      {{articleDetail.title}}
    </div>
    <div class="detail">
      {{articleDetail.content}}
    </div>
    <div class="comment" v-if="comments[0].id">
      <a-comment  v-for="(item,index) in comments" :key="index">
        <span slot="actions" key="comment-nested-reply-to">
          <span class="replyName">回复</span>  
          {{item.commentId | replyName}}
        </span>
        <a slot="author">{{item.user.username}}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">{{item.content}}</p>
        <a-tooltip slot="datetime" :title="moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ moment(item.createTime).format("YYYY-MM-DD")}}</span>
        </a-tooltip>
      </a-comment>
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="submitContent" @change="handleChange" />
        </a-form-item>
        <a-form-item class="btn">
          <a-button html-type="submit" type="primary" @click="handleSubmit">
            提交评论
          </a-button>
        </a-form-item>
        <a-modal
          title="温馨提醒"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel">
          <p>{{ ModalText }}</p>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { uploadComment } from "network/write"
import { getDetailMoment } from "network/home"

import Nav from "components/nav/Nav"

let that;

export default {
  name: '',
  data() {
    return {
      articleDetail: {},
      comments: [],
      labels: [],
      moment,
      submitContent: [],
      userInfo: {},
      ModalText: '请先登录，是否前往登录?',
      visible: false,
      confirmLoading: false,
    }
  },
  components: {
    Nav
  },
  methods: {
    handleChange(e){
      this.submitContent = e.target.value;
    },
    async handleSubmit(){
      if(!this.userInfo.id){
        this.visible = true
      } else {
        const token = sessionStorage.getItem("token")
        await uploadComment(this.submitContent,this.articleDetail.id,token)
        this.$message.success('评论成功!');
        this.submitContent = ""
      }
    },
    handleOk(e) {
      this.$router.push("/login")
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
  beforeCreate(){
    that = this
  },
  filters: {
    replyName(value){
      for(let comment of that.comments){
        if(comment.id == value){
          return comment.user.username
        }
      }
    }
  },
  async created() {
    const momentId = this.$store.state.articleDetail.id
    this.articleDetail = await getDetailMoment(momentId)
    this.comments = this.articleDetail.comments
    this.labels = this.articleDetail.labels
    this.userInfo = this.$store.state.userInfo
  },
  async updated() {
    this.articleDetail = await getDetailMoment(this.articleDetail.id)
    this.comments = this.articleDetail.comments
    this.labels = this.articleDetail.labels
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
    margin-top: 30px;
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

  .comment {
    width: 100%;
    border-radius: 12px;
    color: #000;
    background-color: antiquewhite;
    padding: 50px 70px;
    margin-top: 30px;
    font-size: 17px;
  }

  .comment .replyName {
    margin-right: 5px;
  }

  .btn {
    position: absolute;
    right: 70px;
  }
</style>
