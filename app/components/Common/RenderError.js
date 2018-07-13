import React from 'react'
import { connect } from 'react-redux'

import PageError from './PageError'
import * as CODE from '../../utilities/status-code'

/**
 * 统一 render page without login方法
 */
class Index extends React.Component {
  render() {
    const {globalReducer} = this.props
    switch (globalReducer.code) {
      case CODE.ERROR:
        return (<PageError title={globalReducer.errorMsg} />)
      default:
        return (this.props.children)
    }
  }
}

export default connect(state => state)(Index)
