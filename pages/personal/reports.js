import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import ReportsComponent from '../../app/components/Personal/ReportsComponent'
import { recordCurrentPage, checkNullArr } from '../../app/utilities/common'
import { loadAccountListAction } from '../../app/store/actions/personal/account.action'
import { loadMyReportsAction } from '../../app/store/actions/personal/reports.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.accountReducer && checkNullArr(myStore.accountReducer.accountList)) {
    store.dispatch(loadAccountListAction())
  }
  store.dispatch(loadMyReportsAction())
}

class Index extends React.Component {

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/reports`)
    InitFunction(store)
  }

  render() {
    return (
      <div>
        <Head title='我的报告' />
        <ReportsComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
