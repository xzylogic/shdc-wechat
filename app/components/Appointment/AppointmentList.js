import React from 'react'
import { Flex, Button } from 'antd-mobile'

import { formatTime } from '../../utilities/common'

class Index extends React.Component {
  loadSchedules = (id, k) => {
    console.log(id, k)
    this.props.loadSchedules(id, k)
  }

  handleClick = (data) => {
    console.log(data)
  } 
  
  render() {
    const appointments = this.props.appointments
    const j = this.props.j
    return (
      <div>{
        Array.isArray(appointments) && appointments.map((schedule, k) => {
          return (
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
                            onClick={this.props.loadSchedules.bind(this, schedule.scheduleId, j, k)} />
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
                          <Button size='small' type='primary' style={{padding: '0', margin: '0 20px'}} onClick={this.handleClick()}>预约</Button>
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
      </div>
    )
  }
}

export default Index