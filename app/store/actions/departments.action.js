export const actionTypes = {
  UPDATE_DEPARTMENTS_PARENT: 'UPDATE_DEPARTMENTS_PARENT',
  UPDATE_DEPARTMENTS_CHILD: 'UPDATE_DEPARTMENTS_CHILD',
  INIT_DEPARTMENTS: 'INIT_DEPARTMENTS',
  INIT_CODE_AND_TYPE: 'INIT_CODE_AND_TYPE',
  LOAD_DEPARTMENTS_CHILD: 'LOAD_DEPARTMENTS_CHILD'
}

export const initCodeAndType = (hosOrgCode, deptType) => {
  return {
    type: actionTypes.INIT_CODE_AND_TYPE,
    hosOrgCode: hosOrgCode,
    deptType: deptType
  }
}

export const loadDepartments = (hosOrgCode, deptType) => {
  return {
    type: actionTypes.INIT_DEPARTMENTS,
    hosOrgCode: hosOrgCode,
    deptType: deptType
  }
}

export const loadDepartmentsChild = (hosOrgCode, deptType, parentId) => {
  return {
    type: actionTypes.LOAD_DEPARTMENTS_CHILD,
    hosOrgCode: hosOrgCode,
    deptType: deptType,
    parentId: parentId
  }
}

export const updateDepartmentsParent = (data) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_PARENT,
    data: data
  }
}

export const updateDepartmentsChild = (data) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_CHILD,
    data: data
  }
}
