import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000
})

instance.interceptors.request.use(res => {
  return res
},err => {
  console.log(err);
})

instance.interceptors.response.use(res => {
  return res.data
},err => {
  console.log(err);
})

export default instance