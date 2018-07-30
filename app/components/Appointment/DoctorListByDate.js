import React from 'react'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'
import AppointmentList from './AppointmentList'
import { NullImageContent } from '../Common/Null'
import { checkNullArr } from '../../utilities/common'

class Index extends React.Component {
  loadSchedules = (j, k, id) => {
    if (this.props.loadSchedules) {
      this.props.loadSchedules(j, k, id)
    }
  }

  modifyShow = (j) => {
    if (this.props.modifyShow) {
      this.props.modifyShow(j)
    }
  }

  render() {
    const data = this.props.doctors || []
    const config = new FlexListConfigEntity({
      leftWidth: '100px',
      rightWidth: '15px',
      minHeight: '80px',
      withBorder: 'href'
    })
    return (
      <div>{
        checkNullArr(data) ?
          <NullImageContent image={'/static/images/avatar_doctor.png'} msg={'暂无可预约专家、医生信息'} /> :
          data && Array.isArray(data) && data.map((obj, j) => (
            <div key={j}>
              <FlexList
                onClick={this.modifyShow.bind(this, j)}
                sub={<ImageContainer
                  imageUrl={`http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${obj.hosOrgCode}_${obj.hosDoctCode}.jpg`}
                  containerStyle={{margin: '15px', width: '70px', height: '70px'}}
                  containerClass='image__container-round'
                />}
                config={config}>
                <MainContainer mainClass='doctor__desc'>
                  <p className='title'>{obj.doctName} {obj.doctTile}</p>
                  <p className='desc'>{obj.doctInfo}</p>
                </MainContainer>
              </FlexList>
              <AppointmentList appointments={obj.schedules} loadSchedules={this.loadSchedules.bind(this, j)} />
            </div>
          ))
      }</div>
    )
  }
}

export default Index
