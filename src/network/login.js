import request from "./request"

export function login(username,password){
  return request({
    url: "/login",
    method: "POST",
    data: {
      username,
      password
    }
  })
}

export function register(username,password){
  return request({
    url: "/register",
    method: "POST",
    data: {
      username,
      password
    }
  })
}