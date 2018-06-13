import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DepartmentsComponent from '../../app/components/Appointment/DepartmentsComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-科室列表' />
        <DepartmentsComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
