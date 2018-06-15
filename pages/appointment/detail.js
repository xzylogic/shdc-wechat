import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-预约信息' />
        detail
      </div>
    )
  }
}

export default connect(state => state)(Index)
