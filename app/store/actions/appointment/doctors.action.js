export const actionTypes = {
  INIT_DOCTORS_CODE: 'INIT_DOCTORS_CODE',
  UPDATE_DOCTORS_BYNAME: 'UPDATE_DOCTORS_BYNAME',
  UPDATE_DOCTORS_BYDATE: 'UPDATE_DOCTORS_BYDATE',
  LOAD_DOCTORS_BYNAME: 'LOAD_DOCTORS_BYNAME',
  LOAD_DOCTORS_BYDATE: 'LOAD_DOCTORS_BYDATE',
  MODIFY_DOCTORS_SHOW: 'MODIFY_DOCTORS_SHOW',
  MODIFY_DOCTORS_S_SHOW: 'MODIFY_DOCTORS_S_SHOW',
  LOAD_SCHEDULE: 'LOAD_SCHEDULE',
  MODIFY_DOCTORS_SCHEDULE: 'MODIFY_DOCTORS_SCHEDULE'
}

export const initDoctorsCodeAction = (data) => {
  return {
    type: actionTypes.INIT_DOCTORS_CODE,
    hosOrgCode: data.hosOrgCode,
    hosDeptCode: data.hosDeptCode,
    toHosDeptCode: data.toHosDeptCode
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

export const modifyDoctorsShow = (i, j) => {
  return {
    type: actionTypes.MODIFY_DOCTORS_SHOW,
    i: i,
    j: j
  }
}

export const modifyDoctorsSShow = (i, j, k) => {
  return {
    type: actionTypes.MODIFY_DOCTORS_S_SHOW,
    i: i,
    j: j,
    k: k
  }
}

export const modifyDoctorsSchedule = (data, i, j, k) => {
  return {
    type: actionTypes.MODIFY_DOCTORS_SCHEDULE,
    data: data,
    i: i,
    j: j,
    k: k
  }
}

export const loadScheduleAction = (id, i, j, k) => {
  return {
    type: actionTypes.LOAD_SCHEDULE,
    id: id,
    i: i,
    j: j,
    k: k
  }
}
