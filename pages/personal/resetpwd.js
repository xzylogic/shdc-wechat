import React from 'react'

import Head from '../../app/components/Common/Head'
import ResetPasswordComponent from '../../app/components/Personal/ResetPasswordComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/mine`)
  }

  render() {
    return (
      <div>
        <Head title='修改密码' />
        <ResetPasswordComponent />
      </div>
    )
  }
}

export default withAuth(Index)
