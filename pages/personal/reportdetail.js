import React from 'react'

import Head from '../../app/components/Common/Head'
import ReportDetailComponent from '../../app/components/Personal/ReportDetailComponent'
import { recordCurrentPage } from '../../app/utilities/common'
import { loadReportDetailAction } from '../../app/store/actions/personal/reports.action'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    const { router } = this.props
    recordCurrentPage(store, `/personal/reports`)
    const url = router.query.url || router.asPath.split('=')[1]
    if (router && router.query && url) {
      store.dispatch(loadReportDetailAction(url))
    }
  }

  render() {
    return (
      <div>
        <Head title='我的报告' />
        <ReportDetailComponent />
      </div>
    )
  }
}

export default withAuth(Index)
