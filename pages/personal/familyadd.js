import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import FamilyAddComponent from '../../app/components/Personal/FamilyAddComponent'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    return (
      <div>
        <Head title='添加家庭成员' />
        <FamilyAddComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
