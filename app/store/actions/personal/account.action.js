export const actionTypes = {
  LOAD_ACCOUNT_INFO: 'LOAD_ACCOUNT_INFO',
  UPDATE_ACCOUNT_INFO: 'UPDATE_ACCOUNT_INFO',
  LOAD_ACCOUNT_LIST: 'LOAD_ACCOUNT_LIST',
  UPDATE_ACCOUNT_LIST: 'UPDATE_ACCOUNT_LIST',
  UPDATE_ACCOUNT_DETAIL:'UPDATE_ACCOUNT_DETAIL',
  RESET_PASSWORD: 'RESET_PASSWORD'
}

export const loadAccountInfoAction = () => {
  return {
    type: actionTypes.LOAD_ACCOUNT_INFO
  }
}

export const loadAccountListAction = () => {
  return {
    type: actionTypes.LOAD_ACCOUNT_LIST
  }
}

export const updateAccountInfo = (data) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_INFO,
    data: data
  }
}

export const updateAccountList = (data) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_LIST,
    data: data
  }
}

export const updateAccountDetail = (data) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_DETAIL,
    data: data
  }
}

export const resetPasswordAction = (data) => {
  return {
    type: actionTypes.RESET_PASSWORD,
    data: data
  }
}
