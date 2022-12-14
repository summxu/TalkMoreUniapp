import store from "@/store";
// 通常可以吧 baseUrl 单独放在一个 js 文件了
export const baseUrl = 'http://im.a6657.tk'

const tempHeade = {}
const AUTH_TOKEN = ["device", "version"];
for (var i = 0; i < AUTH_TOKEN.length; i++) {
  if (uni.getStorageSync(AUTH_TOKEN[i])) {
    tempHeade[AUTH_TOKEN[i]] = uni.getStorageSync(AUTH_TOKEN[i]);
  }
}

export const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + options.url || '',
      method: options.type || 'GET',
      data: options.data || {},
      header: {
        ...options.header,
        ...tempHeade,
        "Authorization": uni.getStorageSync('Authorization') // 暂时不清楚会不会有性能问题
      }
    }).then((res) => {
      if (!res.statusCode) {
        uni.showToast({
          title: '请求失败',
          icon: 'none'
        });
        uni.hideLoading();
        reject('请求失败')
      }
      if (res.statusCode !== 200) {
        uni.showToast({
          title: '请求失败',
          icon: 'none'
        });
        uni.hideLoading();
        reject('请求失败')
      }
      if (res.statusCode == 200) {
        if (res.data.code == 401) { //登录过期
          uni.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none'
          });
          uni.hideLoading();
          store.dispatch('logoutAction', true)
          reject('登录已过期，请重新登录')
        }
        // #ifdef APP-PLUS
        if (res.data.code == 601) { //强制拉起升级
          request({
            url: '/common/getVersion',
            success: (res) => {
              appUpgrade.init({
                titleText: '版本更新' + res.data.data.version,
                packageUrl: res.data.data.url,
                content: res.data.data.content,
                forceUpgrade: true
              });
              appUpgrade.show();
            }
          });
        }
        // #endif
        else if (res.data.code && res.data.code !== 200) { //这里code是自己的服务器正确标识
          uni.showToast({
            title: res.data.msg,
            icon: 'none',
            position: 'top'
          });
          reject(res.data.msg)
        }
        uni.hideLoading();
        resolve(res.data)
      }
      uni.stopPullDownRefresh();
    }).catch(error => {
      uni.showToast({
        title: '网络连接失败┭┮﹏┭┮',
        icon: 'none'
      })
      reject(error)
    })
  });
}

export const get = (url, data, options = {}) => {
  options.type = 'GET';
  options.data = data;
  options.url = url;
  return request(options)
}

export const post = (url, data, options = {}) => {
  options.type = 'POST';
  options.data = data;
  options.url = url;
  return request(options)
}
