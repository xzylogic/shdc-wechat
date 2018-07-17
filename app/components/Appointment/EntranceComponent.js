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
    const { hosOrgCode, hosDeptCode, toHosDeptCode } = this.props
    return (
      <div>
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>{
          (hosDeptCode == 0 && toHosDeptCode == 0) ? (
            <List className='entrance__list'>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(`/appointment/departments?hosOrgCode=${hosOrgCode}&deptType=1&pageType=1`, `/appointment/departments/${hosOrgCode}/1/1`)
              }>专家门诊</List.Item>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(`/appointment/departments?hosOrgCode=${hosOrgCode}&deptType=2&pageType=2`, `/appointment/departments/${hosOrgCode}/2/2`)
              }>专病门诊</List.Item>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(`/appointment/departments?hosOrgCode=${hosOrgCode}&deptType=1&pageType=3`, `/appointment/departments/${hosOrgCode}/1/3`)
              }>普通门诊</List.Item>
            </List>
           ) : 
          (
            <List className='entrance__list'>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(
                  `/appointment/doctors?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}`, 
                  `/appointment/doctors/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}`)
              }>专家门诊</List.Item>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(
                  `/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}&pageType=2`, 
                  `/appointment/consultation/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}/2`)
              }>专病门诊</List.Item>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(
                  `/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}&pageType=3`, 
                  `/appointment/consultation/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}/3`)
              }>普通门诊</List.Item>
            </List>
           )
        }
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
