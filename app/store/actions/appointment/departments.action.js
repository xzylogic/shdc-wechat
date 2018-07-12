export const actionTypes = {
  UPDATE_DEPARTMENTS_PARENT: 'UPDATE_DEPARTMENTS_PARENT',
  UPDATE_DEPARTMENTS_CHILD: 'UPDATE_DEPARTMENTS_CHILD',
  LOAD_DEPARTMENTS: 'LOAD_DEPARTMENTS',
  INIT_CODE_AND_TYPE: 'INIT_CODE_AND_TYPE',
  LOAD_DEPARTMENTS_CHILD: 'LOAD_DEPARTMENTS_CHILD'
}

export const initCodeAndTypeAction = (hosOrgCode, deptType, pageType) => {
  return {
    type: actionTypes.INIT_CODE_AND_TYPE,
    hosOrgCode: hosOrgCode,
    deptType: deptType,
    pageType: pageType
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

export const updateDepartmentsChild = (data) => {
  return {
    type: actionTypes.UPDATE_DEPARTMENTS_CHILD,
    data: data
  }
}
