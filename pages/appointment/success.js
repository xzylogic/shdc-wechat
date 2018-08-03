import React from 'react'

import Head from '../../app/components/Common/Head'
import SuccessComponent from '../../app/components/Appointment/SuccessComponent'

import { initGlobalQuery, recordCurrentPage} from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/appointment/success`)
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

export default withAuth(Index)
