import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import DetailComponent from '../../app/components/Personal/DetailComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import { loadAccountInfoAction } from '../../app/store/actions/personal/account.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query).then(() => {
      if (!store.getState().accountReducer.accountInfo) {
        store.dispatch(loadAccountInfoAction())
      }
    })
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, '/personal/detail')
  }

  render() {
    return (
      <div>
        <Head title='用户详情' />
        <RenderPage>
          <DetailComponent />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
