import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DoctorsComponent from '../../app/components/Appointment/DoctorsComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
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
