export const actionTypes = {
  UPDATE_DEPARTMENTS_PARENT: 'UPDATE_DEPARTMENTS_PARENT',
  UPDATE_DEPARTMENTS_CHILD: 'UPDATE_DEPARTMENTS_CHILD',
  LOAD_DEPARTMENTS: 'LOAD_DEPARTMENTS',
  INIT_DEPARTMENTS_CODE: 'INIT_DEPARTMENTS_CODE',
  LOAD_DEPARTMENTS_CHILD: 'LOAD_DEPARTMENTS_CHILD',
  UPDATE_DEPARTMENTS_PARAM: 'UPDATE_DEPARTMENTS_PARAM',
  LOAD_DEPARTMENTS_SEARCH: 'LOAD_DEPARTMENTS_SEARCH',
  UPDATE_DEPARTMENTS_SEARCH: 'UPDATE_DEPARTMENTS_SEARCH',
}

export const initDepartmentsCodeAction = (data) => {
  return {
    type: actionTypes.INIT_DEPARTMENTS_CODE,
    hosOrgCode: data.hosOrgCode,
    deptType: data.deptType,
    pageType: data.pageType
  }
}

export const loadDepartmentsAction = () => {
  return {
    type: actionTypes.LOAD_DEPARTMENTS
  }
}

export const loadDepartmentsChildAction = (parentId, index) => {
  return {
    type: actionTypes.LOAD_DEPARTMENTS_CHILD,
    parentId: parentId,
    index: index
  }
}

export const updateDepartmentsParent = (data) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_PARENT,
    data: data
  }
}

export const updateDepartmentsChild = (data, toHosDeptCode, index) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_CHILD,
    data: data,
    toHosDeptCode: toHosDeptCode,
    index: index
  }
}

export const updateDepartmentsParamAction = (data) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_PARAM,
    data: data
  }
}

export const loadDepartmentsSearchAction = () => {
  return {
    type: actionTypes.LOAD_DEPARTMENTS_SEARCH
  }
}

export const updateDepartmentsSearchAction = (data) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_SEARCH,
    data: data
  }
}
