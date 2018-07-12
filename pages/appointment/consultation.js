import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import ConsultationComponent from '../../app/components/Appointment/ConsultationComponent'

import { initGlobalQuery, recordCurrentPage} from '../../app/utilities/common'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)

    return {
      query: query
    }
  }

  componentDidMount() {
    const store = this.props
    const { query } = this.props
    recordCurrentPage(store, `/appointment/consultation/${query.hosOrgCode}/${query.deptType}/${query.type}`)
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-门诊预约' />
        <ConsultationComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
