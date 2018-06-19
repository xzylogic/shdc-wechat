import React from 'react'
import { List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import './appointment.scss'
 
class Index extends React.Component {
  render() {
    return (
      <div className='full__container'>
        <List>
          <List.Item extra={'2018-06-18 08:00 - 12:00'}>预约时间</List.Item>
          <List.Item extra={'2018-06-18 08:00 - 12:00'}>预约时间</List.Item>
          <List.Item extra={'2018-06-18 08:00 - 12:00'}>预约时间</List.Item>
          <List.Item extra={'2018-06-18 08:00 - 12:00'}>预约时间</List.Item>
          <List.Item extra={'2018-06-18 08:00 - 12:00'}>预约时间</List.Item>
          <List.Item extra={'2018-06-18 08:00 - 12:00'}>预约时间</List.Item>
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

export default Index
