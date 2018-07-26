import React from 'react'
import { connect } from 'react-redux'
import { Flex, Button } from 'antd-mobile'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'
import { NullImageContent } from '../Common/Null'
import { checkNullArr, formatTime } from '../../utilities/common'
import { modifyDoctorsShow, loadScheduleAction } from '../../store/actions/appointment/doctors.action'

class Index extends React.Component {
  render() {
    const store = this.props
    const data = this.props.doctors || []
    const i = this.props.index
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
                onClick={() => store.dispatch(modifyDoctorsShow(i, j))}
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
              </FlexList>{
                obj.show && obj.schedules && Array.isArray(obj.schedules) && obj.schedules.map((schedule, k) => (
                  <div key={k} style={{borderBottom: '1px solid #eee'}}>
                    <Flex align='baseline'>
                      <Flex.Item>
                        <div className='appointment__item'>{schedule.deptName}</div>
                      </Flex.Item>
                      <Flex.Item style={{flex: 2}}>
                        <div className='appointment__item'>{formatTime(schedule.startTime, schedule.endTime)}</div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className='appointment__item'>{schedule.visitCost}元</div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className='appointment__item'>
                          {
                            schedule.reserveOrderNum == 0 ? (
                              <Button size='small' style={{padding: '0', width: '90%'}} disabled>约满</Button>
                              ) : (
                                <Button size='small' style={{padding: '0', width: '90%', border: 'none'}} 
                                  icon={<i className={`anticon icon-downcircleo icon_reverse ${schedule.show ? 'reverse' : ''}`} style={{margin: '0'}} />}
                                  onClick={() => {
                                    store.dispatch(loadScheduleAction(schedule.scheduleId, i, j, k))
                                  }} />
                              )
                          }
                        </div>
                      </Flex.Item>
                    </Flex>
                    {
                      schedule.show && schedule.children && Array.isArray(schedule.children) && schedule.children.map((child, l) => (
                        <div key={l} style={{borderTop: '1px solid #eee'}}>
                          <Flex align='baseline'>
                            <Flex.Item style={{flex: 2}}>
                              <div className='appointment__item'>{formatTime(child.startTime, child.endTime)}</div>
                            </Flex.Item>
                            <Flex.Item>
                              <div className='appointment__item'>{schedule.visitCost}元</div>
                            </Flex.Item>
                            <Flex.Item>
                              <div className='appointment__item'>剩余{child.reserveOrderNum}</div>
                            </Flex.Item>
                            <Flex.Item style={{flex: 2}}>
                              <div className='appointment__item'>
                                <Button size='small' type='primary' style={{padding: '0', margin: '0 20px'}} >预约</Button>
                              </div>
                            </Flex.Item>
                          </Flex>
                        </div>
                      ))
                    }
                  </div>
                  ))
              }
            </div>
          ))
      }</div>
    )
  }
}

export default connect(state => state)(Index)
