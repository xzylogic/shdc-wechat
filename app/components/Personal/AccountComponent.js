import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

import './personal.scss'

const renderSex = (sex) => {
  switch (sex) {
    case 1:
      return '男'
    case '1':
      return '男'
    case 2:
      return '女'
    case '2':
      return '女'
    default:
      return '未知'
  }
}

const renderCardType = (cardType) => {
  switch (cardType) {
    case 1:
      return '社保卡'
    case '1':
      return '社保卡'
    case 2:
      return '医联卡'
    case '2':
      return '医联卡'
    default:
      return ''
  }
}

class Index extends React.Component {
  render() {
    const configAccount = new FlexListConfigEntity({
      leftWidth: '85px',
      rightWidth: '35px', 
      minHeight: '50px',
      withBorder: false
    })
    const configFamily = new FlexListConfigEntity({
      leftWidth: '80px',
      rightWidth: '35px', 
      minHeight: '100px',
      withBorder: 'dash'
    })
    const configFamilyLast = new FlexListConfigEntity({
      leftWidth: '80px',
      rightWidth: '35px', 
      minHeight: '100px',
      withBorder: 'border'
    })
    const { accountReducer } = this.props
    const { accountInfo, accountList } = accountReducer
    return (
      <div>
        <Link href={`/personal/detail`}>
          <List>
            <FlexList
              sub={<ImageContainer imageUrl={accountInfo.portrait || '/static/images/avatar_user.png'} imageClass='user__avatar' containerPadding='18px 12px' />}
              extra={<i className='anticon icon-right user__arraw' />}
              config={configAccount}>
              <MainContainer mainClass='user__desc'>
                <p className='name'>{accountInfo.username}</p>
                <p>身份证号：{accountInfo.cardId}</p>
                <p>联系电话：{accountInfo.mobile}</p>
              </MainContainer>
            </FlexList>
          </List>
        </Link>
        <WhiteSpace />
        <List>
          <List.Item thumb={<i className='anticon icon-user user__tipicon' />}>
            我的家庭成员
          </List.Item>
        </List>{
          Array.isArray(accountList) && accountList.map((data, index) => (
            <FlexList
              key={index}
              sub={<MainContainer mainClass='user__accounts'><p>姓名</p><p>性别</p><p>身份证</p><p>手机号</p><p>卡类型</p><p>卡号</p></MainContainer>}
              // extra={<i className='anticon icon-right user__arraw' />}
              config={(index + 1) === accountList.length ? configFamilyLast : configFamily}>
              <MainContainer mainClass='user__accounts'>
                <p>{data.name}</p>
                <p>{renderSex(data.sex)}</p>
                <p>{data.cardId}</p>
                <p>{data.mobile}</p>
                <p>{renderCardType(data.medicineCardType)}</p>
                <p>{data.medicineCardId}</p>
              </MainContainer>
            </FlexList>
          ))
        }
        <WhiteSpace />
        <List style={{border: 0}}>
          <List.Item thumb={<i className='anticon icon-exclamationcircle user__tipicon' />} arrow='down'>
            家庭卡添加说明
          </List.Item>
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
