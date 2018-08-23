export const actionTypes = {
  LOAD_MY_REPORTS: 'LOAD_MY_REPORTS',
  UPDATE_MY_REPORTS: 'UPDATE_MY_REPORTS',
  UPDATE_REPORTS_PARAM: 'UPDATE_REPORTS_PARAM',
  LOAD_REPORT_DETAIL: 'LOAD_REPORT_DETAIL',
  UPDATE_REPORT_DETAIL: 'UPDATE_REPORT_DETAIL'
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

export const loadReportDetailAction = (url) => {
  return {
    type: actionTypes.LOAD_REPORT_DETAIL,
    url: url
  }
}

export const updateReportDetailAction = (data) => {
  return {
    type: actionTypes.UPDATE_REPORT_DETAIL,
    data: data
  }
}
