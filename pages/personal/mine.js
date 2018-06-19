import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import AccountComponent from '../../app/components/Personal/AccountComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='用户列表' />
        <AccountComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
