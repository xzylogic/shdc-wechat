import React from 'react'

import { FlexList, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

import './personal.scss'

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
          sub={<SubContent title='性别' icon='smileo' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>女</p>
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
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>123456789</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='卡类型' icon='idcard' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>石菁</p>
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<SubContent title='卡号' icon='idcard' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>123456789987656</p>
          </MainContainer>
        </FlexList>
      </div>
    )
  }
}

export default Index
