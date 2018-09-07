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
    const { appointments, type, style = {borderTop: '1px solid #eee'} } = this.props
    return (
      <React.Fragment>{
        checkNotNullArr(appointments) && appointments.map((schedule, k) => {
          return (
            <div key={k} style={style}>
              <Flex>
                <Flex.Item>
                  <div className='appointment__item' style={{paddingLeft: '5px'}}>{schedule[type]}</div>
                </Flex.Item>
                <Flex.Item style={{flex: 2}}>
                  <div className='appointment__item'>{formatTime(schedule.startTime, schedule.endTime)}</div>
                </Flex.Item>
                <Flex.Item>
                  <div className='appointment__item' style={{color: '#f44336'}}>{schedule.visitCost}元</div>
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
                  <div key={l} style={{borderTop: '1px solid #eee', background: '#f5f5f9'}}>
                    <Flex>
                      <Flex.Item style={{flex: 2}}>
                        <div className='appointment__item' style={{fontSize: '12px'}}>{formatTime(child.startTime, child.endTime)}</div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className='appointment__item' style={{fontSize: '12px'}}>{schedule.visitCost}元</div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className='appointment__item' style={{fontSize: '12px'}}>剩余{child.reserveOrderNum}</div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className='appointment__item' style={{fontSize: '12px'}}>
                          <Button 
                            type='ghost' 
                            style={{fontSize: '12px', padding: '0', width: '50px', height: '25px', lineHeight: '25px', background: '#fff'}} 
                            onClick={this.handleClick.bind(this, {...schedule, ...child})}>预约</Button>
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
