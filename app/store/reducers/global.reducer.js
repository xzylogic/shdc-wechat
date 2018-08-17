import { actionTypes } from '../actions/global.action'
import { initialGlobalState } from '../states/global.state'
import * as CODE from '../../utilities/status-code'

export const globalReducer = (state = initialGlobalState, action = {}) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN: 
      return {
        ...state,
        ...{ authState: true },
        ...action.data
      }
    case actionTypes.AUTH_NOT_LOGIN: 
      return {
        ...state,
        ...{ authState: false},
        ...action.data
      }
    case actionTypes.AUTH_ERROR: 
      return {
        ...state,
        ...{ code: CODE.ERROR },
        ...action.data
      }
    case actionTypes.UPDATE_CURRENT_PAGE:
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('currentPage', action.data)
      }
      return {
        ...state,
        ...{currentPage: action.data}
      }
    case actionTypes.GET_CURRENT_PAGE:
      let currentPage = '/'
      if (typeof window !== 'undefined'){
        currentPage = window.localStorage.getItem('currentPage') || '/'
      }
      return {
        ...state,
        ...{currentPage: currentPage}
      }
    case actionTypes.UPDATE_QUERY:
      return {
        ...state,
        ...{query: action.data}
      }
    default:
      return state
  }
}

export const globalState = {
  globalReducer: initialGlobalState
}
