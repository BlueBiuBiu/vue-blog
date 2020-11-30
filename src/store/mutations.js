export default {
  userInfo(state,payload){
    state.userInfo = payload
  },
  article(state,payload){
    state.articleDetail = payload.detail
  }
}