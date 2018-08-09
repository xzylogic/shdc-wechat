import React from 'react'

import Head from '../../app/components/Common/Head'
import ResetPasswordComponent from '../../app/components/Personal/ResetPasswordComponent'

import { recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/mine`)
  }

  render() {
    return (
      <div>
        <Head title='修改密码' />
        <ResetPasswordComponent />
      </div>
    )
  }
}

export default withAuth(Index)
