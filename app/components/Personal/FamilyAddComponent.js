import React from 'react'
import Link from 'next/link'
import { List, InputItem, WingBlank, WhiteSpace, Button, Picker, DatePicker, TextareaItem } from 'antd-mobile'

import '../Login/login.scss'

class Index extends React.Component {
  render() {
    return (
      <div>
        <List>
          <InputItem 
            name='name'
            type='text'
            placeholder='请输入真实姓名（必填）'
            labelNumber={7}
          ><i className='anticon icon-user login__icon' />真实姓名</InputItem>
          <Picker 
            value={['男']}
            data={[[{label:'男',value:'男'},{label:'女',value:'女'},{label:'未知',value:'未知'}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-smileo login__icon' />性别</List.Item>
          </Picker>
          <InputItem 
            name='password'
            type='password'
            placeholder='请输入证件号（必填）'
            labelNumber={7}
          ><i className='anticon icon-idcard login__icon' />身份证号</InputItem>
          <InputItem
            name='username' 
            type='text' 
            placeholder='请输入用户名（必填）'
            labelNumber={7}
          ><i className='anticon icon-mobile1 login__icon' />手机号</InputItem>
          <Picker 
            value={['社保卡']}
            data={[[{label:'社保卡',value:'社保卡'},{label:'医联卡',value:'医联卡'}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-idcard login__icon' />卡类型</List.Item>
          </Picker>
          <InputItem 
            name='password'
            type='number'
            placeholder='请输入证件号（必填）'
            labelNumber={7}
          ><i className='anticon icon-idcard login__icon' />卡号</InputItem>
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary'>提交</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default Index
