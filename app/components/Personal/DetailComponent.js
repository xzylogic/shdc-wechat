import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { WhiteSpace, WingBlank, Button, Modal } from 'antd-mobile'

import { FlexItem, MainContainer, SubContent } from '../Common/FlexList'
import { logoutAction } from '../../store/actions/login.action'
import { renderSex, encodeCard, encodeName, encodeTel } from '../../utilities/common'

import './personal.scss'

class Index extends React.Component {

  logout = () => {
    const store = this.props
    Modal.alert('提示信息', '每月最多退出登录10次，是否确定退出登录？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => store.dispatch(logoutAction()) },
    ])
  }
  
  render() {
    const { accountReducer } = this.props
    const { accountInfo } = accountReducer
    return (
      <div>
        <div className='flex__list__border'>
          <FlexItem 
            sub={<SubContent title='真实姓名' icon='user' />}
            widthSub='38%'  
            widthExtra='0'  
          >
            <MainContainer className='user__ownlist'>
              <p>{accountInfo && accountInfo.username && encodeName(accountInfo.username)}</p>
            </MainContainer>
          </FlexItem>
        </div>
        <div className='flex__list__border'>
          <FlexItem 
            sub={<SubContent title='身份证号' icon='idcard' />}
            widthSub='38%'  
            widthExtra='0'  
          >
            <MainContainer className='user__ownlist'>
              <p>{accountInfo && accountInfo.cardId && encodeCard(accountInfo.cardId)}</p>
            </MainContainer>
          </FlexItem>
        </div>
        <div style={{background: '#fff'}}>
          <FlexItem 
            sub={<SubContent title='手机号' icon='mobile1' />}
            widthSub='38%'  
            widthExtra='0'  
          >
            <MainContainer className='user__ownlist'>
              <p>{accountInfo && accountInfo.mobile && encodeTel(accountInfo.mobile)}</p>
            </MainContainer>
          </FlexItem>
        </div>
        <div className='flex__list__border'>
        </div>
        <WhiteSpace size='lg' />
        <div className='flex__list__border'>
          <FlexItem 
            sub={<SubContent title='性别' icon='smileo' />}
            widthSub='38%'  
            widthExtra='0'  
          >
            <MainContainer className='user__ownlist'>
              <p>{renderSex(accountInfo && accountInfo.sex)}</p>
            </MainContainer>
          </FlexItem>
        </div>
        <div className='flex__list__border'>
          <FlexItem 
            sub={<SubContent title='生日' icon='gift' />}
            widthSub='38%'  
            widthExtra='0'  
          >
            <MainContainer className='user__ownlist'>
              <p>{accountInfo && accountInfo.birthday}</p>
            </MainContainer>
          </FlexItem>
        </div>
        <div style={{background: '#fff'}}>
          <FlexItem 
            sub={<SubContent title='联系地址' icon='enviromento' />}
            widthSub='38%'  
            widthExtra='0'  
          >
            <MainContainer className='user__ownlist'>
              <p>{accountInfo && accountInfo.address}</p>
            </MainContainer>
          </FlexItem>
        </div>
        <WhiteSpace size='lg' />
        <div className='flex__list__border'>
          <FlexItem 
            onClick={() => {Router.push('/personal/resetpwd')}}
            sub={<SubContent title='修改密码' icon='lock' />}
            extra={<i className='anticon icon-right user__arraw' />}
            widthSub='38%'  
            widthExtra='0'  
          >
            <MainContainer className='user__ownlist' />
          </FlexItem>
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
