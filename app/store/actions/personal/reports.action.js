export const actionTypes = {
  LOAD_MY_REPORTS: 'LOAD_MY_REPORTS',
  UPDATE_MY_REPORTS: 'UPDATE_MY_REPORTS',
  UPDATE_REPORTS_PARAM: 'UPDATE_REPORTS_PARAM'
}

export const loadMyReportsAction = () => {
  return {
    type: actionTypes.LOAD_MY_REPORTS
  }
}

export const updateMyReportsAction = (survey, inspection) => {
  return {
    type: actionTypes.UPDATE_MY_REPORTS,
    survey: survey,
    inspection: inspection
  }
}

export const updateReportsParamAction = (data) => {
  return {
    type: actionTypes.UPDATE_REPORTS_PARAM,
    data: data
  }
}
