import React from 'react'
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import './appointment.scss'
 
class Index extends React.Component {
  render() {
    return (
      <div>
        <List>
          <List.Item extra={<i className='anticon icon-right' />}>
            <i className='anticon icon-user detail__icon' />【社保卡】石青（尾号1083）
          </List.Item>
        </List>
        <WhiteSpace />
        <List>
          <InputItem
            name='username' 
            type='text' 
            labelNumber={7}
            value={'华山医院'}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-home detail__icon' />医院名称:</InputItem>
          <InputItem 
            name='password'
            type='text'
            labelNumber={7}
            value={'消化科'}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-inbox detail__icon' />预约科室:</InputItem>
          <InputItem
            name='username' 
            type='text' 
            labelNumber={7}
            value={'张三'}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-user detail__icon' />医生姓名:</InputItem>
          <InputItem 
            name='password'
            type='text'
            labelNumber={7}
            value={'2018-06-18 08:00 - 12:00'}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-clockcircleo detail__icon' />门诊时间:</InputItem>
          <InputItem
            name='username' 
            type='text' 
            labelNumber={7}
            value={'¥ 24.00元'}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-pay-circle-o1 detail__icon' />挂号费用:</InputItem>
        </List>
        <WhiteSpace />
        <List>
          <List.Item extra={<i className='anticon icon-down' />}>
            <i className='anticon icon-exclamationcircleo detail__icon' />预约须知
          </List.Item>
        </List>
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <Button type='primary'>确定预约</Button>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default Index
