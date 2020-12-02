import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from "./router"
import store from "store"
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = sessionStorage.getItem("token")
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  } 
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
