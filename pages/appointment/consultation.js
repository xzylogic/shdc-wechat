import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import ConsultationComponent from '../../app/components/Appointment/ConsultationComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent(`/appointment/consultation/${query.hosOrgCode}/${query.deptType}/${query.type}`))
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
