import React from 'react'
import { connect } from 'react-redux'
import ResetPasswordComponent from '../../app/components/Login/ResetPasswordComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <ResetPasswordComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
