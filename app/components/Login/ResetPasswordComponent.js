import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, WingBlank, WhiteSpace, Button, Picker } from 'antd-mobile'
import { createForm } from 'rc-form'

import { hasErrors, cardList } from '../../utilities/common'
import { getCodeAction, getbackPasswordAction } from '../../store/actions/login.action'

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
    if (this.state.codeMsg === '获取验证码'&&!form.getFieldError('userPhone')&&form.getFieldValue('userPhone')) {
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
      
      store.dispatch(getCodeAction({mobile: form.getFieldValue('userPhone')}))

    } else if(form.getFieldError('userPhone')||!form.getFieldValue('userPhone')) {
      Toast.info('请输入正确的手机号')
    }
  }

  handleSubmit = () => {
    const store = this.props
    this.props.form.validateFields((error, value) => {
      if(!error) {
        const formData = {
          userCardId: value.userCardId,
          userCardType: value.userCardType[0],
          userPhone: value.userPhone,
          validateCode: value.validateCode
        }
        // console.log(formData)
        store.dispatch(getbackPasswordAction(formData))
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    return (
      <div>
        <List>
          <Picker 
            {...getFieldProps('userCardType', {initialValue: [1]})}
            data={[cardList]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-idcard login__icon' />证件类型</List.Item>
          </Picker>
          <InputItem 
            {...getFieldProps('userCardId', {rules: [{required: true, message: '请输入证件号'}]})}
            type='text'
            placeholder='请输入证件号'
            labelNumber={7}
            error={isFieldTouched('userCardId')&&getFieldError('userCardId')}
            onErrorClick={() => Toast.info(getFieldError('userCardId'))}
          ><i className='anticon icon-idcard login__icon' />证件号</InputItem>
          <InputItem
            {...getFieldProps('userPhone', {rules: [{required: true, message: '请输入手机号'}, {pattern: /1\d{10}\b/, message: '请输入正确的11位手机号'}]})}
            type='number' 
            placeholder='请输入手机号'
            labelNumber={7}
            error={isFieldTouched('userPhone')&&getFieldError('userPhone')}
            onErrorClick={() => Toast.info(getFieldError('userPhone'))}
          ><i className='anticon icon-mobile1 login__icon' />手机号</InputItem>
          <InputItem 
            {...getFieldProps('validateCode', {rules: [{required: true, message: '请输入验证码'}]})}
            type='number' 
            placeholder='请输入验证码'
            labelNumber={7}
            extra={this.state.codeMsg}
            onExtraClick={this.getCode}
            error={isFieldTouched('validateCode')&&getFieldError('validateCode')}
            onErrorClick={() => Toast.info(getFieldError('validateCode'))}
          ><i className='anticon icon-mobile1 login__icon' />验证码</InputItem>
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary' disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}>提交</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default connect(state => state)(createForm()(Index))
