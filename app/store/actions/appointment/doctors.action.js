export const actionTypes = {
  INIT_DOCTORS_CODE: 'INIT_DOCTORS_CODE',
  UPDATE_DOCTORS_BYNAME: 'UPDATE_DOCTORS_BYNAME',
  UPDATE_DOCTORS_BYDATE: 'UPDATE_DOCTORS_BYDATE',
  LOAD_DOCTORS_BYNAME: 'LOAD_DOCTORS_BYNAME',
  LOAD_DOCTORS_BYDATE: 'LOAD_DOCTORS_BYDATE'
}

export const initDoctorsCodeAction = (hosOrgCode, hosDeptCode, toHosDeptCode) => {
  return {
    type: actionTypes.INIT_DOCTORS_CODE,
    hosOrgCode: hosOrgCode,
    hosDeptCode: hosDeptCode,
    toHosDeptCode: toHosDeptCode
  }
}

export const loadDoctorsByNameAction = () => {
  return {
    type: actionTypes.LOAD_DOCTORS_BYNAME,
  }
}

export const loadDoctorsByDateAction = () => {
  return {
    type: actionTypes.LOAD_DOCTORS_BYDATE,
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
