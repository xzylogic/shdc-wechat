import React from 'react'

import Head from '../../app/components/Common/Head'
import DetailComponent from '../../app/components/Personal/DetailComponent'

import { initGlobalQuery, recordCurrentPage, checkNullObj } from '../../app/utilities/common'
import { loadAccountInfoAction } from '../../app/store/actions/personal/account.action'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query).then(() => {
      if (checkNullObj(store.getState().accountReducer.accountInfo)) {
        store.dispatch(loadAccountInfoAction())
      }
    })
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, '/personal/detail')
  }

  render() {
    return (
      <div>
        <Head title='用户详情' />
        <DetailComponent />
      </div>
    )
  }
}

export default withAuth(Index)
