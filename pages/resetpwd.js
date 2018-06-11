import React from 'react'
import { connect } from 'react-redux'

class ResetPwdPage extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>Reset Password</div>
    )
  }
}

export default connect(state => state)(ResetPwdPage)
