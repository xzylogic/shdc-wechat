export const actionTypes = {
  UPDATE_SUCCESS_ORDER: 'UPDATE_SUCCESS_ORDER',
  LOAD_SUCCESS_ORDER: 'LOAD_SUCCESS_ORDER'
}

export const updateSuccessOrderAction = (data) => {
  return {
    type: actionTypes.UPDATE_SUCCESS_ORDER,
    data: data
  }
}

export const loadSuccessOrderAction = () => {
  return {
    type: actionTypes.LOAD_SUCCESS_ORDER
  }
}
