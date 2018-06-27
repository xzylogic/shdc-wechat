import { combineReducers } from 'redux'
import { loginReducer, loginState } from './login/login.reducer'
import { globalReducer, globalState} from './global.reducer'

export const rootReducer = combineReducers({
  globalReducer,
  loginReducer
})

export const rootInitialState = {
  ...globalState,
  ...loginState
}
