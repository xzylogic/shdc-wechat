import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import HospitalsComponent from '../../app/components/Appointment/HospitalsComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent('/appointment/hospitals'))
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-医院列表' />
        <RenderPage>
          <HospitalsComponent />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
