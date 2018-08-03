import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import DoctorsComponent from '../../app/components/Appointment/DoctorsComponent'

import { initGlobalQuery } from '../../app/utilities/common'
import { initDoctorsCodeAction, loadDoctorsByNameAction, loadDoctorsByDateAction } from '../../app/store/actions/appointment/doctors.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query, isServer} = props.ctx
    initGlobalQuery(store, query, isServer)
    store.dispatch(initDoctorsCodeAction(query))
    store.dispatch(loadDoctorsByNameAction())
    store.dispatch(loadDoctorsByDateAction())
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医生列表' />
        <RenderError>
          <DoctorsComponent />
        </RenderError>
      </div>
    )
  }
}

export default connect(state => state)(Index)
