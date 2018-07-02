import { combineReducers } from 'redux'
import { globalReducer, globalState} from './global.reducer'
import { hospitalsReducer, hospitalsState } from './appointment/hospitals.reducer'
import { departmentsReducer, departmentsState } from './appointment/departments.reducer'

export const rootReducer = combineReducers({
  globalReducer,
  hospitalsReducer,
  departmentsReducer
})

export const rootInitialState = {
  ...globalState,
  ...hospitalsState,
  ...departmentsState
}
