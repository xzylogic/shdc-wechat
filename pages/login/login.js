import React from 'react'
import { connect } from 'react-redux'
import getConfig from 'next/config'

import Head from '../../app/components/Common/Head'
import LoginComponent from '../../app/components/Login/LoginComponent'

class LoginPage extends React.Component {
  static async getInitialProps(ctx) {
    const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()
    console.log(publicRuntimeConfig.appConfig)
    // console.log(ctx)
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
