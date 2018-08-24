import React from 'react'
import Router from 'next/router'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'
import { NullList } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common' 

class Index extends React.Component {

  handleClick = (obj) => {
    switch(obj.sign) {
      case '1':
        Router.push(
          `/appointment/entrance?hosOrgCode=${obj.hosOrgCode}&hosDeptCode=0&toHosDeptCode=0`,
          `/appointment/entrance/${obj.hosOrgCode}/0/0`
        )
        return
      case '2':
        Router.push(
          `/appointment/entrance?hosOrgCode=${obj.hosOrgCode}&hosDeptCode=${obj.hosDeptCode}&toHosDeptCode=${obj.topHosDeptCode}`,
          `/appointment/entrance/${obj.hosOrgCode}/${obj.hosDeptCode}/${obj.topHosDeptCode}`
        )
        return
      case '3':
        Router.push(
          `/appointment/doctor?hosDoctCode=${obj.hosDoctCode}&hosOrgCode=${obj.hosOrgCode}&hosDeptCode=${obj.hosDeptCode}&toHosDeptCode=${obj.topHosDeptCode}`,
          `/appointment/doctor/${obj.hosDoctCode}/${obj.hosOrgCode}/${obj.hosDeptCode}/${obj.topHosDeptCode}`
        )
        return
      default:
        return
    }
  }

  renderImg = (obj) => {
    switch(obj.sign) {
      case '1':
        return `/static/images/avatar_hospital.png`
      case '2':
        return `/static/images/avatar_department.png`
      case '3':
        return `/static/images/avatar_doctor.png`
      default:
        return ''
    }
  }

  renderContent = (obj) => {
    switch(obj.sign) {
      case '1':
        return (
          <React.Fragment>
            <p>{obj.hosName}</p>
            <p>医院等级：{obj.hospitalGrade}</p>
            <p>医院地址：{obj.hospitalAdd}</p>
          </React.Fragment>
        )
      case '2':
        return (
          <React.Fragment>
            <p>{obj.deptName}</p>
            <p>医院名称：{obj.hosName}</p>
            <p>医院地址：{obj.hospitalAdd}</p>
          </React.Fragment>
        )
      case '3':
        return (
          <React.Fragment>
            <p>{obj.doctName}</p>
            <p>医院名称：{obj.hosName}</p>
            <p>科室名称：{obj.deptName}</p>
            <p>医生特长：{obj.doctInfo}</p>
          </React.Fragment>
        )
      default:
        return ''
    }
  }

  render() {
    const searchList = this.props.searchList
    return (
      <div style={{background: '#fff'}}>{ 
        checkNotNullArr(searchList) ? searchList.map((obj, index) => (
          <div key={index} className='flex__list__border'>
            <FlexItem
              sub={<ImgContainer 
                style={{padding: '15px'}} 
                src={this.renderImg(obj)} 
              />}
              extra=''
              widthSub='100px'
              widthExtra='15px'
              onClick={this.handleClick.bind(this, obj)}
            >
              <MainContainer className='hospital__desc'>
                {this.renderContent(obj)}
              </MainContainer>
            </FlexItem>
          </div>
        )) :  <NullList />
      }</div>
    )
  }
}

export default Index
