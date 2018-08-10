import React from 'react'

import Head from '../../app/components/Common/Head'
import WaitingHospitalComponent from '../../app/components/Personal/WaitingHospitalComponent'
import { recordCurrentPage, checkNullArr } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'
import { loadWaitingHospitalsAction, updateWaitingPageTypeAction } from '../../app/store/actions/personal/waiting.action'

const InitFunction = (store) => {
  let myStore = 'function' === typeof store.getState ? store.getState() : store
  if (myStore.waitingReducer && checkNullArr(myStore.waitingReducer.waitingHospitals)) {
    store.dispatch(loadWaitingHospitalsAction())
  }
}

class Index extends React.Component {

  componentWillMount() {
    const store = this.props
    store.dispatch(updateWaitingPageTypeAction(this.props.pageType))
    recordCurrentPage(store, `/personal/appointment`)
    InitFunction(store)
  }

  render() {
    return (
      <div>
        <Head title='候诊' />
        <WaitingHospitalComponent />
      </div>
    )
  }
}

export default withAuth(Index, InitFunction)
