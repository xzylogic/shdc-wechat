import React from 'react'
import Router from 'next/router'
import { WhiteSpace, WingBlank, List } from 'antd-mobile'

import './appointment.scss'
import '../Login/login.scss'

class Index extends React.Component {
  state = {
    show: false
  }

  render() {
    const tabs = [
      { title: '全部' },
      { title: '综合' },
      { title: '中医' },
      { title: '专科' }
    ]
    const { hosOrgCode, hosDeptCode, toHosDeptCode } = this.props
    return (
      <div>
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>{
          (hosDeptCode == 0 && toHosDeptCode == 0) ? (
            <List className='entrance__list'>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(`/appointment/departments?hosOrgCode=${hosOrgCode}&deptType=1&pageType=1`, `/appointment/departments/${hosOrgCode}/1/1`)
              }>专家门诊</List.Item>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(`/appointment/departments?hosOrgCode=${hosOrgCode}&deptType=2&pageType=2`, `/appointment/departments/${hosOrgCode}/2/2`)
              }>专病门诊</List.Item>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(`/appointment/departments?hosOrgCode=${hosOrgCode}&deptType=1&pageType=3`, `/appointment/departments/${hosOrgCode}/1/3`)
              }>普通门诊</List.Item>
            </List>
           ) : 
          (
            <List className='entrance__list'>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(
                  `/appointment/doctors?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}`, 
                  `/appointment/doctors/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}`)
              }>专家门诊</List.Item>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(
                  `/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}&pageType=2`, 
                  `/appointment/consultation/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}/2`)
              }>专病门诊</List.Item>
              <List.Item arrow='horizontal' onClick={
                () => Router.push(
                  `/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}&pageType=3`, 
                  `/appointment/consultation/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}/3`)
              }>普通门诊</List.Item>
            </List>
           )
        }
        </WingBlank>
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <div className='login__desc'>
            <div style={{height: this.state.show ? 'auto' : '190px', overflow: 'hidden'}}>
              <div className='content'>
                <i className='anticon icon-infocirlceo login__icon' />
                <p>预约须知：</p>
              </div>
              <div className='content'>
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
              </div>
            </div>
            <div style={{textAlign: 'right', paddingTop: '1em'}} onClick={()=> this.setState({show: !this.state.show})}>
              <i className={`anticon ${this.state.show ? 'icon-up' : 'icon-down'}`} />
            </div>
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default Index
