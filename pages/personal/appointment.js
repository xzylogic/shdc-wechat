import React from 'react'

import Head from '../../app/components/Common/Head'
import AppointmentComponent from '../../app/components/Personal/AppointmentComponent'

import { recordCurrentPage, checkNullArr } from '../../app/utilities/common'
import { loadAccountListAction } from '../../app/store/actions/personal/account.action'
import { loadMyAppointmentsAction, updateAppointmentParamAction } from '../../app/store/actions/personal/appointment.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.accountReducer && checkNullArr(myStore.accountReducer.accountList)) {
    store.dispatch(loadAccountListAction())
  }
  if (myStore.appointmentReducer && checkNullArr(myStore.appointmentReducer.appointmentList)) {
    store.dispatch(loadMyAppointmentsAction())
  }
}

class Index extends React.Component {

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/appointment`)
    InitFunction(store)
    if (!store.appointmentReducer.searchParam && store.accountReducer.accountList[0]) {
      const param = store.accountReducer.accountList[0]
      store.dispatch(updateAppointmentParamAction(param.medicineCardId || param.cardId))
    }
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-我的预约' />
        <AppointmentComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
