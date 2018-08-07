export const actionTypes = {
  LOAD_MY_APPOINTMENTS: 'LOAD_MY_APPOINTMENTS',
  UPDATE_MY_APPOINTMENTS: 'UPDATE_MY_APPOINTMENTS',
  UPDATE_APPOINTMENT_PARAM: 'UPDATE_APPOINTMENT_PARAM',
  CANCEL_APPOINTMENT: 'CANCEL_APPOINTMENT'
}

export const loadMyAppointmentsAction = () => {
  return {
    type: actionTypes.LOAD_MY_APPOINTMENTS
  }
}

export const updateMyAppointmentsAction = (data) => {
  return {
    type: actionTypes.UPDATE_MY_APPOINTMENTS,
    data: data
  }
}

export const updateAppointmentParamAction = (data) => {
  return {
    type: actionTypes.UPDATE_APPOINTMENT_PARAM,
    data: data
  }
}

export const cancelAppointmentAction = (data) => {
  return {
    type: actionTypes.CANCEL_APPOINTMENT,
    data: data
  }
}
