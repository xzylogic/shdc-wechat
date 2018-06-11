import { combineReducers } from 'redux'
import { loginReducer, loginState } from './login/login.reducer'

export const rootReducer = combineReducers({
  loginReducer
})

export const rootInitialState = {
  ...loginState
}
