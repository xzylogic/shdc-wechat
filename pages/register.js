import React from 'react'
import { connect } from 'react-redux'

class RegisterPage extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>Register</div>
    )
  }
}

export default connect(state => state)(RegisterPage)
