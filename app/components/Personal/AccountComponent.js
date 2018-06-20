import React from 'react'
import { List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

import './personal.scss'

class Index extends React.Component {

  render() {
    const img = 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png'
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
    return (
      <div>
        <List>
          <FlexList 
            sub={<ImageContainer imageUrl={img} imageClass='user__avatar' containerPadding='18px 12px' />}
            extra={<i className='anticon icon-right user__arraw' />}
            config={configAccount}>
            <MainContainer mainClass='user__desc'>
              <p className='name'>石菁</p>
              <p>身份证号：123445678765434567</p>
              <p>联系电话：12334545</p>
            </MainContainer>
          </FlexList>
        </List>
        <WhiteSpace />
        <List>
          <List.Item thumb={<i className='anticon icon-user user__tipicon' />}>
            我的家庭成员
          </List.Item>
        </List>
        <FlexList 
          sub={<MainContainer mainClass='user__accounts'><p>姓名</p><p>身份证</p><p>卡号</p></MainContainer>}
          extra={<i className='anticon icon-right user__arraw' />}
          config={configFamily}>
          <MainContainer mainClass='user__accounts'>
            <p>石菁</p>
            <p>123445678765434567</p>
            <p>12334545</p>            
          </MainContainer>
        </FlexList>
        <FlexList 
          sub={<MainContainer mainClass='user__accounts'><p>姓名</p><p>身份证</p><p>卡号</p></MainContainer>}
          extra={<i className='anticon icon-right user__arraw' />}
          config={configFamilyLast}>
          <MainContainer mainClass='user__accounts'>
            <p>石菁</p>
            <p>123445678765434567</p>
            <p>12334545</p>
          </MainContainer>
        </FlexList>
        <WhiteSpace />
        <List style={{border: 0}}>
          <List.Item thumb={<i className='anticon icon-exclamationcircle user__tipicon' />} arrow='down'>
            家庭卡添加说明
          </List.Item>
        </List>
        <WhiteSpace size='lg' />
        <WingBlank>
          <Button type='primary'>添加家庭关系</Button>
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

export default Index
