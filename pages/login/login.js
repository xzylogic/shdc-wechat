import React from 'react'
import { connect } from 'react-redux'
import getConfig from 'next/config'

import Head from '../../app/components/Common/Head'
import LoginComponent from '../../app/components/Login/LoginComponent'

import { updateState } from '../../app/store/actions/global.action'

class LoginPage extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
    const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()
    console.log(publicRuntimeConfig.appConfig)
    console.log(query.weChatId)
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
