import React from 'react'

import Head from '../../app/components/Common/Head'

import { recordCurrentPage } from '../../app/utilities/common'
import WaitingComponent from '../../app/components/Personal/WaitingComponent'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/waiting`)
  }

  render() {
    return (
      <div>
        <Head title='我的候诊' />
        <WaitingComponent />
      </div>
    )
  }
}

export default withAuth(Index)
