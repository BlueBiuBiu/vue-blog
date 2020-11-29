import request from "./request"

export function getMomentList(offset,limit){
  return request({
    url: `/moment`,
    params: {
      offset,
      limit
    }
  })
} 

export function getMomentListLength(){
  return request({
    url: `/moment/total/length`,
  })
} 