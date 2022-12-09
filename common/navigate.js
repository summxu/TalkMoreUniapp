import store from '@/store/index.js'

export const navigateTo = (params) => {
  const userInfo = store.getters.getUserInfo
  if (userInfo) {
    uni.navigateTo(params)
  } else {
    uni.redirectTo({ url: '/pages/login/login' })
  }
}

export const redirectTo = (params) => {
  const userInfo = store.getters.getUserInfo
  if (userInfo) {
    uni.redirectTo(params)
  } else {
    uni.redirectTo({ url: '/pages/login/login' })
  }
}

export const reLaunch = (params) => {
  const userInfo = store.getters.getUserInfo
  if (userInfo) {
    uni.reLaunch(params)
  } else {
    uni.redirectTo({ url: '/pages/login/login' })
  }
}

export const switchTab = (params) => {
  const userInfo = store.getters.getUserInfo
  if (userInfo) {
    uni.switchTab(params)
  } else {
    uni.redirectTo({ url: '/pages/login/login' })
  }
}

export const navigateBack = (params) => {
  const userInfo = store.getters.getUserInfo
  if (userInfo) {
    uni.navigateBack(params)
  } else {
    uni.redirectTo({ url: '/pages/login/login' })
  }
}

export const preloadPage = (params) => {
  const userInfo = store.getters.getUserInfo
  if (userInfo) {
    uni.preloadPage(params)
  } else {
    uni.redirectTo({ url: '/pages/login/login' })
  }
}
