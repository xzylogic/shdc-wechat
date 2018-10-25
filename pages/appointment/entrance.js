import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import EntranceComponent from '../../app/components/Appointment/EntranceComponent/EntranceComponent'

import { initGlobalQuery } from '../../app/utilities/common'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
    return { query: query }
  }

  render() {
    const { query } = this.props
    return (
      <div>
        <Head title='进入门诊' />
        <RenderError>
          <EntranceComponent 
            hosOrgCode={query && query.hosOrgCode || 0} 
            hosDeptCode={query && query.hosDeptCode || 0} 
            toHosDeptCode={query && query.toHosDeptCode || 0} 
            deptName={query && query.deptName || null} 
          />
        </RenderError>
      </div>
    )
  }
}

export default connect(state => state)(Index)
