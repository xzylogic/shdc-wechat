import React from 'react'
import Link from 'next/link'
import { 
  List, InputItem, WingBlank, WhiteSpace, Button, 
  Picker, DatePicker, TextareaItem, Checkbox, Toast 
} from 'antd-mobile'
import { createForm } from 'rc-form'

import { HttpToastService } from '../../utilities/httpService'

import './login.scss'

const PATH = {
  getCode: '/api/user/sendValidCode',
  register: '/api/register'
}

class Index extends React.Component {
  state = {
    code: '123456',
    codeMsg: `获取验证码`
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  getCode = () => {
    const form =  this.props.form
    if (this.state.codeMsg === '获取验证码'&&form.getFieldValue('mobile')) {
      let time = 60
      const codeTimer = setInterval(() => {
        this.setState({
          codeMsg: `${--time}秒后重新获取`
        })
        if (time < 0) {
          this.setState({
            codeMsg: `获取验证码`
          })
          clearInterval(codeTimer)
        }
      }, 1000)
    
      HttpToastService.post(`${PATH.getCode}`, {mobile: form.getFieldValue('mobile')})
        .then(data => {
          if(data && data.validCode) {
            this.setState({
              code: data.validCode
            })
          }
        })
    } else if(!form.getFieldValue('mobile')) {
      Toast.info('请输入手机号')
    }
  }
 
  checkPassword = (rule, value, callback) => {
    const form =  this.props.form
    if(!value) {
      callback([new Error('请输入密码')])
    } else if (value.length < 6) {
      callback([new Error('密码不能少于6位')])
    } else if (form.getFieldValue('passwordconfirm') && (form.getFieldValue('passwordconfirm') !== form.getFieldValue('password'))) {
      callback([new Error('两次密码不一致')])
    } else {
      callback([])
    }
  }

  checkCode = (rule, value, callback) => {
    if(!value) {
      callback([new Error('请输入验证码')])
    } else if (value != this.state.code) {
      callback([new Error('验证码校验错误')])
    } else {
      callback([])
    }
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleRegister = () => {
    this.props.form.validateFields((error, value) => {
      if(!error) {
        this.props.handleRegister(value)
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched, setFieldsValue } = this.props.form
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps('username', {rules: [{required: true, message: '请输入用户名'}]})}
            type='text' 
            placeholder='请输入用户名（必填）'
            labelNumber={7}
            error={isFieldTouched('username')&&getFieldError('username')}
            onErrorClick={() => Toast.info(getFieldError('username'))}
          ><i className='anticon icon-user login__icon' />用户名</InputItem>
          <InputItem 
            {...getFieldProps('password', {rules: [{validator: this.checkPassword}]})}
            type='password'
            placeholder='请输入密码（必填）'
            labelNumber={7}
            error={isFieldTouched('password')&&getFieldError('password')}
            onErrorClick={() => Toast.info(getFieldError('password'))}
          ><i className='anticon icon-lock login__icon' />密码</InputItem>
          <InputItem 
            {...getFieldProps('passwordconfirm', {rules: [{validator: this.checkPassword}]})}
            type='password'
            placeholder='请输入密码（必填）'
            labelNumber={7}
            error={isFieldTouched('passwordconfirm')&&getFieldError('passwordconfirm')}
            onErrorClick={() => Toast.info(getFieldError('passwordconfirm'))}
          ><i className='anticon icon-lock login__icon' />确认密码</InputItem>
          <InputItem 
            {...getFieldProps('realName', {rules: [{required: true, message: '请输入真实姓名'}]})}
            type='text'
            placeholder='请输入真实姓名（必填）'
            labelNumber={7}
            error={isFieldTouched('realName')&&getFieldError('realName')}
            onErrorClick={() => Toast.info(getFieldError('realName'))}
          ><i className='anticon icon-user login__icon' />真实姓名</InputItem>
          <Picker 
            {...getFieldProps('cardType', {initialValue: [1]})}
            data={[[{label:'身份证',value:1},{label:'军官证（士兵证）',value:2},{label:'护照',value:3},{label:'港澳居民来往内地通行证',value:4},{label:'居民户口簿',value:5},{label:'驾驶执照',value:6},{label:'台湾居民来往内地通行证',value:7}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-idcard login__icon' />证件类型</List.Item>
          </Picker>
          <InputItem 
            {...getFieldProps('cardId', {rules: [{required: true, message: '请输入证件号'}]})}
            type='text'
            placeholder='请输入证件号（必填）'
            labelNumber={7}
            error={isFieldTouched('cardId')&&getFieldError('cardId')}
            onErrorClick={() => Toast.info(getFieldError('cardId'))}
          ><i className='anticon icon-idcard login__icon' />证件号</InputItem>
        </List>
        <WhiteSpace size='md' />
        <List>
          <InputItem
            {...getFieldProps('mobile', {rules: [{required: true, message: '请输入手机号'}, {pattern: /1\d{10}/, message: '请输入正确的手机号'}]})}
            type='number' 
            placeholder='请输入手机号（必填）'
            labelNumber={7}
            error={isFieldTouched('mobile')&&getFieldError('mobile')}
            onErrorClick={() => Toast.info(getFieldError('mobile'))}
          ><i className='anticon icon-mobile1 login__icon' />手机号</InputItem>
          <InputItem 
            {...getFieldProps('code', {rules: [{validator: this.checkCode}]})}
            type='number' 
            placeholder='请输入验证码（必填）'
            labelNumber={7}
            extra={this.state.codeMsg}
            onExtraClick={this.getCode}
            error={isFieldTouched('code')&&getFieldError('code')}
            onErrorClick={() => Toast.info(getFieldError('code'))}
          ><i className='anticon icon-mobile1 login__icon' />验证码</InputItem>
          <Picker 
            {...getFieldProps('sex', {initialValue: [1]})}
            data={[[{label: '男',value: 1},{label: '女',value: 2}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-smileo login__icon' />性别</List.Item>
          </Picker>
          <DatePicker
            {...getFieldProps('birthday', {initialValue: new Date()})}
            mode='date'
            minDate={new Date(`${new Date().getFullYear() - 150}-01-01`)}
            maxDate={new Date()}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-gift login__icon' />生日</List.Item>
          </DatePicker>
          <TextareaItem 
            {...getFieldProps('address', {rules: [{required: true, message: '请输入联系地址'}]})}
            title={<div><i className='anticon icon-enviromento login__icon' />联系地址</div>}
            type='text'
            placeholder='请输入联系地址（必填）'
            error={isFieldTouched('address')&&getFieldError('address')}
            onErrorClick={() => Toast.info(getFieldError('address'))}
            rows={2}
            labelNumber={7} />
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <div className='register__error'>* 同一手机号和证件号只能绑定一个用户</div>
          <WhiteSpace size='md' />
          <Checkbox.AgreeItem {...getFieldProps('check', {rules: [{required: true}]})}>
            <div className='register__agreement'>
             我已阅读并同意 <Link href='/agreement'><span>《用户注册协议》</span></Link>
            </div>
          </Checkbox.AgreeItem>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary' disabled={this.hasErrors(getFieldsError())} onClick={this.handleRegister}>注册</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default createForm()(Index)
