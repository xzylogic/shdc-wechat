import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { 
  List, InputItem, WingBlank, WhiteSpace, Button, 
  Picker, DatePicker, TextareaItem, Checkbox, Toast 
} from 'antd-mobile'
import { createForm } from 'rc-form'
import * as moment from 'moment'

import { hasErrors, cardList } from '../../utilities/common'
import { getCodeAction, registerAction } from '../../store/actions/login.action'

import './login.scss'

class Index extends React.Component {
  state = {
    codeMsg: `获取验证码`
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  getCode = () => {
    const store = this.props
    const form =  this.props.form
    if (this.state.codeMsg === '获取验证码'&&!form.getFieldError('mobile')&&form.getFieldValue('mobile')) {
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
      
      store.dispatch(getCodeAction({mobile: form.getFieldValue('mobile')}))

    } else if(form.getFieldError('mobile')||!form.getFieldValue('mobile')) {
      Toast.info('请输入正确的手机号')
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

  onCardChange = (value) => {
    const form =  this.props.form
    form.setFieldsValue({
      cardId: value
    })
    if (form.getFieldValue('cardType')[0] === 1 && value.length === 18) {
      let date = value.replace(/.{6}(.{4})(.{2})(.{2}).{4}/, '$1-$2-$3')
      let gender = value.substring(16, 17)
      form.setFieldsValue({
        birthday: new Date(date)
      })
      form.setFieldsValue({
        sex: Number(gender) % 2 === 0 ? [2] : [1]
      })
    }
  }

  handleRegister = () => {
    const store = this.props
    this.props.form.validateFields((error, value) => {
      if(!error) {
        const formData = {
          address: value.address,
          birthday: moment(value.birthday).format('YYYY-MM-DD'),
          cardId: value.cardId,
          cardType: value.cardType[0],
          mobile: value.mobile,
          origin: 'wx',
          password: value.password,
          sex: value.sex[0],
          username: value.username,
          validateCode: value.validateCode,
          wechatId: store.globalReducer.weChatId
        }
        store.dispatch(registerAction(formData))
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    return (
      <div className='register__container'>
        <List>
          <InputItem 
            {...getFieldProps('username', {rules: [{required: true, message: '请输入真实姓名'}]})}
            type='text'
            placeholder='请输入真实姓名'
            labelNumber={7}
            error={isFieldTouched('username')&&getFieldError('username')}
            onErrorClick={() => Toast.info(getFieldError('username'))}
          ><i className='anticon icon-user login__icon' />真实姓名</InputItem>
          <InputItem 
            {...getFieldProps('password', {rules: [{validator: this.checkPassword}]})}
            type='password'
            placeholder='请输入密码'
            labelNumber={7}
            error={isFieldTouched('password')&&getFieldError('password')}
            onErrorClick={() => Toast.info(getFieldError('password'))}
          ><i className='anticon icon-lock login__icon' />密码</InputItem>
          <InputItem 
            {...getFieldProps('passwordconfirm', {rules: [{validator: this.checkPassword}]})}
            type='password'
            placeholder='请再次输入密码'
            labelNumber={7}
            error={isFieldTouched('passwordconfirm')&&getFieldError('passwordconfirm')}
            onErrorClick={() => Toast.info(getFieldError('passwordconfirm'))}
          ><i className='anticon icon-lock login__icon' />确认密码</InputItem>
          <Picker 
            {...getFieldProps('cardType', {initialValue: [1]})}
            data={[cardList]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-idcard login__icon' />证件类型</List.Item>
          </Picker>
          <InputItem 
            {...getFieldProps('cardId', {rules: [{required: true, message: '请输入证件号'}]})}
            type='text'
            placeholder='请输入证件号'
            labelNumber={7}
            error={isFieldTouched('cardId')&&getFieldError('cardId')}
            onErrorClick={() => Toast.info(getFieldError('cardId'))}
            onChange={this.onCardChange}
          ><i className='anticon icon-idcard login__icon' />证件号</InputItem>
        </List>
        <WhiteSpace size='md' />
        <List>
          <InputItem
            {...getFieldProps('mobile', {rules: [{required: true, message: '请输入手机号'}, {pattern: /1\d{10}\b/, message: '请输入正确的11位手机号'}]})}
            type='number' 
            placeholder='请输入手机号'
            labelNumber={7}
            error={isFieldTouched('mobile')&&getFieldError('mobile')}
            onErrorClick={() => Toast.info(getFieldError('mobile'))}
          ><i className='anticon icon-mobile1 login__icon' />手机号</InputItem>
          <InputItem 
            {...getFieldProps('validateCode', {rules: [{required: true, message: '请输入验证码'}]})}
            type='number' 
            placeholder='请输入验证码'
            labelNumber={7}
            extra={<Button type='primary' style={{padding: '0'}} size='small'>{this.state.codeMsg}</Button>}
            onExtraClick={this.getCode}
            error={isFieldTouched('validateCode')&&getFieldError('validateCode')}
            onErrorClick={() => Toast.info(getFieldError('validateCode'))}
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
            {...getFieldProps('birthday', {rules: [{required: true, message: '请选择出生日期'}]})}
            mode='date'
            minDate={new Date(`${new Date().getFullYear() - 150}-01-01`)}
            maxDate={new Date()}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-gift login__icon' />生日</List.Item>
          </DatePicker>
          <TextareaItem 
            {...getFieldProps('address', {rules: [{required: false, message: '请输入联系地址'}]})}
            title={<div><i className='anticon icon-enviromento login__icon' />联系地址</div>}
            type='text'
            placeholder='请输入联系地址'
            error={isFieldTouched('address')&&getFieldError('address')}
            onErrorClick={() => Toast.info(getFieldError('address'))}
            rows={2}
            labelNumber={7} />
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <div className='register__error'>* 同一手机号和证件号只能绑定一个用户</div>
          <WhiteSpace size='md' />
          <Checkbox.AgreeItem 
            {...getFieldProps('check', {initialValue: false, rules: [{pattern: /true/}]})}
          >
            <div className='register__agreement'>
             我已阅读并同意 <Link href='/agreement'><span>《用户注册协议》</span></Link>
            </div>
          </Checkbox.AgreeItem>
        </WingBlank>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary' disabled={hasErrors(getFieldsError())} onClick={this.handleRegister}>注册</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default connect(state => state)(createForm()(Index))
