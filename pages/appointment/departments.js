import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import DepartmentsComponent from '../../app/components/Appointment/DepartmentsComponent'

import { initGlobalQuery, checkNullArr } from '../../app/utilities/common'
import { initDepartmentsCodeAction, loadDepartmentsAction } from '../../app/store/actions/appointment/departments.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    await initGlobalQuery(store, query)
    await store.dispatch(initDepartmentsCodeAction(query))
    await store.dispatch(loadDepartmentsAction())
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-科室列表' />
        <RenderError>
          <DepartmentsComponent />
        </RenderError>
      </div>
    )
  }
}

export default connect(state => state)(Index)
