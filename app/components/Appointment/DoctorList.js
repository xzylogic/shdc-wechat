import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'
import { NullList, NullImageContent } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common'

class Index extends React.Component {

  handleClick = (obj) => {
    Router.push(
      `/appointment/doctor?hosDoctCode=${obj.hosDoctCode}&hosOrgCode=${obj.hosOrgCode}&hosDeptCode=${obj.hosDeptCode}&toHosDeptCode=${obj.topHosDeptCode}`,
      `/appointment/doctor/${obj.hosDoctCode}/${obj.hosOrgCode}/${obj.hosDeptCode}/${obj.topHosDeptCode}`
    )
  }

  render() {
    const data = this.props.doctors || []
    return (
      <React.Fragment>{
      checkNotNullArr(data) ? data.map((obj, index) => (
        <div key={index} className='flex__list__border'>
          <FlexItem
            sub={
              <ImgContainer 
                style={{margin: '15px', width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden'}} 
                src={`https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${obj.hosOrgCode}_${obj.hosDoctCode}.jpg`} />
            }
            extra=''
            widthSub='100px'
            widthExtra='15px'
            onClick={this.handleClick.bind(this, obj)}
          >
            <MainContainer className='doctor__desc'>
              <p className='title'>{obj.doctName} {obj.doctTile}</p>
              <p className='desc'>{obj.doctInfo}</p>
            </MainContainer>
          </FlexItem>
        </div>
      )) : (
        <div className='content-center'>
          <NullImageContent msg='暂无可预约专家、医生信息' image='/static/images/icon-null-doctor.png' />
        </div>
      )
      }</React.Fragment>
    )
  }
}

export default connect(state => state)(Index)
