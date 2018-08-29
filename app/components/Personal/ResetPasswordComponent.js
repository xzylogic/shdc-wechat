import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'

import { hasErrors } from '../../utilities/common'
import { resetPasswordAction } from '../../store/actions/personal/account.action'

import '../Login/login.scss'
import './personal.scss'

class Index extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  checkPassword = (rule, value, callback) => {
    const form =  this.props.form
    if(!value) {
      callback([new Error('请输入新密码')])
    } else if (value.length < 6) {
      callback([new Error('密码不能少于6位')])
    } else if (form.getFieldValue('passwordconfirm') && (form.getFieldValue('passwordconfirm') !== form.getFieldValue('newPassword'))) {
      callback([new Error('两次密码不一致')])
    } else {
      callback([])
    }
  }

  handleSubmit = () => {
    const store = this.props
    this.props.form.validateFields((error, value) => {
      if(!error) {
        const formData = {
          oldPassword: value.oldPassword,
          newPassword: value.newPassword
        }
        store.dispatch(resetPasswordAction(formData))
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    return (
      <div>
        <List>
          <InputItem 
            {...getFieldProps('oldPassword', {rules: [{validator: this.checkPassword}]})}
            type='password'
            placeholder='请输入原密码'
            labelNumber={7}
            error={isFieldTouched('oldPassword')&&getFieldError('oldPassword')}
            onErrorClick={() => Toast.info(getFieldError('oldPassword'))}
          ><i className='anticon icon-lock login__icon' />原密码</InputItem>
          <InputItem 
            {...getFieldProps('newPassword', {rules: [{validator: this.checkPassword}]})}
            type='password'
            placeholder='请输入新密码'
            labelNumber={7}
            error={isFieldTouched('newPassword')&&getFieldError('newPassword')}
            onErrorClick={() => Toast.info(getFieldError('newPassword'))}
          ><i className='anticon icon-lock login__icon' />新密码</InputItem>
          <InputItem 
            {...getFieldProps('passwordconfirm', {rules: [{validator: this.checkPassword}]})}
            type='password'
            placeholder='请再次输入新密码'
            labelNumber={7}
            error={isFieldTouched('passwordconfirm')&&getFieldError('passwordconfirm')}
            onErrorClick={() => Toast.info(getFieldError('passwordconfirm'))}
          ><i className='anticon icon-lock login__icon' />确认密码</InputItem>
         
        </List>
        <WhiteSpace size='lg' />
        <WingBlank>
          <p className='user__resettips'>注：密码需要填写6-20位字符；支持半角的数字，字母和特殊字符组合，不包括/\[]"等。</p>
        </WingBlank>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <Button type='primary' disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}>提交</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default connect(state => state)(createForm()(Index))
