import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import EntranceComponent from '../../app/components/Appointment/EntranceComponent'

import { initGlobalQuery } from '../../app/utilities/common'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
    return { query: query }
  }

  render() {
    const { query } = this.props
    return (
      <div>
        <Head title='进入门诊' />
        <EntranceComponent param={query.hosOrgCode} />
      </div>
    )
  }
}

export default connect(state => state)(Index)
