import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import ResetSuccessComponent from '../../app/components/Login/ResetSuccessComponent'

import { initGlobalQuery } from '../../app/utilities/common'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    await initGlobalQuery(store, query)
  }

  render() {
    return (
      <div>
        <Head title='重置密码成功' />
        <ResetSuccessComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
