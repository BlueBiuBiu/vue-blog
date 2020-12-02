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

export function getMomentProfileList(offset,limit,token){
  return request({
    url: `/moment/profile/list`,
    headers: {
      authorization: `Bearer ${token}`,
    },
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

export function getMomentProfileLength(token){
  return request({
    url: `/moment/profile/length`,
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
} 

export function getDetailMoment(id){
  return request({
    url: `/moment/${id}`
  })
} 