export const actionTypes = {
  UPDATE: 'UPDATE'
}

export const updateState = (data) => {
  return {
    type: actionTypes.UPDATE,
    data: data
  }
}
