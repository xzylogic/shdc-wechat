import { actionTypes } from '../../actions/appointment/doctors.action'
import { initialDoctorsState } from '../../states/appointment/doctors.state'

export const doctorsReducer = (state = initialDoctorsState, action = {}) => {
  switch (action.type) {
    case actionTypes.INIT_DOCTORS_CODE: {
      return {
        ...state,
        ...{hosOrgCode: action.hosOrgCode},
        ...{hosDeptCode: action.hosDeptCode},
        ...{toHosDeptCode: action.toHosDeptCode}
      }
    }
    case actionTypes.UPDATE_DOCTORS_BYNAME:
      let dataN = []
      if (action.data && Array.isArray(action.data)) {
        dataN = action.data
      }
      return {
        ...state,
        ...{doctorsByName: dataN},
      }
    case actionTypes.UPDATE_DOCTORS_BYDATE:
      let dataD = []
      if (action.data && Array.isArray(action.data)) {
        dataD = action.data
      }
      return {
        ...state,
        ...{doctorsByDate: dataD},
      }
    case actionTypes.MODIFY_DOCTORS_SHOW:
      let mData1 = [...state.doctorsByDate]
      mData1[action.i]['doctors'][action.j]['show'] = !mData1[action.i]['doctors'][action.j]['show']
      return {
        ...state,
        ...{doctorsByDate: mData1},
      }
    case actionTypes.MODIFY_DOCTORS_S_SHOW:
      let mData2 = [...state.doctorsByDate]
      mData2[action.i]['doctors'][action.j]['schedules'][action.k]['show'] = !mData2[action.i]['doctors'][action.j]['schedules'][action.k]['show']
      return {
        ...state,
        ...{doctorsByDate: mData2},
      }
    case actionTypes.MODIFY_DOCTORS_SCHEDULE:
      let mData3 = [...state.doctorsByDate]
      mData3[action.i]['doctors'][action.j]['schedules'][action.k]['children'] = action.data
      return {
        ...state,
        ...{doctorsByDate: mData3},
      }
    case actionTypes.UPDATE_DOCTORS_SEARCH_PARAM:
      return {
        ...state,
        ...{searchParam: action.data}
      }
    case actionTypes.UPDATE_DOCTORS_SEARCH:
      return {
        ...state,
        ...{doctorsSearch: action.data}
      }
    default:
      return state
  }
}

export const doctorsState = {
  doctorsReducer: initialDoctorsState
}
