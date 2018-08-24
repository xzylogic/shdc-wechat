import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Flex, Button } from 'antd-mobile'

import { formatTime, checkNotNullArr } from '../../utilities/common'
import { storeOrderInfoAction } from '../../store/actions/appointment/detail.action'

class Index extends React.Component {

  loadSchedules = (k, id) => {
    if (this.props.loadSchedules) {
      this.props.loadSchedules(k, id)
    }
  }

  handleClick = (data) => {
    const store = this.props
    const orderData = {
      hosName: data.hosName,
      deptName: data.deptName,
      doctName: data.doctName,
      hosOrgCode: data.hosOrgCode,
      hosDeptCode: data.hosDeptCode,
      hosDoctCode: data.hosDoctCode,
      scheduleId: data.scheduleId,
      numSourceId: data.numSourceId,
      visitCost: data.visitCost,
      visitLevelCode: data.visitLevelCode,
      visitNo: data.visitNo || '',
      orderTime: data.startTime + '-' + data.endTime.split(' ')[1],
    }
    store.dispatch(storeOrderInfoAction(orderData))
    Router.push('/appointment/detail')
  } 
  
  render() {
    const { appointments, style = {borderTop: '1px solid #eee'} } = this.props
    return (
      <React.Fragment>{
        checkNotNullArr(appointments) && appointments.map((schedule, k) => {
          return (
            <div key={k} style={style}>
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
                            onClick={this.loadSchedules.bind(this, k, schedule.scheduleId)} />
                        )
                    }
                  </div>
                </Flex.Item>
              </Flex>
              {
                schedule && schedule.show && schedule.children && Array.isArray(schedule.children) && schedule.children.map((child, l) => (
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
                          <Button size='small' type='primary' style={{padding: '0', margin: '0 20px'}} onClick={this.handleClick.bind(this, {...schedule, ...child})}>预约</Button>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </div>
                ))
              }
            </div>
          )
        })
      }
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)
