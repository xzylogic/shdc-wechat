import React from 'react'
import Router from 'next/router'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'
import { NullList } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common'

class Index extends React.Component {

  handleClick = (obj) => {
    Router.push(
      `/appointment/entrance?hosOrgCode=${obj.hosOrgCode}&hosDeptCode=0&toHosDeptCode=0`,
      `/appointment/entrance/${obj.hosOrgCode}/0/0`
    )
  }

  handleMapClick = (obj, event) => {
    event.stopPropagation()
    Router.push(
      `/appointment/map?hosOrgName=${obj.hosName}&address=${obj.hospitalAdd}&latitude=${obj.latitude}&longitude=${obj.longitude}`,
      `/appointment/map/${obj.hosName}/${obj.hospitalAdd}/${obj.latitude}/${obj.longitude}`
    )
  }

  render() {
    const hospitals = this.props.hospitals || []
    return (
      <div style={{background: '#fff'}}>{
      checkNotNullArr(hospitals) ? hospitals.map((obj, index) => (
        <div key={index} className='flex__list__border'>
          <FlexItem
            sub={<ImgContainer 
              style={{padding: '15px'}} 
              src={`https://shdcapp.wondersgroup.com/mobilemedicalplatform${obj.hosImage}`} 
            />}
            extra=''
            widthSub='100px'
            widthExtra='15px'
            onClick={this.handleClick.bind(this, obj)}
          >
            <MainContainer className='hospital__desc'>
              <p>{obj.hosName}</p>
              <p>
                地址：{obj.hospitalAdd} 
                <i className='anticon icon-enviroment hospital__icon' onClick={this.handleMapClick.bind(this, obj)} />
              </p>
            </MainContainer>
          </FlexItem>
        </div>
      )) : <NullList />
      }</div>
    )
  }
}

export default Index
