import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'

import Head from '../Common/Head'

import { loginAction } from '../../store/actions/login.action'
import { hasErrors } from '../../utilities/common'

import './login.scss'

class Index extends React.Component {

  handleLogin = () => {
    const store = this.props
    this.props.form.validateFields((error, value) => {
      if(!error) {
        const formData = {
          deviceType: window.navigator.userAgent,
          origin: 'wx',
          password: value.password,
          username: value.username,
          wechatId: store.globalReducer.weChatId
        }
        store.dispatch(loginAction(formData))
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    return (
      <div>
        <Head title='用户登录' />
        <List>
          <InputItem
            {...getFieldProps('username', {rules: [{required: true, message: '请输入证件号/手机号'}]})}
            type='text' 
            placeholder='证件号/手机号'
            labelNumber={6}
            error={isFieldTouched('username')&&getFieldError('username')}
            onErrorClick={() => Toast.info(getFieldError('username'))}
          ><i className='anticon icon-user login__icon' />用户名</InputItem>
          <InputItem 
            {...getFieldProps('password', {rules: [{required: true, message: '请输入登录密码'}]})}
            type='password'
            placeholder='登录密码'
            labelNumber={6}
            error={isFieldTouched('password')&&getFieldError('password')}
            onErrorClick={() => Toast.info(getFieldError('password'))}
          ><i className='anticon icon-lock login__icon' />密码</InputItem>
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Link href={`/resetpwd`}><span className='login__forget'>忘记密码</span></Link>
          <Link href={`/register`}><span className='login__register'>新用户注册 ></span></Link>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary' disabled={hasErrors(getFieldsError())} onClick={this.handleLogin}>登录</Button>
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

export default connect(state => state)(createForm()(Index))
