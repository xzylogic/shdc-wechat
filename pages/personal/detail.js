import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import DetailComponent from '../../app/components/Personal/DetailComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'
import { initAccountInfo } from '../../app/store/actions/personal/account.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
    store.dispatch(initAccountInfo(query.accessToken || store.getState().globalReducer.accessToken))
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent(`/personal/appointment`))
  }

  loadData = () => {
    const store = this.props
    const { globalReducer } = store
    store.dispatch(initAccountInfo(globalReducer.accessToken))
  }

  render() {
    return (
      <div>
        <Head title='用户详情' />
        <RenderPage onComplete={this.loadData}>
          <DetailComponent />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
