import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import ResetSuccessComponent from '../../app/components/Login/ResetSuccessComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='修改密码成功' />
        <ResetSuccessComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
