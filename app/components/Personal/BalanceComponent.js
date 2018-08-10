import React from 'react'
import { connect } from 'react-redux'
import { WhiteSpace, WingBlank, List } from 'antd-mobile'

import './personal.scss'

import UserCard from './UserCard'
import { loadBalanceDetailAction, updateBalanceParamAction } from '../../store/actions/personal/balance.action'

class Index extends React.Component {

  onChange = (value) => {
    let store = this.props
    store.dispatch(updateBalanceParamAction(value[0]))
    store.dispatch(loadBalanceDetailAction())
  }

  render() {
    const { balanceReducer, accountReducer } = this.props
    const { accountList } = accountReducer
    const { searchParam, balanceDetail } = balanceReducer
    return (
      <div className='balance__container'>
        <UserCard ifKey value={searchParam} onChange={this.onChange} />
        <WhiteSpace />
        <List>
          <List.Item
            thumb={<i className='anticon icon-idcard icon__balance'></i>}
            extra={accountList[searchParam] && (accountList[searchParam].medicineCardId || accountList[searchParam].cardId)}
          >用户</List.Item>
          <List.Item
            thumb={<i className='anticon icon-bank icon__balance'></i>}
            extra={`${balanceDetail}元`}
          >我的余额</List.Item>
        </List>
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <p style={{color: '#999', lineHeight: 1.5}}>本页面展示余额为医联银医通充值账户的余额，如您未开通，则显示余额为0。</p>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default connect(state => state)(Index)
