export const actionTypes = {
  INIT_DOCTOR_CODE: 'INIT_DOCTOR_CODE',
  LOAD_DOCTOR_DETAIL: 'LOAD_DOCTOR_DETAIL',
  UPDATE_DOCTOR_DETAIL: 'UPDATE_DOCTOR_DETAIL',
  LOAD_APPOINTMENT_LIST: 'LOAD_APPOINTMENT_LIST',
  UPDATE_APPOINTMENT_LIST: 'UPDATE_APPOINTMENT_LIST',
  MODIFY_DOCTOR_SHOW: 'MODIFY_DOCTOR_SHOW',
  LOAD_DOCTOR_SCHEDULE: 'LOAD_DOCTOR_SCHEDULE',
  MODIFY_DOCTOR_SCHEDULE: 'MODIFY_DOCTOR_SCHEDULE'
}

export const initDoctorCodeAction = (data) => {
  return {
    type: actionTypes.INIT_DOCTOR_CODE,
    hosDoctCode: data.hosDoctCode,
    hosOrgCode: data.hosOrgCode,
    hosDeptCode: data.hosDeptCode,
    toHosDeptCode: data.toHosDeptCode
  }
}

export const loadDoctorDetailAction = () => {
  return {
    type: actionTypes.LOAD_DOCTOR_DETAIL
  }
}

export const loadAppointmentListAction = () => {
  return {
    type: actionTypes.LOAD_APPOINTMENT_LIST
  }
}

export const updateDoctorDetail = (data) => {
  return {
    type: actionTypes.UPDATE_DOCTOR_DETAIL,
    data: data
  }
}

export const updateAppointmentList = (data) => {
  return {
    type: actionTypes.UPDATE_APPOINTMENT_LIST,
    data: data
  }
}

export const modifyDoctorShow = (j, k) => {
  return {
    type: actionTypes.MODIFY_DOCTOR_SHOW,
    j: j,
    k: k
  }
}

export const modifyDoctorSchedule = (data, j, k) => {
  return {
    type: actionTypes.MODIFY_DOCTOR_SCHEDULE,
    data: data,
    j: j,
    k: k
  }
}

export const loadDoctorScheduleAction = (id, j, k) => {
  return {
    type: actionTypes.LOAD_DOCTOR_SCHEDULE,
    id: id,
    j: j,
    k: k
  }
}
