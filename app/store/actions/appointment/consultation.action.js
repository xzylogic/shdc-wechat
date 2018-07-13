export const actionTypes = {
  INIT_CONSULTATION_CODE: 'INIT_CONSULTATION_CODE',
  UPDATE_CONSULTATION_LIST: 'UPDATE_CONSULTATION_LIST',
  LOAD_CONSULTATION_LIST: 'LOAD_CONSULTATION_LIST'
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
