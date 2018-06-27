import React from 'react'
import { connect } from 'react-redux'
import PageError from './PageError'
// import Loading from './Loading'
import LoginComponent from '../Login/LoginComponent'
import * as CODE from '../../utilities/status-code'
import { updateState } from '../../store/actions/global.action'

/**
 * 统一 render page 方法
 * @param code // SUCCESS - 正常访问| WECHAT_AUTH_ERROR - 未验证微信 | NOT_LOGIN_ERROR - 未登录 | NO_CERTIFICATION_ERROR - 未实名认证 | NETWORK_ERROR - 网络错误 | UNKNOWN_ERROR - 未知错误
 * @param path // 重定向链接
 * @param Page // 正常访问组件
 * @param onComplete
 * @returns {*}
 */

class Index extends React.Component {
  // static async getInitialProps(props) {
  //   const {store, query} = props.ctx
  //   console.log(query)
  //   store.dispatch(updateState(query))
  // }

  render() {
    const {globalReducer} = this.props
    switch (globalReducer.code) {
      case CODE.SUCCESS:
        return this.props.children
      case CODE.NOT_LOGIN:
        return (<LoginComponent />)
      case CODE.ERROR:
        return (<PageError title={globalReducer.errorMsg} />)
      default:
        return 'loading...'
        // return (<Loading />)
  }
}
}

export default connect(state => state)(Index)

