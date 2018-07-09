import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import AccountComponent from '../../app/components/Personal/AccountComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'
import { initAccountInfo, loadAccountList } from '../../app/store/actions/personal/account.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
    store.dispatch(initAccountInfo(query.accessToken || store.getState().globalReducer.accessToken))
    store.dispatch(loadAccountList(query.accessToken || store.getState().globalReducer.accessToken))
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent(`/personal/appointment`))
  }

  loadData = () => {
    const store = this.props
    store.dispatch(initAccountInfo(store.globalReducer.accessToken))
    store.dispatch(loadAccountList(store.globalReducer.accessToken))
  }

  render() {
    return (
      <div>
        <Head title='用户列表' />
        <RenderPage onComplete={this.loadData}>
          <AccountComponent />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
