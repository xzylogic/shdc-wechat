import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DoctorComponent from '../../app/components/Appointment/DoctorComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent(`/appointment/doctor/${query.id}`))
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医生详情' />
        <DoctorComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
