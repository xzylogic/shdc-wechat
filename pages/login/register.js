import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RegisterComponent from '../../app/components/Login/RegisterComponent'

import { updateState } from '../../app/store/actions/global.action'

class RegisterPage extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
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
