import { actionTypes } from '../../actions/appointment/doctor.action'
import { initialDoctorState } from '../../states/appointment/doctor.state'

export const doctorReducer = (state = initialDoctorState, action = {}) => {
  switch (action.type) {
    // case actionTypes.INIT_CODE_AND_TYPE: {
    //   return {
    //     ...state,
    //     ...{hosOrgCode: action.hosOrgCode},
    //     ...{deptType: action.deptType},
    //     ...{pageType: action.pageType}
    //   }
    // }
    // case actionTypes.UPDATE_DEPARTMENTS_PARENT:
    //   return {
    //     ...state,
    //     ...{departmentsParent: action.data},
    //   }
    // case actionTypes.UPDATE_DEPARTMENTS_CHILD:
    //   return {
    //     ...state,
    //     ...{departmentsChild: action.data},
    //   }
    default:
      return state
  }
}

export const doctorState = {
  doctorReducer: initialDoctorState
}
