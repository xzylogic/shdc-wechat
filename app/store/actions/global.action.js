export const actionTypes = {
  UPDATE: 'UPDATE',
  CURRENT: 'CURRENT'
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
