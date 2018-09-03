import React from 'react'
import { connect } from 'react-redux'
import { FlexItem, MainContainer } from '../Common/FlexList'

import './personal.scss'

import { renderSex, renderCardType, renderMedicineCardType, encodeCard, encodeName, encodeMCard, encodeTel } from '../../utilities/common'
import { NullContent } from '../../components/Common/Null'

const SubContent = ({title, icon}) => (
  <MainContainer className='user__ownlist'>
    <p><i className={`anticon icon-${icon} user__tipicon`} />{title}</p>
  </MainContainer>
)

class Index extends React.Component {
  render() {
    const { accountReducer } = this.props
    const { accountList, familyKey } = accountReducer
  
    return (
      <React.Fragment>
        {
        familyKey !== null && typeof accountList[familyKey] !== 'undefined' ? (
          <React.Fragment>
            <div className='flex__list__border'>
              <FlexItem 
                sub={<SubContent title='真实姓名' icon='user' />}
                widthSub='38%'  
                widthExtra='0'  
              >
                <MainContainer className='user__ownlist'>
                  <p>{encodeName(accountList[familyKey].name)}</p>
                </MainContainer>
              </FlexItem>
            </div>
            <div className='flex__list__border'>
              <FlexItem 
                sub={<SubContent title='性别' icon='smileo' />}
                widthSub='38%'  
                widthExtra='0'  
              >
                <MainContainer className='user__ownlist'>
                  <p>{renderSex(accountList[familyKey].sex)}</p>
                </MainContainer>
              </FlexItem>
            </div>
            <div className='flex__list__border'>
              <FlexItem 
                sub={<SubContent title='证件类型' icon='idcard' />}
                widthSub='38%'  
                widthExtra='0'  
              >
                <MainContainer className='user__ownlist'>
                  <p>{renderCardType(accountList[familyKey].cardType)}</p>
                </MainContainer>
              </FlexItem>
            </div>
            <div className='flex__list__border'>
              <FlexItem 
                sub={<SubContent title='证件号码' icon='idcard' />}
                widthSub='38%'  
                widthExtra='0'  
              >
                <MainContainer className='user__ownlist'>
                  <p>{encodeCard(accountList[familyKey].cardId)}</p>
                </MainContainer>
              </FlexItem>
            </div>
            <div className='flex__list__border'>
              <FlexItem 
                sub={<SubContent title='手机号' icon='mobile1' />}
                widthSub='38%'  
                widthExtra='0'  
              >
                <MainContainer className='user__ownlist'>
                  <p>{encodeTel(accountList[familyKey].mobile)}</p>
                </MainContainer>
              </FlexItem>
            </div>
            <div className='flex__list__border'>
              <FlexItem 
                sub={<SubContent title='卡类型' icon='idcard' />}
                widthSub='38%'  
                widthExtra='0'  
              >
                <MainContainer className='user__ownlist'>
                  <p>{renderMedicineCardType(accountList[familyKey].medicineCardType)}</p>
                </MainContainer>
              </FlexItem>
            </div>
            <div className='flex__list__border'>
              <FlexItem 
                sub={<SubContent title='卡号' icon='idcard' />}
                widthSub='38%'  
                widthExtra='0'  
              >
                <MainContainer className='user__ownlist'>
                  <p>{encodeMCard(accountList[familyKey].medicineCardId)}</p>
                </MainContainer>
              </FlexItem>
            </div>
          </React.Fragment>
          ) : <NullContent msg='用户不存在' />
        }
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)
