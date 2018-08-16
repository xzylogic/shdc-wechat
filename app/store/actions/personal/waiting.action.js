export const actionTypes = {
  LOAD_WAITING_HOSPITALS: 'LOAD_WAITING_HOSPITALS',
  UPDATE_WAITING_HOSPITALS: 'UPDATE_WAITING_HOSPITALS',
  UPDATE_WAITING_HOSPITALS_PARAM: 'UPDATE_WAITING_HOSPITALS_PARAM',
  UPDATE_WAITING_HOSPITALS_TAB: 'UPDATE_WAITING_HOSPITALS_TAB',
  UPDATE_WAITING_PAGETYPE: 'UPDATE_WAITING_PAGETYPE',
  UPDATE_WAITING_MINE_PARAM: 'UPDATE_WAITING_MINE_PARAM',
  UPDATE_WAITING_MINE: 'UPDATE_WAITING_MINE',
  LOAD_WAITING_MINE: 'LOAD_WAITING_MINE'
}

export const loadWaitingHospitalsAction = () => {
  return {
    type: actionTypes.LOAD_WAITING_HOSPITALS
  }
}

export const updateWaitingHospitalsAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_HOSPITALS,
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

export const updateWaitingMineParamAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_MINE_PARAM,
    data: data
  }
}

export const updateWaitingMineAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_MINE,
    data: data
  }
}

export const loarWaitingMineAction = () => {
  return {
    type: actionTypes.LOAD_WAITING_MINE
  }
}
