import Vue from "vue"
import vueRouter from "vue-router"
const Home = () => import("views/home/Home")
const Login = () => import("views/login/Login")
const Register = () => import("views/register/Register")

Vue.use(vueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  }
]

const router = new vueRouter({
  mode: "history",
  routes
})

export default router