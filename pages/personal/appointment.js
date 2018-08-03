import React from 'react'

import Head from '../../app/components/Common/Head'
import AppointmentComponent from '../../app/components/Personal/AppointmentComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/appointment`)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-我的预约' />
        <AppointmentComponent />
      </div>
    )
  }
}

export default withAuth(Index)
