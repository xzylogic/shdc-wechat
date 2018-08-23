import { actionTypes } from '../../actions/personal/reports.action'
import { initialReportsState } from '../../states/personal/reports.state'

export const reportsReducer = (state = initialReportsState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_MY_REPORTS:
      return {
        ...state,
        ...{ reportsSurvey: action.survey },
        ...{ reportsInspection: action.inspection }
      }
    case actionTypes.UPDATE_REPORTS_PARAM:
      return {
        ...state,
        ...{ searchParam: action.data }
      }
    case actionTypes.UPDATE_REPORT_DETAIL:
      return {
        ...state,
        ...{ reportDetail: action.data }
      }
    default:
      return state
  }
}

export const reportsState = {
  reportsReducer: initialReportsState
}
