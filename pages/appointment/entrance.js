import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import EntranceComponent from '../../app/components/Appointment/EntranceComponent'

class Index extends React.Component {
  static async getInitialProps(props) {
    const { query } = props.ctx
    return { hosOrgCode: query.hosOrgCode }
  }

  render() {
    const { hosOrgCode } = this.props
    console.log(hosOrgCode)
    return (
      <div>
        <Head title='进入门诊' />
        <EntranceComponent params={hosOrgCode} />
      </div>
    )
  }
}

export default connect(state => state)(Index)
