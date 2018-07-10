export const actionTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  GET_CODE: 'GET_CODE',
  RESET_PASSWORD: 'RESET_PASSWORD',
  UPDATE_CODE: 'UPDATE_CODE',
  GETBACK_PASSWORD: 'GETBACK_PASSWORD'
}

/**
 * 登录
 * @param {*} data 
 */
export const loginAction = (data) => {
  return {
    type: actionTypes.LOGIN,
    data: data
  }
}

/**
 * 注册
 * @param {*} data 
 */
export const registerAction = (data) => {
  return {
    type: actionTypes.REGISTER,
    data: data
  }
}

/**
 * 获取验证码
 * @param {*} data { mobile: string }
 */
export const getCodeAction = (data) => {
  return {
    type: actionTypes.GET_CODE,
    data: data
  }
}

export const getbackPasswordAction = (data) => {
  return {
    type: actionTypes.GETBACK_PASSWORD,
    data: data
  }
}
