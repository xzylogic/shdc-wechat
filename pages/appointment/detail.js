import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import DetailComponent from '../../app/components/Appointment/DetailComponent'

import { initGlobalQuery, recordCurrentPage} from '../../app/utilities/common'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, '/appointment/detail')
  }

  render() {
    return (
      <div>
        <Head title='预约就诊-预约信息' />
        <RenderPage>
          <DetailComponent />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
