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
