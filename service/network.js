import {baseUrl,baseUrl_bak} from './config'

export default function request(option) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl+option.url,
      method: option.method || 'get',
      data: option.data || {},
      success: resolve,
      fail: reject
    })
  })
}

export function request_bak(option) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl_bak+option.url,
      method: option.method || 'get',
      data: option.data || {},
      success: resolve,
      fail: reject
    })
  })
}