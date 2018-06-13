import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import EntranceComponent from '../../app/components/Appointment/EntranceComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='进入门诊' />
        <EntranceComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
