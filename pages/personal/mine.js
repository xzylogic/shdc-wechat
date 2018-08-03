import React from 'react'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import AccountComponent from '../../app/components/Personal/AccountComponent'

import { initGlobalQuery, recordCurrentPage, checkNullObj, checkNullArr } from '../../app/utilities/common'
import { loadAccountInfoAction, loadAccountListAction } from '../../app/store/actions/personal/account.action'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query } = props.ctx

    initGlobalQuery(store, query).then(() => {
      if (checkNullObj(store.getState().accountReducer.accountInfo)) {
        store.dispatch(loadAccountInfoAction())
      }
      if (checkNullArr(store.getState().accountReducer.accountList)) {
        store.dispatch(loadAccountListAction())
      }
    })
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, '/personal/mine')
  }

  render() {
    const store = this.props
    return (
      <div>
        <Head title='用户列表' />
        <AccountComponent />
      </div>
    )
  }
}

export default withAuth(Index)
