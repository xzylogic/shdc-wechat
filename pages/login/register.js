import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
  
import Head from '../../app/components/Common/Head'
import RegisterComponent from '../../app/components/Login/RegisterComponent'

import { initGlobalQuery } from '../../app/utilities/common';

class RegisterPage extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  render() {
    return (
      <div>
        <Head title='注册账号' />
        <RegisterComponent />
      </div>
    )
  }
}

export default connect(state => state)(RegisterPage)
