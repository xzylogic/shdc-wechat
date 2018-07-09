import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { WhiteSpace, WingBlank, Button } from 'antd-mobile'

import { FlexList, MainContainer, FlexListConfigEntity, SubContent } from '../Common/FlexList'

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
      return '未知'c
  }
}

class Index extends React.Component {
  render() {
    const configList = new FlexListConfigEntity({
      leftWidth: '38%',
      rightWidth: 0, 
      minHeight: '30px',
      withBorder: 'href'
    })
    const configListLast = new FlexListConfigEntity({
      leftWidth: '38%',
      rightWidth: 0, 
      minHeight: '30px',
      withBorder: false
    })
    const { accountReducer } = this.props
    const { accountInfo } = accountReducer
    return (
      <div>
        <FlexList 
          sub={<SubContent title='真实姓名' icon='user' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>{accountInfo.username}</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='身份证号' icon='idcard' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>{accountInfo.cardId}</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='手机号' icon='mobile1' />}
          config={configListLast}>
          <MainContainer mainClass='user__ownlist'>
            <p>{accountInfo.mobile}</p>
          </MainContainer>
        </FlexList>
        <WhiteSpace size='lg' />
        <FlexList 
          sub={<SubContent title='性别' icon='smileo' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>{renderSex(accountInfo.sex)}</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='生日' icon='gift' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>{accountInfo.birthday}</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='联系地址' icon='enviromento' />}
          config={configListLast}>
          <MainContainer mainClass='user__ownlist'>
            <p>{accountInfo.address}</p>
          </MainContainer>
        </FlexList>
        <WhiteSpace size='lg' />
        <FlexList 
          onClick={() => {Router.push('/personal/resetpwd')}}
          sub={<SubContent title='修改密码' icon='lock' />}
          extra={<i className='anticon icon-right user__arraw' />}
          config={configListLast}>
          <MainContainer mainClass='user__ownlist' />
        </FlexList>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WingBlank>
          <Button type='primary'>退出登录</Button>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default connect(state => state)(Index)
