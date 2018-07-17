import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import DoctorsComponent from '../../app/components/Appointment/DoctorsComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import { initDoctorsCodeAction, loadDoctorsByNameAction, loadDoctorsByDateAction } from '../../app/store/actions/appointment/doctors.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store)
    store.dispatch(initDoctorsCodeAction(query.hosOrgCode, query.hosDeptCode, query.toHosDeptCode))
    store.dispatch(loadDoctorsByNameAction())
    store.dispatch(loadDoctorsByDateAction())

    return {
      query: query
    }
  }

  componentDidMount() {
    const store = this.props
    const { query } = this.props
    recordCurrentPage(store, `/appointment/doctors/${query.hosOrgCode}/${query.deptCode}`)
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
