import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import HospitalsComponent from '../../app/components/Appointment/HospitalsComponent'

import { initGlobalQuery, checkNullArr } from '../../app/utilities/common'
import { loadHospitalsAction } from '../../app/store/actions/appointment/hospitals.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
    if (checkNullArr(store.getState().hospitalsReducer.hospitalsAll)) {
      await store.dispatch(loadHospitalsAction())
    }
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医院列表' />
        <RenderError>
          <HospitalsComponent />
        </RenderError>
      </div>
    )
  }
}

export default connect(state => state)(Index)
