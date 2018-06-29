import { combineReducers } from 'redux'
import { globalReducer, globalState} from './global.reducer'
import { hospitalsReducer, hospitalsState } from './appointment/hospitals.reducer'

export const rootReducer = combineReducers({
  globalReducer,
  hospitalsReducer
})

export const rootInitialState = {
  ...globalState,
  ...hospitalsState
}
