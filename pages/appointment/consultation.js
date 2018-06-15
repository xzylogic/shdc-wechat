import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import ConsultationComponent from '../../app/components/Appointment/ConsultationComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-门诊预约' />
        <ConsultationComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
