import React from 'react'
import Router from 'next/router'
import { WhiteSpace, WingBlank, Button } from 'antd-mobile'

import './personal.scss'

import { FlexList, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

const SubContent = ({title, icon}) => (
  <MainContainer mainClass='user__ownlist'>
    <p><i className={`anticon icon-${icon} user__tipicon`} />{title}</p>
  </MainContainer>
)

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
    return (
      <div>
        <FlexList 
          sub={<SubContent title='真实姓名' icon='user' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>石菁</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='身份证号' icon='idcard' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>123456789987656</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='手机号' icon='mobile1' />}
          config={configListLast}>
          <MainContainer mainClass='user__ownlist'>
            <p>123456789</p>
          </MainContainer>
        </FlexList>
        <WhiteSpace size='lg' />
        <FlexList 
          sub={<SubContent title='性别' icon='smileo' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>石菁</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='生日' icon='gift' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>123456789987656</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='联系地址' icon='enviromento' />}
          config={configListLast}>
          <MainContainer mainClass='user__ownlist'>
            <p>联系地址联系地址联系地址联系地址联系地址联系地址联系地址联系地址联系地址联系地址联系地址</p>
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

export default Index
