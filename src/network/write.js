import request from "./request"

export function uploadArticle(title,content,token){
  return request({
    url: `/moment`,
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`
    },
    data: {
      title,
      content
    }
  })
} 

export function uploadComment(content,momentId,commentId=null,token){
  return request({
    url: `/comment`,
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`
    },
    data: {
      content,
      momentId,
      commentId
    }
  })
} 

export function uploadAvatar(token,avatar){
  return request({
    url: `/upload/avatar`,
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    data: avatar
  })
} 


