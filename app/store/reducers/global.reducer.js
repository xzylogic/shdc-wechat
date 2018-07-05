import { actionTypes } from '../actions/global.action'
import { initialGlobalState } from '../states/global.state'
import * as CODE from '../../utilities/status-code'

export const globalReducer = (state = initialGlobalState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE:
      const {weChatId, accessToken, errorMsg, code} = action.data
      console.log(action.data)
      const returnData = {}
      if (code === CODE.NOT_LOGIN && state.weChatId){
        returnData.code = CODE.NOT_LOGIN
      } else if (accessToken) {
        returnData.code = CODE.SUCCESS
        returnData.accessToken = accessToken
        returnData.weChatId = weChatId || ''
      } else if (weChatId && !accessToken) {
        returnData.code = CODE.NOT_LOGIN
        returnData.weChatId = weChatId
      } else if (!state.weChatId&&!state.accessToken) {
        returnData.code = CODE.ERROR
        returnData.errorMsg = errorMsg || '未知错误'
        returnData.weChatId = ''
        returnData.accessToken = ''
      } else if (!state.weChatId&&!state.accessToken&&!weChatId&&!accessToken) {
        returnData.code = CODE.ERROR
        returnData.errorMsg = errorMsg || '未知错误'
        returnData.weChatId = ''
        returnData.accessToken = ''
      }
      console.log(returnData)
      console.log({
        ...state,
        ...returnData
      })
      return {
        ...state,
        ...returnData
      }
    case actionTypes.CURRENT:
      if(typeof window !== 'undefined') {
        window.localStorage.setItem('currentPage', action.data)
      }
      return {
        ...state,
        ...{currentPage: action.data}
      }
    case actionTypes.GET_CURRENT:
    let currentPage = '/'
      if(typeof window !== 'undefined'){
        currentPage = window.localStorage.getItem('currentPage') || '/'
      }
      return {
        ...state,
        ...{currentPage: currentPage}
      }
    default:
      return state
  }
}

export const globalState = {
  globalReducer: initialGlobalState
}
