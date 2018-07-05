export const actionTypes = {
  INIT_ACCOUNT_INFO: 'INIT_ACCOUNT_INFO',
  UPDATE_ACCOUNT_INFO: 'UPDATE_ACCOUNT_INFO',
  LOAD_ACCOUNT_LIST: 'LOAD_ACCOUNT_LIST',
  UPDATE_ACCOUNT_LIST: 'UPDATE_ACCOUNT_LIST',
  UPDATE_ACCOUNT_DETAIL:'UPDATE_ACCOUNT_DETAIL'
}

export const initAccountInfo = (accessToken) => {
  return {
    type: actionTypes.INIT_ACCOUNT_INFO,
    token: accessToken
  }
}

export const loadAccountList = (accessToken) => {
  return {
    type: actionTypes.LOAD_ACCOUNT_LIST,
    token: accessToken
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
