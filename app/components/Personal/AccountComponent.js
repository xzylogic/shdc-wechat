import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

import './personal.scss'

class Index extends React.Component {
  state = {
    descOn: false 
  }

  render() {
    const configAccount = new FlexListConfigEntity({
      leftWidth: '85px',
      rightWidth: '35px', 
      minHeight: '50px',
      withBorder: false
    })
    const configFamily = new FlexListConfigEntity({
      leftWidth: '100px',
      rightWidth: '35px', 
      minHeight: '100px',
      withBorder: 'dash'
    })
    const configFamilyLast = new FlexListConfigEntity({
      leftWidth: '100px',
      rightWidth: '35px', 
      minHeight: '100px',
      withBorder: 'border'
    })
    const { accountReducer } = this.props
    const { accountInfo } = accountReducer
    const { accountList } = accountReducer
    return (
      <div>
        <Link href={`/personal/detail`}>
          <List>
            <FlexList
              sub={<ImageContainer
                imageUrl={accountInfo && accountInfo.portrait || '/static/images/avatar_user.png'}
                imageClass='user__avatar'
                containerStyle={{ padding: '18px 12px' }}
              />}
              extra={<i className='anticon icon-right user__arraw' />}
              config={configAccount}>
              <MainContainer mainClass='user__desc'>
                <p className='name'>{accountInfo && accountInfo.username}</p>
                <p>身份证号：{accountInfo && accountInfo.cardId}</p>
                <p>联系电话：{accountInfo && accountInfo.mobile}</p>
              </MainContainer>
            </FlexList>
          </List>
        </Link>
        <WhiteSpace />
        <List>
          <List.Item thumb={<i className='anticon icon-user user__tipicon' />}>
            我的家庭成员
          </List.Item>
        </List>
        <div style={{background: '#fff'}}>{
          Array.isArray(accountList) && accountList.map((data, index) => (
            <FlexList
              key={index}
              sub={<MainContainer mainClass='user__accounts'><p>姓名</p><p>证件号</p><p>卡号</p></MainContainer>}
              extra={<i className='anticon icon-right user__arraw' />}
              onClick={() => Router.push(`/personal/familydetail?id=${index}`, `/personal/familydetail/${index}`)}
              config={(index + 1) === accountList.length ? configFamilyLast : configFamily}>
              <MainContainer mainClass='user__accounts'>
                <p>{data.name}</p>
                <p>{data.cardId}</p>
                <p>{data.medicineCardId}</p>
              </MainContainer>
            </FlexList>
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
            <Button type='primary'>添加家庭关系</Button>
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
