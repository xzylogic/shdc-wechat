import React from 'react'
import Router from 'next/router'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'
import { NullList } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common'

class Index extends React.Component {

  handleClick = (pageType, hosOrgCode) => {
    switch(pageType) {
      case '1':
        Router.push(
         `/personal/waitingmine?hosOrgCode=${hosOrgCode}`,
         `/personal/waitingmine/${hosOrgCode}`
        )
        return
      case '2':
        Router.push(
          `/personal/waitingdepartment?hosOrgCode=${hosOrgCode}`,
          `/personal/waitingdepartment/${hosOrgCode}`
        )
        return
      default:
        return ''
    }
  }

  render() {
    const hospitals = this.props.hospitals || []
    const pageType = this.props.pageType
    return (
      <div>{
        checkNotNullArr(hospitals) ? hospitals.map((obj, index) => (
          <div key={index} className='flex__list__border'>
            <FlexItem 
              sub={
                <ImgContainer 
                  src={`https://shdcapp.wondersgroup.com/mobilemedicalplatform${obj.hosImage}`} 
                  style={{margin: '15px'}}
              />}
              onClick={this.handleClick.bind(this, pageType, obj.hosOrgCode)}
            >
              <MainContainer className='hospital__desc'>
                <p>{obj.hosName}</p>
                <p>地址：{obj.hospitalAdd}</p>
              </MainContainer>
            </FlexItem>
          </div>
        )) : <NullList />
      }</div>
    )
  }
}

export default Index
