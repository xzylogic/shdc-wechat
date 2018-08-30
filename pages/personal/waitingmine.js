import React from 'react'

import Head from '../../app/components/Common/Head'
import WaitingMineComponent from '../../app/components/Personal/WaitingMineComponent'

import { recordCurrentPage, checkNullArr } from '../../app/utilities/common'
import { loadAccountListAction } from '../../app/store/actions/personal/account.action'
import { updateWaitingMineParamAction, updateWaitingMineAction } from '../../app/store/actions/personal/waiting.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = async (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.accountReducer && checkNullArr(myStore.accountReducer.accountList)) {
    await store.dispatch(loadAccountListAction())
  }
  await store.dispatch(updateWaitingMineParamAction(''))
  await store.dispatch(updateWaitingMineAction(''))
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/waiting`)
    InitFunction(store)
  }

  render() {
    return (
      <div>
        <Head title='我的队列' />
        <WaitingMineComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
