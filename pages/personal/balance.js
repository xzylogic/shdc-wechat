import React from 'react'

import Head from '../../app/components/Common/Head'
import BalanceComponent from '../../app/components/Personal/BalanceComponent'

import { recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'
import { loadBalanceDetailAction } from '../../app/store/actions/personal/balance.action'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  store.dispatch(loadBalanceDetailAction())
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/balance`)
    InitFunction(store)
  }

  render() {
    return (
      <div>
        <Head title='余额查询' />
        <BalanceComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
