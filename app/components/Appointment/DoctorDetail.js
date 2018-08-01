import React from 'react'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

class DoctorDetail extends React.Component {
  render() {
    const { doctor, schedules } = this.props
    const config = new FlexListConfigEntity({
      leftWidth: '100px',
      rightWidth: '15px',
      minHeight: '80px',
      withBorder: 'href'
    })
    return (
      <div>
        <FlexList
          sub={<ImageContainer
            imageUrl={`http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${doctor.hosOrgCode}_${doctor.hosDoctCode}.jpg`}
            containerClass={'image__container-round'}
            containerStyle={{width: '70px', height: '70px', margin: '15px'}}
          />}
          mainClass='doctor__detail'
          config={config}>
          <MainContainer mainClass='doctor__desc__detail'>
            <p>{doctor.doctName}</p>
            <p>{doctor.doctTile}</p>
          </MainContainer>
        </FlexList>
        <div className='doctor__detail__desc'>专家简介：{doctor.doctInfo}</div>
        <div className='doctor__detail__desc'>门诊时间：{schedules}</div>
      </div>
    )
  }
}

export default DoctorDetail