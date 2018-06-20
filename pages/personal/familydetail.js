import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import FamilyDetailComponent from '../../app/components/Personal/FamilyDetailComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='家庭成员详情' />
        <FamilyDetailComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
