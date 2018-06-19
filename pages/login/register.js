import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RegisterComponent from '../../app/components/Login/RegisterComponent'

class RegisterPage extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
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
