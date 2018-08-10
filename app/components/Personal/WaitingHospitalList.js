import React from 'react'
import Link from 'next/link'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'
import { NullList } from '../Common/Null'
import { checkNullArr } from '../../utilities/common'

const renderLink = (pageType, hosOrgCode) => {
  switch(pageType) {
    case '1':
     return {
       href: `/personal/waitingmine?hosOrgCode=${hosOrgCode}`,
       as: `/personal/waitingmine/${hosOrgCode}`
     }
    case '2':
      return {
        href: `/personal/waitingdepartment?hosOrgCode=${hosOrgCode}`,
        as: `/personal/waitingdepartment/${hosOrgCode}`
      }
    default:
      return {
        href: '',
        as: ''
      }
  }
}

class Index extends React.Component {
  render() {
    const hospitals = this.props.hospitals || []
    const pageType = this.props.pageType
    const config = new FlexListConfigEntity({
      leftWidth: '100px',
      rightWidth: '15px', 
      minHeight: '80px',
      withBorder: 'href'
    })
    return (
      <div>{
        checkNullArr(hospitals) ? <NullList /> : hospitals.map((obj, index) => (
          <Link 
            key={index}
            href={renderLink(pageType, obj.hosOrgCode).href} 
            as={renderLink(pageType, obj.hosOrgCode).as}
          >
            <FlexList 
              sub={<ImageContainer 
                imageUrl={`https://shdcapp.wondersgroup.com/mobilemedicalplatform${obj.hosImage}`} 
                containerStyle={{margin: '15px'}}
              />}
              config={config}>
              <MainContainer mainClass='hospital__desc'>
                <p>{obj.hosName}</p>
                <p>地址：{obj.hospitalAdd}</p>
              </MainContainer>
            </FlexList>
          </Link>
        ))
      }</div>
    )
  }
}

export default Index
