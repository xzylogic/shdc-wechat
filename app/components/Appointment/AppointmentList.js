import React from 'react'
import { Flex, Button } from 'antd-mobile'

import { formatTime } from '../../utilities/common'

class Index extends React.Component {

  handleClick = (data) => {
    console.log(data)
  } 
  
  render() {
    const appointments = this.props.appointments
    return (
      <div>{
        Array.isArray(appointments) && appointments.map((data, index) => {
          return (
            <div className='appointment__list' key={index}>
              <Flex align='baseline'>
                <Flex.Item>
                  <div className='appointment__item'>{data.deptName}</div>
                </Flex.Item>
                <Flex.Item style={{flex: 2}}>
                  <div className='appointment__item'>{formatTime(data.startTime, data.endTime)}</div>
                </Flex.Item>
                <Flex.Item>
                  <div className='appointment__item'>{data.visitCost}元</div>
                </Flex.Item>
                <Flex.Item>
                  <div className='appointment__item'>
                    <Button size='small' type='primary' style={{padding: '0', width: '90%'}} onClick={this.handleClick.bind(this, data)}>预约</Button>
                  </div>
                </Flex.Item>
              </Flex>
            </div>
          )
        })
      }
      </div>
    )
  }
}

export default Index