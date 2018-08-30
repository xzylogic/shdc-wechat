import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'
import { checkNotNullArr } from '../../utilities/common'

import './personal.scss'

class Index extends React.Component {
  state = {
    descOn: false 
  }

  render() {
    const { accountReducer } = this.props
    const { accountInfo } = accountReducer
    const { accountList } = accountReducer
    return (
      <div>
        <Link href={`/personal/detail`}>
          <List>
            <FlexItem
              sub={
                <ImgContainer
                src={accountInfo && accountInfo.portrait || '/static/images/avatar_user.png'}
                style={{ padding: '18px 12px' }}
              />}
              extra={<i className='anticon icon-right user__arraw' />}
              widthSub='85px'
              widthExtra='35px'
            >
              <MainContainer className='user__desc'>
                <p className='name'>{accountInfo && accountInfo.username}</p>
                <p>身份证号：{accountInfo && accountInfo.cardId}</p>
                <p>联系电话：{accountInfo && accountInfo.mobile}</p>
              </MainContainer>
            </FlexItem>
          </List>
        </Link>
        <WhiteSpace />
        <List>
          <List.Item thumb={<i className='anticon icon-user user__tipicon' />}>
            我的家庭成员
          </List.Item>
        </List>
        <div className='flex__list__dash__container' style={{background: '#fff'}}>{
          checkNotNullArr(accountList) && accountList.map((data, index) => (
          <div key={index} className='flex__list__dash'>
            <FlexItem
              sub={<MainContainer className='user__accounts'><p>姓名</p><p>证件号</p><p>卡号</p></MainContainer>}
              extra={<i className='anticon icon-right user__arraw' />}
              onClick={() => Router.push(`/personal/familydetail?id=${index}`, `/personal/familydetail/${index}`)}
              widthSub='100px'
              widthExtra='35px'
            >
              <MainContainer className='user__accounts'>
                <p>{data.name}</p>
                <p>{data.cardId}</p>
                <p>{data.medicineCardId}</p>
              </MainContainer>
            </FlexItem>
          </div>
          ))
        }</div>
        <WhiteSpace />
        <List style={{border: 0}}>
          <List.Item 
            thumb={<i className='anticon icon-exclamationcircle user__tipicon' />} 
            extra={<i className={`anticon icon-down ${this.state.descOn ? 'icon__reverse reverse': 'icon__reverse'}`} />}
            onClick={() => this.setState({descOn: !this.state.descOn})}
          >
            家庭卡添加说明
          </List.Item>{ this.state.descOn ? (
          <p style={{padding: '15px', lineHeight: 1.75, color: '#999', fontSize: '15px'}}>
            1）仅支持添加复诊患者（曾在本平台所有医院中的任意一家就诊过的患者）座位家庭卡成员，添加时需要提供真是姓名和医疗卡，否则无法添加成功；<br />
            2）同一医疗卡只能绑定同一个人，不可重复绑定；<br />
            3）不同账号下的家庭卡成员不能使用相同的证件号码或手机号码，但同一账号下的家庭成员手机号码可重复；<br />
            4）每个用户至多能添加3张家庭卡，一般为当前用户、老人和儿童的家庭卡。<br />
          </p>) : ''}
        </List>
        <WhiteSpace size='lg' />
        <WingBlank>
          <Link href={`/personal/familyadd`}>
            <Button type='primary' disabled={accountList.length > 2}>添加家庭关系</Button>
          </Link>
        </WingBlank>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WingBlank>
          <p className='user__tips'>如果您的信息已通过其他途径修改，请重新登录。</p>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default connect(state => state)(Index)
