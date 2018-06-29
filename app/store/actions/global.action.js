export const actionTypes = {
  UPDATE: 'UPDATE',
  CURRENT: 'CURRENT',
  GET_CURRENT: 'GET_CURRENT'
}

export const updateState = (data) => {
  return {
    type: actionTypes.UPDATE,
    data: data
  }
}

export const updateCurrent = (data) => {
  return {
    type: actionTypes.CURRENT,
    data: data
  }
}

export const getCurrent = () => {
  return {
    type: actionTypes.GET_CURRENT
  }
}
