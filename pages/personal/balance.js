import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  // if (myStore.successReducer && checkNullObj(myStore.successReducer.orderDetail)) {
  // }
}
class Index extends React.Component {

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/balance`)
  }

  render() {
    return (
      <div>
        <Head title='余额查询' />
        Balance
      </div>
    )
  }
}

export default withAuth(Index)
