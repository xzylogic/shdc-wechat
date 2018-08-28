import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import './appointment.scss'
 
class Index extends React.Component {

  renderLevel = (type) => {
    switch(type) {
      case 1: 
        return '专家门诊'
      case '1': 
        return '专家门诊'
      case 2: 
        return '专病门诊'
      case '2': 
        return '专病门诊'
      case 3: 
        return '普通门诊'
      case '3': 
        return '普通门诊'
      default:
        return ''
    }
  }
  render() {
    const { successReducer } = this.props
    const { orderDetail } = successReducer
    return (
      <div className='full__container appointment__success'>
        <List>
          <List.Item extra={orderDetail.scheduleDate}>预约时间:</List.Item>
          <List.Item extra={orderDetail.hosOrgName}>预约医院:</List.Item>
          <List.Item extra={orderDetail.deptName}>预约科室:</List.Item>
          <List.Item extra={orderDetail.hosNumSourceId}>预约号:</List.Item>
          <List.Item extra={this.renderLevel(orderDetail.visitLevelCode)}>预约类型:</List.Item>
          <List.Item extra={orderDetail.patientName}>预约患者:</List.Item>
          <List.Item extra={orderDetail.patientCardId}>就诊卡号:</List.Item>
        </List>
        <WhiteSpace size='lg' />
        <WingBlank size='lg' style={{lineHeight: '1.75'}}>
          <p>实际预约时间以短信通知为准。</p>
          <p>请您在预约结束时间前完成挂号。</p>
          <p>请核对您的预约信息，以免造成预约失败！</p>
        </WingBlank>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <Button type='primary' onClick={() => Router.push('/personal/appointment')}>我的预约</Button>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default connect(state => state)(Index)
