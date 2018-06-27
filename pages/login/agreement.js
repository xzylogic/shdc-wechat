import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    const {store, query} = props.ctx
  }

  render() {
    return (
      <div>Agreement</div>
    )
  }
}

export default connect(state => state)(Index)
