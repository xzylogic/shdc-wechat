import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import HospitalsComponent from '../../app/components/Appointment/HospitalsComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    // console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医院列表' />
        <HospitalsComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
