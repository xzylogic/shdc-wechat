import React from 'react'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'
import AppointmentList from './AppointmentList'
import { NullImageContent } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common'

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
    return (
      <div>{
        checkNotNullArr(data) ?
          data.map((obj, j) => (
            <div key={j} className='flex__list__border'>
              <FlexItem
                sub={
                  <ImgContainer
                    style={{margin: '15px', width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden'}} 
                    src={`http://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${obj.hosOrgCode}_${obj.hosDoctCode}.jpg`}
                />}
                extra=''
                onClick={this.modifyShow.bind(this, j)}
              >
                <MainContainer className='doctor__desc'>
                  <p className='title'>{obj.doctName} {obj.doctTile}</p>
                  <p className='desc'>{obj.doctInfo}</p>
                </MainContainer>
              </FlexItem>
              {obj.show ? <AppointmentList type={'deptName'} appointments={obj.schedules} loadSchedules={this.loadSchedules.bind(this, j)} style={{borderTop: '1px solid #eee'}}/> : ''}
            </div>
          )) : <NullImageContent msg='暂无可预约专家、医生信息' image='/static/images/icon-null-doctor.png' />
      }</div>
    )
  }
}

export default Index
