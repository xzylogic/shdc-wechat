export const actionTypes = {
  UPDATE_DEPARTMENTS_PARENT: 'UPDATE_DEPARTMENTS_PARENT',
  UPDATE_DEPARTMENTS_CHILD: 'UPDATE_DEPARTMENTS_CHILD',
  INIT_DEPARTMENTS: 'INIT_DEPARTMENTS',
  INIT_CODE_AND_TYPE: 'INIT_CODE_AND_TYPE',
  LOAD_DEPARTMENTS_CHILD: 'LOAD_DEPARTMENTS_CHILD'
}

export const initCodeAndType = (hosOrgCode, deptType, pageType) => {
  return {
    type: actionTypes.INIT_CODE_AND_TYPE,
    hosOrgCode: hosOrgCode,
    deptType: deptType,
    pageType: pageType
  }
}
