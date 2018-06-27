import { actionTypes } from '../actions/global.action'
import { initialGlobalState } from '../states/global.state'
import * as CODE from '../../utilities/status-code'

export const globalReducer = (state = initialGlobalState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE:
      console.log(action.data)
      const {weChatId, accessToken, errorMsg} = action.data
      const returnData = {}
      if(accessToken) {
        returnData.code = CODE.SUCCESS
        returnData.accessToken = accessToken
      } else if(weChatId && !accessToken) {
        returnData.code = CODE.NOT_LOGIN
        returnData.weChatId = weChatId
      } else if (!state.weChatId&&!state.accessToken) {
        returnData.code = CODE.ERROR
        returnData.errorMsg = errorMsg || '未知错误'
      }
      return {
        ...state,
        ...returnData
      }
    default:
      return state
  }
}

export const globalState = {
  globalReducer: initialGlobalState
}
