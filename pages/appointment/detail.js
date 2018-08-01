import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import DetailComponent from '../../app/components/Appointment/DetailComponent'

import { initGlobalQuery, recordCurrentPage, checkNullArr, checkNullObj } from '../../app/utilities/common'
import { loadAccountListAction, loadAccountInfoAction } from '../../app/store/actions/personal/account.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const { store, query } = props.ctx
    initGlobalQuery(store, query).then(() => {
      if (checkNullArr(store.getState().accountReducer.accountList)) {
        store.dispatch(loadAccountListAction())
      }
      if (checkNullObj(store.getState().accountReducer.accountInfo)) {
        store.dispatch(loadAccountInfoAction())
      }
    })
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, '/appointment/detail')
    if (checkNullArr(store.accountReducer.accountList)) {
      store.dispatch(loadAccountListAction())
    }
    if (checkNullObj(store.accountReducer.accountInfo)) {
      store.dispatch(loadAccountInfoAction())
    }
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
