import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'
import { renderSex, renderCardType, renderMedicineCardType, checkNullObj, checkNullArr } from '../../utilities/common'
import { loadAccountInfoAction, loadAccountListAction } from '../../store/actions/personal/account.action'

import './personal.scss'

class Index extends React.Component {
  state = {
    descOn: false 
  }

  componentWillMount() {
    const store = this.props
    if (checkNullObj(store.accountReducer.accountInfo)) {
      store.dispatch(loadAccountInfoAction())
    }
    if (checkNullArr(store.accountReducer.accountList)) {
      store.dispatch(loadAccountListAction())
    }
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
        </List>{
          Array.isArray(accountList) && accountList.map((data, index) => (
            <FlexList
              key={index}
              sub={<MainContainer mainClass='user__accounts'><p>姓名</p><p>性别</p><p>证件类型</p><p>证件号</p><p>手机号</p><p>卡类型</p><p>卡号</p></MainContainer>}
              // extra={<i className='anticon icon-right user__arraw' />}
              config={(index + 1) === accountList.length ? configFamilyLast : configFamily}>
              <MainContainer mainClass='user__accounts'>
                <p>{data.name}</p>
                <p>{renderSex(data.sex)}</p>
                <p>{renderCardType(data.cardType)}</p>
                <p>{data.cardId}</p>
                <p>{data.mobile}</p>
                <p>{renderMedicineCardType(data.medicineCardType)}</p>
                <p>{data.medicineCardId}</p>
              </MainContainer>
            </FlexList>
          ))
        }
        <WhiteSpace />
        <List style={{border: 0}}>
          <List.Item 
            thumb={<i className='anticon icon-exclamationcircle user__tipicon' />} 
            arrow={this.state.descOn ? 'down':'horizontal'} 
            onClick={() => this.setState({descOn: !this.state.descOn})}
          >
            家庭卡添加说明
          </List.Item>{ this.state.descOn ? (
          <p style={{padding: '15px'}}>
            家庭卡添加说明家庭卡添加说明家庭卡添加说明家庭卡添加说明家庭卡添加说明
          </p>) : ''}
        </List>
        <WhiteSpace size='lg' />
        <WingBlank>
          <Link href={`/personal/family/add`}>
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
