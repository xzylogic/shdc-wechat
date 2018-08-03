import { combineReducers } from 'redux'
import { globalReducer, globalState} from './global.reducer'
import { hospitalsReducer, hospitalsState } from './appointment/hospitals.reducer'
import { departmentsReducer, departmentsState } from './appointment/departments.reducer'
import { doctorReducer, doctorState } from './appointment/doctor.reducer'
import { doctorsReducer, doctorsState } from './appointment/doctors.reducer'
import { consultationReducer, consultationState } from './appointment/consultation.reducer'
import { detailReducer, detailState } from './appointment/detail.reducer'
import { successReducer, successState } from './appointment/success.reducer'
import { accountReducer, accountState } from './peraonal/account.reducer'

export const rootReducer = combineReducers({
  globalReducer,
  hospitalsReducer,
  departmentsReducer,
  doctorReducer,
  doctorsReducer,
  consultationReducer,
  detailReducer,
  successReducer,
  accountReducer
})

export const rootInitialState = {
  ...globalState,
  ...hospitalsState,
  ...departmentsState,
  ...doctorState,
  ...doctorsState,
  ...consultationState,
  ...detailState,
  ...successState,
  ...accountState
}
