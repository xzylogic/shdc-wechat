import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { WhiteSpace, WingBlank, Button } from 'antd-mobile'

import { FlexList, MainContainer, FlexListConfigEntity, SubContent } from '../Common/FlexList'
import { logoutAction } from '../../store/actions/login.action'
import { renderSex } from '../../utilities/common'

import './personal.scss'

class Index extends React.Component {

  logout = () => {
    const store = this.props
    store.dispatch(logoutAction())
  }
  
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
        <div style={{background: '#fff'}}> 
          <FlexList 
            sub={<SubContent title='真实姓名' icon='user' />}
            config={configList}>
            <MainContainer mainClass='user__ownlist'>
              <p>{accountInfo && accountInfo.username}</p>
            </MainContainer>
          </FlexList>
          <FlexList 
            sub={<SubContent title='身份证号' icon='idcard' />}
            config={configList}>
            <MainContainer mainClass='user__ownlist'>
              <p>{accountInfo && accountInfo.cardId}</p>
            </MainContainer>
          </FlexList>
          <FlexList 
            sub={<SubContent title='手机号' icon='mobile1' />}
            config={configListLast}>
            <MainContainer mainClass='user__ownlist'>
              <p>{accountInfo && accountInfo.mobile}</p>
            </MainContainer>
          </FlexList>
        </div>
        <WhiteSpace size='lg' />
        <div style={{background: '#fff'}}> 
          <FlexList 
            sub={<SubContent title='性别' icon='smileo' />}
            config={configList}>
            <MainContainer mainClass='user__ownlist'>
              <p>{renderSex(accountInfo && accountInfo.sex)}</p>
            </MainContainer>
          </FlexList>
          <FlexList 
            sub={<SubContent title='生日' icon='gift' />}
            config={configList}>
            <MainContainer mainClass='user__ownlist'>
              <p>{accountInfo && accountInfo.birthday}</p>
            </MainContainer>
          </FlexList>
          <FlexList 
            sub={<SubContent title='联系地址' icon='enviromento' />}
            config={configListLast}>
            <MainContainer mainClass='user__ownlist'>
              <p>{accountInfo && accountInfo.address}</p>
            </MainContainer>
          </FlexList>
        </div>
        <WhiteSpace size='lg' />
        <div style={{background: '#fff'}}> 
          <FlexList 
            onClick={() => {Router.push('/personal/resetpwd')}}
            sub={<SubContent title='修改密码' icon='lock' />}
            extra={<i className='anticon icon-right user__arraw' />}
            config={configListLast}>
            <MainContainer mainClass='user__ownlist' />
          </FlexList>
        </div>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WingBlank>
          <Button type='primary' onClick={this.logout}>退出登录</Button>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default connect(state => state)(Index)
