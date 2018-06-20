import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import ResetPasswordComponent from '../../app/components/Personal/ResetPasswordComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
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

export default connect(state => state)(Index)
