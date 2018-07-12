import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/balance`)
  }

  render() {
    return (
      <div>
        <Head title='余额查询' />
        <RenderPage>
          Balance
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
