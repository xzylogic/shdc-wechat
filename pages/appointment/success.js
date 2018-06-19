import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import SuccessComponent from '../../app/components/Appointment/SuccessComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-预约成功' />
        <SuccessComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
