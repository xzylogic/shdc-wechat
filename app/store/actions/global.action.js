export const actionTypes = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_NOT_LOGIN: "AUTH_NOT_LOGIN",
  AUTH_ERROR: 'AUTH_ERROR',
  UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
  GET_CURRENT_PAGE: 'GET_CURRENT_PAGE'
}

/**
 * 验证已登录
 * @param {*} data { weChatId: string, accessToken: string }
 */
export const authLogin = (data) => {
  return {
    type: actionTypes.AUTH_LOGIN,
    data: data
  }
}

/**
 * 验证未登录
 * @param {*} data { weChatId: string }
 */
export const authNotLogin = (data) => {
  return {
    type: actionTypes.AUTH_NOT_LOGIN,
    data: data
  }
}

/**
 * 验证页面出错
 * @param {*} data { errorMsg: string }
 */
export const authError = (data) => {
  return {
    type: actionTypes.AUTH_ERROR,
    data: data
  }
}

/**
 * 更新登录返回页面
 * @param {*} data { currentPage: string }
 */
export const updateCurrentPage = (data) => {
  return {
    type: actionTypes.UPDATE_CURRENT_PAGE,
    data: data
  }
}

/**
 * 从 localStorge 中获取登录返回页面
 */
export const getCurrentPage = () => {
  return {
    type: actionTypes.GET_CURRENT_PAGE
  }
}
