import React from 'react'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'

class DoctorDetail extends React.Component {
  render() {
    const { doctor, schedules } = this.props
    
    return (
      <div style={{background: '#18a6e0'}}>
        <FlexItem
          sub={
            <ImgContainer
              style={{width: '70px', height: '70px', margin: '15px', borderRadius: '50%', overflow: 'hidden'}}
              src={`http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${doctor.hosOrgCode}_${doctor.hosDoctCode}.jpg`}
          />}
        >
          <MainContainer className='doctor__desc__detail'>
            <p>{doctor.doctName}</p>
            <p>{doctor.doctTile}</p>
          </MainContainer>
        </FlexItem>
        <div className='doctor__detail__desc'>专家简介：{doctor.doctInfo}</div>
        <div className='doctor__detail__desc'>门诊时间：{schedules}</div>
      </div>
    )
  }
}

export default DoctorDetail