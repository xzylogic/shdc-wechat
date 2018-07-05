import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DoctorsComponent from '../../app/components/Appointment/DoctorsComponent'
import { loadDoctors } from '../../app/store/actions/appointment/doctors.action'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
    store.dispatch(loadDoctors(query.hosOrgCode, query.deptCode))
    return {
      query: query
    }
  }

  componentDidMount() {
    const store = this.props
    const { query } = this.props
    store.dispatch(updateCurrent(`/appointment/doctors/${query.hosOrgCode}/${query.deptCode}`))
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医生列表' />
        <DoctorsComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
