export const actionTypes = {
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
    type: actionTypes.updateAccount,
    data: data
  }
}
