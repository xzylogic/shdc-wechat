import React from 'react'

import Head from '../../app/components/Common/Head'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  // if (myStore.successReducer && checkNullObj(myStore.successReducer.orderDetail)) {
  // }
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/appointment`)
  }

  render() {
    return (
      <div>
        <Head title='候诊' />
        123
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
