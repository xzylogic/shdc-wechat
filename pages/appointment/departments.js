import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import DepartmentsComponent from '../../app/components/Appointment/DepartmentsComponent'
import { updateState, updateCurrent } from '../../app/store/actions/global.action'
import { loadDepartments, loadDepartmentsChild } from '../../app/store/actions/departments.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const { store, query } = props.ctx
    store.dispatch(loadDepartments(query.hosOrgCode, query.deptType))
  }

  handleTabClick = (index) => {
    const store = this.props
    const { departmentsReducer } = store
    const { hosOrgCode, deptType, departmentsParent} = departmentsReducer
    store.dispatch(loadDepartmentsChild(hosOrgCode, deptType, departmentsParent[index].hosDeptCode))
  }

  render() {
    const { departmentsReducer } = this.props
    const { departmentsParent, departmentsChild } = departmentsReducer
    return (
      <div>
        <Head title='预约就诊-科室列表' />
        <DepartmentsComponent parent={departmentsParent} child={departmentsChild} handleTabClick={this.handleTabClick} />
      </div>
    )
  }
}

export default connect(state => state)(Index)
