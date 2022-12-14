import { request, baseUrl } from './request.js'
// 上传
export function upload (url, data) {
  return new Promise((resolve, reject) => {
    let a = uni.uploadFile({
      url: baseUrl + '/system/oss/uploadFile',
      filePath: url,
      name: 'file',
      header: {
        'x-api-key': store.getters.getToken
      },
      formData: data,
      success: (res) => {
        resolve(JSON.parse(res.data))
      }
    });
  })
}

// 发送短信验证码 
export function sendCode (data) {
  return request({
    url: `/auth/sendCode`,
    type: 'POST',
    data
  })
}

// 获取在线协议
export function getAgreement () {
  return request({
    url: `/common/getAgreement`,
    type: 'GET'
  })
}

// 手机号密码登录
export function login (data) {
  return request({
    url: `/auth/login`,
    type: 'POST',
    data
  })
}

// 手机号验证码登录
export function loginByCode (data) {
  return request({
    url: `/auth/loginByCode`,
    type: 'POST',
    data
  })
}

// 音视频通话初始化
export function trtcGetSign (data) {
  return request({
    url: `/trtc/getSign`,
    type: 'POST',
    data
  })
}

// 获取用户信息
export function getInfo () {
  return request({
    url: `/my/getInfo`,
    type: 'GET'
  })
}

// 退出登录
export function logout () {
  return request({
    url: `/my/logout`,
    type: 'GET'
  })
}
