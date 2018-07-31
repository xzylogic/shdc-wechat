export const actionTypes = {
  UPDATE_ORDER_INFO: 'UPDATE_ORDER_INFO',
  STORE_ORDER_INFO: 'STORE_ORDER_INFO',
  GET_ORDER_INFO: 'GET_ORDER_INFO',
  SUBMIT_ORDER: 'SUBMIT_ORDER'
}

export const updateOrderInfoAction = (data) => {
  return {
    type: actionTypes.UPDATE_ORDER_INFO,
    data: data
  }
}

export const storeOrderInfoAction = (data) => {
  return {
    type: actionTypes.STORE_ORDER_INFO,
    data: data
  }
}

export const getOrderInfoAction = () => {
  return {
    type: actionTypes.GET_ORDER_INFO
  }
}

export const submitOrderAction = (data) => {
  return {
    type: actionTypes.SUBMIT_ORDER,
    data: data
  }
}
