import React from 'react'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { List, InputItem, WhiteSpace, WingBlank, Button, Picker } from 'antd-mobile'

import './appointment.scss'

import { hasErrors, getMembers, getInitialMember, checkNotNullArr } from '../../utilities/common'
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
        <i className='anticon icon-right' />
      </div>
    </div>
  </div>
)

class Index extends React.Component {
  state = {
    codeTimer: null,
    codeMsg: `获取验证码`,
    show: false
  }

  componentWillMount() {
    const store = this.props
    store.dispatch(getOrderInfoAction())
  }

  componentDidMount() {
    this.props.form.validateFields()
  }

  componentWillUnmount() {
    if(this.state.codeTimer) {
      clearInterval(this.state.codeTimer)
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

    } else if (form.getFieldError('mobile')||!form.getFieldValue('mobile')) {
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
          visitLevelCode: orderInfo.visitLevelCode
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
        submitInfo.patientName = name
        submitInfo.validateCode = value.validateCode
        // console.log(submitInfo)
        store.dispatch(submitOrderAction(submitInfo))
      }
    })
  }

  getOrderTime = (time) => {
    let orderTime = time.toString()
    return orderTime.replace(/^(.{16}).{3}(.{6}).{3}/, '$1$2')
  } 

  render() {
    const { getFieldProps, getFieldError, getFieldsError, isFieldTouched } = this.props.form
    const store = this.props
    const { orderInfo } = store.detailReducer
    const { accountList, accountInfo } = store.accountReducer
    return (
      <div className='appointment__detail'>
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
            style={{color: '#35b2f2'}}
            disabled
          ><i className='anticon icon-home detail__icon' />医院名称:</InputItem>
          <InputItem 
            name='password'
            type='text'
            labelNumber={7}
            value={orderInfo && orderInfo.deptName || ''}
            style={{color: '#35b2f2'}}
            disabled
          ><i className='anticon icon-inbox detail__icon' />预约科室:</InputItem>
          {
            orderInfo && orderInfo.visitLevelCode == 1 ? (
              <InputItem
                name='username' 
                type='text' 
                labelNumber={7}
                value={orderInfo && orderInfo.doctName || ''}
                style={{color: '#35b2f2'}}
                disabled
              ><i className='anticon icon-user detail__icon' />医生姓名:</InputItem>
            ) : ''
          }
          <InputItem 
            name='password'
            type='text'
            labelNumber={7}
            value={orderInfo && orderInfo.orderTime && this.getOrderTime(orderInfo.orderTime) || ''}
            style={{color: '#35b2f2'}}
            disabled
          ><i className='anticon icon-clockcircleo detail__icon' />门诊时间:</InputItem>
          <InputItem
            name='username' 
            type='text' 
            labelNumber={7}
            value={`¥${orderInfo && orderInfo.visitCost || 0}元`}
            style={{color: '#35b2f2'}}
            disabled
          ><i className='anticon icon-pay-circle-o1 detail__icon' />挂号费用:</InputItem>
          <InputItem
            {...getFieldProps('mobile', {initialValue: accountInfo && accountInfo.mobile})}
            name='mobile' 
            type='text' 
            labelNumber={7}
            style={{color: '#35b2f2'}}
            disabled
          ><i className='anticon icon-mobile1 detail__icon' />手机号:</InputItem>
          <InputItem 
            {...getFieldProps('validateCode', {rules: [{required: true, message: '请输入验证码'}]})}
            type='number' 
            placeholder='请输入验证码'
            labelNumber={7}
            extra={<Button type='primary' style={{padding: '0'}} size='small'>{this.state.codeMsg}</Button>}
            onExtraClick={this.getCode}
            error={isFieldTouched('validateCode')&&getFieldError('validateCode')}
            onErrorClick={() => Toast.info(getFieldError('validateCode'))}
          ><i className='anticon icon-mobile1 detail__icon' />验证码</InputItem>
        </List>
        <WhiteSpace />
        <List>
          <List.Item 
            extra={<i className={`anticon icon-down icon_reverse ${this.state.show ? 'reverse' : ''}`} style={{display: 'inline-block'}} />}
            onClick={() => this.setState({show: !this.state.show})}
          >
            <i className='anticon icon-exclamationcircleo detail__icon' />预约须知
          </List.Item>{ this.state.show ? (
          <div style={{padding: '15px', lineHeight: 1.75, color: '#666', fontSize: '15px'}}>
            <p>◆ 预约适用对象</p>
            <p>本平台预约面向全国所有患者，不收取任何费用。</p>
            <p>◆ 患者类别</p>
            <p>1）初诊患者：从未在本平台38家医院中的任意一家就诊过的患者，即为初诊患者。</p>
            <p>2）复诊患者：曾在本平台38家医院中的任意一家就诊过的患者，即为复诊患者。</p>
            <p>◆ 预约周期</p>
            <p>根据不同医院的预约要求，预约周期从7天至30天不等，最早可预约时间分0点、7点半、14点。具体详见“常见问题”的《各医院预约周期》。</p>
            <p>◆ 预约次数限制</p>
            <p>1）同一患者在同一就诊日同一医院同一专科只能预约1次；</p>
            <p>2）同一患者在同一日预约不可超过3次，在七日内预约不可超过6次；</p>
            <p>3）同一账号（包括用户以及家庭卡成员），一个月最多预约10次。</p>
            <p>◆ 取消预约</p>
            <p>1）因故无法就诊，患者必须至少提前1-2天，通过网站或电话取消预约。具体详见“常见问题”的《各医院预约周期》。</p>
            <p>◆ 爽约责任</p>
            <p>预约者须在当天预约时间进行挂号就诊，事先未取消预约又未按时挂号就诊的患者视为爽约。90天内累计三次爽约的患者将被列入违约黑名单，180天内不能在本平台进行预约挂号，但不影响医院现场挂号，180天后自动解禁。</p>
            <p>进入黑名单的用户，包括其家庭卡成员均无法在网站进行预约操作，无法新增或者修改家庭卡。</p>
            <p>◆ 实名制就诊</p>
            <p>采用全实名制就诊，若就诊时患者无法提供预约登记时的有效证件、有效就诊医疗卡及预约回复短信，则本次预约视为无效，以保护所有预约患者的利益。</p>
            <p>1）初诊患者：</p>
            <p>无就诊医疗卡患者必须持预约时登记的有效证件及预约回复短信至医院实名制挂号就诊。</p>
            <p>持就诊医疗卡患者必须持预约时登记的有效证件、有效就诊医疗卡及预约回复短信至医院实名制挂号就诊。</p>
            <p>2）复诊患者：</p>
            <p>预约患者必须持预约时登记的有效就诊医疗卡（上海市社保卡、医保卡或医联卡）及预约回复短信至医院实名制挂号就诊。</p>
            <p>◆ 其他</p>
            <p>1）停诊：预约时请预留有效的手机号码，专家停诊时将以电话或短信的方式通知您。</p>
            <p>2）本服务旨在为广大患者提供便捷的预约方式，不承诺所有患者都能预约到所需号源。</p>
          </div>) : ''}
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
