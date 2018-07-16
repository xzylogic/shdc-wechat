export const actionTypes = {
  UPDATE_TAB: 'UPDATE_TAB',
  UPDATE_SEARCH_PARAM: 'UPDATE_SEARCH_PARAM',
  UPDATE_SEARCH_LIST: 'UPDATE_SEARCH_LIST',
  UPDATE_HOSPITALS_ALL: 'UPDATE_HOSPITALS_ALL',
  UPDATE_HOSPITALS_ZH: 'UPDATE_HOSPITALS_ZH',
  UPDATE_HOSPITALS_ZY: 'UPDATE_HOSPITALS_ZY',
  UPDATE_HOSPITALS_ZK: 'UPDATE_HOSPITALS_ZK',
  LOAD_HOSPITALS: 'LOAD_HOSPITALS',
  LOAD_SEARCH: 'LOAD_SEARCH'
}

export const loadHospitalsAction = () => {
  return {
    type: actionTypes.LOAD_HOSPITALS
  }
}

export const loadSearchAction = (data) => {
  return {
    type: actionTypes.LOAD_SEARCH,
    data: data
  }
}

export const updateHospitalsAll = (data) => {
  return {
    type: actionTypes.UPDATE_HOSPITALS_ALL,
    data: data
  }
}

export const updateHospitalsZH = (data) => {
  return {
    type: actionTypes.UPDATE_HOSPITALS_ZH,
    data: data
  }
}

export const updateHospitalsZY = (data) => {
  return {
    type: actionTypes.UPDATE_HOSPITALS_ZY,
    data: data
  }
}

export const updateHospitalsZK = (data) => {
  return {
    type: actionTypes.UPDATE_HOSPITALS_ZK,
    data: data
  }
}

export const updateTab = (data) => {
  return {
    type: actionTypes.UPDATE_TAB,
    data: data
  }
}

export const updateSearchParam = (data) => {
  return {
    type: actionTypes.UPDATE_SEARCH_PARAM,
    data: data
  }
}

export const updateSearchList = (data) => {
  return {
    type: actionTypes.UPDATE_SEARCH_LIST,
    data: data
  }
}

