import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DoctorsComponent from '../../app/components/Appointment/DoctorsComponent'
import { loadDoctors } from '../../app/store/actions/doctors.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const { store, query } = props.ctx
    store.dispatch(loadDoctors(query.hosOrgCode, query.deptCode))
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医生列表' />
        <DoctorsComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
