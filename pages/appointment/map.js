import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import MapComponent from '../../app/components/Appointment/MapComponent'

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
        <Head title='医院地图' />
        <RenderError>
          <MapComponent />
        </RenderError>
      </div>
    )
  }
}

export default connect(state => state)(Index)
