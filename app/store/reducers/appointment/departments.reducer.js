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
      let dataP = []
      if (action.data && Array.isArray(action.data)) {
        dataP = action.data
      }
      return {
        ...state,
        ...{departmentsParent: dataP},
      }
    case actionTypes.UPDATE_DEPARTMENTS_CHILD:
      let dataC = []
      if (action.data && Array.isArray(action.data)) {
        dataC = action.data
      }
      state.departmentsParent[action.index].children = dataC
      return {
        ...state,
        ...{toHosDeptCode: action.toHosDeptCode},
      }
    default:
      return state
  }
}

export const departmentsState = {
  departmentsReducer: initialDepartmentsState
}
