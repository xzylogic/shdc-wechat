import React from 'react'
import { Card, Button, WhiteSpace } from 'antd-mobile'

export const AppointmentCard = ({data, handleCancel}) => (
  <div>
    <Card style={{height: '165px'}}>
      <Card.Header title='2018-06-18' 
        thumb={<i className='anticon icon-calendar user__tipicon' />} 
        extra={<span className='user__primary'>{data && data.orderStatus}</span>} />
      <Card.Body className='user__resettips'>
        <p>预约时间： {data && data.scheduleDate}</p>
        <p>预约医院： {data && data.hosOrgName}</p>
        <p>预约科室： {data && data.deptName}</p>
        <p>预约编号： {data && data.numSourceId}</p>
        <WhiteSpace />
        {
          data && data.orderStatus == '已预约' ? (
            <div style={{float: 'right', overflow: 'hidden'}}>
              <Button size='small' type='ghost' style={{width: '80px'}} onClick={handleCancel}>取消</Button>
            </div>
          ) : ''
        }
      </Card.Body>
    </Card>
  </div>
)