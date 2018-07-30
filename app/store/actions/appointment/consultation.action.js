export const actionTypes = {
  INIT_CONSULTATION_CODE: 'INIT_CONSULTATION_CODE',
  UPDATE_CONSULTATION_LIST: 'UPDATE_CONSULTATION_LIST',
  LOAD_CONSULTATION_LIST: 'LOAD_CONSULTATION_LIST',
  MODIFY_CONSULTATION_SHOW: 'MODIFY_CONSULTATION_SHOW',
  LOAD_CONSULTATION_SCHEDULE: 'LOAD_CONSULTATION_SCHEDULE',
  MODIFY_CONSULTATION_SCHEDULE: 'MODIFY_CONSULTATION_SCHEDULE'
}

export const initConsultationCodeAction = (data) => {
  return {
    type: actionTypes.INIT_CONSULTATION_CODE,
    hosOrgCode: data.hosOrgCode,
    hosDeptCode: data.hosDeptCode,
    toHosDeptCode: data.toHosDeptCode,
    pageType: data.pageType
  }
}

export const loadConsultationListAction = () => {
  return {
    type: actionTypes.LOAD_CONSULTATION_LIST
  }
}

export const updateConsultationList = (data) => {
  return {
    type: actionTypes.UPDATE_CONSULTATION_LIST,
    data: data
  }
}


export const modifyConsultationShow = (j, k) => {
  return {
    type: actionTypes.MODIFY_CONSULTATION_SHOW,
    j: j,
    k: k
  }
}

export const modifyConsultationSchedule = (data, j, k) => {
  return {
    type: actionTypes.MODIFY_CONSULTATION_SCHEDULE,
    data: data,
    j: j,
    k: k
  }
}

export const loadConsultationScheduleAction = (id, j, k) => {
  return {
    type: actionTypes.LOAD_CONSULTATION_SCHEDULE,
    id: id,
    j: j,
    k: k
  }
}