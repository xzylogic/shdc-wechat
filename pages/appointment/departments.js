import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DepartmentsComponent from '../../app/components/Appointment/DepartmentsComponent'

import { initGlobalQuery, checkNullArr } from '../../app/utilities/common'
import { initCodeAndTypeAction, loadDepartmentsAction } from '../../app/store/actions/appointment/departments.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
    store.dispatch(initCodeAndTypeAction(query.hosOrgCode, query.deptType, query.type))
    store.dispatch(loadDepartmentsAction())
    return {
      query: query
    }
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
