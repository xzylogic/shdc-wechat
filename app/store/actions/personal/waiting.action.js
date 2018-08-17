export const actionTypes = {
  UPDATE_WAITING_PAGETYPE: 'UPDATE_WAITING_PAGETYPE',
  LOAD_WAITING_HOSPITALS: 'LOAD_WAITING_HOSPITALS',
  UPDATE_WAITING_HOSPITALS: 'UPDATE_WAITING_HOSPITALS',
  UPDATE_WAITING_HOSPITALS_PARAM: 'UPDATE_WAITING_HOSPITALS_PARAM',
  UPDATE_WAITING_HOSPITALS_TAB: 'UPDATE_WAITING_HOSPITALS_TAB',
  LOAD_WAITING_MINE: 'LOAD_WAITING_MINE',
  UPDATE_WAITING_MINE: 'UPDATE_WAITING_MINE',
  UPDATE_WAITING_MINE_PARAM: 'UPDATE_WAITING_MINE_PARAM',
  LOAD_WAITING_DEPARTMENTS: 'LOAD_WAITING_DEPARTMENTS',
  UPDATE_WAITING_DEPARTMENTS: 'UPDATE_WAITING_DEPARTMENTS',
  UPDATE_WAITING_DEPARTMENTS_PARAM: 'UPDATE_WAITING_DEPARTMENTS_PARAM',
  LOAD_WAITING_CONTENT: 'LOAD_WAITING_CONTENT',
  UPDATE_WAITING_CONTENT: 'UPDATE_WAITING_CONTENT'
}

export const updateWaitingPageTypeAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_PAGETYPE,
    data: data,
  }
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

export const loadWaitingMineAction = (hosOrgCode) => {
  return {
    type: actionTypes.LOAD_WAITING_MINE,
    hosOrgCode: hosOrgCode
  }
}

export const updateWaitingMineAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_MINE,
    data: data
  }
}

export const updateWaitingMineParamAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_MINE_PARAM,
    data: data
  }
}

export const loadWaitingDepartmentsAction = () => {
  return {
    type: actionTypes.LOAD_WAITING_DEPARTMENTS
  }
}

export const updateWaitingDepartmentsAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_DEPARTMENTS,
    data: data
  }
}

export const updateWaitingDepartmentsParamAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_DEPARTMENTS_PARAM,
    data: data
  }
}

export const loadWaitingContentAction = () => {
  return {
    type: actionTypes.LOAD_WAITING_CONTENT
  }
}

export const updateWaitingContentAction = (data) => {
  return {
    type: actionTypes.UPDATE_WAITING_CONTENT,
    data: data
  }
}
