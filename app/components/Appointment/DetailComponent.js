import React from 'react'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { List, InputItem, WhiteSpace, WingBlank, Button, Picker } from 'antd-mobile'

import './appointment.scss'

import { hasErrors, getMembers, getInitialMember, checkNotNullArr, checkNotNullObj } from '../../utilities/common'
import { getCodeAction } from '../../store/actions/login.action'
import { getOrderInfoAction, submitOrderAction } from '../../store/actions/appointment/detail.action'

const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', paddingLeft: 15 }}
  >
    <div style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
      <i className='anticon icon-user detail__icon' />
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '16px' }}>{props.extra}</div>
      <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>
        <i className='anticon icon-right'/>
      </div>
    </div>
  </div>
)

class Index extends React.Component {
  state = {
    codeTimer: null,
    codeMsg: `获取验证码`
  }

  componentDidMount() {
    const store = this.props
    const { detailReducer } = store
    store.dispatch(getOrderInfoAction())
    this.props.form.validateFields()
  }

  componentWillMount() {
    if(this.state.codeTimer) {
      clearInterval(this.setState.codeTimer)
    }
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

      this.setState({codeTimer: codeTimer})
      
      store.dispatch(getCodeAction({mobile: form.getFieldValue('mobile')}))

    } else if(form.getFieldError('mobile')||!form.getFieldValue('mobile')) {
      Toast.info('请输入正确的手机号')
    }
  }

  handleSubmit = () => {
    const store = this.props
    const { orderInfo } = store.detailReducer
    this.props.form.validateFields((error, value) => {
      if(!error) {
        const name = value.member[0].split('+')[0]
        const memberId = value.member[0].split('+')[1]
        let submitInfo = {
          hosDeptCode: orderInfo.hosDeptCode,
          hosOrgCode: orderInfo.hosOrgCode,
          numSourceId: orderInfo.numSourceId,
          orderTime: orderInfo.orderTime,
          scheduleId: orderInfo.scheduleId,
          visitCost: orderInfo.visitCost,
          visitLevelCode: orderInfo.visitLevelCode,
        }
        if (orderInfo.visitNo) {
          submitInfo.visitNo = orderInfo.visitNo
        }
        if (orderInfo.hosDoctCode) {
          submitInfo.hosDoctCode = orderInfo.hosDoctCode
        }
        if (memberId) {
          submitInfo.memberId = memberId
        }
        submitInfo.userName = name
        submitInfo.validateCode = value.validateCode
        console.log(submitInfo)
        store.dispatch(submitOrderAction(submitInfo))
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    const store = this.props
    const { orderInfo } = store.detailReducer
    const { accountList, accountInfo } = store.accountReducer
    return (
      <div>
        {
          checkNotNullArr(accountList) && (
            <Picker 
              {...getFieldProps('member', {initialValue: getInitialMember(accountList)})}
              data={getMembers(accountList)}
              cols={1}
              cascade={false}
            >
              <CustomChildren />
            </Picker>
          )
        }
        <WhiteSpace />
        <List>
          <InputItem
            name='username' 
            type='text' 
            labelNumber={7}
            value={orderInfo && orderInfo.hosName || ''}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-home detail__icon' />医院名称:</InputItem>
          <InputItem 
            name='password'
            type='text'
            labelNumber={7}
            value={orderInfo && orderInfo.deptName || ''}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-inbox detail__icon' />预约科室:</InputItem>
          {
            orderInfo && orderInfo.visitLevelCode == 1 ? (
              <InputItem
                name='username' 
                type='text' 
                labelNumber={7}
                value={orderInfo && orderInfo.doctName || ''}
                style={{color: '#18a6e0'}}
                readOnly
              ><i className='anticon icon-user detail__icon' />医生姓名:</InputItem>
            ) : ''
          }
          <InputItem 
            name='password'
            type='text'
            labelNumber={7}
            value={orderInfo && orderInfo.orderTime || ''}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-clockcircleo detail__icon' />门诊时间:</InputItem>
          <InputItem
            name='username' 
            type='text' 
            labelNumber={7}
            value={`¥${orderInfo && orderInfo.visitCost || 0}元`}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-pay-circle-o1 detail__icon' />挂号费用:</InputItem>
          <InputItem
            {...getFieldProps('mobile', {initialValue: accountInfo && accountInfo.mobile || ''})}
            name='mobile' 
            type='text' 
            labelNumber={7}
            style={{color: '#18a6e0'}}
            readOnly
          ><i className='anticon icon-mobile1 detail__icon' />手机号:</InputItem>
          <InputItem 
            {...getFieldProps('validateCode', {rules: [{required: true, message: '请输入验证码'}]})}
            type='number' 
            placeholder='请输入验证码'
            labelNumber={7}
            extra={this.state.codeMsg}
            onExtraClick={this.getCode}
            error={isFieldTouched('validateCode')&&getFieldError('validateCode')}
            onErrorClick={() => Toast.info(getFieldError('validateCode'))}
          ><i className='anticon icon-mobile1 detail__icon' />验证码</InputItem>
        </List>
        <WhiteSpace />
        <List>
          <List.Item extra={<i className='anticon icon-down' />}>
            <i className='anticon icon-exclamationcircleo detail__icon' />预约须知
          </List.Item>
        </List>
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <Button type='primary' disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}>确定预约</Button>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default connect(state => state)(createForm()(Index))
