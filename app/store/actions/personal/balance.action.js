export const actionTypes = {
  LOAD_BALANCE_DETAIL: 'LOAD_BALANCE_DETAIL',
  UPDATE_BALANCE_DETAIL: 'UPDATE_BALANCE_DETAIL',
  UPDATE_BALANCE_PARAM: 'UPDATE_BALANCE_PARAM'
}

export const loadBalanceDetailAction = () => {
  return {
    type: actionTypes.LOAD_BALANCE_DETAIL
  }
}

export const updateBalanceDetailAction = (data) => {
  return {
    type: actionTypes.UPDATE_BALANCE_DETAIL,
    data: data
  }
}

export const updateBalanceParamAction = (data) => {
  return {
    type: actionTypes.UPDATE_BALANCE_PARAM,
    data: data
  }
}
