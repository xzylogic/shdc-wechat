import React from 'react'
import { connect } from 'react-redux'

import { updateState } from '../../app/store/actions/global.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
  }

  render() {
    return (
      <div>Agreement</div>
    )
  }
}

export default connect(state => state)(Index)
