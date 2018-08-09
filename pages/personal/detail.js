import React from 'react'

import Head from '../../app/components/Common/Head'
import DetailComponent from '../../app/components/Personal/DetailComponent'

import { recordCurrentPage, checkNullObj } from '../../app/utilities/common'
import { loadAccountInfoAction } from '../../app/store/actions/personal/account.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.accountReducer && checkNullObj(myStore.accountReducer.accountInfo)) {
    store.dispatch(loadAccountInfoAction())
  }
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, '/personal/detail')
    InitFunction(store)
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

export default withAuth(Index, InitFunction)
