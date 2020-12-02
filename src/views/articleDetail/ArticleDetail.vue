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
      <div>评论区</div>
      <a-comment  v-for="(item,index) in comments" :key="index">
        <span slot="actions" key="comment-nested-reply-to">
          <span class="replyName" @click="reply(item.user.id,index,$event)">回复</span>  
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
        <div slot="content" v-if="index == replyIndex" @click="replyContent">
          <a-form-item>
            <a-textarea :rows="4" :value="replyValue" @change="handleReplyChange" />
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
      submitContent: "",
      replyValue: "",
      userInfo: {},
      ModalText: '请先登录，是否前往登录?',
      visible: false,
      confirmLoading: false,
      replyTo: null,
      replyIndex: -1,
      tempIndex: 0
    }
  },
  components: {
    Nav
  },
  methods: {
    handleChange(e){
      this.submitContent = e.target.values
    },
    handleReplyChange(e){
      this.replyValue = e.target.value
    },
    async handleSubmit(){
      if(!this.userInfo.id && this.submitContent){
        this.visible = true
      } else {
        const token = sessionStorage.getItem("token")
        const submitText = this.submitContent || this.replyValue
        await uploadComment(submitText,this.articleDetail.id,this.replyTo,token)
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
    async reply(commentId,index,e){
      e.stopPropagation()
      this.replyTo = commentId
      this.replyIndex = index
      this.tempIndex = index
    },
    replyContent(e){
      e.stopPropagation()
      this.replyIndex = this.tempIndex
    }
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

document.body.onclick = function() {
  that.replyIndex = -1
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
    background-color: rgb(250, 239, 225);
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
    background-color: rgb(253, 249, 243);
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
