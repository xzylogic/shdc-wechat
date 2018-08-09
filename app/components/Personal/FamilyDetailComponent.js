import React from 'react'
import { connect } from 'react-redux'
import { FlexList, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

import './personal.scss'

import { renderSex, renderCardType, renderMedicineCardType } from '../../utilities/common'
import { NullContent } from '../../components/Common/Null'

const SubContent = ({title, icon}) => (
  <MainContainer mainClass='user__ownlist'>
    <p><i className={`anticon icon-${icon} user__tipicon`} />{title}</p>
  </MainContainer>
)

class Index extends React.Component {
  render() {
    const { accountReducer } = this.props
    const { accountList, familyKey } = accountReducer
    const configList = new FlexListConfigEntity({
      leftWidth: '38%',
      rightWidth: 0, 
      minHeight: '30px',
      withBorder: 'href'
    })
    return (
      <React.Fragment>
        {
          familyKey !== null && typeof accountList[familyKey] !== 'undefined' ? (
            <div style={{background: '#fff'}}>
              <FlexList 
                sub={<SubContent title='真实姓名' icon='user' />}
                config={configList}>
                <MainContainer mainClass='user__ownlist'>
                  <p>{accountList[familyKey].name}</p>
                </MainContainer>
              </FlexList>
              <FlexList 
                sub={<SubContent title='性别' icon='smileo' />}
                config={configList}>
                <MainContainer mainClass='user__ownlist'>
                  <p>{renderSex(accountList[familyKey].sex)}</p>
                </MainContainer>
              </FlexList>
              <FlexList 
                sub={<SubContent title='证件类型' icon='idcard' />}
                config={configList}>
                <MainContainer mainClass='user__ownlist'>
                  <p>{renderCardType(accountList[familyKey].cardType)}</p>
                </MainContainer>
              </FlexList>
              <FlexList 
                sub={<SubContent title='证件号码' icon='idcard' />}
                config={configList}>
                <MainContainer mainClass='user__ownlist'>
                  <p>{accountList[familyKey].cardId}</p>
                </MainContainer>
              </FlexList>
              <FlexList 
                sub={<SubContent title='手机号' icon='mobile1' />}
                config={configList}>
                <MainContainer mainClass='user__ownlist'>
                  <p>{accountList[familyKey].mobile}</p>
                </MainContainer>
              </FlexList>
              <FlexList 
                sub={<SubContent title='卡类型' icon='idcard' />}
                config={configList}>
                <MainContainer mainClass='user__ownlist'>
                  <p>{renderMedicineCardType(accountList[familyKey].medicineCardType)}</p>
                </MainContainer>
              </FlexList>
              <FlexList 
                sub={<SubContent title='卡号' icon='idcard' />}
                config={configList}>
                <MainContainer mainClass='user__ownlist'>
                  <p>{accountList[familyKey].medicineCardId}</p>
                </MainContainer>
              </FlexList>
            </div>
          ) : <NullContent msg='用户不存在' />
        }
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)
