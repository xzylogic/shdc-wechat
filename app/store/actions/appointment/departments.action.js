export const actionTypes = {
  UPDATE_DEPARTMENTS_PARENT: 'UPDATE_DEPARTMENTS_PARENT',
  UPDATE_DEPARTMENTS_CHILD: 'UPDATE_DEPARTMENTS_CHILD',
  LOAD_DEPARTMENTS: 'LOAD_DEPARTMENTS',
  INIT_DEPARTMENTS_CODE: 'INIT_DEPARTMENTS_CODE',
  LOAD_DEPARTMENTS_CHILD: 'LOAD_DEPARTMENTS_CHILD'
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

export const loadDepartmentsChildAction = (parentId) => {
  return {
    type: actionTypes.LOAD_DEPARTMENTS_CHILD,
    data: parentId
  }
}

export const updateDepartmentsParent = (data) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_PARENT,
    data: data
  }
}

export const updateDepartmentsChild = (data, toHosDeptCode) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_CHILD,
    data: data,
    toHosDeptCode: toHosDeptCode
  }
}
