export const actionTypes = {
  LOAD_WAITING_HOSPITALS: 'LOAD_WAITING_HOSPITALS',
  LOAD_WAITING_SEARCH_HOSPITALS: 'LOAD_WAITING_SEARCH_HOSPITALS',
  UPDATE_WAITING_HOSPITALS: 'UPDATE_WAITING_HOSPITALS',
  UPDATE_WAITING_HOSPITALS_SEARCH: 'UPDATE_WAITING_HOSPITALS_SEARCH',
  UPDATE_WAITING_HOSPITALS_PARAM: 'UPDATE_WAITING_HOSPITALS_PARAM',
  UPDATE_WAITING_HOSPITALS_TAB: 'UPDATE_WAITING_HOSPITALS_TAB',
  UPDATE_WAITING_PAGETYPE: 'UPDATE_WAITING_PAGETYPE',
}

export const loadWaitingHospitalsAction = () => {
  return {
    type: actionTypes.LOAD_WAITING_HOSPITALS
  }
}

export const loadWaitingSearchHospitalsAction = () => {
  return {
    type: actionTypes.LOAD_WAITING_SEARCH_HOSPITALS
  }
}

export const updateWaitingHospitalsAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_HOSPITALS,
    data: data,
  }
}

export const updateWaitingHospitalsSearchAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_HOSPITALS_SEARCH,
    data: data,
  }
}

export const updateWaitingHospitalsParamAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_HOSPITALS_PARAM,
    data: data,
  }
}

export const updateWaitingHospitalsTabAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_HOSPITALS_TAB,
    data: data,
  }
}

export const updateWaitingPageTypeAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_PAGETYPE,
    data: data,
  }
}
