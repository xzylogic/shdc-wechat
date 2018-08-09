import React from 'react'

import Head from '../../app/components/Common/Head'
import FamilyDetailComponent from '../../app/components/Personal/FamilyDetailComponent'

import { recordCurrentPage, checkNullArr } from '../../app/utilities/common'
import { loadAccountListAction, updateFaimlyKeyAction } from '../../app/store/actions/personal/account.action'
import withAuth from '../../app/utilities/withAuth'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.accountReducer && checkNullArr(myStore.accountReducer.accountList)) {
    store.dispatch(loadAccountListAction())
  }
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    const { id } = this.props
    recordCurrentPage(store, `/personal/familydetail`)
    store.dispatch(updateFaimlyKeyAction(id))
    InitFunction(store)
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
