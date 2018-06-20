import React from 'react'
import Link from 'next/link'
import { List, InputItem, WingBlank, WhiteSpace, Button, Picker, DatePicker, TextareaItem } from 'antd-mobile'

import './login.scss'

class Index extends React.Component {
  render() {
    return (
      <div>
        <List>
          <InputItem
            name='username' 
            type='text' 
            placeholder='请输入用户名（必填）'
            labelNumber={7}
          ><i className='anticon icon-user login__icon' />用户名</InputItem>
          <InputItem 
            name='password'
            type='password'
            placeholder='请输入密码（必填）'
            labelNumber={7}
          ><i className='anticon icon-lock login__icon' />密码</InputItem>
          <InputItem 
            name='confirmpassword'
            type='password'
            placeholder='请输入密码（必填）'
            labelNumber={7}
          ><i className='anticon icon-lock login__icon' />确认密码</InputItem>
          <InputItem 
            name='name'
            type='text'
            placeholder='请输入真实姓名（必填）'
            labelNumber={7}
          ><i className='anticon icon-user login__icon' />真实姓名</InputItem>
          <Picker 
            value={['身份证']}
            data={[[{label:'身份证',value:'身份证'},{label:'军官证',value:'军官证'},{label:'护照',value:'护照'},{label:'港澳通行证',value:'港澳通行证'}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-idcard login__icon' />证件类型</List.Item>
          </Picker>
          <InputItem 
            name='password'
            type='password'
            placeholder='请输入证件号（必填）'
            labelNumber={7}
          ><i className='anticon icon-idcard login__icon' />证件号</InputItem>
        </List>
        <WhiteSpace size='md' />
        <List>
          <InputItem
            name='username' 
            type='text' 
            placeholder='请输入用户名（必填）'
            labelNumber={7}
          ><i className='anticon icon-mobile1 login__icon' />手机号</InputItem>
          <InputItem 
            name='password'
            type='password'
            placeholder='请输入验证码（必填）'
            labelNumber={7}
            extra='获取验证码'
          ><i className='anticon icon-mobile1 login__icon' />验证码</InputItem>
          <Picker 
            value={['男']}
            data={[[{label:'男',value:'男'},{label:'女',value:'女'},{label:'未知',value:'未知'}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-smileo login__icon' />性别</List.Item>
          </Picker>
          <DatePicker
            mode='date'
            value={new Date()}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-gift login__icon' />生日</List.Item>
          </DatePicker>
          <TextareaItem 
            title={<div><i className='anticon icon-enviromento login__icon' />联系地址</div>}
            name='password'
            type='password'
            placeholder='请输入联系地址（必填）'
            rows={2}
            labelNumber={7} />
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <div className='register__error'>* 同一手机号和证件号只能绑定一个用户</div>
          <WhiteSpace size='md' />
          <div className='register__agreement'>
            <i className='anticon icon-checkcircle checked' />
            我已阅读并同意 <Link href='/register/agreement'><span>《用户注册协议》</span></Link>
          </div>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary'>注册</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default Index
