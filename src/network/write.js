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

export function uploadComment(content,momentId,token){
  return request({
    url: `/comment`,
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`
    },
    data: {
      content,
      momentId
    }
  })
} 

