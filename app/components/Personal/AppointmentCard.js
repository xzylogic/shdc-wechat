import React from 'react'
import { Card, Button, WhiteSpace } from 'antd-mobile'

export const AppointmentCard = () => (
  <div>
    <Card>
      <Card.Header title='2018-06-18' 
        thumb={<i className='anticon icon-calendar user__tipicon' />} 
        extra={<span className='user__primary'>退号中</span>} />
      <Card.Body className='user__resettips'>
        <p>预约时间： 08:00 - 08:30</p>
        <p>预约医院： 华山医院</p>
        <p>预约科室： 消化科</p>
        <p>订单流水号： 2345687675645342</p>
        <WhiteSpace />
        <div style={{float: 'right', overflow: 'hidden'}}>
          <Button size='small' type='ghost' style={{width: '80px'}}>取消</Button>
        </div>
      </Card.Body>
    </Card>
  </div>
)