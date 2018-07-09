import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { createForm } from 'rc-form'

import '../Login/login.scss'
import './personal.scss'

class Index extends React.Component {
  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    return (
      <div>
        <List>
          <InputItem 
            name='password'
            type='password'
            placeholder='请输入身份证号（必填）'
            labelNumber={7}
          ><i className='anticon icon-idcard login__icon' />身份证号</InputItem>
          <InputItem
            name='username' 
            type='text' 
            placeholder='请输入手机号（必填）'
            labelNumber={7}
          ><i className='anticon icon-mobile1 login__icon' />手机号</InputItem>
        </List>
        <WhiteSpace size='md' />
        <List>
          <InputItem 
            name='password'
            type='password'
            placeholder='请输入密码（必填）'
            labelNumber={7}
          ><i className='anticon icon-lock login__icon' />原密码</InputItem>
          <InputItem 
            name='password'
            type='password'
            placeholder='请输入密码（必填）'
            labelNumber={7}
          ><i className='anticon icon-lock login__icon' />新密码</InputItem>
          <InputItem 
            name='confirmpassword'
            type='password'
            placeholder='请输入密码（必填）'
            labelNumber={7}
          ><i className='anticon icon-lock login__icon' />确认密码</InputItem>
        </List>
        <WhiteSpace size='lg' />
        <WingBlank>
          <p className='user__resettips'>注：密码需要填写6-20位字符；支持半角的数字，字母和特殊字符组合，不包括/\[]"等。</p>
        </WingBlank>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <Button type='primary'>提交</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default createForm()(Index)
