import React from 'react'
import { connect } from 'react-redux'

import PageError from './PageError'
import Loading from './Loading'
import LoginComponent from '../Login/LoginComponent'
import * as CODE from '../../utilities/status-code'

/**
 * 统一 render page 方法
 */
class Index extends React.Component {
  render() {
    const {globalReducer, onComplete} = this.props
    switch (globalReducer.code) {
      case CODE.SUCCESS:
        return this.props.children
      case CODE.NOT_LOGIN:
        return (<LoginComponent onComplete={onComplete} />)
      case CODE.ERROR:
        return (<PageError title={globalReducer.errorMsg} />)
      default:
        return (<Loading />)
    }
  }
}

export default connect(state => state)(Index)
