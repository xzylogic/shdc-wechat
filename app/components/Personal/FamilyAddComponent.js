import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, WingBlank, WhiteSpace, Button, Picker, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'

import { familyAddAction } from '../../store/actions/personal/account.action'

import '../Login/login.scss'

class Index extends React.Component {

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = () => {
    const store = this.props
    this.props.form.validateFields((error, value) => {
      if(!error) {
        const formData = {
          cardId: value.cardId,
          cardType: value.cardType[0],
          medicineCardId: value.medicineCardId,
          medicineCardType: value.medicineCardType[0],
          mobile: value.mobile,
          name: value.name,
          sex: value.sex[0]
        }
        store.dispatch(familyAddAction(formData))
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    return (
      <div>
        <List>
          <InputItem 
            {...getFieldProps('name', {rules: [{required: true, message: '请输入真实姓名'}]})}
            type='text'
            placeholder='请输入真实姓名（必填）'
            labelNumber={7}
            error={isFieldTouched('name')&&getFieldError('name')}
            onErrorClick={() => Toast.info(getFieldError('name'))}
          ><i className='anticon icon-user login__icon' />真实姓名</InputItem>
          <Picker
            {...getFieldProps('sex', {initialValue: [1]})}
            data={[[{label:'男',value:1},{label:'女',value:2},{label:'未知',value:0}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-smileo login__icon' />性别</List.Item>
          </Picker>
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
          <InputItem
            {...getFieldProps('mobile', {rules: [{required: true, message: '请输入手机号'}, {pattern: /1\d{10}\b/, message: '请输入正确的11位手机号'}]})}
            type='text' 
            placeholder='请输入手机号（必填）'
            labelNumber={7}
            error={isFieldTouched('mobile')&&getFieldError('mobile')}
            onErrorClick={() => Toast.info(getFieldError('mobile'))}
          ><i className='anticon icon-mobile1 login__icon' />手机号</InputItem>
          <Picker
            {...getFieldProps('medicineCardType',  {initialValue: [1]})}
            data={[[{label:'社保卡',value:1},{label:'医联卡',value:2}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-idcard login__icon' />卡类型</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('medicineCardId', {rules: [{required: true, message: '请输入卡号'}]})}
            type='number'
            placeholder='请输入卡号（必填）'
            labelNumber={7}
            error={isFieldTouched('medicineCardId')&&getFieldError('medicineCardId')}
            onErrorClick={() => Toast.info(getFieldError('medicineCardId'))}
          ><i className='anticon icon-idcard login__icon' />卡号</InputItem>
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary' disabled={this.hasErrors(getFieldsError())} onClick={this.handleSubmit}>提交</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default connect(state => state)(createForm()(Index))
