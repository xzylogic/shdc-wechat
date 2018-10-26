import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Flex, Button } from 'antd-mobile'

import { formatTime, checkNotNullArr } from '../../../utilities/common'
import { storeOrderInfoAction } from '../../../store/actions/appointment/detail.action'

import classes from './SchedulesList.scss'

class Index extends React.Component {

  handleClick = (data) => {
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
    this.props.onStoreOrderInfo(orderData)
    Router.push('/appointment/detail')
  }

  render() {
    const type = this.props.type || 'deptName'
    let schedulesList = ''
    if (checkNotNullArr(this.props.schedules)) {
      schedulesList = this.props.schedules.map((schedule, k) => {
        let buttonStatus = ''
        if (schedule.status == 2) {
          buttonStatus = <Button size='small' style={{padding: '0', width: '90%'}} disabled>停诊</Button>
        } else {
          buttonStatus = schedule.reserveOrderNum == 0 ? (
            <Button size='small' style={{padding: '0', width: '90%'}} disabled>约满</Button>
          ) : (
            <Button size='small' style={{padding: '0', width: '90%', border: 'none'}} 
              icon={<i className={`anticon icon-downcircleo icon_reverse ${schedule.show ? 'reverse' : ''}`} style={{margin: '0'}} />}
              onClick={(event) => this.props.onClick(event, k, schedule.scheduleId)} />
          )
        }
        let scheduleChildren = ''
        if (schedule.show && schedule.children && checkNotNullArr(schedule.children)) {
          scheduleChildren = schedule.children.map((child, l) => {
            return <div key={l} className={classes.ScheduleChildren}>
              <Flex>
                <Flex.Item style={{flex: 2}}>
                  <div className={classes.ScheduleItem} style={{fontSize: '12px'}}>{formatTime(child.startTime, child.endTime)}</div>
                </Flex.Item>
                <Flex.Item>
                  <div className={classes.ScheduleItem} style={{fontSize: '12px'}}>{schedule.visitCost}元</div>
                </Flex.Item>
                <Flex.Item>
                  <div className={classes.ScheduleItem} style={{fontSize: '12px'}}>剩余{child.reserveOrderNum}</div>
                </Flex.Item>
                <Flex.Item>
                  <div className={classes.ScheduleItem} style={{fontSize: '12px'}}>
                    <Button 
                      type='ghost' 
                      style={{fontSize: '12px', padding: '0', width: '50px', height: '25px', lineHeight: '25px', background: '#fff'}} 
                      onClick={this.handleClick.bind(this, {...schedule, ...child})}>预约</Button>
                  </div>
                </Flex.Item>
              </Flex>
            </div>
          })
        }
        return (
          <div key={k} className={classes.ScheduleList}>
            <Flex>
              <Flex.Item>
                <div className={classes.ScheduleItem} style={{paddingLeft: '5px'}}>{schedule[type]}</div>
              </Flex.Item>
              <Flex.Item style={{flex: 2}}>
                <div className={classes.ScheduleItem}>{formatTime(schedule.startTime, schedule.endTime)}</div>
              </Flex.Item>
              <Flex.Item>
                <div className={classes.ScheduleItem} style={{color: '#f44336'}}>{schedule.visitCost}元</div>
              </Flex.Item>
              <Flex.Item>
                <div className={classes.ScheduleItem}>{buttonStatus}</div>
              </Flex.Item>
            </Flex>
            {scheduleChildren}
          </div>
        )
      }) 
    }
    return (
      <React.Fragment>
        {schedulesList}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStoreOrderInfo: (data) => dispatch(storeOrderInfoAction(data)),
  }
}

export default connect(null, mapDispatchToProps)(Index)
