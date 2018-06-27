export const actionTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  RESET_PASSWORD: 'RESET_PASSWORD',
  INIT_ACCOUNT: 'INIT_ACCOUNT',
  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT'
}

export const initAccount = () => {
  return {
    type: actionTypes.INIT_ACCOUNT
  }
}

export const updateAccount = (data) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT,
    data: data
  }
}
