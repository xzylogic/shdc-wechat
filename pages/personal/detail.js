import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DetailComponent from '../../app/components/Personal/DetailComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='用户详情' />
        <DetailComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
