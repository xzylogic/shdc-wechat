import React from 'react'

import Head from '../../app/components/Common/Head'
import AppointmentComponent from '../../app/components/Personal/AppointmentComponent'

import { recordCurrentPage, checkNullArr } from '../../app/utilities/common'
import { loadAccountListAction } from '../../app/store/actions/personal/account.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.accountReducer && checkNullArr(myStore.accountReducer.accountList)) {
    store.dispatch(loadAccountListAction())
  }
}

class Index extends React.Component {

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/appointment`)
    InitFunction(store)
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
