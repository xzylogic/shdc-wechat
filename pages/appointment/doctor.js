import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DoctorComponent from '../../app/components/Appointment/DoctorComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医生详情' />
        <DoctorComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
