import React from 'react'

import Head from '../../app/components/Common/Head'
import FamilyDetailComponent from '../../app/components/Personal/FamilyDetailComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  // if (myStore.successReducer && checkNullObj(myStore.successReducer.orderDetail)) {
  // }
}

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/familydetail`)
  }

  render() {
    return (
      <div>
        <Head title='家庭成员详情' />
        <FamilyDetailComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
