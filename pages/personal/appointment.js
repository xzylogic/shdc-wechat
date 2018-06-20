import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import AppointmentComponent from '../../app/components/Personal/AppointmentComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-我的预约' />
        <AppointmentComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
