import React from 'react'

import Head from '../../app/components/Common/Head'
import WaitingDetailComponent from '../../app/components/Personal/WaitingDetailComponent'
import { recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'
import { loadWaitingContentAction } from '../../app/store/actions/personal/waiting.action'

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/waiting`)
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(loadWaitingContentAction())
  }

  render() {
    return (
      <div>
        <Head title='科室队列-科室详情' />
        <WaitingDetailComponent />
      </div>
    )
  }
}

export default withAuth(Index)
