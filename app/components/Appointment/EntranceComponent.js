import React from 'react'
import Router from 'next/router'
import { WhiteSpace, WingBlank, List } from 'antd-mobile'

import './appointment.scss'
import '../Login/login.scss'

class Index extends React.Component {
  render() {
    const tabs = [
      { title: '全部' },
      { title: '综合' },
      { title: '中医' },
      { title: '专科' }
    ]
    const { param } = this.props
    return (
      <div>
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <List className='entrance__list'>
            <List.Item arrow='horizontal' onClick={
              () => Router.push(`/appointment/departments?hosOrgCode=${param}&deptType=1&type=1`, `/appointment/departments/${param}/1/1`)
            }>专家门诊</List.Item>
            <List.Item arrow='horizontal' onClick={
              () => Router.push(`/appointment/departments?hosOrgCode=${param}&deptType=2&type=2`, `/appointment/departments/${param}/2/2`)
            }>专病门诊</List.Item>
            <List.Item arrow='horizontal' onClick={
              () => Router.push(`/appointment/departments?hosOrgCode=${param}&deptType=1&type=3`, `/appointment/departments/${param}/1/3`)
            }>普通门诊</List.Item>
          </List>
        </WingBlank>
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <div className='login__desc'>
            <div className='content'>
              <i className='anticon icon-infocirlceo login__icon' />
              <p>预约须知：</p>
            </div>
            <div className='content'>
              <p>新用户：指在医联网预约平台及其相关平台从未注册过的用户，需要先进行注册。</p>
            </div>
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default Index
