import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>Register</div>
    )
  }
}

export default connect(state => state)(Index)
