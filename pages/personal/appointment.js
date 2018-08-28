import React from 'react'

import Head from '../../app/components/Common/Head'
import AppointmentComponent from '../../app/components/Personal/AppointmentComponent'

import { recordCurrentPage, checkNullArr, checkNotNullArr } from '../../app/utilities/common'
import { loadAccountListAction } from '../../app/store/actions/personal/account.action'
import { loadMyAppointmentsAction, updateAppointmentParamAction } from '../../app/store/actions/personal/appointment.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = async (store) => {
  let myStore = await 'function' === typeof store.getState ? store.getState() : store
  if (myStore.accountReducer && checkNullArr(myStore.accountReducer.accountList)) {
    await store.dispatch(loadAccountListAction())
  }
  if (myStore.appointmentReducer && checkNullArr(myStore.appointmentReducer.appointmentList)) {
    await store.dispatch(loadMyAppointmentsAction())
  }
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/appointment`)
    InitFunction(store)
  }

  componentDidMount() {
    const store = this.props
    if (!store.appointmentReducer.searchParam && checkNotNullArr(store.accountReducer.accountList)) {
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
