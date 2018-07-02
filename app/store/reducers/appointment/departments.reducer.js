import { actionTypes } from '../../actions/departments.action'
import { initialDepartmentsState } from '../../states/departments.state'

export const departmentsReducer = (state = initialDepartmentsState, action = {}) => {
  switch (action.type) {
    case actionTypes.INIT_CODE_AND_TYPE: {
      return {
        ...state,
        ...{hosOrgCode: action.hosOrgCode},
        ...{deptType: action.deptType}
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
      }
    default:
      return state
  }
}

export const departmentsState = {
  departmentsReducer: initialDepartmentsState
}
