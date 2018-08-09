import React from 'react'

import Head from '../../app/components/Common/Head'
import SuccessComponent from '../../app/components/Appointment/SuccessComponent'

import { recordCurrentPage, checkNullObj } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'
import { loadSuccessOrderAction } from '../../app/store/actions/appointment/success.action'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.successReducer && checkNullObj(myStore.successReducer.orderDetail)) {
    store.dispatch(loadSuccessOrderAction())
  }
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, `/appointment/success`)
    InitFunction(store)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-预约成功' />
        <SuccessComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
