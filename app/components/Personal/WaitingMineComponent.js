import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { Toast } from 'antd-mobile'

import UserCard from './UserCard'

import { updateWaitingMineParamAction, loadWaitingMineAction, updateWaitingMineAction } from '../../store/actions/personal/waiting.action'

class Index extends React.Component {
  handleChange = (value) => {
    const store = this.props
    const { accountReducer } = this.props
    const { accountList } = accountReducer
    const { hosOrgCode } = this.props.router.query
    store.dispatch(updateWaitingMineParamAction(value[0]))
    if (accountList[value[0]] && !accountList[value[0]].medicineCardId) {
      Toast.info('请绑定就诊卡')
      store.dispatch(updateWaitingMineAction(''))
    } else if (hosOrgCode) {
      store.dispatch(loadWaitingMineAction(hosOrgCode))
    }
  }
  render() {
    const { waitingReducer } = this.props
    const { waitingMineParam, waitingMine } = waitingReducer
    return (
      <React.Fragment>
        <UserCard ifKey value={waitingMineParam} onChange={this.handleChange} />
        <div dangerouslySetInnerHTML={{__html: waitingMine}} style={{padding: '15px', background: '#fff'}} />
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(Index))