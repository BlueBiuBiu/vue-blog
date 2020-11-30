import Vue from "vue"
import vuex from "vuex"
import mutations from "./mutations.js"
import getters from './getters'
import actions from './actions'
import moduleA from './modules/moduleA'

Vue.use(vuex)

const state = {
  userInfo: {},
  articleDetail: {}
}

const store = new vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    A: moduleA
  }
})

export default store