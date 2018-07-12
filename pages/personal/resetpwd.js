import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import ResetPasswordComponent from '../../app/components/Personal/ResetPasswordComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/mine`)
  }

  render() {
    return (
      <div>
        <Head title='修改密码' />
        <RenderPage>
          <ResetPasswordComponent />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
