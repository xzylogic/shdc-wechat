import React from 'react'
import Link from 'next/link'
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'

import Head from '../Common/Head'

import './login.scss'

class Index extends React.Component {
  checkUsername = (rule, value, callback) => {
    if(!value) {
      callback([new Error('请输入用户名')])
    } else {
      callback([])
    }
  }

  checkPassword = (rule, value, callback) => {
    if(!value) {
      callback([new Error('请输入密码')])
    } else if(value.length < 6) {
      callback([new Error('密码不能少于6位')])
    } else {
      callback([])
    }
  }

  handleLogin = () => {
    console.log('submit')
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div>
        <Head title='用户登录' />
        <List>
          <InputItem
            {...getFieldProps('username', {rules: [{validator: this.checkUsername}]})}
            type='text' 
            placeholder='证件号/手机号'
            labelNumber={6}
            error={getFieldError('username')}
            onErrorClick={() => Toast.info(getFieldError('username'))}
          ><i className='anticon icon-user login__icon' />用户名</InputItem>
          <InputItem 
            {...getFieldProps('password', {rules: [{validator: this.checkPassword}]})}
            type='password'
            placeholder='登录密码'
            labelNumber={6}
            error={getFieldError('password')}
            onErrorClick={() => Toast.info(getFieldError('password'))}
          ><i className='anticon icon-lock login__icon' />密码</InputItem>
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Link href='/resetpwd'><span className='login__forget'>忘记密码</span></Link>
          <Link href='/register'><span className='login__register'>新用户注册 ></span></Link>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
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

export default createForm()(Index)
