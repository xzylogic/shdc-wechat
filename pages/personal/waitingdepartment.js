import React from 'react'

import Head from '../../app/components/Common/Head'
import WaitingDepartmentComponent from '../../app/components/Personal/WaitingDepartmentComponent'
import { recordCurrentPage, checkNullArr } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'
import { loadWaitingDepartmentsAction } from '../../app/store/actions/personal/waiting.action'

const InitFunction = async (store) => {
  let myStore = await 'function' === typeof store.getState ? store.getState() : store
  if (myStore.waitingReducer && checkNullArr(myStore.waitingReducer.waitingDepartments)) {
    await store.dispatch(loadWaitingDepartmentsAction())
  }
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
        <Head title='科室队列-科室列表' />
        <WaitingDepartmentComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
