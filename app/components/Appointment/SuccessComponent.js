import React from 'react'
import { connect } from 'react-redux'
import { List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import './appointment.scss'
 
class Index extends React.Component {
  render() {
    const { successReducer } = this.props
    const { orderDetail } = successReducer
    console.log(orderDetail)
    return (
      <div className='full__container appointment__success'>
        <List>
          <List.Item extra={orderDetail.orderTime}>预约时间:</List.Item>
          <List.Item extra={orderDetail.hosName}>预约医院:</List.Item>
          <List.Item extra={orderDetail.deptName}>预约科室:</List.Item>
          <List.Item extra={orderDetail.orderNum}>预约号:</List.Item>
          <List.Item extra={orderDetail.type}>预约类型:</List.Item>
          <List.Item extra={orderDetail.userName}>预约患者:</List.Item>
          <List.Item extra={orderDetail.card}>就诊卡号:</List.Item>
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
          <Button type='primary'>我的预约</Button>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default connect(state => state)(Index)
