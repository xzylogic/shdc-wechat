export const actionTypes = {
  UPDATE_TAB: 'UPDATE_TAB',
  UPDATE_SEARCH_PARAM: 'UPDATE_SEARCH_PARAM',
  UPDATE_SEARCH_LIST: 'UPDATE_SEARCH_LIST',
  UPDATE_HOSPITALS: 'UPDATE_HOSPITALS',
  INIT_HOSPITALS: 'INIT_HOSPITALS',
  GET_SEARCH: 'GET_SEARCH'
}

export const loadHospitals = () => {
  return {
    type: actionTypes.INIT_HOSPITALS
  }
}

export const updateHospitals = (data = [{},{},{},{}]) => {
  return {
    type: actionTypes.UPDATE_HOSPITALS,
    data: data
  }
}