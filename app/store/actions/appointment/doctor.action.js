export const actionTypes = {
  INIT_DOCTOR_CODE: 'INIT_DOCTOR_CODE',
  LOAD_DOCTOR_DETAIL: 'LOAD_DOCTOR_DETAIL',
  UPDATE_DOCTOR_DETAIL: 'UPDATE_DOCTOR_DETAIL',
  LOAD_APPOINTMENT_LIST: 'LOAD_APPOINTMENT_LIST',
  UPDATE_APPOINTMENT_LIST: 'UPDATE_APPOINTMENT_LIST',
}

export const initDoctorCodeAction = (data) => {
  return {
    type: actionTypes.INIT_DOCTOR_CODE,
    data: data
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
