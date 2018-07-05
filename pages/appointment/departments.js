import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DepartmentsComponent from '../../app/components/Appointment/DepartmentsComponent'
import { updateState, updateCurrent } from '../../app/store/actions/global.action'
import { loadDepartments } from '../../app/store/actions/appointment/departments.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
    store.dispatch(loadDepartments(query.hosOrgCode, query.deptType, query.type))
    return {
      query: query
    }
  }

  componentDidMount() {
    const store = this.props
    const { query } = this.props
    store.dispatch(updateCurrent(`/appointment/departments/${query.hosOrgCode}/${query.deptType}/${query.type}`))
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-科室列表' />
        <DepartmentsComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
