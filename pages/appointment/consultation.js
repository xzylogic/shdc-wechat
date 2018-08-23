import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderError from '../../app/components/Common/RenderError'
import ConsultationComponent from '../../app/components/Appointment/ConsultationComponent'

import { initGlobalQuery } from '../../app/utilities/common'
import { initConsultationCodeAction, loadConsultationListAction } from '../../app/store/actions/appointment/consultation.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
    await store.dispatch(initConsultationCodeAction(query))
    await store.dispatch(loadConsultationListAction())
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-门诊预约' />
        <RenderError>
          <ConsultationComponent />
        </RenderError>
      </div>
    )
  }
}

export default connect(state => state)(Index)
