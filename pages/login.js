import React from 'react'
import { connect } from 'react-redux'

import Head from '../app/components/Common/Head'
import LoginComponent from '../app/components/Login/LoginComponent'

class LoginPage extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='用户登录' />
        <LoginComponent />
      </div>
    )
  }
}

export default connect(state => state)(LoginPage)
