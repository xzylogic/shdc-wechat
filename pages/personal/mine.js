import React from 'react'

import Head from '../../app/components/Common/Head'
import AccountComponent from '../../app/components/Personal/AccountComponent'

import { recordCurrentPage, checkNullObj, checkNullArr } from '../../app/utilities/common'
import { loadAccountInfoAction, loadAccountListAction } from '../../app/store/actions/personal/account.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = async (store) => {
  let myStore = await 'function' === typeof store.getState ? store.getState() : store
  if (myStore.accountReducer && checkNullObj(myStore.accountReducer.accountInfo)) {
    await store.dispatch(loadAccountInfoAction())
  }
  if (myStore.accountReducer && checkNullArr(myStore.accountReducer.accountList)) {
    await store.dispatch(loadAccountListAction())
  }
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, '/personal/mine')
    InitFunction(store)
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

export default withAuth(Index, InitFunction)
