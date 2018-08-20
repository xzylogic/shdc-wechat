import React from 'react'
import Link from 'next/link'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'
import { NullList } from '../Common/Null'
import { checkNullArr } from '../../utilities/common'

class Index extends React.Component {
  render() {
    const hospitals = this.props.hospitals || []
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
            href={`/appointment/entrance?hosOrgCode=${obj.hosOrgCode}&hosDeptCode=0&toHosDeptCode=0`} 
            as={`/appointment/entrance/${obj.hosOrgCode}/0/0`}
          >
            <FlexList 
              sub={<ImageContainer 
                imageUrl={`https://shdcapp.wondersgroup.com/mobilemedicalplatform${obj.hosImage}`} 
                containerStyle={{margin: '15px'}}
              />}
              config={config}>
              <MainContainer mainClass='hospital__desc'>
                <p>{obj.hosName}</p>
                <p>地址：{obj.hospitalAdd} 
                  <Link 
                    href={`/appointment/map?hosOrgName=${obj.hosName}&address=${obj.hospitalAdd}&latitude=${obj.latitude}&longitude=${obj.longitude}`}
                    as={`/appointment/map/${obj.hosName}/${obj.hospitalAdd}/${obj.latitude}/${obj.longitude}`}
                ><i className='anticon icon-enviroment hospital__location' /></Link>
                </p>
              </MainContainer>
            </FlexList>
          </Link>
        ))
      }</div>
    )
  }
}

export default Index
