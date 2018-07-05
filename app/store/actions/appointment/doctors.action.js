export const actionTypes = {
  UPDATE_DOCTORS_BYNAME: 'UPDATE_DOCTORS_BYNAME',
  UPDATE_DOCTORS_BYDATE: 'UPDATE_DOCTORS_BYDATE',
  INIT_DOCTORS: 'INIT_DOCTORS',
  INIT_DOCTORS_CODE: 'INIT_DOCTORS_CODE',
  LOAD_DOCTORS_BYDATE: 'LOAD_DOCTORS_BYDATE'
}

export const initDoctorsCode = (hosOrgCode, deptCode) => {
  return {
    type: actionTypes.INIT_DOCTORS_CODE,
    hosOrgCode: hosOrgCode,
    deptCode: deptCode
  }
}

export const loadDoctors = (hosOrgCode, deptCode) => {
  return {
    type: actionTypes.INIT_DOCTORS,
    hosOrgCode: hosOrgCode,
    deptCode: deptCode
  }
}

export const loadDoctorsByDate = (hosOrgCode, deptCode, date) => {
  return {
    type: actionTypes.LOAD_DOCTORS_BYDATE,
    hosOrgCode: hosOrgCode,
    deptCode: deptCode,
    date: date
  }
}

export const updateDoctorsByName = (data) => {
  return {
    type: actionTypes.UPDATE_DOCTORS_BYNAME,
    data: data
  }
}

export const updateDoctorsByDate = (data) => {
  return {
    type: actionTypes.UPDATE_DOCTORS_BYDATE,
    data: data
  }
}
