import { actionTypes } from '../../actions/appointment/departments.action'
import { initialDepartmentsState } from '../../states/appointment/departments.state'

export const departmentsReducer = (state = initialDepartmentsState, action = {}) => {
  switch (action.type) {
    case actionTypes.INIT_DEPARTMENTS_CODE: {
      return {
        ...state,
        ...{hosOrgCode: action.hosOrgCode},
        ...{deptType: action.deptType},
        ...{pageType: action.pageType}
      }
    }
    case actionTypes.UPDATE_DEPARTMENTS_PARENT:
      return {
        ...state,
        ...{departmentsParent: action.data},
      }
    case actionTypes.UPDATE_DEPARTMENTS_CHILD:
      return {
        ...state,
        ...{departmentsChild: action.data},
        ...{toHosDeptCode: action.toHosDeptCode},
      }
    default:
      return state
  }
}

export const departmentsState = {
  departmentsReducer: initialDepartmentsState
}
