import request from './network'
import {request_bak} from './network'

export function getMultidata(){
  return  request({
    url:'/home/multidata'
  })
}

export function getGoods(type,page){
  return request_bak({
    url:'/home/data',
    data:{
      type,
      page
    }
  })
}