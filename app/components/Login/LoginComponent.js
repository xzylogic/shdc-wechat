import React from 'react'
import Link from 'next/link'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

import './login.scss'

class Index extends React.Component {
  render() {
    return (
      <div>
        <List>
          <InputItem
            name='username' 
            type='text' 
            placeholder='证件号/手机号'
            labelNumber={6}
          ><i className='anticon icon-user login__icon' />用户名</InputItem>
          <InputItem 
            name='password'
            type='password'
            placeholder='登录密码'
            labelNumber={6}
          ><i className='anticon icon-unlock login__icon' />密码</InputItem>
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Link href='/resetpwd'><span className='login__forget'>忘记密码</span></Link>
          <Link href='/register'><span className='login__register'>新用户注册 ></span></Link>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary'>登录</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <div className='login__desc'>
            <div className='content'>
              <i className='anticon icon-infocirlceo login__icon' />
              <p>医联网预约平台的注册用户：无需注册，原账号直接登录。</p>
            </div>
            <div className='content'>
              <i className='anticon icon-infocirlceo login__icon' />
              <p>新用户：指在医联网预约平台及其相关平台从未注册过的用户，需要先进行注册。</p>
            </div>
          </div>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default Index
