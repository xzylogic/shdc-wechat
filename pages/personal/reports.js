import React from 'react'

import Head from '../../app/components/Common/Head'
import ReportsComponent from '../../app/components/Personal/ReportsComponent'
import { recordCurrentPage, checkNullArr } from '../../app/utilities/common'
import { loadMyReportsAction } from '../../app/store/actions/personal/reports.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.reportsReducer && checkNullArr(myStore.reportsReducer.reportsSurvey) && checkNullArr(myStore.reportsReducer.reportsInspection)) {
    store.dispatch(loadMyReportsAction())
  }
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
