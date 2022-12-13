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
