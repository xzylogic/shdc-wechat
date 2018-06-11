import React from 'react'
import { connect } from 'react-redux'

class LoginPage extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>Login</div>
    )
  }
}

export default connect(state => state)(LoginPage)
