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
          `/appointment/entrance?hosOrgCode=${obj.hosOrgCode}&hosDeptCode=0&toHosDeptCode=0&deptName=${obj.deptName}`,
          `/appointment/entrance/${obj.hosOrgCode}/0/0/${obj.deptName}`
        )
        return
      case '2':
        Router.push(
          `/appointment/entrance?hosOrgCode=${obj.hosOrgCode}&hosDeptCode=${obj.hosDeptCode}&toHosDeptCode=${obj.topHosDeptCode}&deptName=${obj.deptName}`,
          `/appointment/entrance/${obj.hosOrgCode}/${obj.hosDeptCode}/${obj.topHosDeptCode}/${obj.deptName}`
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
        return `http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${obj.hosOrgCode}.jpg`
      case '2':
        return `http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${obj.hosOrgCode}.jpg`
      case '3':
        return `http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${obj.hosOrgCode}_${obj.hosDoctCode}.jpg`
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

  nofind = (event, obj) => {
    let img = event.target
    switch(obj.sign) {
      case '1':
        img.src = `/static/images/avatar_hospital.jpg`
        img.onError = null
        return
      case '2':
        img.src = `/static/images/avatar_hospital.jpg`
        img.onError = null
        return
      case '3':
        img.src = `/static/images/avatar_doctor.png`
        img.onError = null
        return
      default:
        img.onError = null
        return
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
                style={{margin: '15px', width: '70px', maxHeight: '70px', overflow: 'hidden'}} 
                src={this.renderImg(obj)} 
                onError={(event) => this.nofind(event, obj)}
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
