import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import DoctorComponent from '../../app/components/Appointment/DoctorComponent'

import { initGlobalQuery } from '../../app/utilities/common'
import { initDoctorCodeAction } from '../../app/store/actions/appointment/doctor.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
    store.dispatch(initDoctorCodeAction(query))
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医生详情' />
        <RenderError>
          <DoctorComponent />
        </RenderError>
      </div>
    )
  }
}

export default connect(state => state)(Index)
