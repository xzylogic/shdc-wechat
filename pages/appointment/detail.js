import React from 'react'

import Head from '../../app/components/Common/Head'
import DetailComponent from '../../app/components/Appointment/DetailComponent'

import { recordCurrentPage, checkNullArr, checkNullObj } from '../../app/utilities/common'
import { loadAccountListAction, loadAccountInfoAction } from '../../app/store/actions/personal/account.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = async (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (checkNullArr(myStore.accountReducer.accountList)) {
    await store.dispatch(loadAccountListAction())
  }
  if (checkNullObj(myStore.accountReducer.accountInfo)) {
    await store.dispatch(loadAccountInfoAction())
  }
}

class Index extends React.Component {
  
  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, '/appointment/detail')
    InitFunction(store)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-预约信息' />
        <DetailComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
