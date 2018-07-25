import React from 'react'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'
import { NullImageContent } from '../Common/Null'
import { checkNullArr } from '../../utilities/common'

const renderList = ({doctName, doctTile, doctInfo, hosOrgCode, hosDoctCode}, index) => {
  const config = new FlexListConfigEntity({
    leftWidth: '100px',
    rightWidth: '15px',
    minHeight: '80px',
    withBorder: 'href'
  })

  return (
    <FlexList
      sub={<ImageContainer
        imageUrl={`http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${hosOrgCode}_${hosDoctCode}.jpg`}
      />}
      config={config} key={index}>
      <MainContainer mainClass='doctor__desc'>
        <p className='title'>{doctName} {doctTile}</p>
        <p className='desc'>{doctInfo}</p>
      </MainContainer>
    </FlexList>
  )
}

class Index extends React.Component {
  render() {
    const data = this.props.doctors || []
    return (
      <div>{
        checkNullArr(data) ?
          <NullImageContent image={'/static/images/avatar_doctor.png'} msg={'暂无可预约专家、医生信息'} /> :
          data && Array.isArray(data) && data.map((obj, index) => renderList(obj, index))
      }</div>
    )
  }
}

export default Index
