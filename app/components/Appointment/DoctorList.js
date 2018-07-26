import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

const renderList = ({doctName, doctTile, doctInfo, hosOrgCode, hosDoctCode}, index, hosDeptCode, toHosDeptCode) => {
  const config = new FlexListConfigEntity({
    leftWidth: '100px',
    rightWidth: '15px',
    minHeight: '80px',
    withBorder: 'href'
  })

  return (
    <Link 
      key={index}
      href={`/appointment/doctor?hosDoctCode=${hosDoctCode}&hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}`} 
      as={`/appointment/doctor/${hosDoctCode}/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}`}
    >
      <FlexList
        sub={<ImageContainer
          imageUrl={`http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${hosOrgCode}_${hosDoctCode}.jpg`}
          containerClass={'image__container-round'}
          containerStyle={{width: '70px', height: '70px', margin: '15px'}}
        />}
        config={config} key={index}>
        <MainContainer mainClass='doctor__desc'>
          <p className='title'>{doctName} {doctTile}</p>
          <p className='desc'>{doctInfo}</p>
        </MainContainer>
      </FlexList>
    </Link>
  )
}

class Index extends React.Component {
  render() {
    const { hosDeptCode, toHosDeptCode } = this.props.doctorsReducer
    const data = this.props.doctors || []
    return (
      <div>{
        data.map((obj, index) => renderList(obj, index, hosDeptCode, toHosDeptCode))
      }</div>
    )
  }
}

export default connect(state => state)(Index)
