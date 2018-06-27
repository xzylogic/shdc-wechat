import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import ResetSuccessComponent from '../../app/components/Login/ResetSuccessComponent'

import { updateState } from '../../app/store/actions/global.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
  }

  render() {
    return (
      <div>
        <Head title='修改密码成功' />
        <ResetSuccessComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
