import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import AccountComponent from '../../app/components/Personal/AccountComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import { loadAccountInfoAction, loadAccountListAction } from '../../app/store/actions/personal/account.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query } = props.ctx

    initGlobalQuery(store, query).then(() => {
      if (!store.getState().accountReducer.accountInfo) {
        store.dispatch(loadAccountInfoAction())
      }
      if (!store.getState().accountReducer.accountList) {
        store.dispatch(loadAccountListAction())
      }
    })
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, '/personal/mine')
  }

  render() {
    const store = this.props
    return (
      <div>
        <Head title='用户列表' />
        <RenderPage>
          <AccountComponent />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
